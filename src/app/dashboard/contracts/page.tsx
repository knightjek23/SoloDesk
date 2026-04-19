'use client'

import { Plus } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/lib/utils'

export default function ContractsPage() {
  const mockContracts = [
    {
      id: '1',
      title: 'Service Agreement - Bright Digital Co',
      client: 'Bright Digital Co',
      status: 'signed' as const,
      createdAt: '2024-01-15',
      signedAt: '2024-02-01',
    },
    {
      id: '2',
      title: 'Project Retainer Agreement',
      client: 'Santos Architecture',
      status: 'sent' as const,
      createdAt: '2024-03-10',
    },
    {
      id: '3',
      title: 'Freelance Agreement Template',
      client: 'Velocity Startups',
      status: 'draft' as const,
      createdAt: '2024-03-25',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contracts</h1>
          <p className="text-gray-600">Manage contracts and agreements with clients</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Contract
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Title</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Client</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Created</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Signed</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">{contract.title}</td>
                  <td className="px-6 py-4 text-gray-600">{contract.client}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(contract.createdAt)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {contract.signedAt ? formatDate(contract.signedAt) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View
                    </button>
                    {contract.status === 'draft' && (
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Send
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
