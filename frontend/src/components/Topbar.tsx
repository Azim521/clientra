import { useAuth } from '../context/AuthContext'
import { LogOut, Bell } from 'lucide-react'

export default function Topbar({ title }: { title: string }) {
  const { user, logout } = useAuth()

  return (
    <header style={{
      height: '64px',
      background: '#0d1117',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'fixed',
      top: 0,
      left: '240px',
      right: 0,
      zIndex: 10
    }}>
      {/* Page Title */}
      <h1 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#f1f5f9'
      }}>
        {title}
      </h1>

      {/* Right side */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Bell */}
        <button style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#64748b',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Bell size={20} />
        </button>

        {/* Avatar + email */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: '700',
            color: 'white'
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <span style={{
            fontSize: '13px',
            color: '#94a3b8',
            maxWidth: '160px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {user?.email}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            background: 'transparent',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            fontSize: '13px',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = '#ef4444'
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = '#64748b'
            e.currentTarget.style.borderColor = '#1e293b'
          }}
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  )
}