import { useNavigate } from 'react-router-dom'
import {
  Zap, Users, FileText, DollarSign,
  Sparkles, ArrowRight, Check
} from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1117',
      color: '#f1f5f9',
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 80px',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        background: 'rgba(15,17,23,0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={16} color="white" />
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Clientra
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '9px 20px',
              background: 'transparent',
              border: '1px solid #334155',
              borderRadius: '10px',
              color: '#94a3b8',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '9px 20px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '20px',
          fontSize: '13px',
          color: '#6366f1',
          fontWeight: '600',
          marginBottom: '28px'
        }}>
          <Sparkles size={14} />
          Powered by GPT-4o-mini
        </div>

        <h1 style={{
          fontSize: '64px',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '24px',
          maxWidth: '800px',
          margin: '0 auto 24px'
        }}>
          Your AI-Powered
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Freelance Manager
          </span>
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#64748b',
          maxWidth: '560px',
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Manage clients, generate winning proposals with AI,
          and track your income — all in one place.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Start for Free <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#94a3b8',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            View Demo
          </button>
        </div>

        <p style={{
          color: '#475569',
          fontSize: '13px',
          marginTop: '16px'
        }}>
          Free forever · No credit card required
        </p>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '800',
            marginBottom: '16px'
          }}>
            Everything you need to
            <span style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}> grow your freelance business</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px' }}>
            Stop juggling spreadsheets and emails. Clientra does it all.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: Users,
              color: '#6366f1',
              bg: 'rgba(99,102,241,0.1)',
              title: 'Client Manager',
              desc: 'Track every client from lead to completed project. Never lose a contact again.'
            },
            {
              icon: Sparkles,
              color: '#8b5cf6',
              bg: 'rgba(139,92,246,0.1)',
              title: 'AI Proposal Generator',
              desc: 'Paste a job description and get a winning proposal in seconds. Powered by GPT-4.'
            },
            {
              icon: DollarSign,
              color: '#22c55e',
              bg: 'rgba(34,197,94,0.1)',
              title: 'Finance Tracker',
              desc: 'Log earnings, track monthly revenue, and see your income grow over time.'
            },
            {
              icon: FileText,
              color: '#f59e0b',
              bg: 'rgba(245,158,11,0.1)',
              title: 'Proposal History',
              desc: 'All your proposals saved and organized. Copy, reuse, and learn what wins.'
            }
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px',
              padding: '28px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
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
                marginBottom: '16px'
              }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: '8px'
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.6'
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(99,102,241,0.03)',
        borderTop: '1px solid #1e293b',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '800',
            marginBottom: '16px'
          }}>
            Simple, transparent pricing
          </h2>
          <p style={{ color: '#64748b', fontSize: '18px' }}>
            Start free. Upgrade when you're ready to scale.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'forever',
              color: '#64748b',
              features: [
                '2 clients',
                '5 AI proposals/month',
                'Basic dashboard',
                'Finance tracker'
              ],
              cta: 'Get Started',
              highlight: false
            },
            {
              name: 'Starter',
              price: '$9',
              period: 'per month',
              color: '#6366f1',
              features: [
                '10 clients',
                '20 AI proposals/month',
                'Invoice generator',
                'Email drafts',
                'Priority support'
              ],
              cta: 'Start Starter',
              highlight: false
            },
            {
              name: 'Pro',
              price: '$19',
              period: 'per month',
              color: '#8b5cf6',
              features: [
                'Unlimited clients',
                'Unlimited AI proposals',
                'Daily AI briefing',
                'Gmail integration',
                'Revenue forecasting',
                'Cold outreach generator'
              ],
              cta: 'Go Pro',
              highlight: true
            }
          ].map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight
                ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))'
                : '#1e293b',
              border: plan.highlight
                ? '1px solid rgba(99,102,241,0.4)'
                : '1px solid #334155',
              borderRadius: '20px',
              padding: '32px',
              position: 'relative'
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap'
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#f1f5f9',
                marginBottom: '8px'
              }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontSize: '40px',
                  fontWeight: '800',
                  color: '#f1f5f9'
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginLeft: '4px'
                }}>
                  {plan.period}
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '28px'
              }}>
                {plan.features.map(f => (
                  <div key={f} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Check size={16} color="#22c55e" />
                    <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                    : 'transparent',
                  border: plan.highlight
                    ? 'none'
                    : '1px solid #334155',
                  borderRadius: '10px',
                  color: plan.highlight ? 'white' : '#94a3b8',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        textAlign: 'center',
        padding: '100px 24px'
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '16px'
        }}>
          Ready to grow your
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            freelance business?
          </span>
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '18px',
          marginBottom: '40px'
        }}>
          Join freelancers who are winning more clients with Clientra.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Get Started Free <ArrowRight size={20} />
        </button>
        <p style={{
          color: '#475569',
          fontSize: '13px',
          marginTop: '16px'
        }}>
          No credit card required · Setup in 2 minutes
        </p>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1e293b',
        padding: '32px 80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={12} color="white" />
          </div>
          <span style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#64748b'
          }}>
            Clientra
          </span>
        </div>
        <p style={{ color: '#475569', fontSize: '13px' }}>
          © 2026 Clientra. Built for freelancers.
        </p>
      </footer>
    </div>
  )
}