import { useState, useEffect } from 'react'
import Head from 'next/head'

const TOOLS = [
  { id: 'email', icon: '✉', bg: '#E6F1FB', name: 'Cold Email', desc: 'Emails that get replies' },
  { id: 'ads', icon: '📢', bg: '#FAECE7', name: 'Ad Copy', desc: 'Facebook, Google & Instagram ads' },
  { id: 'whatsapp', icon: '💬', bg: '#EAF3DE', name: 'WhatsApp Caption', desc: 'WhatsApp business messages' },
  { id: 'instagram', icon: '📸', bg: '#FBEAF0', name: 'Instagram Caption', desc: 'Viral Instagram posts & bios', proOnly: true },
  { id: 'proposal', icon: '📄', bg: '#EAF3DE', name: 'Business Proposal', desc: 'Win more clients', proOnly: true },
  { id: 'linkedin', icon: '🔗', bg: '#E6F1FB', name: 'LinkedIn Post', desc: 'Viral thought leadership', proOnly: true },
  { id: 'product', icon: '🛍', bg: '#FAEEDA', name: 'Product Description', desc: 'Convert visitors to buyers', proOnly: true },
  { id: 'blog', icon: '✍', bg: '#FBEAF0', name: 'Blog Article', desc: 'SEO-optimized content', proOnly: true },
  { id: 'rewrite', icon: '🔄', bg: '#E1F5EE', name: 'Rewrite & Improve', desc: 'Make any content better', proOnly: true },
  { id: 'subject', icon: '📧', bg: '#FAECE7', name: 'Email Subject Lines', desc: 'High open-rate subjects', proOnly: true },
  { id: 'youtube', icon: '▶', bg: '#FCEBEB', name: 'YouTube Script', desc: 'Engaging video scripts', proOnly: true },
  { id: 'review', icon: '⭐', bg: '#FAEEDA', name: 'Review Response', desc: 'Reply to customer reviews', proOnly: true },
]

const TONES = ['Professional', 'Friendly', 'Persuasive', 'Formal', 'Witty', 'Empathetic']
const LANGUAGES = ['English', 'Hindi', 'Arabic', 'Spanish', 'French', 'German', 'Portuguese', 'Chinese (Simplified)', 'Chinese (Traditional)', 'Japanese', 'Russian', 'Bengali', 'Turkish', 'Korean', 'Italian', 'Urdu', 'Persian (Farsi)', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Greek', 'Hebrew', 'Malay', 'Indonesian']

const REGION_PRICING = {
  india: {
    label: '🇮🇳 India', currency: '₹', symbol: 'INR',
    plans: [
      { id: 'starter', name: 'Starter', price: 199, period: '/mo', features: ['100 generations/month', '3 writing tools', '25 languages', 'Email support'] },
      { id: 'pro', name: 'Pro', price: 499, period: '/mo', features: ['Unlimited generations', 'All 12 tools', '25 languages', 'History & drafts', 'Priority support'], popular: true },
      { id: 'agency', name: 'Agency', price: 1299, period: '/mo', features: ['Everything in Pro', 'Unlimited team members', 'Brand voice memory', 'White-label', 'API access', '24/7 support'] },
    ]
  },
  middleeast: {
    label: '🇦🇪 Middle East', currency: '$', symbol: 'USD',
    plans: [
      { id: 'starter', name: 'Starter', price: 5, period: '/mo', features: ['100 generations/month', '3 writing tools', '25 languages', 'Arabic support', 'Email support'] },
      { id: 'pro', name: 'Pro', price: 12, period: '/mo', features: ['Unlimited generations', 'All 12 tools', '25 languages', 'Arabic support', 'History & drafts', 'Priority support'], popular: true },
      { id: 'agency', name: 'Agency', price: 29, period: '/mo', features: ['Everything in Pro', 'Unlimited team members', 'Brand voice memory', 'White-label', 'API access', '24/7 support'] },
    ]
  },
  europe: {
    label: '🇪🇺 Europe / Global', currency: '$', symbol: 'USD',
    plans: [
      { id: 'starter', name: 'Starter', price: 9, period: '/mo', features: ['100 generations/month', '3 writing tools', '25 languages', 'Email support'] },
      { id: 'pro', name: 'Pro', price: 19, period: '/mo', features: ['Unlimited generations', 'All 12 tools', '25 languages', 'History & drafts', 'Priority support'], popular: true },
      { id: 'agency', name: 'Agency', price: 49, period: '/mo', features: ['Everything in Pro', 'Unlimited team members', 'Brand voice memory', 'White-label', 'API access', '24/7 support'] },
    ]
  },
}

const PLANS = REGION_PRICING.india.plans

export default function Home() {
  const [screen, setScreen] = useState('landing')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [activeTool, setActiveTool] = useState(null)
  const [tone, setTone] = useState('Professional')
  const [language, setLanguage] = useState('English')
  const [toolInput, setToolInput] = useState('')
  const [toolOutput, setToolOutput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [history, setHistory] = useState([])
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [upgradePlan, setUpgradePlan] = useState('pro')
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [regionPlans, setRegionPlans] = useState(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Check if user already logged in
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.user) { setUser(data.user); setScreen('dashboard') }
      })
      .finally(() => setLoading(false))
  }, [])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)
  }, [])

  const fetchHistory = async () => {
    const res = await fetch('/api/history')
    const data = await res.json()
    if (data.history) setHistory(data.history)
  }

  const handleSignup = async () => {
    setAuthError('')
    setAuthLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm),
      })
      const data = await res.json()
      if (!res.ok) { setAuthError(data.error); return }
      setUser(data.user)
      setScreen('dashboard')
      setActiveTab('home')
    } catch { setAuthError('Network error. Try again.') }
    finally { setAuthLoading(false) }
  }

  const handleLogin = async () => {
    setAuthError('')
    setAuthLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password }),
      })
      const data = await res.json()
      if (!res.ok) { setAuthError(data.error); return }
      setUser(data.user)
      setScreen('dashboard')
      setActiveTab('home')
    } catch { setAuthError('Network error. Try again.') }
    finally { setAuthLoading(false) }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setScreen('landing')
  }

  const handleGenerate = async () => {
    if (!toolInput.trim() || !activeTool) return
    setGenerating(true)
    setToolOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: activeTool.id, tone, input: toolInput, language }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.error === 'trial_expired') { setShowUpgrade(true); return }
        if (data.error === 'tool_locked') { setShowUpgrade(true); return }
        setToolOutput('Error: ' + data.message)
        return
      }
      setToolOutput(data.output)
      setUser(prev => ({ ...prev, generationsUsed: (prev.generationsUsed || 0) + 1 }))
    } catch { setToolOutput('Connection error. Please try again.') }
    finally { setGenerating(false) }
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: upgradePlan }),
      })
      const order = await res.json()
      if (!res.ok) { alert(order.error); return }

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'WriteAI',
        description: `${upgradePlan.charAt(0).toUpperCase() + upgradePlan.slice(1)} Plan — Monthly`,
        order_id: order.orderId,
        prefill: { name: order.userName, email: order.userEmail },
        theme: { color: '#185FA5' },
        handler: async (response) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, plan: upgradePlan }),
          })
          const verifyData = await verifyRes.json()
          if (verifyData.success) {
            setUser(prev => ({ ...prev, plan: upgradePlan }))
            setShowUpgrade(false)
            alert(`Welcome to WriteAI ${upgradePlan.charAt(0).toUpperCase() + upgradePlan.slice(1)}! Your subscription is active.`)
          }
        },
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch { alert('Payment initiate nahi hua. Dobara try karo.') }
    finally { setPaymentLoading(false) }
  }

  const trialDays = user?.trialDaysRemaining || 0
  const isTrial = user?.plan === 'trial'
  const isExpired = user?.trialExpired

  const s = (name) => { setScreen(name); setAuthError(''); setAuthForm({ name: '', email: '', password: '' }) }

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#888' }}>Loading...</div>

  return (
    <>
      <Head>
        <title>WriteAI — AI Writing Suite</title>
        <meta name="description" content="Write professional content 10x faster with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; color: #111; }
        .btn { padding: 8px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; border: 1px solid #ddd; background: transparent; color: #111; transition: all .15s; font-family: inherit; }
        .btn:hover { background: #f5f5f5; }
        .btn.solid { background: #185FA5; color: #fff; border-color: #185FA5; }
        .btn.solid:hover { background: #0C447C; }
        .btn.green { background: #3B6D11; color: #fff; border-color: #3B6D11; }
        .btn.green:hover { background: #27500A; }
        .btn:disabled { opacity: .5; cursor: not-allowed; }
        input, textarea, select { font-family: inherit; }
        input:focus, textarea:focus { outline: none; border-color: #185FA5 !important; }
        .pill { padding: 5px 12px; border-radius: 20px; border: 1px solid #ddd; font-size: 12px; cursor: pointer; color: #666; transition: all .15s; background: transparent; font-family: inherit; }
        .pill.on { background: #185FA5; color: #fff; border-color: #185FA5; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2px solid #fff3; border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; display: inline-block; }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 24px', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -.3 }}>Write<span style={{ color: '#185FA5' }}>AI</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              <span style={{ fontSize: 13, color: '#666' }}>{user.name}</span>
              <button className="btn" onClick={handleLogout} style={{ fontSize: 12 }}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => s('login')}>Login</button>
              <button className="btn green" onClick={() => s('signup')} style={{ padding: '8px 18px' }}>Start 7-day free trial</button>
            </>
          )}
        </div>
      </nav>

      {/* TRIAL BANNER */}
      {user && isTrial && !isExpired && (
        <div style={{ background: '#EAF3DE', borderBottom: '1px solid #C0DD97', padding: '9px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ background: '#3B6D11', color: '#EAF3DE', fontSize: 10, padding: '3px 10px', borderRadius: 20, fontWeight: 600, letterSpacing: .3 }}>FREE TRIAL</span>
            <div>
              <div style={{ fontSize: 13, color: '#27500A', fontWeight: 500 }}>{trialDays} day{trialDays !== 1 ? 's' : ''} remaining — full Pro access</div>
              <div style={{ fontSize: 11, color: '#3B6D11' }}>Upgrade before trial ends to save 30%</div>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ width: 18, height: 6, borderRadius: 3, background: i < (7 - trialDays) ? '#3B6D11' : '#C0DD97' }} />
              ))}
            </div>
          </div>
          <button className="btn solid" onClick={() => setShowUpgrade(true)} style={{ fontSize: 12 }}>Upgrade now ↗</button>
        </div>
      )}

      {/* WARNING BANNER */}
      {user && isTrial && !isExpired && trialDays <= 2 && (
        <div style={{ background: '#FAEEDA', borderBottom: '1px solid #FAC775', padding: '9px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontSize: 13, color: '#633806', fontWeight: 500 }}>Trial ending in {trialDays} day{trialDays !== 1 ? 's' : ''} — upgrade to keep access</div>
            <div style={{ fontSize: 11, color: '#854F0B' }}>All your history and drafts will be saved.</div>
          </div>
          <button className="btn solid" onClick={() => setShowUpgrade(true)} style={{ fontSize: 12 }}>Choose a plan ↗</button>
        </div>
      )}

      {/* LANDING */}
      {screen === 'landing' && (
        <div>
          <div style={{ textAlign: 'center', padding: '52px 24px 32px', maxWidth: 620, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EAF3DE', color: '#27500A', fontSize: 12, padding: '5px 14px', borderRadius: 20, marginBottom: 14, fontWeight: 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B6D11', display: 'inline-block' }}></span>
              7-day free trial — no credit card required
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.3, marginBottom: 12 }}>Write professional content 10x faster with AI</h1>
            <p style={{ fontSize: 15, color: '#555', lineHeight: 1.65, marginBottom: 8 }}>12 AI writing tools. 25 languages including Arabic & Hindi. Better than Jasper at 1/4th the price. Used by businesses in India, UAE, UK & Europe.</p>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 24 }}>No credit card required · Cancel anytime · Full access for 7 days</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn green" onClick={() => s('signup')} style={{ padding: '11px 28px', fontSize: 14 }}>Start free 7-day trial</button>
              <button className="btn" onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })} style={{ padding: '11px 20px', fontSize: 14 }}>View plans</button>
            </div>
          </div>

          {/* Tools grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, padding: '0 24px 28px', maxWidth: 700, margin: '0 auto' }}>
            {TOOLS.map(t => (
              <div key={t.id} onClick={() => s('signup')} style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'border-color .15s' }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#185FA5'}
                onMouseOut={e => e.currentTarget.style.borderColor = '#eee'}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#777', lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, padding: '0 24px 32px', maxWidth: 700, margin: '0 auto' }}>
            {[['10x', 'Faster writing'], ['15+', 'Languages supported'], ['5000+', 'Happy users']].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center', background: '#f9f9f9', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#185FA5' }}>{num}</div>
                <div style={{ fontSize: 11, color: '#777', marginTop: 3 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div id="plans" style={{ padding: '28px 24px 40px', maxWidth: 760, margin: '0 auto' }}>
            <div style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', marginBottom: 6 }}>Simple, transparent pricing</div>
            <div style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 }}>All plans start with a 7-day free trial. No credit card required.</div>

            {/* Region Selector */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: '#444', marginBottom: 12, fontWeight: 500 }}>Select your region to see pricing:</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {Object.entries(REGION_PRICING).map(([key, region]) => (
                  <button key={key} onClick={() => { setSelectedRegion(key); setRegionPlans(region.plans) }}
                    style={{ padding: '10px 20px', borderRadius: 8, border: selectedRegion === key ? '2px solid #185FA5' : '1px solid #ddd', background: selectedRegion === key ? '#E6F1FB' : '#fff', color: selectedRegion === key ? '#0C447C' : '#444', fontSize: 13, fontWeight: selectedRegion === key ? 600 : 400, cursor: 'pointer', transition: 'all .15s' }}>
                    {region.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plans — show only after region selected */}
            {!selectedRegion && (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f9f9f9', borderRadius: 12, border: '1px dashed #ddd' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🌍</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: '#444', marginBottom: 6 }}>Select your region above</div>
                <div style={{ fontSize: 13, color: '#888' }}>We offer special pricing for India, Middle East & Europe</div>
              </div>
            )}

            {selectedRegion && regionPlans && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 14 }}>
                {regionPlans.map(p => (
                  <div key={p.id} style={{ background: '#fff', border: p.popular ? '2px solid #185FA5' : '1px solid #eee', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column' }}>
                    {p.popular && <div style={{ background: '#E6F1FB', color: '#0C447C', fontSize: 10, padding: '2px 9px', borderRadius: 20, display: 'inline-block', marginBottom: 8, alignSelf: 'flex-start' }}>Most popular</div>}
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 26, fontWeight: 600, margin: '8px 0 2px' }}>{REGION_PRICING[selectedRegion].currency}{p.price.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>{p.period} after trial</div>
                    <ul style={{ listStyle: 'none', flex: 1 }}>
                      {p.features.map(f => (
                        <li key={f} style={{ fontSize: 12, color: '#555', display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
                          <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" stroke="#27500A" strokeWidth="1.5" fill="none"/></svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={p.popular ? 'btn green' : 'btn'} onClick={() => s('signup')} style={{ width: '100%', marginTop: 14, fontSize: 12, padding: 9 }}>
                      Start free trial
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SIGNUP */}
      {screen === 'signup' && (
        <div style={{ maxWidth: 380, margin: '32px auto', padding: '0 16px' }}>
          <div style={{ background: '#EAF3DE', border: '1px solid #C0DD97', borderRadius: 10, padding: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#27500A', marginBottom: 6 }}>Your 7-day free trial includes:</div>
            {['Full Pro access — all 6 tools', 'Unlimited generations for 7 days', '15+ output languages', 'No credit card required'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#3B6D11', marginBottom: 3 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B6D11', flexShrink: 0 }}></span>{f}
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Start your free trial</h2>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 18 }}>7 days full access · No card needed</div>
            {['name', 'email', 'password'].map(field => (
              <div key={field} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{field === 'name' ? 'Full name' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  value={authForm[field]}
                  onChange={e => setAuthForm(p => ({ ...p, [field]: e.target.value }))}
                  placeholder={field === 'name' ? 'Alex Johnson' : field === 'email' ? 'alex@company.com' : 'Min 8 characters'}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 13 }} />
              </div>
            ))}
            {authError && <div style={{ fontSize: 12, color: '#A32D2D', background: '#FCEBEB', padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>{authError}</div>}
            <button className="btn green" onClick={handleSignup} disabled={authLoading} style={{ width: '100%', padding: 11, fontSize: 14 }}>
              {authLoading ? <span className="spinner"></span> : 'Start my free trial — no card needed'}
            </button>
            <div style={{ textAlign: 'center', fontSize: 11, color: '#999', marginTop: 8 }}>No credit card required</div>
            <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#666' }}>
              Already have an account? <span style={{ color: '#185FA5', cursor: 'pointer' }} onClick={() => s('login')}>Sign in</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 12, color: '#999', cursor: 'pointer' }} onClick={() => s('landing')}>← Back</span>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {screen === 'login' && (
        <div style={{ maxWidth: 360, margin: '40px auto', padding: '0 16px' }}>
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Welcome back</h2>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Sign in to your account</div>
            {['email', 'password'].map(field => (
              <div key={field} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input type={field === 'password' ? 'password' : 'email'}
                  value={authForm[field]}
                  onChange={e => setAuthForm(p => ({ ...p, [field]: e.target.value }))}
                  placeholder={field === 'email' ? 'alex@company.com' : 'Password'}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 13 }} />
              </div>
            ))}
            {authError && <div style={{ fontSize: 12, color: '#A32D2D', background: '#FCEBEB', padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>{authError}</div>}
            <button className="btn solid" onClick={handleLogin} disabled={authLoading} style={{ width: '100%', padding: 10 }}>
              {authLoading ? <span className="spinner"></span> : 'Sign in'}
            </button>
            <div style={{ textAlign: 'center', fontSize: 13, color: '#666', marginTop: 14 }}>
              No account? <span style={{ color: '#185FA5', cursor: 'pointer' }} onClick={() => s('signup')}>Start free trial</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {screen === 'dashboard' && (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 53px)' }}>
          {/* Sidebar */}
          <div style={{ width: 210, borderRight: '1px solid #eee', background: '#fafafa', flexShrink: 0, padding: '16px 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 10, color: '#aaa', padding: '10px 16px 4px', textTransform: 'uppercase', letterSpacing: .7 }}>Main</div>
            {[['home', '⊞', 'Dashboard'], ['tools', '✦', 'Tools'], ['history', '◷', 'History']].map(([id, icon, label]) => (
              <div key={id} onClick={() => { setActiveTab(id); if (id === 'history') fetchHistory() }}
                style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', fontSize: 13, color: activeTab === id ? '#111' : '#666', cursor: 'pointer', background: activeTab === id ? '#fff' : 'transparent', borderRight: activeTab === id ? '2px solid #185FA5' : 'none', fontWeight: activeTab === id ? 500 : 400, transition: 'background .15s' }}>
                <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{icon}</span>{label}
              </div>
            ))}
            <div style={{ fontSize: 10, color: '#aaa', padding: '10px 16px 4px', textTransform: 'uppercase', letterSpacing: .7 }}>Account</div>
            <div onClick={() => setActiveTab('account')}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', fontSize: 13, color: activeTab === 'account' ? '#111' : '#666', cursor: 'pointer', background: activeTab === 'account' ? '#fff' : 'transparent', borderRight: activeTab === 'account' ? '2px solid #185FA5' : 'none', fontWeight: activeTab === 'account' ? 500 : 400 }}>
              <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>◉</span>My Account
            </div>
            <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', fontSize: 13, color: '#666', cursor: 'pointer', marginTop: 'auto' }}>
              <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>←</span>Logout
            </div>
          </div>

          {/* Main area */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ padding: '13px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {activeTab === 'home' && 'Dashboard'}
                {activeTab === 'tools' && 'Writing Tools'}
                {activeTab === 'history' && 'History'}
                {activeTab === 'account' && 'My Account'}
                {activeTab === 'tool' && activeTool?.name}
              </div>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: isTrial ? '#EAF3DE' : '#E6F1FB', color: isTrial ? '#27500A' : '#0C447C' }}>
                {isTrial ? `Trial — ${trialDays}d left` : `${user?.plan?.charAt(0).toUpperCase() + user?.plan?.slice(1)} Plan`}
              </span>
            </div>
            <div style={{ padding: '16px 20px' }}>

              {/* HOME TAB */}
              {activeTab === 'home' && (
                <div>
                  {isTrial && !isExpired && (
                    <div style={{ background: '#EAF3DE', border: '1px solid #C0DD97', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: '#27500A' }}>Free trial active</div>
                          <div style={{ fontSize: 12, color: '#3B6D11', marginTop: 2 }}>Full Pro access — {trialDays} day{trialDays !== 1 ? 's' : ''} remaining</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 28, fontWeight: 600, color: '#27500A' }}>{trialDays}</div>
                          <div style={{ fontSize: 11, color: '#3B6D11' }}>days left</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                        {[...Array(7)].map((_, i) => (
                          <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i < (7 - trialDays) ? '#3B6D11' : '#C0DD97' }} />
                        ))}
                      </div>
                      <button className="btn green" onClick={() => setShowUpgrade(true)} style={{ fontSize: 12, padding: '7px 14px' }}>Upgrade now — keep access ↗</button>
                    </div>
                  )}
                  {isExpired && (
                    <div style={{ background: '#FCEBEB', border: '1px solid #F7C1C1', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#A32D2D', marginBottom: 4 }}>Your free trial has ended</div>
                      <div style={{ fontSize: 13, color: '#791F1F', marginBottom: 12 }}>Choose a plan to continue using WriteAI.</div>
                      <button className="btn solid" onClick={() => setShowUpgrade(true)}>Choose a plan ↗</button>
                    </div>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10, marginBottom: 20 }}>
                    {[['Today', user?.generationsUsed || 0], ['Plan', user?.plan || 'trial'], ['Trial Days', trialDays], ['Status', isExpired ? 'Expired' : 'Active']].map(([label, val]) => (
                      <div key={label} style={{ background: '#f9f9f9', borderRadius: 8, padding: 12 }}>
                        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 18, fontWeight: 500, textTransform: 'capitalize' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>Quick start</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
                    {TOOLS.slice(0, 3).map(t => (
                      <div key={t.id} onClick={() => { if (!isExpired) { setActiveTool(t); setActiveTab('tool'); setToolInput(''); setToolOutput('') } else setShowUpgrade(true) }}
                        style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 14, cursor: isExpired ? 'not-allowed' : 'pointer', opacity: isExpired ? .5 : 1 }}
                        onMouseOver={e => !isExpired && (e.currentTarget.style.borderColor = '#185FA5')}
                        onMouseOut={e => e.currentTarget.style.borderColor = '#eee'}>
                        <div style={{ fontSize: 20, marginBottom: 8 }}>{t.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: '#777' }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOOLS TAB */}
              {activeTab === 'tools' && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{isTrial ? 'All tools — full access during trial' : 'All tools'}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
                    {TOOLS.map(t => {
                      const locked = user?.plan === 'starter' && t.proOnly
                      const blocked = isExpired
                      return (
                        <div key={t.id} onClick={() => { if (blocked || locked) { setShowUpgrade(true) } else { setActiveTool(t); setActiveTab('tool'); setToolInput(''); setToolOutput('') } }}
                          style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 14, cursor: 'pointer', opacity: locked || blocked ? .5 : 1 }}
                          onMouseOver={e => e.currentTarget.style.borderColor = '#185FA5'}
                          onMouseOut={e => e.currentTarget.style.borderColor = '#eee'}>
                          <div style={{ fontSize: 20, marginBottom: 8 }}>{t.icon}</div>
                          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
                            {t.name}
                            {locked && <span style={{ fontSize: 10, background: '#FAEEDA', color: '#633806', padding: '1px 6px', borderRadius: 20, marginLeft: 5 }}>Pro</span>}
                          </div>
                          <div style={{ fontSize: 11, color: '#777' }}>{t.desc}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TOOL USE */}
              {activeTab === 'tool' && activeTool && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <button className="btn" onClick={() => setActiveTab('tools')} style={{ fontSize: 12 }}>← Back</button>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{activeTool.name}</span>
                    {isTrial && <span style={{ fontSize: 11, background: '#EAF3DE', color: '#27500A', padding: '2px 8px', borderRadius: 20 }}>Trial — full access</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Tone:</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {TONES.map(t => (
                      <button key={t} className={`pill ${tone === t ? 'on' : ''}`} onClick={() => setTone(t)}>{t}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <label style={{ fontSize: 12, color: '#666' }}>Output language:</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #ddd', borderRadius: 6, background: '#fff' }}>
                      {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <textarea value={toolInput} onChange={e => setToolInput(e.target.value)} rows={3} placeholder="Describe what you need..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 13, resize: 'vertical' }} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
                    <button className="btn solid" onClick={handleGenerate} disabled={generating || !toolInput.trim()} style={{ fontSize: 12, padding: '7px 16px' }}>
                      {generating ? <span className="spinner"></span> : 'Generate'}
                    </button>
                    <button className="btn" onClick={() => setToolInput('')} style={{ fontSize: 12 }}>Clear</button>
                    {toolOutput && (
                      <button className="btn" onClick={() => { navigator.clipboard.writeText(toolOutput); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ fontSize: 12 }}>
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                  <div style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8, padding: 14, minHeight: 120, fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginTop: 10, color: toolOutput ? '#111' : '#aaa' }}>
                    {toolOutput || 'Your generated content will appear here...'}
                  </div>
                </div>
              )}

              {/* HISTORY TAB */}
              {activeTab === 'history' && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Your history</div>
                  {history.length === 0 ? (
                    <div style={{ fontSize: 13, color: '#aaa' }}>No history yet. Start using the tools!</div>
                  ) : history.map(h => (
                    <div key={h.id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
                      <div style={{ fontSize: 12, color: '#444', marginBottom: 4 }}>{h.output_text.slice(0, 120)}...</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{h.tool} · {h.word_count} words · {new Date(h.created_at).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* ACCOUNT TAB */}
              {activeTab === 'account' && (
                <div style={{ maxWidth: 480 }}>
                  {isTrial && (
                    <div style={{ background: '#EAF3DE', border: '1px solid #C0DD97', borderRadius: 10, padding: 16, marginBottom: 14 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#27500A', marginBottom: 4 }}>Free trial — {trialDays} day{trialDays !== 1 ? 's' : ''} left</div>
                      <div style={{ fontSize: 12, color: '#3B6D11', marginBottom: 12 }}>Upgrade before trial ends to save 30%.</div>
                      <button className="btn green" onClick={() => setShowUpgrade(true)} style={{ fontSize: 12 }}>Choose a plan ↗</button>
                    </div>
                  )}
                  {['Profile', 'Subscription'].map(section => (
                    <div key={section} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 16, marginBottom: 14 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #eee' }}>{section}</div>
                      {section === 'Profile' ? (
                        <>
                          {[['Name', user?.name], ['Email', user?.email], ['Plan', user?.plan], ['Status', isExpired ? 'Trial expired' : isTrial ? `Trial — Day ${7 - trialDays + 1} of 7` : 'Active']].map(([label, val]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                              <span>{label}</span><span style={{ fontSize: 12, color: '#666', textTransform: 'capitalize' }}>{val}</span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                            <span>Generations used</span><span style={{ fontSize: 12, color: '#666' }}>{user?.generationsUsed || 0}</span>
                          </div>
                          <button className="btn" onClick={() => setShowUpgrade(true)} style={{ marginTop: 8, fontSize: 12 }}>Upgrade plan ↗</button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* UPGRADE OVERLAY */}
      {showUpgrade && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 440, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: isExpired ? '#FCEBEB' : '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
              {isExpired ? '!' : '✦'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{isExpired ? 'Trial ended — choose a plan' : 'Upgrade — keep creating'}</div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 24 }}>
              {isExpired ? 'Your 7-day trial has ended. Choose a plan to continue.' : 'Lock in your plan today and keep full access to all tools.'}
            </div>
            {/* Region selector in upgrade overlay */}
            {!selectedRegion && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 8, textAlign: 'center' }}>Select your region:</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  {Object.entries(REGION_PRICING).map(([key, region]) => (
                    <button key={key} onClick={() => { setSelectedRegion(key); setRegionPlans(region.plans) }}
                      style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 12, cursor: 'pointer' }}>
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(regionPlans || REGION_PRICING.india.plans) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
                {(regionPlans || REGION_PRICING.india.plans).map(p => (
                  <div key={p.id} onClick={() => setUpgradePlan(p.id)}
                    style={{ border: upgradePlan === p.id ? '2px solid #185FA5' : '1px solid #ddd', borderRadius: 10, padding: '12px 8px', cursor: 'pointer', background: upgradePlan === p.id ? '#E6F1FB' : '#fff', transition: 'all .15s' }}>
                    {p.popular && <div style={{ fontSize: 10, background: '#E6F1FB', color: '#0C447C', padding: '2px 6px', borderRadius: 20, marginBottom: 4, display: 'inline-block' }}>Popular</div>}
                    <div style={{ fontSize: 13, fontWeight: 500, color: upgradePlan === p.id ? '#0C447C' : '#111' }}>{p.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 600, margin: '4px 0' }}>{REGION_PRICING[selectedRegion || 'india'].currency}{p.price.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{p.period}</div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn solid" onClick={handlePayment} disabled={paymentLoading} style={{ width: '100%', padding: 12, fontSize: 14, marginBottom: 10 }}>
              {paymentLoading ? <span className="spinner"></span> : `Upgrade to ${upgradePlan.charAt(0).toUpperCase() + upgradePlan.slice(1)} — ${REGION_PRICING[selectedRegion||'india'].currency}${(regionPlans || REGION_PRICING.india.plans).find(p => p.id === upgradePlan)?.price || 0}${(regionPlans || REGION_PRICING.india.plans).find(p=>p.id===upgradePlan)?.period || '/mo'}`}
            </button>
            {!isExpired && (
              <div style={{ fontSize: 12, color: '#999', cursor: 'pointer' }} onClick={() => setShowUpgrade(false)}>Maybe later — continue trial</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
