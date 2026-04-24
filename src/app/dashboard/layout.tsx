import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen relative" style={{ background: '#FFFFFF' }}>
      {/* Background wave overlay — warm gold wash with heavy blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'rgba(232, 216, 176, 0.5)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      />
      <Sidebar />
      <main
        className="flex-1 overflow-auto ml-[219px] relative z-10"
        style={{
          background: 'rgba(232, 237, 255, 0.3)',
        }}
      >
        {children}
      </main>
    </div>
  )
}
