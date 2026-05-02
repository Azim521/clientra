import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react'
import { apiGet } from '../lib/api'

interface Summary {
  total_earnings: number
  monthly_earnings: number
  active_clients: number
  total_proposals: number
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary>({
    total_earnings: 0,
    monthly_earnings: 0,
    active_clients: 0,
    total_proposals: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/earnings/summary')
      .then(data => setSummary(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    {
      label: 'Active Clients',
      value: loading ? '...' : summary.active_clients.toString(),
      icon: Users,
      color: '#6366f1',
      bg: 'rgba(99,102,241,0.1)'
    },
    {
      label: 'Proposals Sent',
      value: loading ? '...' : summary.total_proposals.toString(),
      icon: FileText,
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.1)'
    },
    {
      label: 'Revenue This Month',
      value: loading ? '...' : `$${summary.monthly_earnings.toFixed(2)}`,
      icon: DollarSign,
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.1)'
    },
    {
      label: 'Total Earnings',
      value: loading ? '...' : `$${summary.total_earnings.toFixed(2)}`,
      icon: TrendingUp,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.1)'
    },
  ]

  return (
    <Layout title="Dashboard">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#f1f5f9',
          marginBottom: '6px'
        }}>
          Welcome to Clientra 👋
        </h2>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Here's what's happening with your freelance business today.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '4px'
              }}>
                {label}
              </p>
              <p style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#f1f5f9'
              }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}