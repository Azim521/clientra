import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { apiGet, apiPost, apiDelete, apiPatch } from '../lib/api'
import { Plus, Trash2, Pencil, X } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  platform: string
  status: string
  notes: string
  created_at: string
}

const statusColors: Record<string, { bg: string; color: string }> = {
  lead:      { bg: 'rgba(99,102,241,0.15)',  color: '#6366f1' },
  active:    { bg: 'rgba(34,197,94,0.15)',   color: '#22c55e' },
  negotiating: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  completed: { bg: 'rgba(100,116,139,0.15)', color: '#64748b' },
  churned:   { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [form, setForm] = useState({
    name: '', email: '', platform: '', status: 'lead', notes: ''
  })

  const fetchClients = () => {
    apiGet('/clients/')
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchClients() }, [])

  const openAddModal = () => {
    setEditClient(null)
    setForm({ name: '', email: '', platform: '', status: 'lead', notes: '' })
    setShowModal(true)
  }

  const openEditModal = (client: Client) => {
    setEditClient(client)
    setForm({
      name: client.name,
      email: client.email || '',
      platform: client.platform || '',
      status: client.status || 'lead',
      notes: client.notes || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (!form.name) return
    try {
      if (editClient) {
        await apiPatch(`/clients/${editClient.id}`, form)
      } else {
        await apiPost('/clients/', form)
      }
      setShowModal(false)
      fetchClients()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this client?')) return
    await apiDelete(`/clients/${id}`)
    fetchClients()
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
    <Layout title="Clients">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px'
      }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>
            Your Clients
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            {clients.length} client{clients.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={openAddModal}
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
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Client Cards */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Loading clients...</p>
      ) : clients.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#94a3b8' }}>
            No clients yet
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Click "Add Client" to get started
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {clients.map(client => (
            <div key={client.id} style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '20px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {/* Top row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#f1f5f9',
                    marginBottom: '4px'
                  }}>
                    {client.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>
                    {client.email || 'No email'}
                  </p>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: statusColors[client.status]?.bg || statusColors.lead.bg,
                  color: statusColors[client.status]?.color || statusColors.lead.color
                }}>
                  {client.status}
                </span>
              </div>

              {/* Platform */}
              {client.platform && (
                <p style={{
                  fontSize: '13px',
                  color: '#475569',
                  marginBottom: '8px'
                }}>
                  📌 {client.platform}
                </p>
              )}

              {/* Notes */}
              {client.notes && (
                <p style={{
                  fontSize: '13px',
                  color: '#64748b',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  {client.notes}
                </p>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '16px'
              }}>
                <button
                  onClick={() => openEditModal(client)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '8px',
                    color: '#6366f1',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} /> Delete
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
            {/* Modal Header */}
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
                {editClient ? 'Edit Client' : 'Add New Client'}
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

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                placeholder="Client name *"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Platform (Upwork, Fiverr, Direct...)"
                value={form.platform}
                onChange={e => setForm({ ...form, platform: e.target.value })}
                style={inputStyle}
              />
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={inputStyle}
              >
                <option value="lead">Lead</option>
                <option value="negotiating">Negotiating</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="churned">Churned</option>
              </select>
              <textarea
                placeholder="Notes..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Modal Actions */}
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
                {editClient ? 'Save Changes' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}