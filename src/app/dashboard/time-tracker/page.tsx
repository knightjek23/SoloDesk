import { createClient } from '@/lib/supabase/server'
import TrackerView, { type TimeEntryRow, type ProjectOption } from './tracker-view'

export const dynamic = 'force-dynamic'

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

export default async function TimeTrackerPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()

  // Fetch time_entries, projects, and clients in parallel
  const [entriesRes, projectsRes, clientsRes] = await Promise.all([
    supabase
      .from('time_entries')
      .select('id, project_id, description, hours, hourly_rate, entry_date')
      .order('entry_date', { ascending: false }),
    supabase
      .from('projects')
      .select('id, client_id, title, status'),
    supabase
      .from('clients')
      .select('id, name'),
  ])

  const entries = entriesRes.data ?? []
  const projects = projectsRes.data ?? []
  const clients = clientsRes.data ?? []

  // Build lookup maps
  const projectMap = new Map(projects.map((p) => [p.id, p]))
  const clientMap = new Map(clients.map((c) => [c.id, c.name]))

  // Map entries into TimeEntryRow with resolved names
  const rows: TimeEntryRow[] = entries.map((e) => {
    const project = projectMap.get(e.project_id)
    return {
      id: e.id,
      project_id: e.project_id,
      project_title: project?.title ?? 'Unknown Project',
      client_name: project ? (clientMap.get(project.client_id) ?? 'Unknown Client') : 'Unknown Client',
      description: e.description,
      hours: Number(e.hours ?? 0),
      hourly_rate: Number(e.hourly_rate ?? 0),
      entry_date: e.entry_date ?? '',
    }
  })

  // Build ProjectOption[] from active projects
  const projectOptions: ProjectOption[] = projects
    .filter((p) => p.status !== 'completed')
    .map((p) => ({
      id: p.id,
      title: p.title,
      client_name: clientMap.get(p.client_id) ?? 'Unknown Client',
    }))

  // Calculate stats server-side
  const totalHours = Math.round(rows.reduce((sum, r) => sum + r.hours, 0) * 10) / 10
  const billableHours = totalHours // same for MVP
  const totalRevenue = Math.round(rows.reduce((sum, r) => sum + r.hours * r.hourly_rate, 0) * 100) / 100

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Time Tracker</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>
          Log hours and track billable time
        </p>
      </div>

      {entriesRes.error && (
        <div className="mt-4 mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          Couldn&apos;t load time entries: {entriesRes.error.message}
        </div>
      )}
      {error && (
        <div className="mt-4 mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <TrackerView
        entries={rows}
        projects={projectOptions}
        stats={{ totalHours, billableHours, totalRevenue }}
      />
    </div>
  )
}
