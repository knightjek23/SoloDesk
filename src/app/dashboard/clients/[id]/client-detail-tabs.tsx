'use client'

import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Pencil,
  Check,
  X,
  Trash2,
  FolderKanban,
  Receipt,
  Clock,
  User,
  StickyNote,
} from 'lucide-react'
import { updateClient, deleteClient } from '../actions'
import { formatCurrency, formatDate, getInitials, daysUntil } from '@/lib/utils'
import { StatusBadge } from '@/components/StatusBadge'

// ── Types ───────────────────────────────────────────────────────────────────

export type ClientDetail = {
  id: string
  name: string
  company: string | null
  email: string | null
  phone: string | null
  address: string | null
  notes: string | null
  created_at: string
}

export type ClientProject = {
  id: string
  title: string
  status: string
  start_date: string | null
  end_date: string | null
  budget: number | null
  progress: number
}

export type ClientInvoice = {
  id: string
  invoice_number: string
  status: string
  total: number
  due_date: string | null
  paid_at: string | null
  project_title: string | null
}

export type ClientTimeEntry = {
  id: string
  project_title: string
  description: string | null
  hours: number
  hourly_rate: number
  entry_date: string | null
}

type Tab = 'overview' | 'projects' | 'invoices' | 'time'

// ── Styles ──────────────────────────────────────────────────────────────────

const glassPanel = {
  background:
    'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const glassStat = {
  background:
    'linear-gradient(116.79deg, rgba(255, 255, 255, 0.64) 0%, rgba(176, 173, 170, 0.8) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const glassStroke = {
  height: '2px',
  background:
    'linear-gradient(108.74deg, rgba(232, 216, 176, 0.6) 2.88%, rgba(0, 0, 0, 0.54) 36.46%, rgba(0, 0, 0, 0.6) 73.96%, rgba(232, 216, 176, 0.6) 100%)',
} as const

const headingStyle = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 400,
  color: '#2C313E',
} as const

// ── Inline Editable Field ───────────────────────────────────────────────────

function EditableField({
  value,
  field,
  clientId,
  label,
  icon: Icon,
  placeholder,
  type = 'text',
}: {
  value: string | null
  field: string
  clientId: string
  label: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  placeholder: string
  type?: string
}) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value ?? '')
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  const save = () => {
    const trimmed = localValue.trim()
    startTransition(async () => {
      const result = await updateClient(clientId, { [field]: trimmed || null })
      if (result.error) {
        setLocalValue(value ?? '')
      }
      setEditing(false)
    })
  }

  const cancel = () => {
    setLocalValue(value ?? '')
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#ADB1B8' }} />
        <div className="flex-1 flex items-center gap-1">
          <input
            ref={inputRef}
            autoFocus
            type={type}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save()
              if (e.key === 'Escape') cancel()
            }}
            className="flex-1 px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ border: '1px solid rgba(0,0,0,0.15)' }}
            placeholder={placeholder}
            disabled={isPending}
          />
          <button onClick={save} disabled={isPending} className="p-1 rounded hover:bg-white/40">
            <Check className="w-3.5 h-3.5" style={{ color: '#16a34a' }} />
          </button>
          <button onClick={cancel} disabled={isPending} className="p-1 rounded hover:bg-white/40">
            <X className="w-3.5 h-3.5" style={{ color: '#dc2626' }} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-2 group cursor-pointer rounded px-1 py-0.5 -mx-1 hover:bg-white/30 transition-colors"
      onClick={() => setEditing(true)}
    >
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#ADB1B8' }} />
      <span className="text-sm flex-1" style={{ color: value ? '#6E727B' : '#ADB1B8' }}>
        {value || placeholder}
      </span>
      <Pencil
        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#ADB1B8' }}
      />
    </div>
  )
}

// ── Editable Notes ──────────────────────────────────────────────────────────

function EditableNotes({
  value,
  clientId,
}: {
  value: string | null
  clientId: string
}) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value ?? '')
  const [isPending, startTransition] = useTransition()

  const save = () => {
    startTransition(async () => {
      await updateClient(clientId, { notes: localValue.trim() || null })
      setEditing(false)
    })
  }

  if (editing) {
    return (
      <div className="space-y-2">
        <textarea
          autoFocus
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          style={{ border: '1px solid rgba(0,0,0,0.15)' }}
          placeholder="Add private notes about this client..."
          disabled={isPending}
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={isPending}
            className="px-3 py-1 text-xs font-medium text-white rounded"
            style={{ background: '#2462EB' }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setLocalValue(value ?? '')
              setEditing(false)
            }}
            disabled={isPending}
            className="px-3 py-1 text-xs font-medium rounded"
            style={{ color: '#6E727B', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group cursor-pointer rounded p-3 hover:bg-white/30 transition-colors min-h-[60px]"
      onClick={() => setEditing(true)}
    >
      <p className="text-sm whitespace-pre-wrap" style={{ color: value ? '#6E727B' : '#ADB1B8' }}>
        {value || 'Click to add private notes about this client...'}
      </p>
      <Pencil
        className="w-3 h-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#ADB1B8' }}
      />
    </div>
  )
}

// ── Editable Name ───────────────────────────────────────────────────────────

function EditableName({
  value,
  clientId,
}: {
  value: string
  clientId: string
}) {
  const [editing, setEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const [isPending, startTransition] = useTransition()

  const save = () => {
    if (!localValue.trim()) {
      setLocalValue(value)
      setEditing(false)
      return
    }
    startTransition(async () => {
      const result = await updateClient(clientId, { name: localValue.trim() })
      if (result.error) setLocalValue(value)
      setEditing(false)
    })
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          autoFocus
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') {
              setLocalValue(value)
              setEditing(false)
            }
          }}
          className="text-[25px] px-2 py-0 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            ...headingStyle,
            border: '1px solid rgba(0,0,0,0.15)',
            width: `${Math.max(localValue.length, 10)}ch`,
          }}
          disabled={isPending}
        />
        <button onClick={save} disabled={isPending} className="p-1 rounded hover:bg-white/40">
          <Check className="w-4 h-4" style={{ color: '#16a34a' }} />
        </button>
        <button
          onClick={() => {
            setLocalValue(value)
            setEditing(false)
          }}
          disabled={isPending}
          className="p-1 rounded hover:bg-white/40"
        >
          <X className="w-4 h-4" style={{ color: '#dc2626' }} />
        </button>
      </div>
    )
  }

  return (
    <h1
      className="text-[25px] group cursor-pointer inline-flex items-center gap-2"
      style={headingStyle}
      onClick={() => setEditing(true)}
    >
      {value}
      <Pencil
        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: '#ADB1B8' }}
      />
    </h1>
  )
}

// ── Main Component ──────────────────────────────────────────────────────────

export function ClientDetailTabs({
  client,
  projects,
  invoices,
  timeEntries,
  stats,
}: {
  client: ClientDetail
  projects: ClientProject[]
  invoices: ClientInvoice[]
  timeEntries: ClientTimeEntry[]
  stats: { totalBilled: number; activeProjects: number; totalHours: number }
}) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const router = useRouter()

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects', count: projects.length },
    { key: 'invoices', label: 'Invoices', count: invoices.length },
    { key: 'time', label: 'Time Log', count: timeEntries.length },
  ]

  return (
    <div className="p-8 max-w-[1100px]">
      {/* Back link */}
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
        style={{ color: '#2462EB' }}
      >
        <ArrowLeft className="w-4 h-4" />
        All Clients
      </Link>

      {/* Header: Avatar + Name + Stats */}
      <div className="flex items-start gap-5 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(36, 98, 235, 0.1)' }}
        >
          <span className="text-xl font-bold" style={{ color: '#2462EB' }}>
            {getInitials(client.name)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <EditableName value={client.name} clientId={client.id} />
          {client.company && (
            <p className="text-sm mt-0.5" style={{ color: '#9EA3AC' }}>
              {client.company}
            </p>
          )}
          <p className="text-xs mt-1" style={{ color: '#ADB1B8' }}>
            Client since {formatDate(client.created_at)}
          </p>
        </div>
        {/* Delete button */}
        <form action={deleteClient}>
          <input type="hidden" name="id" value={client.id} />
          <button
            type="submit"
            className="p-2 rounded hover:bg-red-50 transition-colors"
            title="Delete client"
            onClick={(e) => {
              if (!confirm('Delete this client? This cannot be undone.')) {
                e.preventDefault()
              }
            }}
          >
            <Trash2 className="w-4 h-4" style={{ color: '#dc2626' }} />
          </button>
        </form>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4" style={glassStat}>
          <p className="text-xs font-medium" style={{ color: '#6E727B' }}>
            Total Billed
          </p>
          <p className="text-xl font-bold mt-1" style={{ color: '#2C313E' }}>
            {formatCurrency(stats.totalBilled)}
          </p>
        </div>
        <div className="p-4" style={glassStat}>
          <p className="text-xs font-medium" style={{ color: '#6E727B' }}>
            Active Projects
          </p>
          <p className="text-xl font-bold mt-1" style={{ color: '#2C313E' }}>
            {stats.activeProjects}
          </p>
        </div>
        <div className="p-4" style={glassStat}>
          <p className="text-xs font-medium" style={{ color: '#6E727B' }}>
            Hours Logged
          </p>
          <p className="text-xl font-bold mt-1" style={{ color: '#2C313E' }}>
            {stats.totalHours.toFixed(1)}h
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-black/5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-3 font-medium border-b-2 transition-colors"
            style={{
              fontSize: '14px',
              borderColor: activeTab === tab.key ? '#2462EB' : 'transparent',
              color: activeTab === tab.key ? '#2462EB' : '#6E727B',
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded text-xs"
                style={{
                  background:
                    activeTab === tab.key ? 'rgba(36,98,235,0.1)' : 'rgba(0,0,0,0.05)',
                  color: activeTab === tab.key ? '#2462EB' : '#ADB1B8',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact info */}
          <div className="p-5 space-y-3" style={glassPanel}>
            <h3 className="text-sm font-medium mb-3" style={{ color: '#2C313E' }}>
              Contact Information
            </h3>
            <div style={glassStroke} className="mb-3" />
            <EditableField
              value={client.company}
              field="company"
              clientId={client.id}
              label="Company"
              icon={Building2}
              placeholder="Add company..."
            />
            <EditableField
              value={client.email}
              field="email"
              clientId={client.id}
              label="Email"
              icon={Mail}
              placeholder="Add email..."
              type="email"
            />
            <EditableField
              value={client.phone}
              field="phone"
              clientId={client.id}
              label="Phone"
              icon={Phone}
              placeholder="Add phone..."
              type="tel"
            />
            <EditableField
              value={client.address}
              field="address"
              clientId={client.id}
              label="Address"
              icon={MapPin}
              placeholder="Add address..."
            />
          </div>

          {/* Private notes */}
          <div className="p-5" style={glassPanel}>
            <div className="flex items-center gap-2 mb-3">
              <StickyNote className="w-4 h-4" style={{ color: '#ADB1B8' }} />
              <h3 className="text-sm font-medium" style={{ color: '#2C313E' }}>
                Private Notes
              </h3>
            </div>
            <div style={glassStroke} className="mb-3" />
            <EditableNotes value={client.notes} clientId={client.id} />
          </div>

          {/* Recent projects snapshot */}
          <div className="p-5" style={glassPanel}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4" style={{ color: '#ADB1B8' }} />
                <h3 className="text-sm font-medium" style={{ color: '#2C313E' }}>
                  Recent Projects
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-medium"
                style={{ color: '#2462EB' }}
              >
                View all
              </button>
            </div>
            <div style={glassStroke} className="mb-3" />
            {projects.length === 0 ? (
              <p className="text-sm py-4 text-center" style={{ color: '#ADB1B8' }}>
                No projects yet
              </p>
            ) : (
              <div className="space-y-2">
                {projects.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between py-2 px-1"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: '#2C313E' }}>
                        {p.title}
                      </p>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent invoices snapshot */}
          <div className="p-5" style={glassPanel}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4" style={{ color: '#ADB1B8' }} />
                <h3 className="text-sm font-medium" style={{ color: '#2C313E' }}>
                  Recent Invoices
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('invoices')}
                className="text-xs font-medium"
                style={{ color: '#2462EB' }}
              >
                View all
              </button>
            </div>
            <div style={glassStroke} className="mb-3" />
            {invoices.length === 0 ? (
              <p className="text-sm py-4 text-center" style={{ color: '#ADB1B8' }}>
                No invoices yet
              </p>
            ) : (
              <div className="space-y-2">
                {invoices.slice(0, 3).map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between py-2 px-1"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-medium" style={{ color: '#2C313E' }}>
                        {inv.invoice_number}
                      </span>
                      <StatusBadge status={inv.status} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#2C313E' }}>
                      {formatCurrency(inv.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="overflow-hidden" style={glassPanel}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Project
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Deadline
                  </th>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <div style={glassStroke} />
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {projects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center"
                      style={{ color: '#ADB1B8' }}
                    >
                      No projects for this client yet.
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => {
                    const daysLeft = p.end_date ? daysUntil(p.end_date) : null
                    return (
                      <tr key={p.id} className="hover:bg-white/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium" style={{ color: '#2C313E' }}>
                            {p.title}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                          {p.budget != null ? formatCurrency(p.budget) : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex-1 rounded-full h-2 max-w-[80px]"
                              style={{ background: 'rgba(0,0,0,0.08)' }}
                            >
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: `${p.progress}%`,
                                  background: '#2462EB',
                                }}
                              />
                            </div>
                            <span className="text-xs" style={{ color: '#6E727B' }}>
                              {p.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {p.end_date ? (
                            <span
                              className="text-sm"
                              style={{
                                color:
                                  daysLeft !== null && daysLeft <= 20
                                    ? '#E35555'
                                    : daysLeft !== null && daysLeft <= 40
                                    ? '#E19443'
                                    : '#53BA77',
                              }}
                            >
                              {formatDate(p.end_date)}{' '}
                              <span className="text-xs">
                                ({daysLeft !== null && daysLeft > 0 ? `${daysLeft}d` : 'overdue'})
                              </span>
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="overflow-hidden" style={glassPanel}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Project
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Due Date
                  </th>
                </tr>
                <tr>
                  <td colSpan={5}>
                    <div style={glassStroke} />
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {invoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center"
                      style={{ color: '#ADB1B8' }}
                    >
                      No invoices for this client yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/30 transition-colors">
                      <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                        {inv.invoice_number}
                      </td>
                      <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                        {inv.project_title ?? '—'}
                      </td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                        {formatCurrency(inv.total)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                        {inv.due_date ? formatDate(inv.due_date) : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'time' && (
        <div className="overflow-hidden" style={glassPanel}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Project
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Hours
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Rate
                  </th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>
                    Amount
                  </th>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <div style={glassStroke} />
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {timeEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center"
                      style={{ color: '#ADB1B8' }}
                    >
                      No time entries for this client yet.
                    </td>
                  </tr>
                ) : (
                  timeEntries.map((te) => (
                    <tr key={te.id} className="hover:bg-white/30 transition-colors">
                      <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                        {te.entry_date ? formatDate(te.entry_date) : '—'}
                      </td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                        {te.project_title}
                      </td>
                      <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                        {te.description ?? '—'}
                      </td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                        {te.hours}h
                      </td>
                      <td className="px-6 py-4" style={{ color: '#6E727B' }}>
                        ${te.hourly_rate}/hr
                      </td>
                      <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                        {formatCurrency(te.hours * te.hourly_rate)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
