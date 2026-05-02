import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { apiPost, apiGet } from '../lib/api'
import { Sparkles, Copy, Check, ArrowLeft } from 'lucide-react'

interface Client {
  id: string
  name: string
}

export default function NewProposal() {
  const navigate = useNavigate()
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState({
    title: '',
    job_description: '',
    client_id: ''
  })
  const [generated, setGenerated] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    apiGet('/clients/').then(setClients).catch(console.error)
  }, [])

  const handleGenerate = async () => {
    if (!form.job_description.trim()) return
    setLoading(true)
    setGenerated('')
    try {
      const res = await apiPost('/proposals/generate', {
        title: form.title || 'Untitled Proposal',
        job_description: form.job_description,
        client_id: form.client_id || null
      })
      setGenerated(res.proposal)
    } catch (e) {
      console.error(e)
      alert('Failed to generate proposal. Check your OpenAI key.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: '#0f1117',
    border: '1px solid #334155',
    borderRadius: '10px',
    color: '#f1f5f9',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none'
  }

  return (
    <Layout title="New Proposal">
      {/* Back button */}
      <button
        onClick={() => navigate('/proposals')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'transparent',
          border: 'none',
          color: '#64748b',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '24px',
          padding: 0
        }}
      >
        <ArrowLeft size={16} /> Back to Proposals
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: generated ? '1fr 1fr' : '1fr',
        gap: '24px',
        maxWidth: generated ? '100%' : '640px'
      }}>
        {/* Left — Input Form */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '32px'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#f1f5f9',
              marginBottom: '6px'
            }}>
              🤖 AI Proposal Generator
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Paste the job description and let AI write a winning proposal for you.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px',
                fontWeight: '500'
              }}>
                Proposal Title
              </label>
              <input
                placeholder="e.g. React Developer for E-commerce Site"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Client */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px',
                fontWeight: '500'
              }}>
                Link to Client (optional)
              </label>
              <select
                value={form.client_id}
                onChange={e => setForm({ ...form, client_id: e.target.value })}
                style={inputStyle}
              >
                <option value="">No client selected</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px',
                fontWeight: '500'
              }}>
                Job Description *
              </label>
              <textarea
                placeholder="Paste the full job description here..."
                value={form.job_description}
                onChange={e => setForm({ ...form, job_description: e.target.value })}
                rows={10}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !form.job_description.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                background: loading || !form.job_description.trim()
                  ? '#1e293b'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: loading || !form.job_description.trim()
                  ? '1px solid #334155'
                  : 'none',
                borderRadius: '12px',
                color: loading || !form.job_description.trim() ? '#475569' : 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading || !form.job_description.trim()
                  ? 'not-allowed'
                  : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Sparkles size={18} />
              {loading ? 'Generating...' : 'Generate Proposal'}
            </button>
          </div>
        </div>

        {/* Right — Generated Proposal */}
        {generated && (
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '20px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  marginBottom: '4px'
                }}>
                  ✨ Your Proposal
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  Saved to your proposals automatically
                </p>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: copied
                    ? 'rgba(34,197,94,0.1)'
                    : 'rgba(99,102,241,0.1)',
                  border: `1px solid ${copied
                    ? 'rgba(34,197,94,0.3)'
                    : 'rgba(99,102,241,0.3)'}`,
                  borderRadius: '8px',
                  color: copied ? '#22c55e' : '#6366f1',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {copied
                  ? <><Check size={14} /> Copied!</>
                  : <><Copy size={14} /> Copy</>
                }
              </button>
            </div>

            {/* Proposal Text */}
            <div style={{
              background: 'rgba(15,17,23,0.6)',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '20px',
              flex: 1,
              overflowY: 'auto'
            }}>
              <p style={{
                color: '#e2e8f0',
                fontSize: '14px',
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}>
                {generated}
              </p>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px'
            }}>
              <button
                onClick={() => navigate('/proposals')}
                style={{
                  flex: 1,
                  padding: '11px',
                  background: 'transparent',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                View All Proposals
              </button>
              <button
                onClick={() => {
                  setGenerated('')
                  setForm({ title: '', job_description: '', client_id: '' })
                }}
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
                Generate Another
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}