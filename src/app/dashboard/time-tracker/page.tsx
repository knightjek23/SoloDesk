'use client'

import { useState } from 'react'
import { Play, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { mockTimeEntries, mockProjects } from '@/lib/mock-data'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Tracker</h1>
        <p className="text-gray-600">Log hours and track billable time</p>
      </div>

      {/* Timer Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input
                type="text"
                placeholder="What are you working on?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Elapsed Time</label>
                <div className="text-5xl font-mono font-bold text-gray-900">{timerTime}</div>
              </div>
              <button className="flex items-center justify-center gap-2 w-20 h-20 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold transition-colors">
                <Play className="w-6 h-6 fill-white" />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">Monthly Total</p>
              <p className="text-2xl font-bold text-blue-900 mt-2">{totalHours}h</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 font-medium">Billable Hours</p>
              <p className="text-2xl font-bold text-green-900 mt-2">{billableHours}h</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-purple-900 mt-2">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Today's Entries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Project</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Description</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Hours</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Rate</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockTimeEntries.slice(0, 5).map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 text-xs">{entry.projectTitle}</td>
                    <td className="px-6 py-4 text-gray-600">{entry.description}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{entry.hours}h</td>
                    <td className="px-6 py-4 text-gray-600">${entry.hourlyRate}/hr</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(entry.hours * entry.hourlyRate)}</td>
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
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Week Overview</h3>
          <div className="space-y-2">
            {daysOfWeek.map((day, idx) => (
              <div key={day} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-gray-600">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-blue-600 h-6 rounded-full transition-all"
                    style={{
                      width: maxHours > 0 ? `${(weeklyHours[idx] / maxHours) * 100}%` : '0%',
                    }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-medium text-gray-900">
                  {weeklyHours[idx]}h
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <p>Total: <span className="font-bold text-gray-900">{weeklyHours.reduce((a, b) => a + b)}h</span></p>
              <p>Average: <span className="font-bold text-gray-900">{(weeklyHours.reduce((a, b) => a + b) / 7).toFixed(1)}h</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
