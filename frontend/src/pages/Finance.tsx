import Layout from '../components/Layout'

export default function Finance() {
  return (
    <Layout title="Finance">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{ fontSize: '48px' }}>💰</span>
        <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700' }}>
          Finance — Coming Soon
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Week 7 feature — earnings, invoices & forecasting
        </p>
      </div>
    </Layout>
  )
}