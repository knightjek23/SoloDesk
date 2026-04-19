# SoloDesk Design System

> "Blassalism" — Glass-forward, neo-brutalist depth, clean typography.

---

## Foundations

### Typography
| Token | Value | Usage |
|-------|-------|-------|
| Font Family | `Inter`, system-ui fallback | All UI text |
| Body | 12px / 15px, weight 400 | Buttons, labels, table cells |
| Stats Value | 20px, weight 600 | Dashboard stat numbers |
| Small Label | 11px, weight 400 | Stat titles, trend labels |

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--blass-base` | `#FFFFFF` | Page background |
| `--blass-wave` | `rgba(90, 79, 207, 0.4)` | Purple accent wave |
| `--blass-surface` | `rgba(232, 237, 255, 0.3)` | Subtle surface tint |
| `--blass-accent` | `#2462EB` | Primary action blue |
| `--text-primary` | `#000000` | Headings, button labels |
| `--text-value` | `#424652` | Stat values, emphasis text |
| `--text-body` | `#6E727B` | Body text |
| `--text-secondary` | `#5E5E5E` | Secondary info |
| `--text-muted` | `#ADB1B8` | Placeholder, disabled |
| `--border-color` | `#000000` | Primary borders |
| `--border-subtle` | `#646668` | Secondary borders |

### Glass Effect
```css
background: linear-gradient(116.79deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 99.45%);
backdrop-filter: blur(10px);
```
Used via: `var(--glass-light)` + `var(--glass-blur)`

### Border Radius
| Size | Value | Usage |
|------|-------|-------|
| Small | `4px` | Buttons, dropdowns, inputs |
| Medium | `8px` | Cards, modals |

---

## Utility Classes

### `.blass-btn` — Depth Button (Static)
Glass background with neo-brutalist depth border (`1px 4px 4px 1px`).
- **Hover:** border softens to `1px 2px 2px 1px`, slight translate
- **Active:** border flattens to `1px`, full translate

### `.blass-btn-selected` — Selected/Active State
Solid muted background (`rgba(245,245,245,0.6)`), flat `1px` border.
Used when a dropdown is open or a toggle is active.

### `.blass-btn-flat` — Flat Glass Button
Glass background with uniform `1px` border. No depth effect.
Used for secondary actions or dropdown menus.

### `.glass-card` — Glass Surface
Glass background, `8px` radius, no border. For stat cards and content areas.

### `.glass-card-heavy` — Heavy Glass Card
Glass background with thick depth border (`1px 10px 10px 1px`), `8px` radius.

---

## Components

### ActionDropdown
**File:** `src/components/ActionDropdown.tsx`
**Figma source:** Component 1

Dashboard quick-action dropdown (e.g., "New Invoice", "New Proposal").

| State | Class | Visual |
|-------|-------|--------|
| Static | `.blass-btn` | Glass bg, depth border, chevron down |
| Hover | `.blass-btn:hover` | Border softens, slight shift |
| Open | `.blass-btn-selected` | Solid muted bg, chevron rotates 180° |

**Props:**
- `label: string` — Button text
- `options: { label: string; onClick: () => void }[]` — Dropdown items
- `className?: string` — Additional styling

**Usage:**
```tsx
<ActionDropdown
  label="New Invoice"
  options={[
    { label: 'Blank Invoice', onClick: () => {} },
    { label: 'From Template', onClick: () => {} },
  ]}
/>
```

### StatsCard
**File:** `src/components/StatsCard.tsx`

Glass surface card for dashboard KPI numbers.

### StatusBadge
**File:** `src/components/StatusBadge.tsx`

Color-coded badge for invoice/task status (Paid, Sent, Overdue).

### EmptyState
**File:** `src/components/EmptyState.tsx`

Placeholder for sections with no data.

### Sidebar
**File:** `src/components/Sidebar.tsx`

Main navigation sidebar.

---

## Adding New Components

When adding Figma CSS for a new component:
1. Extract tokens → check if they already exist in `globals.css`
2. If new, add as CSS custom properties in `:root`
3. If a reusable pattern, create a utility class (`.blass-*`)
4. Build the React component referencing tokens/classes
5. Document it in this file
