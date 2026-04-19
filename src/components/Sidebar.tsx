'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  FileSignature,
  Receipt,
  Clock,
  MessageSquare,
  Settings,
  Plus,
  Briefcase,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signout } from '@/app/login/actions'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clients', href: '/dashboard/clients', icon: Users },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Invoices', href: '/dashboard/invoices', icon: Receipt },
  { label: 'Proposals', href: '/dashboard/proposals', icon: FileText },
  { label: 'Contracts', href: '/dashboard/contracts', icon: FileSignature },
  { label: 'Time Tracker', href: '/dashboard/time-tracker', icon: Clock },
  { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-[219px] h-screen flex flex-col fixed left-0 top-0 z-50 bg-transparent">
      {/* Top separator image strip */}
      <div
        className="w-full h-[6px]"
        style={{ background: 'linear-gradient(90deg, rgba(175,167,255,0.3), rgba(215,222,255,0.2))' }}
      />

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <Briefcase className="w-4 h-4 text-black/50" />
        <span
          className="text-xl text-black tracking-wide"
          style={{ fontWeight: 200, letterSpacing: '0.02em' }}
        >
          SoloDesk
        </span>
      </div>

      {/* Dashboard button (active state with neo-brutalist border) */}
      <div className="px-2.5 mb-4">
        <div
          className="w-full h-[30px] rounded flex items-center px-3"
          style={{
            borderWidth: '1px 4px 4px 1px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: '4px',
            background: 'transparent',
          }}
        >
          <span className="text-black text-xs font-normal">Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-0 space-y-0.5 overflow-y-auto">
        {navItems.filter(item => item.href !== '/dashboard').map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-5 py-2 text-xs transition-colors relative',
                isActive
                  ? 'text-black font-bold'
                  : 'text-black font-normal hover:text-black/70'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom separator */}
      <div
        className="w-full h-[6px]"
        style={{ background: 'linear-gradient(90deg, rgba(175,167,255,0.3), rgba(215,222,255,0.2))' }}
      />

      {/* Footer Action */}
      <div className="px-2.5 py-3 space-y-2">
        <button
          className="w-full flex items-center justify-center gap-1.5 py-2 text-white text-xs font-normal"
          style={{
            background: '#2462EB',
            borderWidth: '1px 3px 3px 1px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: '4px',
          }}
        >
          <Plus className="w-3 h-3" />
          <span>New Invoice</span>
        </button>
        <form action={signout}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-black/70 text-xs font-normal hover:text-black transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </div>
  )
}
