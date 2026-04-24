'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Users,
  FolderKanban,
  FileText,
  FileSignature,
  Receipt,
  Clock,
  MessageSquare,
  Settings,
  Plus,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signout } from '@/app/login/actions'

const navItems = [
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
    <div
      className="w-[219px] h-screen flex flex-col fixed left-0 top-0 z-50"
      style={{
        background: 'rgba(232, 216, 176, 0.5)',
        boxShadow: '2px 13px 16.9px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Glassmorphic top stroke */}
      <div className="glass-stroke w-full" />

      {/* Brand — Playfair Display */}
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="text-2xl text-black"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          SoloDesk
        </span>
      </div>

      {/* Dashboard button (active state — white glass bg) */}
      <div className="px-4 mb-1">
        <Link
          href="/dashboard"
          className={cn(
            'w-full h-[40px] rounded flex items-center px-2',
            pathname === '/dashboard'
              ? 'bg-white/75'
              : 'hover:bg-white/40 transition-colors'
          )}
        >
          <span className="text-black text-xs font-normal">Dashboard</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-center py-2 px-2 text-xs transition-colors rounded',
                isActive
                  ? 'text-black font-bold bg-white/40'
                  : 'text-black font-normal hover:bg-white/30'
              )}
            >
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom glassmorphic stroke */}
      <div className="glass-stroke w-full" />

      {/* Footer Actions */}
      <div className="px-[9px] py-2 space-y-2">
        <button
          className="w-[201px] h-[20px] flex items-center justify-center gap-1.5 text-white text-xs font-normal"
          style={{
            background: 'rgba(36, 98, 235, 0.6)',
            borderWidth: '1px 3px 3px 1px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: '4px',
          }}
        >
          <Plus className="w-[9px] h-[8px]" />
          <span>New Invoice</span>
        </button>
        <form action={signout}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 py-1 text-black/60 text-[10px] font-normal hover:text-black transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </div>
  )
}
