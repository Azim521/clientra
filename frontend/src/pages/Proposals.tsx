import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { apiGet, apiDelete } from '../lib/api'
import { Plus, Trash2, Copy, Check } from 'lucide-react'

interface Proposal {
  id: string
  title: string
  job_description: string
  generated_proposal: string
  status: string
  created_at: string
}

const statusColors: Record<string, { bg: string; color: string }> = {
  draft:  { bg: 'rgba(99,102,241,0.15)',  color: '#6366f1' },
  sent:   { bg: 'rgba(245,158,11,0.15)',  color: '#f59e0b' },
  won:    { bg: 'rgba(34,197,94,0.15)',   color: '#22c55e' },
  lost:   { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
}

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchProposals = () => {
    apiGet('/proposals/')
      .then(setProposals)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProposals() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this proposal?')) return
    await apiDelete(`/proposals/${id}`)
    fetchProposals()
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Layout title="Proposals">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px'
      }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#f1f5f9' }}>
            Your Proposals
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
            {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/proposals/new'}
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
          <Plus size={16} /> New Proposal
        </button>
      </div>

      {/* Proposals List */}
      {loading ? (
        <p style={{ color: '#64748b' }}>Loading proposals...</p>
      ) : proposals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#94a3b8' }}>
            No proposals yet
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Click "New Proposal" to generate your first AI proposal
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {proposals.map(proposal => (
            <div key={proposal.id} style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '24px',
              transition: 'transform 0.2s'
            }}>
              {/* Top row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#f1f5f9',
                    marginBottom: '4px'
                  }}>
                    {proposal.title || 'Untitled Proposal'}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>
                    {new Date(proposal.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: statusColors[proposal.status]?.bg || statusColors.draft.bg,
                  color: statusColors[proposal.status]?.color || statusColors.draft.color,
                  marginLeft: '12px',
                  whiteSpace: 'nowrap'
                }}>
                  {proposal.status}
                </span>
              </div>

              {/* Job Description preview */}
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '12px',
                lineHeight: '1.5',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const,
                overflow: 'hidden'
              }}>
                📋 {proposal.job_description}
              </p>

              {/* Generated Proposal */}
              {proposal.generated_proposal && (
                <div style={{
                  background: 'rgba(99,102,241,0.05)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  <p style={{
                    fontSize: '13px',
                    color: '#94a3b8',
                    lineHeight: '1.6',
                    display: expanded === proposal.id ? 'block' : '-webkit-box',
                    WebkitLineClamp: expanded === proposal.id ? undefined : 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: expanded === proposal.id ? 'visible' : 'hidden'
                  }}>
                    {proposal.generated_proposal}
                  </p>
                  <button
                    onClick={() => setExpanded(
                      expanded === proposal.id ? null : proposal.id
                    )}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#6366f1',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      padding: 0
                    }}
                  >
                    {expanded === proposal.id ? 'Show less' : 'Read more'}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {proposal.generated_proposal && (
                  <button
                    onClick={() => handleCopy(proposal.generated_proposal, proposal.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: copied === proposal.id
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(99,102,241,0.1)',
                      border: `1px solid ${copied === proposal.id
                        ? 'rgba(34,197,94,0.2)'
                        : 'rgba(99,102,241,0.2)'}`,
                      borderRadius: '8px',
                      color: copied === proposal.id ? '#22c55e' : '#6366f1',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {copied === proposal.id
                      ? <><Check size={14} /> Copied!</>
                      : <><Copy size={14} /> Copy Proposal</>
                    }
                  </button>
                )}
                <button
                  onClick={() => handleDelete(proposal.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
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
    </Layout>
  )
}