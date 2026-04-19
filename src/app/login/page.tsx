import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; next?: string }>
}) {
  const { error, message, next } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Briefcase className="w-6 h-6 text-black" />
          <span className="text-2xl text-black" style={{ fontWeight: 200, letterSpacing: '0.02em' }}>
            SoloDesk
          </span>
        </div>

        <div
          className="bg-white p-8"
          style={{
            borderWidth: '1px 4px 4px 1px',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: '8px',
          }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-600 mb-6">Log in to your SoloDesk dashboard.</p>

          {message && (
            <div className="mb-4 px-3 py-2 text-sm rounded bg-green-50 text-green-800 border border-green-200">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          <form action={login} className="space-y-4">
            <input type="hidden" name="next" value={next ?? '/dashboard'} />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white text-sm font-medium"
              style={{
                background: '#2462EB',
                borderWidth: '1px 3px 3px 1px',
                borderStyle: 'solid',
                borderColor: '#000',
                borderRadius: '4px',
              }}
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
