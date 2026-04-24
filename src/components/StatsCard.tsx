import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  trend?: { value: string; positive: boolean }
  className?: string
}

export function StatsCard({ title, value, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-1 rounded-lg w-[282px] h-[86px]',
        'px-6 pt-3 pb-4',
        className
      )}
      style={{
        background:
          'linear-gradient(116.79deg, rgba(255, 255, 255, 0.64) 0%, rgba(176, 173, 170, 0.8) 99.45%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <span className="text-[11px] font-normal text-black">{title}</span>
      <div className="text-xl font-semibold" style={{ color: '#424652' }}>
        {value}
      </div>
      {trend && (
        <span className="text-[11px] font-normal" style={{ color: '#5E5E5E' }}>
          {trend.value}
        </span>
      )}
    </div>
  )
}
