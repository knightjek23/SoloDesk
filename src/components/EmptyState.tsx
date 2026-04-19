import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Icon className="w-8 h-8 text-black/40" />
      </div>
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-xs max-w-sm mb-6" style={{ color: '#5E5E5E' }}>{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-white text-xs font-normal"
          style={{
            background: '#2462EB',
            borderWidth: '1px 3px 3px 1px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: '4px',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
