import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { InvoicesTable, type InvoiceRow } from './invoices-table'
import { addInvoice } from './actions'

export const dynamic = 'force-dynamic'

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

const primaryBtn = {
  background: '#2462EB',
  color: '#fff',
  borderWidth: '1px 3px 3px 1px',
  borderColor: '#000',
  borderStyle: 'solid' as const,
  borderRadius: '4px',
} as const

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()

  // Fetch invoices, clients, and projects in parallel
  const [invoicesRes, clientsRes, projectsRes] = await Promise.all([
    supabase
      .from('invoices')
      .select('id, invoice_number, client_id, project_id, status, subtotal, tax, total, due_date, paid_at, notes')
      .order('created_at', { ascending: false }),
    supabase
      .from('clients')
      .select('id, name'),
    supabase
      .from('projects')
      .select('id, title'),
  ])

  const invoices = invoicesRes.data ?? []
  const clients = clientsRes.data ?? []
  const projects = projectsRes.data ?? []

  // Build lookup maps
  const clientMap = new Map<string, string>()
  for (const c of clients) {
    clientMap.set(c.id, c.name)
  }

  const projectMap = new Map<string, string>()
  for (const p of projects) {
    projectMap.set(p.id, p.title)
  }

  // Map into InvoiceRow[] with resolved names
  const rows: InvoiceRow[] = invoices.map((inv) => ({
    id: inv.id,
    invoice_number: inv.invoice_number,
    client_name: clientMap.get(inv.client_id) ?? 'Unknown Client',
    project_title: inv.project_id ? (projectMap.get(inv.project_id) ?? null) : null,
    status: inv.status,
    subtotal: Number(inv.subtotal ?? 0),
    tax: Number(inv.tax ?? 0),
    total: Number(inv.total ?? 0),
    due_date: inv.due_date,
    paid_at: inv.paid_at,
    notes: inv.notes,
  }))

  const paidTotal = rows
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0)

  const outstandingTotal = rows
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue' || inv.status === 'draft')
    .reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Invoices</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Track and manage all your invoices</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {rows.length} {rows.length === 1 ? 'Invoice' : 'Invoices'}
          </span>
        </div>
      </div>

      {invoicesRes.error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          Couldn&apos;t load invoices: {invoicesRes.error.message}
        </div>
      )}
      {error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      {/* Quick-add form */}
      <form
        action={addInvoice}
        className="mb-6 bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-end gap-3"
      >
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Invoice # *</label>
          <input
            name="invoice_number"
            required
            placeholder="INV-001"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Client *</label>
          <select
            name="client_id"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Amount *</label>
          <input
            name="subtotal"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input type="hidden" name="tax" value="0" />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
          <input
            name="due_date"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 font-medium text-sm transition-colors"
          style={primaryBtn}
        >
          <Plus className="w-4 h-4" />
          Add Invoice
        </button>
      </form>

      <InvoicesTable invoices={rows} paidTotal={paidTotal} outstandingTotal={outstandingTotal} />
    </div>
  )
}
