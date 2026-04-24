'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { getInitials, formatCurrency } from '@/lib/utils'

export type ClientRow = {
  id: string
  name: string
  company: string | null
  email: string | null
  phone: string | null
  active_projects: number
  total_billed: number
}

const glassPanel = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const glassStroke = {
  height: '2px',
  background: 'linear-gradient(108.74deg, rgba(232, 216, 176, 0.6) 2.88%, rgba(0, 0, 0, 0.54) 36.46%, rgba(0, 0, 0, 0.6) 73.96%, rgba(232, 216, 176, 0.6) 100%)',
} as const

export function ClientsTable({ clients }: { clients: ClientRow[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase()
    if (!q) return clients
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.company ?? '').toLowerCase().includes(q) ||
        (c.email ?? '').toLowerCase().includes(q)
    )
  }, [clients, searchTerm])

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: '#ADB1B8' }} />
          <input
            type="text"
            placeholder="Search clients by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ border: '1px solid rgba(0,0,0,0.15)' }}
          />
        </div>
      </div>

      <div className="overflow-hidden" style={glassPanel}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Name / Company</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Email</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Phone</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Active Projects</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Total Billed</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Actions</th>
              </tr>
              <tr><td colSpan={6}><div style={glassStroke} /></td></tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center" style={{ color: '#ADB1B8' }}>
                    No clients yet. Add your first one above.
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-800">
                            {getInitials(client.name)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#2C313E' }}>{client.name}</p>
                          <p style={{ fontSize: '12px', color: '#ADB1B8' }}>{client.company ?? '\u2014'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>{client.email ?? '\u2014'}</td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>{client.phone ?? '\u2014'}</td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-block px-2 py-1 rounded text-xs font-medium"
                        style={{ background: 'rgba(36, 98, 235, 0.1)', color: '#2462EB' }}
                      >
                        {client.active_projects}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                      {formatCurrency(client.total_billed)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="font-medium text-sm mr-4" style={{ color: '#2462EB' }}>
                        View
                      </button>
                      <button className="font-medium text-sm" style={{ color: '#6E727B' }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
