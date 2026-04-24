'use client'

import { Plus } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/lib/utils'

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
          <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Contracts</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Manage contracts and agreements with clients</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 font-medium transition-colors" style={primaryBtn}>
          <Plus className="w-5 h-5" />
          New Contract
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
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Status</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Created</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Signed</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Actions</th>
              </tr>
              <tr><td colSpan={6}><div style={glassStroke} /></td></tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {mockContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-white/30 transition-colors">
                  <td className="px-6 py-4 font-medium max-w-xs" style={{ color: '#2C313E' }}>{contract.title}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{contract.client}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{formatDate(contract.createdAt)}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                    {contract.signedAt ? formatDate(contract.signedAt) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="font-medium text-sm" style={{ color: '#2462EB' }}>
                      View
                    </button>
                    {contract.status === 'draft' && (
                      <button className="font-medium text-sm" style={{ color: '#2462EB' }}>
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
