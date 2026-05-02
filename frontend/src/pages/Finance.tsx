import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { apiGet, apiPost, apiDelete } from '../lib/api'
import { Plus, Trash2, X, DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface Earning {
  id: string
  amount: number
  currency: string
  description: string
  date: string
  client_id: string | null
}

interface Client {
  id: string
  name: string
}

interface Summary {
  total_earnings: number
  monthly_earnings: number
  active_clients: number
  total_proposals: number
}

export default function Finance() {
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [summary, setSummary] = useState<Summary>({
    total_earnings: 0,
    monthly_earnings: 0,
    active_clients: 0,
    total_proposals: 0
  })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    amount: '',
    currency: 'USD',
    description: '',
    date: new Date().toISOString().split('T')[0],
    client_id: ''
  })

  const fetchData = async () => {
    try {
      const [e, c, s] = await Promise.all([
        apiGet('/earnings/'),
        apiGet('/clients/'),
        apiGet('/earnings/summary')
      ])
      setEarnings(e)
      setClients(c)
      setSummary(s)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async () => {
    if (!form.amount) return
    try {
      await apiPost('/earnings/', {
        amount: parseFloat(form.amount),
        currency: form.currency,
        description: form.description,
        date: form.date,
        client_id: form.client_id || null
      })
      setShowModal(false)
      setForm({
        amount: '',
        currency: 'USD',
        description: '',
        date: new Date().toISOString().split('T')[0],
        client_id: ''
      })
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this earning?')) return
    await apiDelete(`/earnings/${id}`)
    fetchData()
  }

  const getClientName = (id: string | null) => {
    if (!id) return null
    return clients.find(c => c.id === id)?.name || null
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: '#0f1117',
    border: '1px solid #334155',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none'
  }

  return (
    <Layout title="Finance">
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {[
          {
            label: 'Total Earnings',
            value: `$${summary.total_earnings.toFixed(2)}`,
            icon: DollarSign,
            color: '#22c55e',
            bg: 'rgba(34,197,94,0.1)'
          },
          {
            label: 'This Month',
            value: `$${summary.monthly_earnings.toFixed(2)}`,
            icon: Calendar,
            color: '#6366f1',
            bg: 'rgba(99,102,241,0.1)'
          },
          {
            label: 'Total Transactions',
            value: earnings.length.toString(),
            icon: TrendingUp,
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.1)'
          }
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={20} color={color} />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                {label}
              </p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>
                {loading ? '...' : value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#f1f5f9' }}>
          Transactions
        </h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Plus size={16} /> Log Earning
        </button>
      </div>

      {/* Earnings List */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Loading earnings...</p>
      ) : earnings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#94a3b8' }}>
            No earnings logged yet
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Click "Log Earning" to track your first payment
          </p>
        </div>
      ) : (
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          {earnings.map((earning, index) => (
            <div key={earning.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: index < earnings.length - 1
                ? '1px solid #1e293b'
                : 'none',
              background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(34,197,94,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <DollarSign size={18} color="#22c55e" />
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#f1f5f9',
                    marginBottom: '2px'
                  }}>
                    {earning.description || 'Payment received'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    {getClientName(earning.client_id)
                      ? `👤 ${getClientName(earning.client_id)} · `
                      : ''}
                    📅 {new Date(earning.date).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#22c55e'
                }}>
                  +${earning.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDelete(earning.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#475569',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = '#ef4444')}
                  onMouseOut={e => (e.currentTarget.style.color = '#475569')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px'
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '20px',
            padding: '32px',
            width: '100%',
            maxWidth: '480px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#f1f5f9'
              }}>
                Log Earning
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="number"
                placeholder="Amount *"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                style={inputStyle}
              />
              <select
                value={form.currency}
                onChange={e => setForm({ ...form, currency: e.target.value })}
                style={inputStyle}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="SAR">SAR</option>
              </select>
              <input
                placeholder="Description (e.g. Website redesign payment)"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={inputStyle}
              />
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                style={inputStyle}
              />
              <select
                value={form.client_id}
                onChange={e => setForm({ ...form, client_id: e.target.value })}
                style={inputStyle}
              >
                <option value="">No client linked</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: '11px',
                  background: 'transparent',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  padding: '11px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Log Earning
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}