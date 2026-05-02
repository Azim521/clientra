import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { User, CreditCard, Shield, Bell } from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setName(user.user_metadata.full_name)
    }
  }, [user])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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

  const sectionStyle = {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '20px'
  }

  return (
    <Layout title="Settings">
      <div style={{ maxWidth: '640px' }}>

        {/* Profile Section */}
        <div style={sectionStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <User size={18} color="#6366f1" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
              Profile
            </h3>
          </div>

          {/* Avatar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: '700',
              color: 'white',
              flexShrink: 0
            }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ color: '#f1f5f9', fontWeight: '600', fontSize: '15px' }}>
                {user?.user_metadata?.full_name || 'Freelancer'}
              </p>
              <p style={{ color: '#64748b', fontSize: '13px' }}>
                {user?.email}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Full Name
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                color: '#94a3b8',
                marginBottom: '6px'
              }}>
                Email Address
              </label>
              <input
                value={user?.email || ''}
                disabled
                style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }}
              />
              <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                Email cannot be changed — linked to your Google account
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              background: saved
                ? 'rgba(34,197,94,0.15)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: saved ? '1px solid rgba(34,197,94,0.3)' : 'none',
              borderRadius: '10px',
              color: saved ? '#22c55e' : 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Plan Section */}
        <div style={sectionStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <CreditCard size={18} color="#6366f1" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
              Current Plan
            </h3>
          </div>

          <div style={{
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  marginBottom: '4px'
                }}>
                  Free Plan
                </p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  2 clients · 5 AI proposals/month
                </p>
              </div>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(99,102,241,0.2)',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6366f1'
              }}>
                CURRENT
              </span>
            </div>
          </div>

          {/* Upgrade Options */}
          {[
            {
              name: 'Starter',
              price: '$9/mo',
              features: '10 clients · 20 AI proposals · Invoice generator',
              color: '#6366f1'
            },
            {
              name: 'Pro',
              price: '$19/mo',
              features: 'Unlimited everything · Daily AI briefing · Gmail integration',
              color: '#8b5cf6'
            }
          ].map(plan => (
            <div key={plan.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: '#0f1117',
              border: '1px solid #334155',
              borderRadius: '12px',
              marginBottom: '10px'
            }}>
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#f1f5f9',
                  marginBottom: '4px'
                }}>
                  {plan.name} — {plan.price}
                </p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  {plan.features}
                </p>
              </div>
              <button style={{
                padding: '8px 16px',
                background: `linear-gradient(135deg, ${plan.color}, #8b5cf6)`,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                Upgrade
              </button>
            </div>
          ))}
        </div>

        {/* Security Section */}
        <div style={sectionStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <Shield size={18} color="#6366f1" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
              Security
            </h3>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 0',
            borderBottom: '1px solid #1e293b'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: '500' }}>
                Google Authentication
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                Your account is secured with Google OAuth
              </p>
            </div>
            <span style={{
              padding: '4px 10px',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#22c55e',
              fontWeight: '600'
            }}>
              ✓ Active
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 0'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: '500' }}>
                Data Encryption
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                All data encrypted at rest and in transit
              </p>
            </div>
            <span style={{
              padding: '4px 10px',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#22c55e',
              fontWeight: '600'
            }}>
              ✓ Active
            </span>
          </div>
        </div>

        {/* Notifications Section */}
        <div style={sectionStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <Bell size={18} color="#6366f1" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
              Notifications
            </h3>
          </div>

          {[
            { label: 'Daily AI Briefing', desc: 'Get a daily summary of your pipeline' },
            { label: 'Payment Reminders', desc: 'Remind clients about pending invoices' },
            { label: 'Follow-up Nudges', desc: 'Get notified when leads go cold' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: i < 2 ? '1px solid #1e293b' : 'none'
            }}>
              <div>
                <p style={{ fontSize: '14px', color: '#f1f5f9', fontWeight: '500' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  {item.desc}
                </p>
              </div>
              <span style={{
                padding: '4px 10px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#f59e0b',
                fontWeight: '600'
              }}>
                Pro
              </span>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}