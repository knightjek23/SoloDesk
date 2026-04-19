'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { mockInvoices } from '@/lib/mock-data'
import type { InvoiceStatus } from '@/types'

const filterTabs: InvoiceStatus[] = ['draft', 'sent', 'paid', 'overdue']

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<InvoiceStatus | 'all'>('all')

  const filteredInvoices = activeTab === 'all'
    ? mockInvoices
    : mockInvoices.filter(inv => inv.status === activeTab)

  const paidTotal = mockInvoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0)

  const outstandingTotal = mockInvoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue' || inv.status === 'draft')
    .reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
          <p className="text-gray-600">Track and manage all your invoices</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Total Outstanding</p>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(outstandingTotal)}</p>
          <p className="text-xs text-gray-500 mt-2">Across draft, sent, and overdue invoices</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Paid This Month</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(paidTotal)}</p>
          <p className="text-xs text-gray-500 mt-2">{mockInvoices.filter(i => i.status === 'paid').length} payments received</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All
        </button>
        {filterTabs.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors capitalize ${
              activeTab === status
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Invoice</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Client</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Project</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Due Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.clientName}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.projectTitle}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(invoice.total)}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(invoice.dueDate)}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mr-4">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                      Send
                    </button>
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
