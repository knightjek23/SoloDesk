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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            SoloDesk
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link href="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Entire Freelance Business, One Tab.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From proposals and contracts to invoicing and time tracking, SoloDesk brings all your freelance business tools into one beautiful, intuitive platform. Stop switching between apps. Start getting paid faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-bold hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-gray-600 font-medium">App Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Run Your Business</h2>
            <p className="text-xl text-gray-600">All the tools freelancers and small agencies actually use, in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border-2 p-8 transition-all ${
                  plan.highlighted
                    ? 'border-blue-600 bg-blue-50 shadow-xl transform scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  {plan.price !== '0' && <span className="text-gray-600">/month</span>}
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-bold mb-6 transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-green-600 font-bold">✓</span>
                      </div>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                SoloDesk
              </div>
              <p className="text-gray-400">The all-in-one platform for freelancers.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SoloDesk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
