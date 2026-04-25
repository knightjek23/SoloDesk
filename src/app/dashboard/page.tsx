import {
  ChevronDown,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/StatsCard'
import { StatusBadge } from '@/components/StatusBadge'
import { formatCurrency, formatDate, daysUntil } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = await createClient()

  // Current month boundaries for time entries query
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const [userRes, projectsRes, invoicesRes, timeRes, clientsRes] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('projects')
      .select('id, client_id, title, status, end_date')
      .order('end_date', { ascending: true }),
    supabase
      .from('invoices')
      .select('id, client_id, invoice_number, status, total, due_date')
      .order('created_at', { ascending: false }),
    supabase
      .from('time_entries')
      .select('hours')
      .gte('entry_date', monthStart)
      .lte('entry_date', monthEnd),
    supabase
      .from('clients')
      .select('id, name, company'),
  ])

  const userName = userRes.data?.user?.user_metadata?.name ?? 'there'
  const projects = projectsRes.data ?? []
  const invoices = invoicesRes.data ?? []
  const timeEntries = timeRes.data ?? []
  const clients = clientsRes.data ?? []

  // Build client lookup map
  const clientMap = new Map<string, { name: string; company: string | null }>()
  for (const c of clients) {
    clientMap.set(c.id, { name: c.name, company: c.company })
  }

  // Stats computations
  const activeProjects = projects.filter(
    (p) => p.status === 'active' || p.status === 'in_progress'
  )
  const outstandingTotal = invoices
    .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + Number(inv.total ?? 0), 0)
  const hoursThisMonth = timeEntries.reduce(
    (sum, te) => sum + Number(te.hours ?? 0),
    0
  )

  // Recent invoices — first 4
  const recentInvoices = invoices.slice(0, 4)

  // Upcoming deadlines — non-completed projects sorted by end_date, top 5
  const upcomingDeadlines = projects
    .filter((p) => p.status !== 'completed' && p.status !== 'archived' && p.end_date)
    .slice(0, 5)

  // Greeting time of day
  const hour = now.getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const today = now.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Deadline day color based on urgency
  const getDaysColor = (days: number) => {
    if (days <= 20) return '#E35555'
    if (days <= 40) return '#E19443'
    return '#53BA77'
  }

  const getDaysFontWeight = (days: number) => {
    if (days <= 20) return 700
    if (days <= 40) return 400
    return 400
  }

  return (
    <div className="p-6 pb-12 max-w-[1221px]">
      {/* Header — Playfair Display */}
      <div className="mb-6">
        <h1
          className="text-[25px] mb-0.5"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            lineHeight: '33px',
            color: '#2C313E',
          }}
        >
          {greeting}, {userName}
        </h1>
        <p className="text-[13px] font-normal" style={{ color: '#9EA3AC' }}>
          {today}
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatsCard
          title="Active Projects"
          value={activeProjects.length.toString()}
        />
        <StatsCard
          title="Outstanding"
          value={formatCurrency(outstandingTotal)}
        />
        <StatsCard
          title="Hours This Month"
          value={`${hoursThisMonth.toFixed(1)}h`}
        />
        <StatsCard
          title="Pending Proposals"
          value={'\u2014'}
        />
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="flex items-center justify-between px-5 py-2.5 text-black text-xs font-normal blass-btn-flat">
          <span>New Invoice</span>
          <ChevronDown className="w-2.5 h-2.5 text-black/40" />
        </button>
        <button className="flex items-center justify-between px-5 py-2.5 text-black text-xs font-normal blass-btn">
          <span>New Proposal</span>
          <ChevronDown className="w-2.5 h-2.5 text-black/40" />
        </button>
        <button className="flex items-center justify-between px-5 py-2.5 text-black text-xs font-normal blass-btn">
          <span>Log Time</span>
          <ChevronDown className="w-2.5 h-2.5 text-black/40" />
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Recent Invoices — 2/3 width */}
        <div className="lg:col-span-2 glass-card-heavy overflow-hidden relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
              border: '1px solid #000',
              borderRadius: '8px',
              zIndex: 0,
            }}
          />
          <div className="relative z-10">
            {/* Header */}
            <div className="px-4 py-2.5 flex items-center">
              <h2 className="text-[17px] font-normal text-black">
                Recent Invoices
              </h2>
            </div>
            {/* Separator bar */}
            <div
              className="w-full h-[6px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(90,79,207,0.2), rgba(232,237,255,0.15))',
                border: '1px solid #000',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            />
            {/* Invoice rows */}
            <div className="flex flex-col gap-2 py-3">
              {recentInvoices.length === 0 && (
                <p
                  className="px-4 py-2 text-[13px]"
                  style={{ color: '#9EA3AC' }}
                >
                  No invoices yet
                </p>
              )}
              {recentInvoices.map((invoice) => {
                const client = clientMap.get(invoice.client_id)
                return (
                  <div
                    key={invoice.id}
                    className="flex items-center px-4 py-1 hover:bg-white/10 transition-colors"
                    style={{ gap: '93px' }}
                  >
                    {/* Invoice number — gradient text fill */}
                    <span
                      className="text-[11px] font-normal min-w-[44px]"
                      style={{
                        background:
                          'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        border: '1px solid #000',
                        padding: '0 4px',
                      }}
                    >
                      {invoice.invoice_number}
                    </span>
                    {/* Client — gradient text fill */}
                    <span
                      className="text-[11px] font-normal min-w-[90px]"
                      style={{
                        background:
                          'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        border: '1px solid #000',
                        padding: '0 4px',
                      }}
                    >
                      {client?.name ?? 'Unknown'}
                    </span>
                    {/* Amount — gradient text fill */}
                    <span
                      className="text-[11px] font-normal min-w-[57px]"
                      style={{
                        background:
                          'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        border: '1px solid #000',
                        padding: '0 4px',
                      }}
                    >
                      ${Number(invoice.total ?? 0).toFixed(2)}
                    </span>
                    {/* Status badge */}
                    <StatusBadge status={invoice.status} />
                    {/* Date — gradient text fill */}
                    <span
                      className="text-[11px] font-normal min-w-[74px]"
                      style={{
                        background:
                          'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        border: '1px solid #000',
                        padding: '0 4px',
                      }}
                    >
                      {invoice.due_date ? formatDate(invoice.due_date) : '\u2014'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines — 1/3 width, clean list layout (v4) */}
        <div className="glass-card-heavy overflow-hidden relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
              border: '1px solid #000',
              borderRadius: '8px',
              zIndex: 0,
            }}
          />
          <div className="relative z-10">
            {/* Header */}
            <div className="px-4 py-2.5">
              <h2 className="text-[16px] font-normal text-black">
                Upcoming Deadlines
              </h2>
            </div>
            {/* Separator bar */}
            <div
              className="w-full h-[6px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(90,79,207,0.2), rgba(232,237,255,0.15))',
                border: '1px solid #000',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            />
            {/* Deadline items — flex column, 24px gap, no progress bars */}
            <div
              className="flex flex-col items-end px-5 py-4"
              style={{ gap: '24px' }}
            >
              {upcomingDeadlines.length === 0 && (
                <p
                  className="text-[13px] w-full"
                  style={{ color: '#9EA3AC' }}
                >
                  No upcoming deadlines
                </p>
              )}
              {upcomingDeadlines.map((project) => {
                const daysLeft = daysUntil(project.end_date!)
                const client = clientMap.get(project.client_id)
                return (
                  <div
                    key={project.id}
                    className="flex items-start justify-between w-full"
                  >
                    {/* Left: project + client stacked */}
                    <div className="flex flex-col gap-[1px]">
                      <p
                        className="text-[13px] font-normal"
                        style={{
                          color: '#6D717A',
                          border: '1px solid #000',
                          lineHeight: '16px',
                        }}
                      >
                        {project.title}
                      </p>
                      <p
                        className="text-[11px] font-normal"
                        style={{
                          color: '#ABAFB7',
                          border: '1px solid #646668',
                          lineHeight: '13px',
                        }}
                      >
                        {client?.company ?? client?.name ?? 'Unknown'}
                      </p>
                    </div>
                    {/* Right: days count */}
                    <span
                      className="text-[12px] px-1"
                      style={{
                        color: getDaysColor(daysLeft),
                        fontWeight: getDaysFontWeight(daysLeft),
                        border: '1px solid #000',
                        lineHeight: '15px',
                      }}
                    >
                      {daysLeft}d
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed — v3: bold heading, solid dark separator, full-width */}
      <div className="glass-card-heavy overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
            border: '1px solid #000',
            borderRadius: '8px',
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          {/* Header + solid dark separator */}
          <div className="flex flex-col gap-[7px] px-4 pt-1.5">
            <h2
              className="text-[16px]"
              style={{ fontWeight: 700, color: '#50545D' }}
            >
              Activity Feed
            </h2>
            <div
              className="w-full h-[3px]"
              style={{ background: '#49494F' }}
            />
          </div>

          {/* Activity items — static for MVP */}
          <div className="py-2">
            {[
              {
                action: 'Invoice INV-006 sent',
                company: 'Santos Architecture',
                time: '2 hours ago',
              },
              {
                action: 'Payment received for INV-001',
                company: 'Bright Digital Co',
                time: '5 hours ago',
              },
              {
                action: 'New proposal submitted',
                company: 'Velocity Startups',
                time: '1 day ago',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-4 py-2 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col gap-[1px]">
                  <p
                    className="text-[13px]"
                    style={{
                      fontWeight: 400,
                      color: '#000000',
                      lineHeight: '16px',
                    }}
                  >
                    {item.action}
                  </p>
                  <p
                    className="text-[12px]"
                    style={{
                      fontWeight: 300,
                      color: '#646668',
                      lineHeight: '15px',
                    }}
                  >
                    {item.company}
                  </p>
                </div>
                <span
                  className="text-[11px]"
                  style={{ color: '#FFFFFF', lineHeight: '13px' }}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
