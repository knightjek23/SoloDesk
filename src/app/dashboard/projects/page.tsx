import { Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ProjectsBoard, { type ProjectRow } from './projects-board'
import { addProject } from './actions'
import type { ProjectStatus } from '@/types'

export const dynamic = 'force-dynamic'

const headingStyle = { fontFamily: 'var(--font-heading)', fontWeight: 400, color: '#2C313E' } as const

const primaryBtn = {
  background: '#2462EB',
  color: '#fff',
  borderWidth: '1px 3px 3px 1px',
  borderColor: '#000',
  borderStyle: 'solid' as const,
  borderRadius: '4px',
} as const

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()

  const [projectsRes, clientsRes] = await Promise.all([
    supabase
      .from('projects')
      .select('id, title, description, status, start_date, end_date, budget, progress, client_id')
      .order('created_at', { ascending: false }),
    supabase
      .from('clients')
      .select('id, name, company'),
  ])

  const projects = projectsRes.data ?? []
  const clients = clientsRes.data ?? []

  const clientMap = new Map<string, string>()
  for (const c of clients) {
    clientMap.set(c.id, c.company ? `${c.name} (${c.company})` : c.name)
  }

  const rows: ProjectRow[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    status: p.status as ProjectStatus,
    startDate: p.start_date,
    endDate: p.end_date,
    budget: p.budget,
    progress: p.progress,
    clientId: p.client_id,
    clientName: clientMap.get(p.client_id) ?? 'Unknown',
  }))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ ...headingStyle, fontSize: '25px' }} className="mb-2">Projects</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9EA3AC' }}>Manage your project pipeline</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {rows.length} {rows.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>
      </div>

      {projectsRes.error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          Couldn&apos;t load projects: {projectsRes.error.message}
        </div>
      )}
      {error && (
        <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
          {error}
        </div>
      )}

      {/* Quick-add form */}
      <form
        action={addProject}
        className="mb-6 p-4 flex flex-wrap items-end gap-3"
        style={{
          background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium mb-1" style={{ color: '#6E727B' }}>Title *</label>
          <input
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium mb-1" style={{ color: '#6E727B' }}>Client *</label>
          <select
            name="client_id"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.company ? `${c.name} (${c.company})` : c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[130px]">
          <label className="block text-xs font-medium mb-1" style={{ color: '#6E727B' }}>Start Date</label>
          <input
            name="start_date"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
        <div className="min-w-[130px]">
          <label className="block text-xs font-medium mb-1" style={{ color: '#6E727B' }}>End Date</label>
          <input
            name="end_date"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
        <div className="min-w-[120px]">
          <label className="block text-xs font-medium mb-1" style={{ color: '#6E727B' }}>Budget</label>
          <input
            name="budget"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ background: 'rgba(255,255,255,0.6)' }}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 font-medium transition-colors"
          style={primaryBtn}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </form>

      {/* Kanban Board */}
      <ProjectsBoard projects={rows} />
    </div>
  )
}
