import { useState } from 'react'
import Layout from '../components/Layout'
import { apiPost } from '../lib/api'
import { Sparkles, Copy, Check, Mail, MessageSquare } from 'lucide-react'

interface OutreachResult {
  linkedin: string
  email_subject: string
  email_body: string
  followup: string
}

export default function Outreach() {
  const [form, setForm] = useState({
    target_description: '',
    service: ''
  })
  const [result, setResult] = useState<OutreachResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!form.target_description || !form.service) return
    setLoading(true)
    setResult(null)
    try {
      const res = await apiPost('/proposals/outreach', form)
      setResult(res)
    } catch (e) {
      console.error(e)
      alert('Failed to generate. Check your OpenAI key.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
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

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => handleCopy(text, id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: copied === id ? 'rgba(34,197,94,0.1)' : 'rgba(99,102,241,0.1)',
        border: `1px solid ${copied === id ? 'rgba(34,197,94,0.3)' : 'rgba(99,102,241,0.2)'}`,
        borderRadius: '8px',
        color: copied === id ? '#22c55e' : '#6366f1',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer'
      }}
    >
      {copied === id ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
    </button>
  )

  return (
    <Layout title="Cold Outreach">
      <div style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#f1f5f9',
            marginBottom: '6px'
          }}>
            🎯 Cold Outreach Generator
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            Describe your target client and your service — AI writes personalized outreach messages instantly.
          </p>
        </div>

        {/* Input Form */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px',
                fontWeight: '500'
              }}>
                Your Service / Skill *
              </label>
              <input
                placeholder="e.g. React Developer, Data Scientist, UI/UX Designer"
                value={form.service}
                onChange={e => setForm({ ...form, service: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px',
                fontWeight: '500'
              }}>
                Target Client Description *
              </label>
              <textarea
                placeholder="Describe your ideal client. e.g. 'A fintech startup in the US looking for a React developer to build their dashboard. They recently raised $2M seed funding and are hiring fast.'"
                value={form.target_description}
                onChange={e => setForm({ ...form, target_description: e.target.value })}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !form.target_description || !form.service}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                background: loading || !form.target_description || !form.service
                  ? '#1e293b'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: loading || !form.target_description || !form.service
                  ? '1px solid #334155'
                  : 'none',
                borderRadius: '12px',
                color: loading || !form.target_description || !form.service
                  ? '#475569'
                  : 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading || !form.target_description || !form.service
                  ? 'not-allowed'
                  : 'pointer'
              }}
            >
              <Sparkles size={18} />
              {loading ? 'Generating...' : 'Generate Outreach Messages'}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* LinkedIn Message */}
            <div style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>💼</span>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>
                    LinkedIn Message
                  </h3>
                  <span style={{
                    fontSize: '11px',
                    color: '#64748b',
                    background: '#0f1117',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {result.linkedin.length}/300 chars
                  </span>
                </div>
                <CopyButton text={result.linkedin} id="linkedin" />
              </div>
              <p style={{
                fontSize: '14px',
                color: '#e2e8f0',
                lineHeight: '1.6',
                background: 'rgba(0,119,181,0.05)',
                border: '1px solid rgba(0,119,181,0.15)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                {result.linkedin}
              </p>
            </div>

            {/* Cold Email */}
            <div style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={18} color="#6366f1" />
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>
                    Cold Email
                  </h3>
                </div>
                <CopyButton
                  text={`Subject: ${result.email_subject}\n\n${result.email_body}`}
                  id="email"
                />
              </div>
              <div style={{
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <p style={{
                  fontSize: '13px',
                  color: '#6366f1',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  Subject: {result.email_subject}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#e2e8f0',
                  lineHeight: '1.7',
                  whiteSpace: 'pre-wrap'
                }}>
                  {result.email_body}
                </p>
              </div>
            </div>

            {/* Follow-up */}
            <div style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#f59e0b" />
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#f1f5f9' }}>
                    Follow-up Message
                  </h3>
                  <span style={{
                    fontSize: '11px',
                    color: '#64748b',
                    background: '#0f1117',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    Send after 3 days
                  </span>
                </div>
                <CopyButton text={result.followup} id="followup" />
              </div>
              <p style={{
                fontSize: '14px',
                color: '#e2e8f0',
                lineHeight: '1.6',
                background: 'rgba(245,158,11,0.05)',
                border: '1px solid rgba(245,158,11,0.15)',
                borderRadius: '10px',
                padding: '16px',
                whiteSpace: 'pre-wrap'
              }}>
                {result.followup}
              </p>
            </div>

            {/* Generate Again */}
            <button
              onClick={() => setResult(null)}
              style={{
                padding: '12px',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: '10px',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Generate New Messages
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}