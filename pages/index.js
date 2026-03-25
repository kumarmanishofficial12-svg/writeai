<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>WriteAI | Professional Writing Suite - Premium Experience</title>
    <!-- Google Fonts - Premium & Clean -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #070B14;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background-image: 
                radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 85% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
                linear-gradient(135deg, #070B14 0%, #0A0F1A 100%);
        }

        /* Main App Container - Premium Glassmorphism */
        .app {
            display: flex;
            width: 1440px;
            max-width: 98vw;
            height: 90vh;
            min-height: 720px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 32px;
            box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.25);
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }

        /* SIDEBAR - Premium Dark */
        .sidebar {
            width: 280px;
            background: rgba(8, 12, 24, 0.9);
            backdrop-filter: blur(12px);
            border-right: 1px solid rgba(56, 189, 248, 0.2);
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }

        .sb-logo {
            padding: 28px 24px 20px;
            border-bottom: 1px solid rgba(71, 85, 105, 0.3);
        }

        .logo-text {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.8px;
            background: linear-gradient(135deg, #FFFFFF, #A78BFA, #60A5FA);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .logo-sub {
            font-size: 10px;
            color: #7C8DB0;
            letter-spacing: 1px;
            margin-top: 6px;
            font-weight: 500;
            text-transform: uppercase;
        }

        .sb-user {
            margin: 24px 20px 20px;
            background: linear-gradient(135deg, #1E293B, #0F172A);
            border-radius: 20px;
            padding: 16px;
            border: 1px solid rgba(99, 102, 241, 0.3);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .user-avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366F1, #A855F7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .user-name {
            font-weight: 700;
            font-size: 16px;
            color: #F1F5F9;
        }

        .user-badge {
            font-size: 11px;
            background: linear-gradient(90deg, #6366F1, #8B5CF6);
            display: inline-block;
            padding: 3px 12px;
            border-radius: 30px;
            color: white;
            font-weight: 600;
            margin-top: 4px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 16px;
            margin: 6px 12px;
            border-radius: 14px;
            transition: all 0.2s;
            font-size: 14px;
            font-weight: 500;
            color: #94A3B8;
            cursor: pointer;
        }

        .nav-item i {
            width: 24px;
            font-size: 1.2rem;
        }

        .nav-item:hover {
            background: rgba(99, 102, 241, 0.15);
            color: #FFFFFF;
            transform: translateX(4px);
        }

        .nav-item.active {
            background: linear-gradient(95deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.2));
            border-left: 3px solid #8B5CF6;
            color: #FFFFFF;
        }

        /* Premium Subscription Card */
        .premium-card {
            margin: 16px;
            background: linear-gradient(135deg, #1E1B4B, #0F0A2A);
            border-radius: 24px;
            padding: 20px;
            border: 1px solid rgba(139, 92, 246, 0.5);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .premium-title {
            font-weight: 800;
            font-size: 16px;
            color: #C4B5FD;
        }

        .premium-feature {
            font-size: 11px;
            color: #9CA3AF;
            margin: 8px 0;
        }

        .premium-badge {
            background: rgba(139, 92, 246, 0.3);
            padding: 6px 12px;
            border-radius: 30px;
            font-size: 12px;
            font-weight: 600;
            color: #C084FC;
            text-align: center;
        }

        /* Main Area */
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: rgba(5, 10, 20, 0.4);
        }

        .topbar {
            padding: 20px 28px;
            border-bottom: 1px solid rgba(71, 85, 105, 0.3);
            background: rgba(8, 12, 24, 0.5);
        }

        .topbar-title {
            font-size: 24px;
            font-weight: 700;
            font-family: 'Space Grotesk', sans-serif;
            background: linear-gradient(135deg, #F1F5F9, #CBD5E1);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Metric Cards */
        .metric-card {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 24px;
            padding: 20px;
            transition: all 0.25s;
        }

        .metric-card:hover {
            transform: translateY(-3px);
            border-color: #8B5CF6;
            box-shadow: 0 12px 24px -8px rgba(99, 102, 241, 0.3);
        }

        .metric-val {
            font-size: 36px;
            font-weight: 800;
            font-family: 'Space Grotesk', sans-serif;
            background: linear-gradient(135deg, #FFFFFF, #A78BFA);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .metric-label {
            font-size: 12px;
            color: #8B9DC0;
            font-weight: 500;
            letter-spacing: 0.5px;
        }

        /* Tool Cards - Premium Style */
        .tool-card {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(71, 85, 105, 0.4);
            border-radius: 20px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            position: relative;
            overflow: hidden;
        }

        .tool-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .tool-card:hover {
            transform: translateY(-6px);
            border-color: #8B5CF6;
            box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.5);
        }

        .tool-card:hover::after {
            opacity: 1;
        }

        .tool-icon-wrap {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 14px;
        }

        .tool-name {
            font-size: 16px;
            font-weight: 700;
            color: #F1F5F9;
            margin-bottom: 6px;
        }

        .tool-desc {
            font-size: 12px;
            color: #8B9DC0;
            line-height: 1.4;
        }

        .premium-tag {
            position: absolute;
            top: 12px;
            right: 12px;
            background: linear-gradient(135deg, #8B5CF6, #6366F1);
            padding: 3px 10px;
            border-radius: 30px;
            font-size: 10px;
            font-weight: 700;
            color: white;
        }

        /* Input & Output Areas */
        .input-area {
            background: rgba(8, 12, 24, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 20px;
            padding: 16px;
        }

        .input-area textarea {
            width: 100%;
            background: transparent;
            border: none;
            color: #F1F5F9;
            font-size: 14px;
            line-height: 1.6;
            resize: none;
            outline: none;
            font-family: 'Inter', sans-serif;
        }

        .input-area textarea::placeholder {
            color: #4B5563;
        }

        .gen-btn {
            background: linear-gradient(135deg, #6366F1, #A855F7);
            border: none;
            padding: 12px 28px;
            border-radius: 40px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            color: white;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .gen-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5);
        }

        .clear-btn {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.4);
            padding: 12px 24px;
            border-radius: 40px;
            color: #CBD5E1;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }

        .clear-btn:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: #8B5CF6;
            color: white;
        }

        .output-area {
            background: rgba(8, 12, 24, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 20px;
            padding: 20px;
            min-height: 150px;
            font-size: 14px;
            line-height: 1.7;
            color: #E2E8F0;
            position: relative;
        }

        .tone-pill {
            padding: 8px 20px;
            border-radius: 40px;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(71, 85, 105, 0.5);
            color: #94A3B8;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }

        .tone-pill.on, .tone-pill:hover {
            background: linear-gradient(135deg, #6366F1, #8B5CF6);
            border-color: transparent;
            color: white;
            transform: translateY(-2px);
        }

        .lang-select {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(99, 102, 241, 0.4);
            color: #F1F5F9;
            border-radius: 40px;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
        }

        .recent-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid rgba(71, 85, 105, 0.2);
            transition: all 0.2s;
        }

        .recent-item:hover {
            background: rgba(99, 102, 241, 0.08);
            padding-left: 8px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 5px;
        }
        ::-webkit-scrollbar-track {
            background: #0F172A;
        }
        ::-webkit-scrollbar-thumb {
            background: #6366F1;
            border-radius: 10px;
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body>
<div class="app">
    <div class="sidebar">
        <div class="sb-logo">
            <div class="logo-text">WriteAI</div>
            <div class="logo-sub">Premium Writing Suite</div>
        </div>
        <div class="sb-user">
            <div style="display: flex; align-items: center; gap: 14px;">
                <div class="user-avatar">MK</div>
                <div>
                    <div class="user-name">Manish Kumar</div>
                    <div class="user-badge"><i class="fas fa-crown"></i> Premium Member</div>
                </div>
            </div>
        </div>
        <div class="sb-nav" style="flex: 1; overflow-y: auto; margin-top: 8px;">
            <div class="nav-item active" id="nav-dash"><i class="fas fa-chart-pie"></i> Dashboard</div>
            <div class="nav-item" id="nav-tools"><i class="fas fa-feather-alt"></i> Writing Tools</div>
            <div class="nav-item"><i class="fas fa-clock-rotate-left"></i> History</div>
            <div style="margin: 16px 16px 8px; font-size: 11px; color: #5B6E9C;">ACCOUNT</div>
            <div class="nav-item"><i class="fas fa-user"></i> My Profile</div>
            <div class="nav-item"><i class="fas fa-sliders-h"></i> Preferences</div>
            <div class="nav-item"><i class="fas fa-sign-out-alt"></i> Sign Out</div>
        </div>
        <div class="premium-card">
            <div class="premium-title"><i class="fas fa-gem"></i> Premium Active</div>
            <div class="premium-feature">✓ Unlimited generations</div>
            <div class="premium-feature">✓ All 12+ writing tools</div>
            <div class="premium-feature">✓ Priority support</div>
            <div class="premium-badge" style="margin-top: 12px;"><i class="fas fa-check-circle"></i> Full Access</div>
        </div>
    </div>

    <div class="main">
        <div class="topbar">
            <div class="topbar-title" id="topbar-title"><i class="fas fa-chart-pie"></i> Dashboard</div>
        </div>
        <div class="main-body" style="flex: 1; overflow-y: auto; padding: 24px 28px;" id="main-body">
            <!-- DASHBOARD VIEW -->
            <div id="dash-view">
                <div class="metrics-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px;">
                    <div class="metric-card"><div class="metric-label"><i class="fas fa-chart-line"></i> Generated Today</div><div class="metric-val" id="stat-gen">0</div><div class="metric-label" style="font-size: 11px;">✨ Premium usage</div></div>
                    <div class="metric-card"><div class="metric-label"><i class="fas fa-paragraph"></i> Total Words</div><div class="metric-val" id="stat-words">0</div><div class="metric-label" style="font-size: 11px;">Lifetime count</div></div>
                    <div class="metric-card"><div class="metric-label"><i class="fas fa-rocket"></i> Productivity</div><div class="metric-val" id="stat-time">0h</div><div class="metric-label" style="font-size: 11px;">Time saved</div></div>
                </div>
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 18px; color: #F1F5F9;"><i class="fas fa-bolt"></i> Quick Start Tools</div>
                <div class="tools-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;" id="quick-tools"></div>
                <div style="background: rgba(15, 23, 42, 0.5); border-radius: 24px; padding: 20px; border: 1px solid rgba(99, 102, 241, 0.2);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                        <span style="font-weight: 700; color: #F1F5F9;"><i class="fas fa-history"></i> Recent Creations</span>
                        <span style="color: #8B5CF6; font-size: 13px; cursor: pointer;">View All →</span>
                    </div>
                    <div id="recent-list" style="min-height: 120px;"></div>
                </div>
            </div>
            <!-- TOOLS GRID VIEW -->
            <div id="tools-view" style="display: none;">
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 24px; color: #F1F5F9;"><i class="fas fa-crown"></i> All Premium Tools</div>
                <div class="tools-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;" id="all-tools"></div>
            </div>
            <!-- TOOL USE VIEW -->
            <div id="tool-use-view" style="display: none;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                    <div class="back-btn" id="back-tools-btn" style="width: 40px; height: 40px; background: rgba(30, 41, 59, 0.8); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;"><i class="fas fa-arrow-left"></i></div>
                    <span style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, #FFFFFF, #A78BFA); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;" id="active-tool-name">Tool</span>
                    <span style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 5px 14px; border-radius: 40px; font-size: 11px; font-weight: 600;"><i class="fas fa-star"></i> Premium Tool</span>
                </div>
                <div style="margin-bottom: 16px;"><span style="font-size: 12px; color: #8B9DC0; font-weight: 600;">TONE STYLE</span></div>
                <div class="tone-row" id="tone-row" style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;"></div>
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
                    <span style="font-size: 12px; color: #8B9DC0; font-weight: 600;"><i class="fas fa-globe"></i> Language</span>
                    <select class="lang-select" id="lang-sel">
                        <option>English</option><option>Hindi</option><option>Spanish</option><option>French</option><option>German</option><option>Arabic</option><option>Japanese</option><option>Korean</option><option>Portuguese</option><option>Italian</option>
                    </select>
                </div>
                <div class="input-area">
                    <textarea id="tool-inp" rows="3" placeholder="Describe what you want to create... Example: Write a persuasive email for a new AI tool launch"></textarea>
                </div>
                <div style="display: flex; gap: 14px; margin: 20px 0 20px;">
                    <button class="gen-btn" id="gen-btn"><i class="fas fa-magic"></i> Generate Content</button>
                    <button class="clear-btn" id="clear-inp-btn"><i class="fas fa-eraser"></i> Clear</button>
                    <button class="clear-btn" id="copy-out" style="display: none;"><i class="fas fa-copy"></i> Copy</button>
                </div>
                <div class="output-area" id="tool-out">
                    <span style="color: #6B7280;">✨ Your premium content will appear here. Start by typing your request above.</span>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const TOOLS = [
        {id:'email',icon:'fas fa-envelope',bg:'#1E293B',name:'Cold Email',desc:'High-converting emails that get replies',sys:'Expert cold email copywriter. Write compelling emails with subject line.', premium:false},
        {id:'ads',icon:'fas fa-chart-line',bg:'#1E293B',name:'Ad Copy',desc:'Facebook, Google & Instagram ads',sys:'Direct response ad expert. Write high-converting ad copy.', premium:false},
        {id:'whatsapp',icon:'fab fa-whatsapp',bg:'#1E293B',name:'WhatsApp Messages',desc:'Engaging business communication',sys:'WhatsApp Business expert. Write short engaging messages.', premium:false},
        {id:'instagram',icon:'fab fa-instagram',bg:'#1E293B',name:'Instagram Captions',desc:'Viral posts & reels scripts',sys:'Instagram strategist. Write viral captions with emojis and hashtags.', premium:true},
        {id:'linkedin',icon:'fab fa-linkedin',bg:'#1E293B',name:'LinkedIn Posts',desc:'Thought leadership content',sys:'LinkedIn expert. Write engaging posts that drive engagement.', premium:true},
        {id:'blog',icon:'fas fa-newspaper',bg:'#1E293B',name:'Blog Articles',desc:'SEO-optimized content',sys:'SEO writer. Write well-structured blog content with headings.', premium:true},
        {id:'product',icon:'fas fa-tag',bg:'#1E293B',name:'Product Descriptions',desc:'Convert visitors to buyers',sys:'Ecommerce copywriter. Write persuasive product descriptions.', premium:true},
        {id:'proposal',icon:'fas fa-file-contract',bg:'#1E293B',name:'Business Proposals',desc:'Win more clients',sys:'Business consultant. Write professional winning proposals.', premium:true},
        {id:'rewrite',icon:'fas fa-rotate',bg:'#1E293B',name:'Rewrite & Improve',desc:'Enhance any content',sys:'Expert editor. Rewrite content to be more engaging.', premium:true},
        {id:'youtube',icon:'fab fa-youtube',bg:'#1E293B',name:'YouTube Scripts',desc:'Engaging video scripts',sys:'YouTube strategist. Write scripts with hook and CTA.', premium:true},
        {id:'subject',icon:'fas fa-envelope-open-text',bg:'#1E293B',name:'Subject Lines',desc:'High open rates',sys:'Email expert. Generate 5 high open-rate subject lines.', premium:true},
        {id:'review',icon:'fas fa-star',bg:'#1E293B',name:'Review Responses',desc:'Professional customer replies',sys:'Customer service expert. Write professional review responses.', premium:true}
    ];
    const TONES = ['Professional', 'Friendly', 'Persuasive', 'Formal', 'Witty', 'Empathetic', 'Bold', 'Minimal'];
    let activeTool = null;
    let currentTone = 'Professional';
    let totalGenerations = 0;
    let totalWordsCount = 0;
    let recentHistory = [];

    function updateStats() {
        document.getElementById('stat-gen').innerText = totalGenerations;
        document.getElementById('stat-words').innerText = totalWordsCount.toLocaleString();
        let hoursSaved = Math.floor(totalWordsCount / 180);
        document.getElementById('stat-time').innerText = hoursSaved + 'h';
        
        const recentContainer = document.getElementById('recent-list');
        if(recentHistory.length === 0) {
            recentContainer.innerHTML = '<div style="text-align: center; padding: 30px; color: #6B7280;"><i class="fas fa-feather-alt"></i> No content yet. Generate something amazing!</div>';
        } else {
            recentContainer.innerHTML = recentHistory.slice(0, 4).map(item => `
                <div class="recent-item">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #6366F1, #8B5CF6); border-radius: 12px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-file-alt"></i></div>
                    <div style="flex: 1;">
                        <div style="font-size: 13px; font-weight: 600; color: #F1F5F9;">${item.toolName}</div>
                        <div style="font-size: 11px; color: #8B9DC0;">${item.text.substring(0, 70)}${item.text.length > 70 ? '...' : ''}</div>
                    </div>
                    <div style="font-size: 10px; color: #5B6E9C;">${new Date(item.timestamp).toLocaleTimeString()}</div>
                </div>
            `).join('');
        }
    }

    function addToHistory(toolName, text) {
        recentHistory.unshift({ toolName, text, timestamp: Date.now() });
        if(recentHistory.length > 10) recentHistory.pop();
        updateStats();
    }

    function renderTools(containerId, limit = null) {
        const container = document.getElementById(containerId);
        if(!container) return;
        const tools = limit ? TOOLS.slice(0, limit) : TOOLS;
        container.innerHTML = '';
        tools.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                ${t.premium ? '<div class="premium-tag"><i class="fas fa-crown"></i> PRO</div>' : ''}
                <div class="tool-icon-wrap" style="background: ${t.bg};"><i class="${t.icon}" style="font-size: 24px; color: #A78BFA;"></i></div>
                <div class="tool-name">${t.name}</div>
                <div class="tool-desc">${t.desc}</div>
                <div style="margin-top: 12px; font-size: 11px; color: #8B5CF6;"><i class="fas fa-arrow-right"></i> Generate</div>
            `;
            card.onclick = () => openTool(t);
            container.appendChild(card);
        });
    }

    function showDash() {
        document.getElementById('dash-view').style.display = 'block';
        document.getElementById('tools-view').style.display = 'none';
        document.getElementById('tool-use-view').style.display = 'none';
        document.getElementById('topbar-title').innerHTML = '<i class="fas fa-chart-pie"></i> Dashboard';
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.getElementById('nav-dash').classList.add('active');
    }

    function showTools() {
        document.getElementById('dash-view').style.display = 'none';
        document.getElementById('tools-view').style.display = 'block';
        document.getElementById('tool-use-view').style.display = 'none';
        document.getElementById('topbar-title').innerHTML = '<i class="fas fa-feather-alt"></i> Writing Tools';
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        document.getElementById('nav-tools').classList.add('active');
    }

    function openTool(tool) {
        activeTool = tool;
        document.getElementById('dash-view').style.display = 'none';
        document.getElementById('tools-view').style.display = 'none';
        document.getElementById('tool-use-view').style.display = 'block';
        document.getElementById('active-tool-name').innerHTML = `<i class="${tool.icon}"></i> ${tool.name}`;
        document.getElementById('tool-inp').value = '';
        document.getElementById('tool-out').innerHTML = '<span style="color: #6B7280;">✨ Your premium content will appear here. Start by typing your request above.</span>';
        document.getElementById('copy-out').style.display = 'none';
        document.getElementById('topbar-title').innerHTML = `<i class="${tool.icon}"></i> ${tool.name}`;
        
        const toneRow = document.getElementById('tone-row');
        toneRow.innerHTML = '';
        TONES.forEach(tn => {
            const pill = document.createElement('button');
            pill.className = 'tone-pill' + (tn === currentTone ? ' on' : '');
            pill.textContent = tn;
            pill.onclick = () => {
                document.querySelectorAll('.tone-pill').forEach(p => p.classList.remove('on'));
                pill.classList.add('on');
                currentTone = tn;
            };
            toneRow.appendChild(pill);
        });
    }

    async function generateContent() {
        const inputEl = document.getElementById('tool-inp');
        const inputText = inputEl.value.trim();
        if(!inputText || !activeTool) {
            document.getElementById('tool-out').innerHTML = '<span style="color: #F87171;">⚠️ Please describe what you want to create.</span>';
            return;
        }
        
        const btn = document.getElementById('gen-btn');
        const lang = document.getElementById('lang-sel').value;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Creating...';
        const outDiv = document.getElementById('tool-out');
        outDiv.innerHTML = '<div style="display: flex; gap: 6px; align-items: center;"><i class="fas fa-circle-notch fa-spin"></i> Generating premium content...</div>';
        document.getElementById('copy-out').style.display = 'none';
        
        // Simulate AI generation with rich, creative output
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
                default: `✨ Here's your ${activeTool.name} in ${currentTone} tone (${lang}):

${inputText}

Based on your request, here's a professionally crafted response:

"${inputText.substring(0, 100)}... This is a high-quality, engaging piece of content created by WriteAI's premium engine. The output is optimized for your target audience with the perfect ${currentTone.toLowerCase()} tone that resonates and drives action.

Key highlights:
• Clear, compelling structure
• Action-oriented language
• Professional finish

Your content is ready to use! Copy it and make it yours."`
            };
            
            let output = mockResponses[activeTool.id] || mockResponses.default;
            if(activeTool.id === 'instagram') output = `✨ ${inputText.substring(0, 60)}... ✨\n\n${currentTone} vibe with trending hashtags:\n\n#ContentCreator #WritingTips #AIWriting #ProductivityHacks\n\nLike & save for later! 🚀`;
            if(activeTool.id === 'linkedin') output = `🚀 ${currentTone} LinkedIn Post:\n\n${inputText}\n\nWhat's your biggest writing challenge? Drop it in the comments! 👇\n\n#WritingTips #AI #Productivity #ContentStrategy`;
            if(activeTool.id === 'blog') output = `# ${currentTone} Blog: ${inputText.substring(0, 50)}...\n\n## Introduction\n${inputText}\n\n## Key Benefits\n1. Save 10+ hours weekly\n2. Professional quality output\n3. Consistent brand voice\n\n## Conclusion\nStart creating amazing content today with WriteAI.`;
            
            const wordCount = output.split(/\s+/).filter(w => w.length > 0).length;
            totalGenerations++;
            totalWordsCount += wordCount;
            addToHistory(activeTool.name, output.substring(0, 80));
            
            outDiv.innerHTML = output;
            document.getElementById('copy-out').style.display = 'inline-flex';
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> Generate Content';
        }, 800);
    }

    function copyOutput() {
        const text = document.getElementById('tool-out').innerText;
        navigator.clipboard.writeText(text);
        const btn = document.getElementById('copy-out');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i> Copy', 2000);
    }

    // Initialize
    renderTools('quick-tools', 6);
    renderTools('all-tools');
    updateStats();
    
    document.getElementById('nav-dash').onclick = showDash;
    document.getElementById('nav-tools').onclick = showTools;
    document.getElementById('back-tools-btn').onclick = showTools;
    document.getElementById('gen-btn').onclick = generateContent;
    document.getElementById('copy-out').onclick = copyOutput;
    document.getElementById('clear-inp-btn').onclick = () => document.getElementById('tool-inp').value = '';
    
    showDash();
</script>
</body>
</html>
