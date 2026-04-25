'use client'

import { useState } from 'react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { InvoiceStatus } from '@/types'

export type InvoiceRow = {
  id: string
  invoice_number: string
  client_name: string
  project_title: string | null
  status: string
  subtotal: number
  tax: number
  total: number
  due_date: string | null
  paid_at: string | null
  notes: string | null
}

const filterTabs: InvoiceStatus[] = ['draft', 'sent', 'paid', 'overdue']

const glassPanel = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const glassStat = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.64) 0%, rgba(176, 173, 170, 0.8) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const glassStroke = {
  height: '2px',
  background: 'linear-gradient(108.74deg, rgba(232, 216, 176, 0.6) 2.88%, rgba(0, 0, 0, 0.54) 36.46%, rgba(0, 0, 0, 0.6) 73.96%, rgba(232, 216, 176, 0.6) 100%)',
} as const

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

interface InvoicesTableProps {
  invoices: InvoiceRow[]
  paidTotal: number
  outstandingTotal: number
}

export function InvoicesTable({ invoices, paidTotal, outstandingTotal }: InvoicesTableProps) {
  const [activeTab, setActiveTab] = useState<InvoiceStatus | 'all'>('all')

  const filteredInvoices = activeTab === 'all'
    ? invoices
    : invoices.filter(inv => inv.status === activeTab)

  const paidCount = invoices.filter(i => i.status === 'paid').length

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-6" style={glassStat}>
          <p style={{ fontSize: '13px', color: '#6E727B' }} className="mb-2">Total Outstanding</p>
          <p style={{ ...headingStyle, fontSize: '28px' }}>{formatCurrency(outstandingTotal)}</p>
          <p style={{ fontSize: '12px', color: '#ADB1B8' }} className="mt-2">Across draft, sent, and overdue invoices</p>
        </div>
        <div className="p-6" style={glassStat}>
          <p style={{ fontSize: '13px', color: '#6E727B' }} className="mb-2">Paid This Month</p>
          <p style={{ ...headingStyle, fontSize: '28px', color: '#16a34a' }}>{formatCurrency(paidTotal)}</p>
          <p style={{ fontSize: '12px', color: '#ADB1B8' }} className="mt-2">{paidCount} payments received</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-black/5">
        <button
          onClick={() => setActiveTab('all')}
          className="px-4 py-3 font-medium border-b-2 transition-colors"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderColor: activeTab === 'all' ? '#2462EB' : 'transparent',
            color: activeTab === 'all' ? '#2462EB' : '#6E727B',
          }}
        >
          All
        </button>
        {filterTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className="px-4 py-3 font-medium border-b-2 transition-colors capitalize"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderColor: activeTab === status ? '#2462EB' : 'transparent',
              color: activeTab === status ? '#2462EB' : '#6E727B',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden" style={glassPanel}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Invoice</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Client</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Project</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Amount</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Status</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Due Date</th>
                <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Actions</th>
              </tr>
              <tr><td colSpan={7}><div style={glassStroke} /></td></tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center" style={{ color: '#6E727B' }}>
                    No invoices found
                  </td>
                </tr>
              )}
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/30 transition-colors">
                  <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{invoice.invoice_number}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{invoice.client_name}</td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{invoice.project_title ?? '\u2014'}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{formatCurrency(invoice.total)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4" style={{ color: '#6E727B' }}>{invoice.due_date ? formatDate(invoice.due_date) : '\u2014'}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm mr-4 font-medium" style={{ color: '#2462EB' }}>
                      View
                    </button>
                    <button className="text-sm font-medium" style={{ color: '#6E727B' }}>
                      Send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
