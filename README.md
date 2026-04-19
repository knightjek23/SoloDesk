# SoloDesk - Freelancer Business Suite

**The all-in-one platform for freelancers and small agencies to manage proposals, contracts, projects, invoicing, time tracking, and more.**

SoloDesk brings all your freelance business tools into one beautiful, intuitive interface. Stop switching between apps. Start getting paid faster.

## Features

- **Proposals** - Create and send professional proposals in minutes
- **Contracts** - Manage contracts with templates and digital signatures
- **Projects** - Kanban boards, timelines, and progress tracking
- **Invoicing** - Professional invoices with automatic payment tracking
- **Time Tracking** - Log billable hours and track expenses
- **Tax Estimates** - Automatic quarterly tax calculations
- **Client Management** - Centralized client information and history
- **Messaging** - Built-in client communication
- **Reporting** - Monthly revenue summaries and business analytics

## Tech Stack

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Email**: Resend
- **Authentication**: NextAuth.js
- **UI Components**: Lucide Icons, shadcn/ui compatible

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (https://supabase.com)
- Stripe account (https://stripe.com)
- Resend account (https://resend.com)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd SoloDesk
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Then fill in your credentials in `.env.local`:
- **Supabase**: Get your project URL and anon key from the Supabase dashboard
- **Stripe**: Get your API keys from the Stripe dashboard
- **Resend**: Get your API key from the Resend dashboard
- **NextAuth**: Generate a secret with `openssl rand -base64 32`

4. Set up Supabase database
```bash
# Create a new Supabase project
# Go to SQL editor in Supabase dashboard
# Run the migration from supabase/migrations/001_initial.sql
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   └── dashboard/         # Dashboard routes
│       ├── page.tsx       # Dashboard home
│       ├── clients/       # Client management
│       ├── projects/      # Project Kanban board
│       ├── invoices/      # Invoice management
│       ├── proposals/     # Proposal templates
│       ├── contracts/     # Contract management
│       ├── time-tracker/  # Time logging
│       ├── messages/      # Client messaging
│       └── settings/      # Account settings
├── components/            # Reusable React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── StatsCard.tsx      # Dashboard stat cards
│   ├── StatusBadge.tsx    # Status indicator badges
│   └── EmptyState.tsx     # Empty state UI
├── lib/
│   ├── utils.ts           # Utility functions
│   └── mock-data.ts       # Mock data for development
└── types/
    └── index.ts           # TypeScript type definitions

supabase/
└── migrations/
    └── 001_initial.sql    # Database schema

public/                     # Static assets
```

## Database Schema

Key tables:
- **users** - User accounts and profiles
- **clients** - Client information
- **projects** - Project details and status
- **tasks** - Project tasks and to-do items
- **invoices** - Invoices and billing
- **proposals** - Project proposals
- **contracts** - Client contracts
- **time_entries** - Billable time logs
- **expenses** - Project expenses
- **messages** - Client communication

All tables include RLS (Row Level Security) policies to ensure data isolation per user.

## Pricing Tiers

- **Free**: Up to 5 clients, 5 projects, basic invoicing
- **Solo** ($29/mo): Unlimited clients/projects, proposals, contracts, priority support
- **Pro** ($59/mo): Client portal, team collaboration, custom integrations, advanced reporting
- **Agency** ($99/mo): Unlimited team members, white-label, API access, dedicated support

## API Integration Guide

### Stripe Integration

To accept payments, configure Stripe webhooks:

1. Get your webhook signing secret from Stripe Dashboard
2. Set up endpoint to receive payment events
3. Handle `payment_intent.succeeded` events to update invoice status

### Resend Email Integration

SoloDesk uses Resend for transactional emails:

- Invoice sent notifications
- Payment confirmations
- Proposal status updates
- Client messages

### Supabase Setup

1. Enable authentication (Email/Password or OAuth)
2. Run migrations to create tables
3. Configure RLS policies for multi-tenant security
4. Set up real-time subscriptions for live updates

## Development Workflow

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Roadmap

### v1.0 (Current)
- Core invoicing and project management
- Time tracking and expense logs
- Client management
- Basic reporting

### v2.0 (Planned)
- Client portal with project visibility
- Automated payment reminders
- Advanced analytics and dashboards
- Calendar integrations
- Invoice templates and customization

### v3.0 (Roadmap)
- Mobile app (iOS/Android)
- Team collaboration features
- Automated workflows and automations
- Advanced tax reporting
- Multi-currency support
- API and Zapier integration

## Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

- All data encrypted in transit (HTTPS)
- RLS policies enforce row-level security
- Sensitive API keys stored as environment variables
- NextAuth.js for secure session management
- Regular security audits

## Support

For support, email support@solodesk.com or visit our website.

## License

MIT License - see LICENSE file for details

## Authors

Built with care for freelancers and small agencies.

---

**Ready to streamline your freelance business? Get started free at solodesk.com**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
