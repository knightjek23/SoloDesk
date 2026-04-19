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
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Name / Company</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Active Projects</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Total Billed</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No clients yet. Add your first one above.
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-800">
                            {getInitials(client.name)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-500">{client.company ?? '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.email ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-600">{client.phone ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-50 text-blue-800 rounded text-xs font-medium">
                        {client.active_projects}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {formatCurrency(client.total_billed)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-4">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
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
