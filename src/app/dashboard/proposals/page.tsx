'use client'

import { Plus, Copy } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockProposals } from '@/lib/mock-data'

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

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

const primaryBtn = {
  background: '#2462EB',
  color: '#fff',
  borderWidth: '1px 3px 3px 1px',
  borderColor: '#000',
  borderStyle: 'solid' as const,
  borderRadius: '4px',
} as const

export default function ProposalsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Proposals</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Create and send professional proposals to clients</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 font-medium transition-colors" style={primaryBtn}>
          <Plus className="w-5 h-5" />
          New Proposal
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden" style={glassPanel}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Title</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Client</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Amount</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Status</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Created</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Sent</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Actions</th>
              </tr>
              <tr><td colSpan={7}><div style={glassStroke} /></td></tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {mockProposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-white/30 transition-colors">
                  <td className="px-6 py-4 font-medium max-w-xs" style={{ color: '#2C313E' }}>{proposal.title}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{proposal.clientName}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{formatCurrency(proposal.total)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{formatDate(proposal.createdAt)}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                    {proposal.sentAt ? formatDate(proposal.sentAt) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="font-medium text-sm" style={{ color: '#2462EB' }}>
                      View
                    </button>
                    {proposal.status === 'draft' && (
                      <>
                        <button className="font-medium text-sm" style={{ color: '#2462EB' }}>
                          Send
                        </button>
                        <button className="font-medium text-sm" style={{ color: '#6E727B' }}>
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
