import Layout from '../components/Layout'

export default function Settings() {
  return (
    <Layout title="Settings">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{ fontSize: '48px' }}>⚙️</span>
        <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700' }}>
          Settings — Coming Soon
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Week 10 feature — profile, billing & preferences
        </p>
      </div>
    </Layout>
  )
}