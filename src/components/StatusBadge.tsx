import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = (status: string): { bg: string; color: string; border?: string; fontWeight: number } => {
    switch (status) {
      case 'paid':
        return { bg: '#DBFCE6', color: '#48895F', fontWeight: 400 }
      case 'sent':
        return { bg: '#DAE9FE', color: '#5C77C8', border: '#AAAEB6', fontWeight: 700 }
      case 'overdue':
        return { bg: '#FDE1E2', color: '#B65656', fontWeight: 700 }
      case 'draft':
        return { bg: 'rgba(255,255,255,0.3)', color: '#6E727B', fontWeight: 400 }
      case 'active':
      case 'in_progress':
        return { bg: '#DAE9FE', color: '#5C77C8', border: '#AAAEB6', fontWeight: 400 }
      case 'review':
        return { bg: '#FEF3C7', color: '#92400E', fontWeight: 400 }
      case 'completed':
      case 'accepted':
      case 'signed':
      case 'done':
        return { bg: '#DBFCE6', color: '#48895F', fontWeight: 400 }
      case 'archived':
        return { bg: 'rgba(255,255,255,0.2)', color: '#6E727B', fontWeight: 400 }
      case 'declined':
        return { bg: '#FDE1E2', color: '#B65656', fontWeight: 400 }
      case 'todo':
        return { bg: 'rgba(255,255,255,0.3)', color: '#6E727B', fontWeight: 400 }
      default:
        return { bg: 'rgba(255,255,255,0.3)', color: '#6E727B', fontWeight: 400 }
    }
  }

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const styles = getStyles(status)

  return (
    <span
      className={cn("inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs", className)}
      style={{
        background: styles.bg,
        color: styles.color,
        fontWeight: styles.fontWeight,
        fontSize: '12px',
        lineHeight: '15px',
        border: styles.border ? `1px solid ${styles.border}` : 'none',
      }}
    >
      {formatStatus(status)}
    </span>
  )
}
