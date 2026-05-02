import Sidebar from './Sidebar'
import Topbar from './Topbar'

interface LayoutProps {
  children: React.ReactNode
  title: string
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0f1117'
    }}>
      <Sidebar />

      {/* Main content area */}
      <div style={{
        marginLeft: '240px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Topbar title={title} />

        {/* Page content */}
        <main style={{
          marginTop: '64px',
          padding: '32px 28px',
          flex: 1
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}