'use client'

import { Play, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { logTime, deleteTimeEntry } from './actions'

export type TimeEntryRow = {
  id: string
  project_id: string
  project_title: string
  client_name: string
  description: string | null
  hours: number
  hourly_rate: number
  entry_date: string
}

export type ProjectOption = {
  id: string
  title: string
  client_name: string
}

type TrackerStats = {
  totalHours: number
  billableHours: number
  totalRevenue: number
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

/**
 * Compute hours-per-weekday from entries whose entry_date falls within
 * the current ISO week (Mon-Sun).
 */
function computeWeeklyHours(entries: TimeEntryRow[]): number[] {
  const now = new Date()
  // Get Monday of the current week
  const day = now.getDay() // 0=Sun
  const diff = day === 0 ? 6 : day - 1
  const monday = new Date(now)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(now.getDate() - diff)

  const hours = [0, 0, 0, 0, 0, 0, 0]

  for (const entry of entries) {
    if (!entry.entry_date) continue
    const d = new Date(entry.entry_date + 'T00:00:00')
    const diffMs = d.getTime() - monday.getTime()
    const idx = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (idx >= 0 && idx < 7) {
      hours[idx] += entry.hours
    }
  }

  return hours.map((h) => Math.round(h * 10) / 10)
}

export default function TrackerView({
  entries,
  projects,
  stats,
}: {
  entries: TimeEntryRow[]
  projects: ProjectOption[]
  stats: TrackerStats
}) {
  const weeklyHours = computeWeeklyHours(entries)
  const maxHours = Math.max(...weeklyHours, 1)

  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      {/* Timer Card */}
      <div className="p-8 mb-8 mt-8" style={glassPanel}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section — cosmetic placeholder + manual log form */}
          <div className="lg:col-span-2">
            {/* Visual timer display */}
            <div className="flex items-end gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Timer</label>
                <div className="text-5xl font-mono font-bold" style={{ color: '#2C313E' }}>00:00:00</div>
              </div>
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-20 h-20 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition-colors"
              >
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>

            {/* Manual log form */}
            <form action={logTime}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Project</label>
                  <select
                    name="project_id"
                    required
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  >
                    <option value="">Select a project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} — {p.client_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Date</label>
                  <input
                    name="entry_date"
                    type="date"
                    defaultValue={today}
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Description</label>
                <input
                  name="description"
                  type="text"
                  placeholder="What did you work on?"
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Hours</label>
                  <input
                    name="hours"
                    type="number"
                    step="0.25"
                    min="0.25"
                    required
                    placeholder="1.5"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Hourly Rate ($)</label>
                  <input
                    name="hourly_rate"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="150"
                    className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
              >
                Log Time
              </button>
            </form>
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Monthly Total</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{stats.totalHours}h</p>
            </div>
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Billable Hours</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{stats.billableHours}h</p>
            </div>
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Revenue</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Entries table + Week view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 overflow-hidden" style={glassPanel}>
          <div className="px-6 py-4 border-b border-black/5">
            <h2 style={{ ...headingStyle, fontSize: '18px' }}>Recent Entries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Project</th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Description</th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Hours</th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Rate</th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}>Amount</th>
                  <th className="px-6 py-3 text-left font-medium" style={{ color: '#6E727B' }}></th>
                </tr>
                <tr><td colSpan={6}><div style={glassStroke} /></td></tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {entries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center" style={{ color: '#6E727B' }}>
                      No time entries yet. Log your first entry above.
                    </td>
                  </tr>
                )}
                {entries.slice(0, 10).map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-xs" style={{ color: '#2C313E' }}>{entry.project_title}</td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>{entry.description ?? '—'}</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{entry.hours}h</td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>${entry.hourly_rate}/hr</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>
                      {formatCurrency(entry.hours * entry.hourly_rate)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteTimeEntry}>
                        <input type="hidden" name="id" value={entry.id} />
                        <button type="submit" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Week View */}
        <div className="p-6" style={glassPanel}>
          <h3 style={{ ...headingStyle, fontSize: '16px' }} className="mb-6">Week Overview</h3>
          <div className="space-y-2">
            {daysOfWeek.map((day, idx) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium" style={{ color: '#6E727B' }}>{day}</span>
                <div className="flex-1 rounded-full h-6 overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
                  <div
                    className="h-6 rounded-full transition-all"
                    style={{
                      width: maxHours > 0 ? `${(weeklyHours[idx] / maxHours) * 100}%` : '0%',
                      background: '#2462EB',
                    }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-medium" style={{ color: '#2C313E' }}>
                  {weeklyHours[idx]}h
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-black/5">
            <div className="text-sm" style={{ color: '#6E727B' }}>
              <p>Total: <span className="font-bold" style={{ color: '#2C313E' }}>{weeklyHours.reduce((a, b) => a + b, 0)}h</span></p>
              <p>Average: <span className="font-bold" style={{ color: '#2C313E' }}>{(weeklyHours.reduce((a, b) => a + b, 0) / 7).toFixed(1)}h</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
