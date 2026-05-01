import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{
        background: 'rgba(34,197,94,0.1)',
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '16px',
        padding: '32px 48px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#22c55e',
          marginBottom: '8px'
        }}>
          You're in!
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '4px' }}>
          Logged in as:
        </p>
        <p style={{ color: '#f1f5f9', fontWeight: '600', marginBottom: '24px' }}>
          {user?.email}
        </p>
        <button
          onClick={logout}
          style={{
            padding: '10px 24px',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>
      <p style={{ color: '#475569', fontSize: '13px' }}>
        Day 2 ✅ — Dashboard coming on Day 3
      </p>
    </div>
  )
}