import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Settings,
  Zap
} from 'lucide-react'

import { Target } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: FileText, label: 'Proposals', path: '/proposals' },
  { icon: Target, label: 'Cold Outreach', path: '/outreach' },
  { icon: DollarSign, label: 'Finance', path: '/finance' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0d1117',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '40px',
        paddingLeft: '8px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Zap size={16} color="white" />
        </div>
        <span style={{
          fontSize: '18px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Clientra
        </span>
      </div>

      {/* Nav Items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: isActive ? '#6366f1' : '#64748b',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                textAlign: 'left',
                transition: 'all 0.2s',
                width: '100%'
              }}
              onMouseOver={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  e.currentTarget.style.color = '#94a3b8'
                }
              }}
              onMouseOut={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#64748b'
                }
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}