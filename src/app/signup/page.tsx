import Link from 'next/link'
import { signup } from '../login/actions'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <span
            className="text-[28px] text-black"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, letterSpacing: '0.02em' }}
          >
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
          <p className="text-sm text-gray-600 mb-6">Start streamlining your freelance business.</p>

          {error && (
            <div className="mb-4 px-3 py-2 text-sm rounded bg-red-50 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          <form action={signup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                minLength={8}
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
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
              Create account
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
