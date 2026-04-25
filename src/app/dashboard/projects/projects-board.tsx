'use client'

import { formatCurrency, formatDate, daysUntil } from '@/lib/utils'
import type { ProjectStatus } from '@/types'

export interface ProjectRow {
  id: string
  title: string
  description: string | null
  status: ProjectStatus
  startDate: string | null
  endDate: string | null
  budget: number | null
  progress: number
  clientId: string
  clientName: string
}

const statusColumns: { status: ProjectStatus; label: string; color: string }[] = [
  { status: 'active', label: 'Active', color: 'blue' },
  { status: 'in_progress', label: 'In Progress', color: 'purple' },
  { status: 'review', label: 'Review', color: 'amber' },
  { status: 'completed', label: 'Completed', color: 'green' },
]

const glassPanel = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: '8px',
} as const

const colorTextMap: Record<string, string> = {
  blue: '#2563eb',
  purple: '#9333ea',
  amber: '#d97706',
  green: '#16a34a',
}

function ProjectCard({ project }: { project: ProjectRow }) {
  const daysLeft = project.endDate ? daysUntil(project.endDate) : null

  return (
    <div
      className="p-4 hover:shadow-md transition-shadow"
      style={glassPanel}
    >
      <div className="mb-3">
        <p style={{ fontSize: '11px', color: '#ADB1B8', fontWeight: 500, textTransform: 'uppercase' }}>{project.clientName}</p>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E', fontSize: '15px' }} className="mt-1">{project.title}</p>
      </div>

      <div className="space-y-3">
        {project.endDate && (
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '12px', color: '#6E727B' }}>
              {daysLeft !== null && daysLeft > 0 ? `Due in ${daysLeft}d` : 'Overdue'}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: daysLeft !== null && daysLeft <= 3 ? '#dc2626' : '#6E727B' }}>
              {formatDate(project.endDate)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#2C313E' }}>
            {project.budget !== null ? formatCurrency(project.budget) : '\u2014'}
          </span>
          <span
            className="px-2 py-1 rounded"
            style={{ fontSize: '12px', color: '#6E727B', background: 'rgba(255,255,255,0.4)' }}
          >
            {project.progress}%
          </span>
        </div>

        <div className="w-full rounded-full h-2" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%`, background: '#2462EB' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsBoard({ projects }: { projects: ProjectRow[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {statusColumns.map((column) => {
        const columnProjects = projects.filter(p => p.status === column.status)

        return (
          <div
            key={column.status}
            className="min-h-96 p-4"
            style={{
              ...glassPanel,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  color: colorTextMap[column.color] || '#2C313E',
                  fontSize: '14px',
                }}
              >
                {column.label}
              </h3>
              <span
                className="px-2 py-1 rounded"
                style={{ fontSize: '12px', fontWeight: 500, color: '#6E727B', background: 'rgba(255,255,255,0.5)' }}
              >
                {columnProjects.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {columnProjects.length === 0 && (
              <div className="text-center py-8" style={{ fontSize: '13px', color: '#ADB1B8' }}>
                No projects
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
