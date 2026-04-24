'use client'

import { useState } from 'react'
import { Play, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { mockTimeEntries, mockProjects } from '@/lib/mock-data'

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

export default function TimeTrackerPage() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id)
  const [description, setDescription] = useState('')
  const [timerTime, setTimerTime] = useState('00:00:00')

  const totalHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const billableHours = mockTimeEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const totalRevenue = mockTimeEntries.reduce((sum, entry) => sum + (entry.hours * entry.hourlyRate), 0)

  // Mock weekly data (hours per day)
  const weeklyHours = [5.5, 4.2, 6.8, 3.5, 4.2, 2.0, 0]

  const maxHours = Math.max(...weeklyHours)

  return (
    <div className="p-8">
      {/* Header */}
      <div>
        <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Time Tracker</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Log hours and track billable time</p>
      </div>

      {/* Timer Card */}
      <div className="p-8 mb-8 mt-8" style={glassPanel}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ border: '1px solid rgba(0,0,0,0.15)' }}
                >
                  {mockProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title} - {project.clientName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Description</label>
              <input
                type="text"
                placeholder="What are you working on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              />
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2" style={{ color: '#000' }}>Elapsed Time</label>
                <div className="text-5xl font-mono font-bold" style={{ color: '#2C313E' }}>{timerTime}</div>
              </div>
              <button className="flex items-center justify-center gap-2 w-20 h-20 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Monthly Total</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{totalHours}h</p>
            </div>
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Billable Hours</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{billableHours}h</p>
            </div>
            <div className="rounded-lg p-4" style={glassStat}>
              <p className="text-sm font-medium" style={{ color: '#6E727B' }}>Revenue</p>
              <p className="text-2xl font-bold mt-2" style={{ color: '#2C313E' }}>{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 overflow-hidden" style={glassPanel}>
          <div className="px-6 py-4 border-b border-black/5">
            <h2 style={{ ...headingStyle, fontSize: '18px' }}>Today&apos;s Entries</h2>
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
                {mockTimeEntries.slice(0, 5).map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-xs" style={{ color: '#2C313E' }}>{entry.projectTitle}</td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>{entry.description}</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{entry.hours}h</td>
                    <td className="px-6 py-4" style={{ color: '#6E727B' }}>${entry.hourlyRate}/hr</td>
                    <td className="px-6 py-4 font-medium" style={{ color: '#2C313E' }}>{formatCurrency(entry.hours * entry.hourlyRate)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
              <p>Total: <span className="font-bold" style={{ color: '#2C313E' }}>{weeklyHours.reduce((a, b) => a + b)}h</span></p>
              <p>Average: <span className="font-bold" style={{ color: '#2C313E' }}>{(weeklyHours.reduce((a, b) => a + b) / 7).toFixed(1)}h</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
