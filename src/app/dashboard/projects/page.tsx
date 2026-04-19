'use client'

import { Plus } from 'lucide-react'
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils'
import { mockProjects } from '@/lib/mock-data'
import type { ProjectStatus } from '@/types'

const statusColumns: { status: ProjectStatus; label: string; color: string }[] = [
  { status: 'active', label: 'Active', color: 'blue' },
  { status: 'in_progress', label: 'In Progress', color: 'purple' },
  { status: 'review', label: 'Review', color: 'amber' },
  { status: 'completed', label: 'Completed', color: 'green' },
]

function ProjectCard({ project }: { project: typeof mockProjects[0] }) {
  const daysLeft = daysUntil(project.endDate)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <p className="text-xs text-gray-500 font-medium uppercase">{project.clientName}</p>
        <p className="font-bold text-gray-900 mt-1">{project.title}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            {daysLeft > 0 ? `Due in ${daysLeft}d` : 'Overdue'}
          </span>
          <span className={`text-xs font-bold ${daysLeft <= 3 ? 'text-red-600' : 'text-gray-600'}`}>
            {formatDate(project.endDate)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{project.progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">Manage your project pipeline</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {statusColumns.map((column) => {
          const columnProjects = mockProjects.filter(p => p.status === column.status)
          const colorMap = {
            blue: 'bg-blue-50 border-blue-200',
            purple: 'bg-purple-50 border-purple-200',
            amber: 'bg-amber-50 border-amber-200',
            green: 'bg-green-50 border-green-200',
          }

          return (
            <div key={column.status} className={`${colorMap[column.color as keyof typeof colorMap]} rounded-xl border-2 min-h-96 p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold text-sm text-${column.color}-900`}>{column.label}</h3>
                <span className={`text-xs font-medium px-2 py-1 bg-${column.color}-100 text-${column.color}-800 rounded`}>
                  {columnProjects.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {columnProjects.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No projects
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
