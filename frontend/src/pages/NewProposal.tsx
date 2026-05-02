import Layout from '../components/Layout'

export default function NewProposal() {
  return (
    <Layout title="New Proposal">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{ fontSize: '48px' }}>🤖</span>
        <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700' }}>
          AI Proposal Generator
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Coming on Day 9 — paste a job description and AI writes your proposal!
        </p>
      </div>
    </Layout>
  )
}
