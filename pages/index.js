import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
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
  const [selectedRegion, setSelectedRegion] = useState('');

  const TOOLS = [
    { id: 'email', icon: '✉️', name: 'Cold Email', desc: 'Emails that get replies', premium: false, color: '#3B82F6' },
    { id: 'ads', icon: '📢', name: 'Ad Copy', desc: 'Facebook, Google & Instagram ads', premium: false, color: '#EF4444' },
    { id: 'whatsapp', icon: '💬', name: 'WhatsApp Caption', desc: 'WhatsApp business messages', premium: false, color: '#10B981' },
    { id: 'instagram', icon: '📸', name: 'Instagram Caption', desc: 'Viral Instagram posts & bios', premium: true, color: '#EC4899' },
    { id: 'proposal', icon: '📄', name: 'Business Proposal', desc: 'Win more clients', premium: true, color: '#8B5CF6' },
    { id: 'linkedin', icon: '🔗', name: 'LinkedIn Post', desc: 'Viral thought leadership', premium: true, color: '#0A66C2' },
    { id: 'product', icon: '🛍️', name: 'Product Description', desc: 'Convert visitors to buyers', premium: true, color: '#F59E0B' },
    { id: 'blog', icon: '✍️', name: 'Blog Article', desc: 'SEO-optimized content', premium: true, color: '#059669' },
    { id: 'rewrite', icon: '🔄', name: 'Rewrite & Improve', desc: 'Make any content better', premium: true, color: '#6366F1' },
    { id: 'subject', icon: '📧', name: 'Email Subject Lines', desc: 'High open-rate subjects', premium: true, color: '#F97316' },
    { id: 'youtube', icon: '▶️', name: 'YouTube Script', desc: 'Engaging video scripts', premium: true, color: '#DC2626' },
    { id: 'review', icon: '⭐', name: 'Review Response', desc: 'Reply to customer reviews', premium: true, color: '#FBBF24' }
  ];

  const TONES = ['Professional', 'Friendly', 'Persuasive', 'Formal', 'Witty', 'Empathetic', 'Bold', 'Casual'];

  const PRICING = {
    india: { monthly: '₹499', yearly: '₹4,999', currency: '₹' },
    middleeast: { monthly: 'AED 29', yearly: 'AED 299', currency: 'AED' },
    europe: { monthly: '€12', yearly: '€120', currency: '€' },
    global: { monthly: '$15', yearly: '$150', currency: '$' }
  };

  const getPricing = () => {
    return PRICING[selectedRegion] || PRICING.global;
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

    setIsGenerating(true);
    setOutputText('✨ Generating your premium content...');

    setTimeout(() => {
      const mockResponses = {
        email: `Subject: Transform Your Workflow with AI-Powered Writing

Hi there,

I hope this email finds you well! I'm reaching out because I noticed your interest in innovative solutions that save time and boost productivity.

WriteAI helps professionals like you create high-quality content in seconds. Whether it's emails, proposals, or social media posts — we've got you covered.

Would you be open to a quick 10-minute demo this week?

Best regards,
The WriteAI Team`,
        ads: `🔥 Stop Wasting Hours on Writing!

Headline: Write 10x Faster with AI
Body: Create compelling ad copy, emails, and content in seconds. Used by 50,000+ marketers.
CTA: Start Your Free Trial →`,
        whatsapp: `Hi! 👋 Thanks for reaching out to WriteAI. We help businesses automate their writing needs. How can I assist you today? Let me know if you'd like a demo!`,
        instagram: `✨ ${inputText.substring(0, 60)}... ✨

${currentTone} vibe with trending hashtags:

#ContentCreator #WritingTips #AIWriting #ProductivityHacks

Like & save for later! 🚀`,
        linkedin: `🚀 ${currentTone} LinkedIn Post:

${inputText}

What's your biggest writing challenge? Drop it in the comments! 👇

#WritingTips #AI #Productivity #ContentStrategy`,
        blog: `# ${currentTone} Blog: ${inputText.substring(0, 50)}...

## Introduction
${inputText}

## Key Benefits
1. Save 10+ hours weekly
2. Professional quality output
3. Consistent brand voice

## Conclusion
Start creating amazing content today with WriteAI.`,
        default: `✨ Here's your ${activeTool.name} in ${currentTone} tone (${selectedLang}):

"${inputText}"

This is a high-quality, engaging piece of content created by WriteAI's premium engine. The output is optimized for your target audience with the perfect ${currentTone.toLowerCase()} tone that resonates and drives action.

Key highlights:
• Clear, compelling structure
• Action-oriented language
• Professional finish

Your content is ready to use! Copy it and make it yours.`
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
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Copied!';
      setTimeout(() => copyBtn.innerHTML = originalHtml, 2000);
    }
  };

  const startFreeTrial = () => {
    setActiveView('dashboard');
  };

  return (
    <>
      <Head>
        <title>WriteAI | Write professional content 10x faster with AI</title>
        <meta name="description" content="12 AI writing tools. 25 languages including Arabic & Hindi. Better than Jasper at 1/4th the price." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1e1e2e;
        }
        ::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 4px;
        }
      `}</style>

      <style jsx>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Landing Page Styles */
        .landing {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .navbar {
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .logo {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #f0f0ff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .trial-badge {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 40px;
          font-size: 14px;
          color: white;
        }

        .hero {
          text-align: center;
          padding: 80px 0 60px;
        }

        .hero h1 {
          font-size: 56px;
          font-weight: 800;
          color: white;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .hero p {
          font-size: 20px;
          color: rgba(255,255,255,0.9);
          margin-bottom: 32px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          background: white;
          color: #667eea;
          border: none;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin: 60px 0;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          color: white;
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 40px 0;
        }

        .tool-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .tool-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.2);
        }

        .tool-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .tool-name {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }

        .tool-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }

        .premium-badge {
          background: gold;
          color: #333;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 20px;
          display: inline-block;
          margin-top: 8px;
        }

        .pricing-section {
          background: rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 40px;
          margin: 60px 0;
          text-align: center;
        }

        .pricing-title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
        }

        .region-selector {
          margin: 30px 0;
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .region-btn {
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 12px 24px;
          border-radius: 40px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .region-btn.active {
          background: white;
          color: #667eea;
        }

        .pricing-cards {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .price-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          min-width: 260px;
          text-align: center;
        }

        .price-card h3 {
          font-size: 24px;
          color: #333;
          margin-bottom: 16px;
        }

        .price {
          font-size: 48px;
          font-weight: 800;
          color: #667eea;
          margin-bottom: 24px;
        }

        .price-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 40px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }

        /* Dashboard Styles */
        .dashboard {
          min-height: 100vh;
          background: #0a0a1a;
        }

        .dash-nav {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .dash-logo {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dash-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .metric {
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 24px;
        }

        .metric-value {
          font-size: 36px;
          font-weight: 800;
          color: white;
        }

        .metric-label {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin-top: 8px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin: 32px 0 20px;
        }

        .tool-use-container {
          background: rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 32px;
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .back-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          color: white;
        }

        .tone-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tone-pill {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: 40px;
          color: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tone-pill.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: transparent;
        }

        .input-area {
          background: rgba(0,0,0,0.3);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .input-area textarea {
          width: 100%;
          background: transparent;
          border: none;
          color: white;
          font-size: 14px;
          resize: vertical;
          outline: none;
          font-family: inherit;
        }

        .input-area textarea::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .generate-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          padding: 12px 28px;
          border-radius: 40px;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .clear-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 12px 24px;
          border-radius: 40px;
          color: white;
          cursor: pointer;
        }

        .output-area {
          background: rgba(0,0,0,0.3);
          border-radius: 16px;
          padding: 20px;
          color: white;
          white-space: pre-wrap;
          line-height: 1.6;
        }

        .lang-select {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 10px 16px;
          border-radius: 40px;
          margin-bottom: 20px;
          cursor: pointer;
        }

        .recent-list {
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 20px;
        }

        .recent-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 32px; }
          .metrics { grid-template-columns: 1fr; }
          .tools-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {activeView === 'landing' ? (
        <div className="landing">
          <div className="container">
            <nav className="navbar">
              <div className="logo">WriteAI</div>
              <div className="trial-badge">✨ 7-day free trial — no credit card required</div>
            </nav>

            <div className="hero">
              <h1>Write professional content<br />10x faster with AI</h1>
              <p>12 AI writing tools. 25 languages including Arabic & Hindi. Better than Jasper at 1/4th the price. Used by businesses in India, UAE, UK & Europe.</p>
              <button className="cta-button" onClick={startFreeTrial}>Start your free trial →</button>
            </div>

            <div className="stats">
              <div className="stat-item"><div className="stat-number">10x</div><div className="stat-label">Faster writing</div></div>
              <div className="stat-item"><div className="stat-number">15+</div><div className="stat-label">Languages supported</div></div>
              <div className="stat-item"><div className="stat-number">5000+</div><div className="stat-label">Happy users</div></div>
            </div>

            <div className="tools-grid">
              {TOOLS.map((tool, idx) => (
                <div key={idx} className="tool-card" onClick={startFreeTrial}>
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-desc">{tool.desc}</div>
                  {tool.premium && <div className="premium-badge">PRO</div>}
                </div>
              ))}
            </div>

            <div className="pricing-section">
              <h2 className="pricing-title">Simple, transparent pricing</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>All plans start with a 7-day free trial. No credit card required.</p>
              
              <div className="region-selector">
                <button className={`region-btn ${selectedRegion === 'india' ? 'active' : ''}`} onClick={() => setSelectedRegion('india')}>🇮🇳 India</button>
                <button className={`region-btn ${selectedRegion === 'middleeast' ? 'active' : ''}`} onClick={() => setSelectedRegion('middleeast')}>🇦🇪 Middle East</button>
                <button className={`region-btn ${selectedRegion === 'europe' ? 'active' : ''}`} onClick={() => setSelectedRegion('europe')}>🇪🇺 Europe</button>
                <button className={`region-btn ${selectedRegion === 'global' ? 'active' : ''}`} onClick={() => setSelectedRegion('global')}>🌍 Global</button>
              </div>

              {selectedRegion && (
                <div className="pricing-cards">
                  <div className="price-card">
                    <h3>Monthly</h3>
                    <div className="price">{getPricing().monthly}<span style={{ fontSize: '16px' }}>/month</span></div>
                    <button className="price-btn" onClick={startFreeTrial}>Start 7-day trial</button>
                  </div>
                  <div className="price-card">
                    <h3>Yearly</h3>
                    <div className="price">{getPricing().yearly}<span style={{ fontSize: '16px' }}>/year</span></div>
                    <button className="price-btn" onClick={startFreeTrial}>Save 20% → Start trial</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <nav className="dash-nav">
            <div className="dash-logo">WriteAI</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="clear-btn" style={{ padding: '8px 16px' }} onClick={() => setActiveView('landing')}>← Back</button>
              <div style={{ background: '#667eea', padding: '8px 16px', borderRadius: '40px', fontSize: '12px' }}>✨ Premium Active</div>
            </div>
          </nav>

          <div className="dash-content">
            {!activeTool ? (
              <>
                <div className="metrics">
                  <div className="metric"><div className="metric-value">{totalGenerations}</div><div className="metric-label">Total Generations</div></div>
                  <div className="metric"><div className="metric-value">{totalWordsCount.toLocaleString()}</div><div className="metric-label">Words Written</div></div>
                  <div className="metric"><div className="metric-value">{Math.floor(totalWordsCount / 180)}h</div><div className="metric-label">Time Saved</div></div>
                </div>

                <h2 className="section-title">✨ All Writing Tools</h2>
                <div className="tools-grid">
                  {TOOLS.map((tool, idx) => (
                    <div key={idx} className="tool-card" onClick={() => setActiveTool(tool)}>
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-name">{tool.name}</div>
                      <div className="tool-desc">{tool.desc}</div>
                    </div>
                  ))}
                </div>

                {recentHistory.length > 0 && (
                  <>
                    <h2 className="section-title">📜 Recent Generations</h2>
                    <div className="recent-list">
                      {recentHistory.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="recent-item">
                          <span><strong>{item.toolName}</strong> - {item.text.substring(0, 60)}...</span>
                          <span style={{ fontSize: '12px', opacity: 0.6 }}>{new Date(item.timestamp).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="tool-use-container">
                <div className="tool-header">
                  <button className="back-btn" onClick={() => setActiveTool(null)}>←</button>
                  <div className="tool-icon" style={{ fontSize: '32px' }}>{activeTool.icon}</div>
                  <h2 style={{ color: 'white', flex: 1 }}>{activeTool.name}</h2>
                  <div className="premium-badge" style={{ background: '#667eea', color: 'white' }}>Premium Tool</div>
                </div>

                <div className="tone-row">
                  {TONES.map(tone => (
                    <button
                      key={tone}
                      className={`tone-pill ${currentTone === tone ? 'active' : ''}`}
                      onClick={() => setCurrentTone(tone)}
                    >
                      {tone}
                    </button>
                  ))}
                </div>

                <select className="lang-select" value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
                  <option>English</option><option>Hindi</option><option>Arabic</option><option>Spanish</option>
                  <option>French</option><option>German</option><option>Urdu</option><option>Turkish</option>
                </select>

                <div className="input-area">
                  <textarea
                    rows="4"
                    placeholder={`Write your ${activeTool.name.toLowerCase()} request here...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                <div className="action-buttons">
                  <button className="generate-btn" onClick={generateContent} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : '✨ Generate Content'}
                  </button>
                  <button className="clear-btn" onClick={() => setInputText('')}>Clear</button>
                  {outputText && !outputText.includes('Generating') && outputText !== '✨ Generating your premium content...' && (
                    <button className="clear-btn" id="copy-btn" onClick={copyOutput}>📋 Copy</button>
                  )}
                </div>

                <div className="output-area">
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
