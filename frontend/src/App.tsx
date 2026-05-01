import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '16px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '48px',
            fontWeight: '700'
          }}>
            Clientra
          </div>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>
            AI Freelance Manager — Day 1 ✅
          </p>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px 32px',
            marginTop: '16px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Stack Running</p>
            <p style={{ color: '#22c55e', fontWeight: '600', marginTop: '8px' }}>
              ✓ React + TypeScript + Tailwind + Vite
            </p>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App