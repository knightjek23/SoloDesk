'use client'

import Link from 'next/link'
import {
  Palette,
  Music,
  Camera,
  FolderKanban,
  Receipt,
  Clock,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: FolderKanban,
    title: 'Project Tracking',
    description: 'Kanban boards built for creative workflows. Track album artwork, video edits, photo shoots, and web builds from brief to delivery.',
  },
  {
    icon: Receipt,
    title: 'Invoicing',
    description: 'Send professional invoices in seconds. Track who\'s paid, who\'s overdue, and stop chasing payments manually.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Log billable hours per project. Know exactly how much that "quick revision" actually cost you.',
  },
  {
    icon: Palette,
    title: 'Client Management',
    description: 'One place for every client — contact info, project history, invoices, and notes. No more digging through email threads.',
  },
  {
    icon: Camera,
    title: 'Built for Visual Work',
    description: 'Designed for photographers, videographers, and designers who think in deliverables, not spreadsheets.',
  },
  {
    icon: Music,
    title: 'Made for Music',
    description: 'Track beats sold, sessions booked, and mixing gigs delivered. Finally, a business tool that gets how producers work.',
  },
]

const creativeTypes = [
  { label: 'Web Designers', icon: '🎨' },
  { label: 'Visual Artists', icon: '🖼️' },
  { label: 'Music Producers', icon: '🎹' },
  { label: 'DJs', icon: '🎧' },
  { label: 'Photographers', icon: '📸' },
  { label: 'Videographers', icon: '🎬' },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Try it out, no strings attached',
    features: [
      'Up to 5 clients',
      '5 active projects',
      'Basic invoicing',
      'Time tracking',
      'Email support',
    ],
  },
  {
    name: 'Creative',
    price: '19',
    description: 'For working creatives with active clients',
    features: [
      'Unlimited clients',
      'Unlimited projects',
      'Full invoicing + payment tracking',
      'Time tracking with hourly rates',
      'Business health dashboard',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Studio',
    price: '39',
    description: 'For studios and creative businesses scaling up',
    features: [
      'Everything in Creative',
      'Client portal access',
      'Team collaboration',
      'Custom branding',
      'Advanced reporting',
      'API access',
    ],
  },
]

const glassCard = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
}

const glassCardHighlighted = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.64) 0%, rgba(176, 173, 170, 0.8) 99.45%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '8px',
}

const navGlassStroke = {
  background: 'linear-gradient(108.74deg, rgba(232, 216, 176, 0.6) 2.88%, rgba(0, 0, 0, 0.54) 36.46%, rgba(0, 0, 0, 0.6) 73.96%, rgba(232, 216, 176, 0.6) 100%)',
  height: '1px',
}

const primaryButton: React.CSSProperties = {
  borderWidth: '1px 3px 3px 1px',
  borderStyle: 'solid',
  borderColor: '#000000',
  backgroundColor: '#2462EB',
  color: '#FFFFFF',
  borderRadius: '8px',
}

const secondaryButton: React.CSSProperties = {
  background: 'linear-gradient(116.79deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 99.45%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid #000000',
  borderRadius: '8px',
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(232, 216, 176, 0.5)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: '#000000',
            }}
          >
            SoloDesk
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/login"
              style={{
                color: '#000000',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              style={{
                ...primaryButton,
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1.5rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
        <div style={navGlassStroke} />
      </nav>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '5rem 1.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2462EB',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Built for creatives, by a creative
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                fontWeight: 700,
                color: '#2C313E',
                marginBottom: '1.5rem',
                lineHeight: 1.1,
              }}
            >
              Run Your Creative Business From One Place.
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: '#5E5E5E',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              You spend 10+ hours a week on admin instead of creating. SoloDesk handles your clients, projects, invoices, and time tracking so you can focus on the work that matters. No setup consultants. No bloated enterprise tools. Just what creatives actually need.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                href="/signup"
                style={{
                  ...primaryButton,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '1rem',
                }}
              >
                Start Free — No Card Needed
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                ...glassCard,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
              }}
            >
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  {creativeTypes.map((type) => (
                    <span
                      key={type.label}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.6)',
                        fontSize: '0.875rem',
                        color: '#2C313E',
                        fontWeight: 500,
                      }}
                    >
                      {type.icon} {type.label}
                    </span>
                  ))}
                </div>
                <p style={{ color: '#9EA3AC', fontWeight: 500 }}>
                  One dashboard for every creative discipline
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section
        style={{
          backgroundColor: 'rgba(232, 216, 176, 0.15)',
          padding: '2rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '3rem',
          }}
        >
          {[
            { stat: '85%', label: 'of freelancers deal with late payments' },
            { stat: '10+ hrs', label: 'per week lost to admin work' },
            { stat: '$26K', label: 'lost yearly to untracked time' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: '#2462EB' }}>
                {item.stat}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#5E5E5E', maxWidth: '16rem' }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          backgroundColor: 'rgba(232, 237, 255, 0.3)',
          padding: '5rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#2C313E',
                marginBottom: '1rem',
              }}
            >
              Your Creative Workflow, Simplified
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#9EA3AC' }}>
              Stop juggling five apps. Everything you need from brief to invoice, in one tab.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '2rem',
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  style={{
                    ...glassCard,
                    padding: '2rem',
                    transition: 'box-shadow 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      background: 'rgba(36, 98, 235, 0.1)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Icon style={{ width: '1.5rem', height: '1.5rem', color: '#2462EB' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#2C313E',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#5E5E5E', lineHeight: 1.6 }}>{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '5rem 0' }}>
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#2C313E',
                marginBottom: '1rem',
              }}
            >
              Pricing That Respects Your Hustle
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#9EA3AC' }}>
              No 89% price hikes. No hidden fees. No client caps on the plan that matters.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: '2rem',
            }}
          >
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  ...(plan.highlighted ? glassCardHighlighted : glassCard),
                  padding: '2rem',
                  transition: 'all 0.2s ease',
                  transform: plan.highlighted ? 'scale(1.05)' : undefined,
                  boxShadow: plan.highlighted ? '0 20px 40px rgba(0, 0, 0, 0.1)' : undefined,
                }}
              >
                {plan.highlighted && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        ...primaryButton,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '9999px',
                      }}
                    >
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#2C313E',
                    marginBottom: '0.5rem',
                  }}
                >
                  {plan.name}
                </h3>
                <p style={{ color: '#9EA3AC', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {plan.description}
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: '#2C313E',
                    }}
                  >
                    ${plan.price}
                  </span>
                  {plan.price !== '0' && (
                    <span style={{ color: '#9EA3AC' }}>/month</span>
                  )}
                </div>
                <Link
                  href="/signup"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    ...(plan.highlighted ? primaryButton : secondaryButton),
                    color: plan.highlighted ? '#FFFFFF' : '#2C313E',
                  }}
                >
                  Get Started
                </Link>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#5E5E5E',
                      }}
                    >
                      <span
                        style={{
                          width: '1rem',
                          height: '1rem',
                          borderRadius: '9999px',
                          background: 'rgba(36, 98, 235, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '0.625rem',
                          color: '#2462EB',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a1a1a',
          color: '#FFFFFF',
          padding: '3rem 0',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  marginBottom: '1rem',
                }}
              >
                SoloDesk
              </div>
              <p style={{ color: '#ADB1B8' }}>The business dashboard for independent creatives.</p>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Product
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Features</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Pricing</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Security</a></li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                For Creatives
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Designers</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Photographers</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Music Producers</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Videographers</a></li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                Legal
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Privacy</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Terms</a></li>
              </ul>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid #333333',
              paddingTop: '2rem',
              textAlign: 'center',
              color: '#ADB1B8',
            }}
          >
            <p>&copy; 2026 SoloDesk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
