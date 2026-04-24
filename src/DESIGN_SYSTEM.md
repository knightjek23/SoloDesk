# SoloDesk Design System — Blassalism v4

> Warm gold sidebar, cool blue content, glassmorphism everywhere, serif headings.

---

## Foundations

### Typography
| Token | Value | Usage |
|-------|-------|-------|
| `--font-heading` | `Playfair Display`, Georgia, serif | Wordmark, page headings, greeting |
| `--font-body` | `Inter`, system-ui | Everything else |
| Wordmark | Playfair 24px, weight 400, `letter-spacing: 0.02em` | Sidebar brand |
| Page greeting | Playfair 25px, weight 400, color `#2C313E` | "Good morning, Josh" |
| Date subtitle | Inter 13px, weight 400, color `#9EA3AC` | Below greeting |
| Nav items | Inter 12px, weight 400, color `#000000` | Sidebar links |
| Section title | Inter 16-17px, weight 400, color `#50545D` | "Recent Invoices", "Activity Feed" |
| Stat label | Inter 11px, weight 400, color `#000000` | Card titles |
| Stat value | Inter 20px, weight 600, color `#424652` | Card numbers |
| Stat trend | Inter 11px, weight 400, color `#5E5E5E` | "+1 this month" |
| Table text | Inter 10-12px, weight 300-400 | Invoice rows, deadlines |

### Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `--blass-base` | `#FFFFFF` | Page background |
| `--blass-nav` | `rgba(232, 216, 176, 0.5)` | Sidebar + wave overlay (warm gold) |
| `--blass-surface` | `rgba(232, 237, 255, 0.3)` | Main content area (cool blue) |
| `--blass-accent` | `#2462EB` | Primary action blue |
| `--blass-accent-60` | `rgba(36, 98, 235, 0.6)` | "New Invoice" button bg |
| `--text-heading` | `#2C313E` | Playfair headings |
| `--text-primary` | `#000000` | Nav labels, bold text |
| `--text-value` | `#424652` | Stat numbers |
| `--text-body` | `#6E727B` | Deadline project names |
| `--text-secondary` | `#5E5E5E` | Trend labels |
| `--text-date` | `#9EA3AC` | Date subtitles |
| `--text-muted` | `#ADB1B8` | Client names in deadlines |
| `--text-activity-company` | `#646668` | Activity feed company names |
| `--text-white` | `#FFFFFF` | Timestamps in activity feed |
| `--deadline-urgent` | `#E35555` | ≤20 days remaining |
| `--deadline-warning` | `#E19443` | 21-40 days remaining |
| `--deadline-safe` | `#53BA77` | 40+ days remaining |

### Glass Effects
| Token | Value | Usage |
|-------|-------|-------|
| `--glass-light` | `linear-gradient(116.79deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 99.45%)` | Panel backgrounds, tables |
| `--glass-card` | `linear-gradient(116.79deg, rgba(255,255,255,0.64) 0%, rgba(176,173,170,0.8) 99.45%)` | Stats cards (heavier) |
| `--glass-stroke` | `linear-gradient(108.74deg, rgba(232,216,176,0.6) 2.88%, rgba(0,0,0,0.54) 36.46%, rgba(0,0,0,0.6) 73.96%, rgba(232,216,176,0.6) 100%)` | Divider lines |
| `--glass-blur` | `blur(10px)` | Cards, panels |
| `--glass-blur-heavy` | `blur(30px)` | Background wave |
| `--glass-blur-max` | `blur(75px)` | Full-page overlay |

### Badge Colors
| Status | Background | Text | Border |
|--------|-----------|------|--------|
| Paid | `#DBFCE6` | `#48895F` | — |
| Sent | `#DAE9FE` | `#5C77C8` | `#AAAEB6` |
| Overdue | `#FDE1E2` | `#B65656` | — |

### Border Radius
| Size | Value | Usage |
|------|-------|-------|
| Small | `4px` | Buttons, inputs, nav items |
| Medium | `8px` | Cards, panels |

---

## Layout

### Sidebar (219px fixed)
- Background: `--blass-nav` (warm gold, 50% opacity)
- Drop shadow: `2px 13px 16.9px 8px rgba(0, 0, 0, 0.2)`
- Top/bottom dividers: `.glass-stroke` (2px gradient)
- Active nav item: `bg-white/75`, `border-radius: 4px`
- "New Invoice" button: `--blass-accent-60` bg, neo-brutalist border `1px 3px 3px 1px`

### Content Area
- Background: `--blass-surface` (cool blue, 30% opacity)
- Padding: `36px left`, `32px top`
- Wave overlay behind everything: `--blass-nav` + `blur(30px)`

### Stats Cards
- 282×86px, `--glass-card` gradient, `blur(10px)`, `border-radius: 8px`
- No border (glassmorphism only)

### Glass Panels (tables, sections)
- `--glass-light` gradient, `border-radius: 8px`
- Section dividers: `.glass-stroke` (2px gradient)
- Section titles: Inter 16-17px, weight 400

---

## Utility Classes

### `.glass-card` — Light Glass Surface
`--glass-light` + `blur(10px)`, `8px` radius. For tables and content panels.

### `.glass-card-heavy` — Heavy Glass + Depth Border
Glass + thick neo-brutalist border (`1px 10px 10px 1px`).

### `.glass-stroke` — Gradient Divider
2px height, `--glass-stroke` gradient. Used between sidebar sections and inside panels.

### `.blass-btn` — Neo-Brutalist Button
Glass bg, depth border (`1px 4px 4px 1px`), hover softens, active flattens.

### `.blass-btn-flat` — Flat Glass Button
Glass bg, uniform `1px` border. Secondary actions.

---

## Components

### Sidebar (`src/components/Sidebar.tsx`)
Warm gold sidebar with Playfair wordmark, glassmorphic strokes, drop shadow.

### StatsCard (`src/components/StatsCard.tsx`)
Glass card with heavier gradient. Props: `title`, `value`, `trend?`, `className?`.

### StatusBadge (`src/components/StatusBadge.tsx`)
Color-coded pill badge for Paid/Sent/Overdue/Draft statuses.

### ActionDropdown (`src/components/ActionDropdown.tsx`)
Quick-action dropdown (New Invoice, New Proposal, New Contract).

### EmptyState (`src/components/EmptyState.tsx`)
Placeholder for sections with no data.

---

## Adding New Components

1. Extract tokens from Figma CSS → check if they exist in `globals.css`
2. If new, add as CSS custom properties in `:root`
3. Use `--font-heading` (Playfair) for any section heading or page title
4. Use `--glass-light` for panel backgrounds, `--glass-card` for stat cards
5. Use `.glass-stroke` for horizontal dividers inside panels
6. Keep neo-brutalist borders (`1px Npx Npx 1px`) only for primary action buttons
7. Document the component in this file
