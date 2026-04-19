'use client'

import { Plus, Copy } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockProposals } from '@/lib/mock-data'

export default function ProposalsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposals</h1>
          <p className="text-gray-600">Create and send professional proposals to clients</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Proposal
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
                <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Created</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Sent</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockProposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">{proposal.title}</td>
                  <td className="px-6 py-4 text-gray-600">{proposal.clientName}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(proposal.total)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(proposal.createdAt)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {proposal.sentAt ? formatDate(proposal.sentAt) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View
                    </button>
                    {proposal.status === 'draft' && (
                      <>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          Send
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                          <Copy className="w-4 h-4 inline" /> Duplicate
                        </button>
                      </>
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
