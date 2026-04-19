'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionDropdownProps {
  label: string
  options: { label: string; onClick: () => void }[]
  className?: string
}

/**
 * ActionDropdown — Glass-style dropdown button for dashboard quick actions.
 *
 * Maps to Figma "Component 1" with three states:
 *   Static  → .blass-btn (glass bg + depth border 1px 4px 4px 1px)
 *   Hover   → .blass-btn:hover (border softens, slight translate)
 *   Open    → solid muted bg rgba(245,245,245,0.6), uniform 1px border
 *
 * Used above "Recent Invoices" and "Deadlines" for actions like
 * "New Invoice", "New Proposal", etc.
 */
export function ActionDropdown({ label, options, className }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          // Base styles (shared across all states)
          'flex items-center justify-between w-full h-[38px] px-4',
          'text-xs leading-[15px] font-normal text-[var(--text-primary)]',
          'rounded cursor-pointer',
          // State: closed → use existing .blass-btn class (glass + depth border)
          !isOpen && 'blass-btn',
          // State: open → solid muted bg, flat border
          isOpen && 'blass-btn-selected',
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            'w-[10px] h-[6px] transition-transform duration-150',
            isOpen && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-10 blass-btn-flat rounded py-1">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                option.onClick()
                setIsOpen(false)
              }}
              className={cn(
                'w-full text-left px-4 py-2',
                'text-xs leading-[15px] font-normal text-[var(--text-primary)]',
                'hover:bg-[rgba(245,245,245,0.6)]',
                'transition-colors duration-100',
                'cursor-pointer',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
