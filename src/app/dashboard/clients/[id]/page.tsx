import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ClientDetailTabs } from './client-detail-tabs'
import type { ClientDetail, ClientProject, ClientInvoice, ClientTimeEntry } from './client-detail-tabs'

export const dynamic = 'force-dynamic'

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch client + related data in parallel
  const [clientRes, projectsRes, invoicesRes, timeRes] = await Promise.all([
    supabase
      .from('clients')
      .select('id, name, company, email, phone, address, notes, created_at')
      .eq('id', id)
      .single(),
    supabase
      .from('projects')
      .select('id, title, status, start_date, end_date, budget, progress, client_id')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('invoices')
      .select('id, invoice_number, status, total, due_date, paid_at, client_id, project_id')
      .eq('client_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('time_entries')
      .select('id, project_id, description, hours, hourly_rate, entry_date'),
  ])

  if (clientRes.error || !clientRes.data) notFound()

  const client: ClientDetail = {
    id: clientRes.data.id,
    name: clientRes.data.name,
    company: clientRes.data.company,
    email: clientRes.data.email,
    phone: clientRes.data.phone,
    address: clientRes.data.address,
    notes: clientRes.data.notes,
    created_at: clientRes.data.created_at,
  }

  // Build project ID→title map for invoice + time entry lookups
  const projectMap = new Map<string, string>()
  const projects: ClientProject[] = (projectsRes.data ?? []).map((p) => {
    projectMap.set(p.id, p.title)
    return {
      id: p.id,
      title: p.title,
      status: p.status,
      start_date: p.start_date,
      end_date: p.end_date,
      budget: p.budget,
      progress: p.progress,
    }
  })

  const invoices: ClientInvoice[] = (invoicesRes.data ?? []).map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoice_number,
    status: inv.status,
    total: Number(inv.total ?? 0),
    due_date: inv.due_date,
    paid_at: inv.paid_at,
    project_title: inv.project_id ? (projectMap.get(inv.project_id) ?? null) : null,
  }))

  // Filter time entries to only this client's projects
  const clientProjectIds = new Set(projects.map((p) => p.id))
  const timeEntries: ClientTimeEntry[] = (timeRes.data ?? [])
    .filter((te) => clientProjectIds.has(te.project_id))
    .map((te) => ({
      id: te.id,
      project_title: projectMap.get(te.project_id) ?? 'Unknown',
      description: te.description,
      hours: Number(te.hours ?? 0),
      hourly_rate: Number(te.hourly_rate ?? 0),
      entry_date: te.entry_date,
    }))

  // Compute summary stats
  const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const activeProjects = projects.filter(
    (p) => p.status === 'active' || p.status === 'in_progress'
  ).length
  const totalHours = timeEntries.reduce((sum, te) => sum + te.hours, 0)

  return (
    <ClientDetailTabs
      client={client}
      projects={projects}
      invoices={invoices}
      timeEntries={timeEntries}
      stats={{ totalBilled, activeProjects, totalHours }}
    />
  )
}
