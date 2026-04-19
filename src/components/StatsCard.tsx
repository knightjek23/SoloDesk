import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  icon?: LucideIcon
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn("glass-card flex flex-col items-start gap-1 p-3 pb-4 relative", className)}
      style={{
        background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '8px',
        border: 'none',
      }}
    >
      <span className="text-[11px] font-normal text-black">{title}</span>
      <div className="text-xl font-semibold" style={{ color: '#424652' }}>{value}</div>
      {trend && (
        <span className="text-[11px] font-normal" style={{ color: '#5E5E5E' }}>
          {trend.value}
        </span>
      )}
    </div>
  )
}
