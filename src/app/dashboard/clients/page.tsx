import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ClientsTable, type ClientRow } from './clients-table'
import { addClient } from './actions'

export const dynamic = 'force-dynamic'

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()

  // Fetch clients + embed count of non-completed projects + sum of invoice totals.
  // PostgREST can aggregate via a view, but for a v1 we just run three queries
  // in parallel and merge. Fine for <10k clients per user.
  const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
    supabase
      .from('clients')
      .select('id, name, company, email, phone')
      .order('created_at', { ascending: false }),
    supabase.from('projects').select('client_id, status'),
    supabase.from('invoices').select('client_id, total'),
  ])

  const clients = clientsRes.data ?? []
  const projectsByClient = new Map<string, number>()
  for (const p of projectsRes.data ?? []) {
    if (p.status === 'completed') continue
    projectsByClient.set(p.client_id, (projectsByClient.get(p.client_id) ?? 0) + 1)
  }

  const billedByClient = new Map<string, number>()
  for (const i of invoicesRes.data ?? []) {
    billedByClient.set(i.client_id, (billedByClient.get(i.client_id) ?? 0) + Number(i.total ?? 0))
  }

  const rows: ClientRow[] = clients.map((c) => ({
    id: c.id,
    name: c.name,
    company: c.company,
    email: c.email,
    phone: c.phone,
    active_projects: projectsByClient.get(c.id) ?? 0,
    total_billed: billedByClient.get(c.id) ?? 0,
  }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">Manage all your client relationships in one place</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {rows.length} {rows.length === 1 ? 'Client' : 'Clients'}
          </span>
        </div>
      </div>

      {clientsRes.error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          Couldn&apos;t load clients: {clientsRes.error.message}
        </div>
      )}
      {error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      {/* Quick-add form. A full modal/drawer is a follow-up. */}
      <form
        action={addClient}
        className="mb-6 bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-end gap-3"
      >
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
          <input
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
          <input
            name="company"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
          <input
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </form>

      <ClientsTable clients={rows} />
    </div>
  )
}
