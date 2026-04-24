'use client'

import Link from 'next/link'
import {
  FileText,
  FileSignature,
  FolderKanban,
  Receipt,
  Clock,
  Calculator,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Proposals',
    description: 'Create professional proposals in minutes. Track status and get client sign-off quickly.',
  },
  {
    icon: FileSignature,
    title: 'Contracts',
    description: 'Manage contracts with built-in templates. Digital signatures and automated tracking.',
  },
  {
    icon: FolderKanban,
    title: 'Projects',
    description: 'Organize all your projects in one place. Kanban boards, timelines, and progress tracking.',
  },
  {
    icon: Receipt,
    title: 'Invoicing',
    description: 'Create and send professional invoices. Track payments and automatically calculate taxes.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Log billable hours, track expenses, and generate monthly billing reports.',
  },
  {
    icon: Calculator,
    title: 'Tax Estimates',
    description: 'Automatic tax calculations and quarterly estimates based on your invoices.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '0',
    description: 'Get started with basic features',
    features: [
      'Up to 5 clients',
      '5 active projects',
      'Basic invoicing',
      'Time tracking',
      'Email support',
    ],
  },
  {
    name: 'Solo',
    price: '29',
    description: 'For independent freelancers',
    features: [
      'Unlimited clients',
      'Unlimited projects',
      'Advanced invoicing',
      'Proposals & contracts',
      'Priority support',
      'Custom branding',
    ],
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '59',
    description: 'For growing freelance businesses',
    features: [
      'Everything in Solo',
      'Client portal access',
      'Team collaboration',
      'Custom integrations',
      'Advanced reporting',
      '24/7 priority support',
    ],
  },
  {
    name: 'Agency',
    price: '99',
    description: 'For agencies and larger teams',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'White-label options',
      'API access',
      'Advanced automation',
      'Dedicated account manager',
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
              href="/dashboard"
              style={{
                color: '#000000',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
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
        {/* Glass stroke bottom border */}
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
              Your Entire Freelance Business, One Tab.
            </h1>
            <p
              style={{
                fontSize: '1.25rem',
                color: '#5E5E5E',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              From proposals and contracts to invoicing and time tracking, SoloDesk brings all your freelance business tools into one beautiful, intuitive platform. Stop switching between apps. Start getting paid faster.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link
                href="/dashboard"
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
                Start Free Trial
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </Link>
              <button
                style={{
                  ...secondaryButton,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#2C313E',
                  cursor: 'pointer',
                }}
              >
                Watch Demo
              </button>
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
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🚀</div>
                <p style={{ color: '#9EA3AC', fontWeight: 500 }}>App Preview</p>
              </div>
            </div>
          </div>
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
              Everything You Need to Run Your Business
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#9EA3AC' }}>
              All the tools freelancers and small agencies actually use, in one place.
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
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#9EA3AC' }}>
              Choose the perfect plan for your business. No hidden fees.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
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
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    ...(plan.highlighted ? primaryButton : secondaryButton),
                    color: plan.highlighted ? '#FFFFFF' : '#2C313E',
                  }}
                >
                  Get Started
                </button>
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
              <p style={{ color: '#ADB1B8' }}>The all-in-one platform for freelancers.</p>
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
                Company
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>About</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Blog</a></li>
                <li><a href="#" style={{ color: '#ADB1B8', textDecoration: 'none' }}>Contact</a></li>
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
