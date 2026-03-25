import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeView, setActiveView] = useState('landing');
  const [activeTool, setActiveTool] = useState(null);
  const [currentTone, setCurrentTone] = useState('Professional');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [totalGenerations, setTotalGenerations] = useState(0);
  const [totalWordsCount, setTotalWordsCount] = useState(0);
  const [recentHistory, setRecentHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userData, setUserData] = useState({
    name: 'Manish Kumar',
    email: 'manish@writeai.com',
    company: '',
    phone: '',
    joinedDate: new Date().toLocaleDateString()
  });
  const [editMode, setEditMode] = useState(false);
  const [tempUserData, setTempUserData] = useState({});
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const PLANS = [
    { id: 'basic', name: 'Basic', price: 15, priceINR: '₹1,299', features: ['10,000 words/month', '12 AI Tools', 'Email Support', 'Basic Analytics'], popular: false },
    { id: 'pro', name: 'Pro', price: 25, priceINR: '₹2,099', features: ['50,000 words/month', 'All AI Tools', 'Priority Support', 'Advanced Analytics', 'API Access'], popular: true },
    { id: 'business', name: 'Business', price: 35, priceINR: '₹2,999', features: ['Unlimited words', 'All AI Tools', '24/7 Priority Support', 'Team Collaboration', 'Custom AI Training', 'Dedicated Account Manager'], popular: false }
  ];

  const TOOLS = [
    { id: 'email', icon: '✉️', name: 'Cold Email', desc: 'Emails that get replies', premium: false },
    { id: 'ads', icon: '📢', name: 'Ad Copy', desc: 'Facebook, Google & Instagram ads', premium: false },
    { id: 'whatsapp', icon: '💬', name: 'WhatsApp Caption', desc: 'WhatsApp business messages', premium: false },
    { id: 'instagram', icon: '📸', name: 'Instagram Caption', desc: 'Viral Instagram posts & bios', premium: true },
    { id: 'proposal', icon: '📄', name: 'Business Proposal', desc: 'Win more clients', premium: true },
    { id: 'linkedin', icon: '🔗', name: 'LinkedIn Post', desc: 'Viral thought leadership', premium: true },
    { id: 'product', icon: '🛍️', name: 'Product Description', desc: 'Convert visitors to buyers', premium: true },
    { id: 'blog', icon: '✍️', name: 'Blog Article', desc: 'SEO-optimized content', premium: true },
    { id: 'rewrite', icon: '🔄', name: 'Rewrite & Improve', desc: 'Make any content better', premium: true },
    { id: 'subject', icon: '📧', name: 'Email Subject Lines', desc: 'High open-rate subjects', premium: true },
    { id: 'youtube', icon: '▶️', name: 'YouTube Script', desc: 'Engaging video scripts', premium: true },
    { id: 'review', icon: '⭐', name: 'Review Response', desc: 'Reply to customer reviews', premium: true }
  ];

  const TONES = ['Professional', 'Friendly', 'Persuasive', 'Formal', 'Witty', 'Empathetic', 'Bold', 'Casual'];

  // Login Handler with Greeting
  const handleLogin = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveView('dashboard');
      const hour = new Date().getHours();
      let greeting = '';
      if (hour < 12) greeting = 'Good Morning';
      else if (hour < 18) greeting = 'Good Afternoon';
      else greeting = 'Good Evening';
      setGreetingMessage(`🎉 Welcome back, ${userData.name}! ${greeting}! ✨`);
      setTimeout(() => setGreetingMessage(''), 5000);
    }
  };

  // Signup Handler with Congratulations
  const handleSignup = (name, email, password) => {
    if (name && email && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setActiveView('dashboard');
      setUserData({ ...userData, name, email });
      setGreetingMessage(`🎊 Congratulations ${name}! 🎉 Your account has been created successfully! Welcome to WriteAI family! ✨`);
      setTimeout(() => setGreetingMessage(''), 6000);
    }
  };

  // Subscription Handler
  const handleSubscribe = (plan) => {
    setSubscriptionPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setGreetingMessage(`🎉 Congratulations! You're now on the ${subscriptionPlan.name} plan! Enjoy premium features! 🚀`);
    setTimeout(() => setGreetingMessage(''), 5000);
  };

  // Account Delete Handler
  const handleDeleteAccount = () => {
    if (confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone! All your data will be permanently removed.')) {
      setIsLoggedIn(false);
      setShowLogin(true);
      setActiveView('landing');
      setSubscriptionPlan(null);
      setTotalGenerations(0);
      setTotalWordsCount(0);
      setRecentHistory([]);
      alert('✅ Your account has been deleted successfully. We\'re sad to see you go!');
    }
  };

  const addToHistory = (toolName, text) => {
    const newHistory = [{ toolName, text, timestamp: Date.now() }, ...recentHistory];
    setRecentHistory(newHistory.slice(0, 10));
  };

  const generateContent = () => {
    if (!inputText.trim() || !activeTool) {
      setOutputText('⚠️ Please describe what you want to create.');
      return;
    }

    if (activeTool.premium && !subscriptionPlan) {
      setOutputText('🔒 This is a premium tool! Please subscribe to a plan to access this feature.');
      return;
    }

    setIsGenerating(true);
    setOutputText('✨ Generating your premium content...');

    setTimeout(() => {
      const mockResponses = {
        email: `Subject: Transform Your Workflow with AI-Powered Writing\n\nHi there,\n\nI hope this email finds you well! WriteAI helps professionals create high-quality content in seconds.\n\nBest regards,\nThe WriteAI Team`,
        default: `✨ Here's your ${activeTool.name} in ${currentTone} tone (${selectedLang}):\n\n"${inputText}"\n\nThis is high-quality content created by WriteAI. Your output is optimized for ${currentTone.toLowerCase()} tone.`
      };

      let output = mockResponses[activeTool.id] || mockResponses.default;
      const wordCount = output.split(/\s+/).filter(w => w.length > 0).length;
      setTotalGenerations(prev => prev + 1);
      setTotalWordsCount(prev => prev + wordCount);
      addToHistory(activeTool.name, output.substring(0, 80));
      setOutputText(output);
      setIsGenerating(false);
    }, 800);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    alert('✅ Copied to clipboard!');
  };

  const updateUserProfile = () => {
    setUserData(tempUserData);
    setEditMode(false);
    alert('✅ Profile updated successfully!');
  };

  // Login/Signup Component
  const AuthForm = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <div style={styles.authHeader}>
          <button 
            style={{ ...styles.authTab, borderBottom: showLogin ? '2px solid #667eea' : 'none', color: showLogin ? '#667eea' : '#666' }}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button 
            style={{ ...styles.authTab, borderBottom: !showLogin ? '2px solid #667eea' : 'none', color: !showLogin ? '#667eea' : '#666' }}
            onClick={() => setShowLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        {showLogin ? (
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(e.target.email.value, e.target.password.value); }}>
            <input type="email" name="email" placeholder="Email address" style={styles.authInput} required />
            <input type="password" name="password" placeholder="Password" style={styles.authInput} required />
            <button type="submit" style={styles.authButton}>Login →</button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(e.target.name.value, e.target.email.value, e.target.password.value); }}>
            <input type="text" name="name" placeholder="Full name" style={styles.authInput} required />
            <input type="email" name="email" placeholder="Email address" style={styles.authInput} required />
            <input type="password" name="password" placeholder="Password (min 6 characters)" style={styles.authInput} required />
            <button type="submit" style={styles.authButton}>Create Account →</button>
          </form>
        )}
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h2 style={{ marginBottom: '20px' }}>Complete Payment</h2>
        <p>Plan: <strong>{subscriptionPlan?.name}</strong> - ${subscriptionPlan?.price}/month</p>
        <input type="text" placeholder="Card Number" style={styles.authInput} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="MM/YY" style={{ ...styles.authInput, flex: 1 }} />
          <input type="text" placeholder="CVC" style={{ ...styles.authInput, flex: 1 }} />
        </div>
        <button onClick={handlePaymentComplete} style={{ ...styles.authButton, marginTop: '20px' }}>Pay ${subscriptionPlan?.price} →</button>
        <button onClick={() => setShowPayment(false)} style={{ ...styles.authButton, background: '#666', marginTop: '10px' }}>Cancel</button>
      </div>
    </div>
  );

  // Privacy Policy Modal
  const PrivacyPolicyModal = () => (
    <div style={styles.modalOverlay} onClick={() => setShowPrivacyPolicy(false)}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <h2>Privacy Policy</h2>
        <div style={{ maxHeight: '400px', overflow: 'auto', marginTop: '20px' }}>
          <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
          <h3>1. Information We Collect</h3>
          <p>We collect your name, email, and usage data to provide better services.</p>
          <h3>2. How We Use Your Information</h3>
          <p>We use your data to improve our AI writing tools and provide personalized content.</p>
          <h3>3. Data Security</h3>
          <p>We use industry-standard encryption to protect your data.</p>
          <h3>4. Your Rights</h3>
          <p>You can request account deletion anytime from your account settings.</p>
          <h3>5. Contact Us</h3>
          <p>Email: privacy@writeai.com</p>
        </div>
        <button onClick={() => setShowPrivacyPolicy(false)} style={{ ...styles.authButton, marginTop: '20px' }}>Close</button>
      </div>
    </div>
  );

  const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '0 24px' },
    landing: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    navbar: { padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
    logo: { fontSize: '28px', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #f0f0ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    hero: { textAlign: 'center', padding: '80px 0 60px' },
    heroH1: { fontSize: '56px', fontWeight: 800, color: 'white', marginBottom: '24px', lineHeight: 1.2 },
    heroP: { fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px' },
    ctaButton: { background: 'white', color: '#667eea', border: 'none', padding: '16px 40px', fontSize: '18px', fontWeight: 600, borderRadius: '50px', cursor: 'pointer' },
    toolsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '40px 0' },
    toolCard: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '24px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' },
    pricingSection: { background: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '40px', margin: '60px 0', textAlign: 'center' },
    pricingCards: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '30px' },
    priceCard: { background: 'white', borderRadius: '24px', padding: '32px', minWidth: '260px', textAlign: 'center', position: 'relative' },
    popularBadge: { position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#667eea', color: 'white', padding: '4px 16px', borderRadius: '20px', fontSize: '12px' },
    price: { fontSize: '48px', fontWeight: 800, color: '#667eea', marginBottom: '24px' },
    priceBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '40px', fontWeight: 600, cursor: 'pointer', width: '100%' },
    dashboard: { minHeight: '100vh', background: '#0a0a1a' },
    dashNav: { background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 },
    greetingToast: { background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '50px', marginBottom: '20px', textAlign: 'center', animation: 'slideDown 0.5s ease' },
    dashContent: { maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' },
    metrics: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' },
    metric: { background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' },
    metricValue: { fontSize: '36px', fontWeight: 800, color: 'white' },
    sectionTitle: { fontSize: '24px', fontWeight: 700, color: 'white', margin: '32px 0 20px' },
    authContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    authCard: { background: 'white', borderRadius: '24px', padding: '40px', width: '400px', maxWidth: '90%' },
    authHeader: { display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #eee' },
    authTab: { padding: '10px 0', fontSize: '18px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' },
    authInput: { width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
    authButton: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modalCard: { background: 'white', borderRadius: '24px', padding: '32px', width: '500px', maxWidth: '90%' },
    profileSection: { background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', marginBottom: '30px' },
    profileField: { marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
    profileLabel: { width: '120px', color: 'rgba(255,255,255,0.7)' },
    profileValue: { flex: 1, color: 'white', fontWeight: 500 },
    editInput: { background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 12px', borderRadius: '8px', color: 'white', flex: 1 },
    deleteBtn: { background: '#dc2626', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '40px', cursor: 'pointer', marginTop: '20px' },
    settingsBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', padding: '8px 16px', borderRadius: '40px', color: 'white', cursor: 'pointer' }
  };

  if (!isLoggedIn) {
    return <AuthForm />;
  }

  if (showPayment) {
    return <PaymentModal />;
  }

  if (showPrivacyPolicy) {
    return <PrivacyPolicyModal />;
  }

  return (
    <>
      <Head><title>WriteAI | Professional AI Writing Suite</title></Head>
      
      {activeView === 'landing' ? (
        <div style={styles.landing}>
          <div style={styles.container}>
            <nav style={styles.navbar}>
              <div style={styles.logo}>WriteAI</div>
              <button style={styles.settingsBtn} onClick={() => setActiveView('dashboard')}>Go to Dashboard →</button>
            </nav>
            <div style={styles.hero}>
              <h1 style={styles.heroH1}>Write professional content<br />10x faster with AI</h1>
              <p style={styles.heroP}>12 AI writing tools. 25 languages. Choose your perfect plan.</p>
              <button style={styles.ctaButton} onClick={() => setActiveView('dashboard')}>Start Writing →</button>
            </div>
            <div style={styles.pricingSection}>
              <h2 style={{ fontSize: '32px', color: 'white', marginBottom: '16px' }}>Choose Your Plan</h2>
              <div style={styles.pricingCards}>
                {PLANS.map(plan => (
                  <div key={plan.id} style={styles.priceCard}>
                    {plan.popular && <div style={styles.popularBadge}>🔥 MOST POPULAR</div>}
                    <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{plan.name}</h3>
                    <div style={styles.price}>${plan.price}<span style={{ fontSize: '14px' }}>/month</span></div>
                    <ul style={{ textAlign: 'left', marginBottom: '24px', listStyle: 'none', padding: 0 }}>
                      {plan.features.map((f, i) => <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>✓ {f}</li>)}
                    </ul>
                    <button style={styles.priceBtn} onClick={() => handleSubscribe(plan)}>Subscribe Now →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.dashboard}>
          <nav style={styles.dashNav}>
            <div style={styles.logo}>WriteAI</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {subscriptionPlan && <span style={{ background: '#10b981', padding: '6px 12px', borderRadius: '40px', fontSize: '12px' }}>⭐ {subscriptionPlan.name} Plan</span>}
              <button style={styles.settingsBtn} onClick={() => setActiveView('landing')}>🏠 Home</button>
            </div>
          </nav>

          <div style={styles.dashContent}>
            {greetingMessage && <div style={styles.greetingToast}>{greetingMessage}</div>}

            {!subscriptionPlan && (
              <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '20px', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
                <p style={{ color: 'white', marginBottom: '12px' }}>✨ Unlock all premium tools! Choose a plan to access Instagram, LinkedIn, Blog & more ✨</p>
                <button style={styles.ctaButton} onClick={() => setActiveView('landing')}>View Plans →</button>
              </div>
            )}

            {!activeTool ? (
              <>
                <div style={styles.metrics}>
                  <div style={styles.metric}><div style={styles.metricValue}>{totalGenerations}</div><div style={{ color: 'rgba(255,255,255,0.7)' }}>Total Generations</div></div>
                  <div style={styles.metric}><div style={styles.metricValue}>{totalWordsCount.toLocaleString()}</div><div style={{ color: 'rgba(255,255,255,0.7)' }}>Words Written</div></div>
                  <div style={styles.metric}><div style={styles.metricValue}>{Math.floor(totalWordsCount / 180)}h</div><div style={{ color: 'rgba(255,255,255,0.7)' }}>Time Saved</div></div>
                </div>

                {/* My Account Section - Editable */}
                <div style={styles.profileSection}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ color: 'white' }}>👤 My Account</h3>
                    <button style={styles.settingsBtn} onClick={() => { setEditMode(true); setTempUserData(userData); }}>✏️ Edit Profile</button>
                  </div>
                  
                  {editMode ? (
                    <div>
                      <div style={styles.profileField}>
                        <span style={styles.profileLabel}>Full Name:</span>
                        <input style={styles.editInput} value={tempUserData.name} onChange={(e) => setTempUserData({ ...tempUserData, name: e.target.value })} />
                      </div>
                      <div style={styles.profileField}>
                        <span style={styles.profileLabel}>Email:</span>
                        <input style={styles.editInput} value={tempUserData.email} onChange={(e) => setTempUserData({ ...tempUserData, email: e.target.value })} />
                      </div>
                      <div style={styles.profileField}>
                        <span style={styles.profileLabel}>Company:</span>
                        <input style={styles.editInput} value={tempUserData.company} onChange={(e) => setTempUserData({ ...tempUserData, company: e.target.value })} />
                      </div>
                      <div style={styles.profileField}>
                        <span style={styles.profileLabel}>Phone:</span>
                        <input style={styles.editInput} value={tempUserData.phone} onChange={(e) => setTempUserData({ ...tempUserData, phone: e.target.value })} />
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button style={styles.priceBtn} onClick={updateUserProfile}>Save Changes</button>
                        <button style={{ ...styles.priceBtn, background: '#666' }} onClick={() => setEditMode(false)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={styles.profileField}><span style={styles.profileLabel}>Name:</span><span style={styles.profileValue}>{userData.name}</span></div>
                      <div style={styles.profileField}><span style={styles.profileLabel}>Email:</span><span style={styles.profileValue}>{userData.email}</span></div>
                      <div style={styles.profileField}><span style={styles.profileLabel}>Company:</span><span style={styles.profileValue}>{userData.company || 'Not set'}</span></div>
                      <div style={styles.profileField}><span style={styles.profileLabel}>Phone:</span><span style={styles.profileValue}>{userData.phone || 'Not set'}</span></div>
                      <div style={styles.profileField}><span style={styles.profileLabel}>Member since:</span><span style={styles.profileValue}>{userData.joinedDate}</span></div>
                    </div>
                  )}
                </div>

                {/* Settings Section with Privacy Policy */}
                <div style={styles.profileSection}>
                  <h3 style={{ color: 'white', marginBottom: '16px' }}>⚙️ Settings</h3>
                  <button style={styles.settingsBtn} onClick={() => setShowPrivacyPolicy(true)}>📜 Privacy Policy</button>
                  <button style={{ ...styles.deleteBtn, marginLeft: '12px' }} onClick={handleDeleteAccount}>🗑️ Delete Account</button>
                </div>

                <h2 style={styles.sectionTitle}>✨ All Writing Tools</h2>
                <div style={styles.toolsGrid}>
                  {TOOLS.map((tool, idx) => (
                    <div key={idx} style={{ ...styles.toolCard, opacity: tool.premium && !subscriptionPlan ? 0.6 : 1 }} onClick={() => tool.premium && !subscriptionPlan ? alert('🔒 Please subscribe to access premium tools!') : setActiveTool(tool)}>
                      <div style={{ fontSize: '40px', marginBottom: '16px' }}>{tool.icon}</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>{tool.name}</div>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{tool.desc}</div>
                      {tool.premium && <div style={{ background: '#f59e0b', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginTop: '8px' }}>⭐ PREMIUM</div>}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '24px', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', color: 'white' }} onClick={() => setActiveTool(null)}>←</button>
                  <div style={{ fontSize: '32px' }}>{activeTool.icon}</div>
                  <h2 style={{ color: 'white', flex: 1 }}>{activeTool.name}</h2>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {TONES.map(tone => (
                    <button key={tone} style={{ background: currentTone === tone ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 20px', borderRadius: '40px', color: 'white', cursor: 'pointer' }} onClick={() => setCurrentTone(tone)}>{tone}</button>
                  ))}
                </div>

                <select style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 16px', borderRadius: '40px', marginBottom: '20px', cursor: 'pointer' }} value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
                  <option>English</option><option>Hindi</option><option>Arabic</option><option>Spanish</option><option>French</option><option>German</option>
                </select>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
                  <textarea rows="4" style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '14px', resize: 'vertical', outline: 'none' }} placeholder={`Write your ${activeTool.name} request here...`} value={inputText} onChange={(e) => setInputText(e.target.value)} />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <button style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', padding: '12px 28px', borderRadius: '40px', color: 'white', fontWeight: 600, cursor: 'pointer' }} onClick={generateContent} disabled={isGenerating}>{isGenerating ? 'Generating...' : '✨ Generate Content'}</button>
                  <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '40px', color: 'white', cursor: 'pointer' }} onClick={() => setInputText('')}>Clear</button>
                  {outputText && !outputText.includes('Generating') && <button style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '40px', color: 'white', cursor: 'pointer' }} onClick={copyOutput}>📋 Copy</button>}
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '20px', color: 'white', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {outputText || 'Your generated content will appear here...'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
