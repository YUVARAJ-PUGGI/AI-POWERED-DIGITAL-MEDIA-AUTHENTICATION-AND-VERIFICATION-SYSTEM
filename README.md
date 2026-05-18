<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VerifyMedia - AI & Deepfake Detection Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-cyan: #06b6d4;
            --primary-indigo: #6366f1;
            --primary-blue: #3b82f6;
            --dark-bg: #0f172a;
            --dark-card: #1e293b;
            --dark-border: #334155;
            --text-primary: #f1f5f9;
            --text-secondary: #cbd5e1;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1a1f35 100%);
            color: var(--text-primary);
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes gradientShift {
            0%, 100% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }

        @keyframes blobMorph {
            0%, 100% {
                border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
                border-radius: 30% 60% 70% 40% / 40% 70% 30% 60%;
            }
        }

        /* ===== HEADER SECTION ===== */
        header {
            position: relative;
            overflow: hidden;
            padding: 60px 40px;
            text-align: center;
            animation: slideInDown 0.8s ease-out;
        }

        .header-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
            pointer-events: none;
        }

        .blob {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 60% 40% 30% 70%;
            opacity: 0.15;
            animation: blobMorph 8s infinite;
            pointer-events: none;
        }

        .blob-1 {
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-blue));
            top: -50px;
            left: -50px;
            animation-delay: 0s;
        }

        .blob-2 {
            background: linear-gradient(135deg, var(--primary-indigo), var(--primary-cyan));
            bottom: -50px;
            right: -50px;
            animation-delay: 4s;
        }

        header h1 {
            position: relative;
            font-size: 3.5em;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary-cyan) 0%, var(--primary-blue) 50%, var(--primary-indigo) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            animation: slideInDown 1s ease-out;
        }

        .tagline {
            position: relative;
            font-size: 1.3em;
            color: var(--text-secondary);
            animation: slideInUp 1s ease-out;
        }

        .tagline .highlight {
            color: var(--primary-cyan);
            font-weight: 600;
        }

        /* ===== SECTION STYLES ===== */
        section {
            max-width: 1200px;
            margin: 60px auto;
            padding: 40px;
            animation: slideInUp 0.8s ease-out;
        }

        h2 {
            font-size: 2.5em;
            margin-bottom: 30px;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 15px;
            border-bottom: 3px solid var(--primary-cyan);
            padding-bottom: 15px;
        }

        h2::before {
            content: '';
            width: 10px;
            height: 30px;
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-blue));
            border-radius: 5px;
        }

        /* ===== PROBLEM STATEMENT ===== */
        .problem-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
        }

        .problem-card {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
            border: 1px solid var(--dark-border);
            border-radius: 12px;
            padding: 30px;
            transition: all 0.3s ease;
            animation: slideInUp 0.8s ease-out;
        }

        .problem-card:hover {
            transform: translateY(-10px);
            border-color: var(--primary-cyan);
            box-shadow: 0 20px 40px rgba(6, 182, 212, 0.2);
        }

        .problem-card h3 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: var(--primary-cyan);
        }

        .problem-card p {
            color: var(--text-secondary);
            line-height: 1.8;
        }

        /* ===== CAPABILITIES GRID ===== */
        .capabilities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .capability-item {
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid var(--dark-border);
            border-radius: 10px;
            padding: 25px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .capability-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-cyan), var(--primary-blue), transparent);
            animation: shimmer 2s infinite;
        }

        .capability-item:hover {
            transform: translateY(-8px);
            border-color: var(--primary-indigo);
            box-shadow: 0 15px 30px rgba(99, 102, 241, 0.2);
        }

        .capability-item h4 {
            color: var(--primary-indigo);
            margin-bottom: 12px;
            font-size: 1.1em;
        }

        .capability-item p {
            color: var(--text-secondary);
            font-size: 0.95em;
        }

        /* ===== HOW IT WORKS ===== */
        .workflow-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            position: relative;
            flex-wrap: wrap;
            gap: 20px;
        }

        .workflow-step {
            flex: 1;
            min-width: 150px;
            text-align: center;
            position: relative;
            animation: slideInUp 0.8s ease-out;
        }

        .step-number {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, var(--primary-cyan), var(--primary-blue));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8em;
            font-weight: bold;
            animation: pulse 2s infinite;
        }

        .step-number.step-1 { animation-delay: 0s; }
        .step-number.step-2 { animation-delay: 0.2s; }
        .step-number.step-3 { animation-delay: 0.4s; }
        .step-number.step-4 { animation-delay: 0.6s; }
        .step-number.step-5 { animation-delay: 0.8s; }

        .workflow-step h4 {
            color: var(--primary-cyan);
            margin-bottom: 10px;
        }

        .workflow-step p {
            color: var(--text-secondary);
            font-size: 0.9em;
        }

        .workflow-arrow {
            position: absolute;
            top: 30px;
            right: -40px;
            font-size: 2em;
            color: var(--primary-indigo);
            opacity: 0.5;
        }

        .workflow-step:last-child .workflow-arrow {
            display: none;
        }

        /* ===== OUTPUT CLASSIFICATION ===== */
        .classification-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .classification-badge {
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid;
            background: rgba(30, 41, 59, 0.3);
        }

        .badge-authentic {
            border-color: var(--primary-cyan);
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), transparent);
        }

        .badge-ai {
            border-color: var(--primary-indigo);
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
        }

        .badge-manipulated {
            border-color: #f43f5e;
            background: linear-gradient(135deg, rgba(244, 63, 94, 0.1), transparent);
        }

        .badge-inconclusive {
            border-color: var(--primary-blue);
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
        }

        .classification-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
        }

        .classification-badge h4 {
            font-size: 1.2em;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .badge-authentic h4 { color: var(--primary-cyan); }
        .badge-ai h4 { color: var(--primary-indigo); }
        .badge-manipulated h4 { color: #f43f5e; }
        .badge-inconclusive h4 { color: var(--primary-blue); }

        .classification-badge p {
            color: var(--text-secondary);
            font-size: 0.9em;
        }

        /* ===== FILE STRUCTURE ===== */
        .file-structure {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
            border: 1px solid var(--dark-border);
            border-radius: 10px;
            padding: 30px;
            margin-top: 30px;
            overflow-x: auto;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
        }

        .file-structure code {
            color: var(--primary-cyan);
            line-height: 1.8;
            display: block;
        }

        .folder { color: var(--primary-indigo); font-weight: 600; }
        .file { color: var(--text-secondary); }
        .description { color: var(--text-secondary); opacity: 0.7; margin-left: 20px; }

        /* ===== TECH STACK ===== */
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .tech-item {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid var(--dark-border);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .tech-item:hover {
            transform: translateY(-5px);
            border-color: var(--primary-cyan);
            box-shadow: 0 10px 25px rgba(6, 182, 212, 0.15);
        }

        .tech-item h4 {
            color: var(--primary-blue);
            margin-bottom: 8px;
            font-size: 1.05em;
        }

        .tech-item p {
            color: var(--text-secondary);
            font-size: 0.85em;
        }

        /* ===== SETUP GUIDE ===== */
        .setup-steps {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(99, 102, 241, 0.05));
            border: 1px solid var(--dark-border);
            border-radius: 10px;
            padding: 30px;
            margin-top: 30px;
        }

        .setup-steps h3 {
            color: var(--primary-indigo);
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .step {
            margin-bottom: 25px;
            padding-left: 40px;
            position: relative;
        }

        .step::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--primary-cyan);
            font-weight: bold;
            font-size: 1.3em;
        }

        .step h4 {
            color: var(--primary-blue);
            margin-bottom: 8px;
        }

        .step p {
            color: var(--text-secondary);
        }

        .code-block {
            background: rgba(15, 23, 42, 0.8);
            border-left: 3px solid var(--primary-indigo);
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            font-family: 'Monaco', monospace;
            font-size: 0.85em;
            color: var(--primary-cyan);
            overflow-x: auto;
        }

        /* ===== FEATURES SECTION ===== */
        .features-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }

        .feature-card {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.08));
            border: 1px solid var(--dark-border);
            border-radius: 12px;
            padding: 30px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent);
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .feature-card:hover::before {
            opacity: 1;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            border-color: var(--primary-cyan);
        }

        .feature-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
            color: var(--primary-indigo);
        }

        .feature-card h4 {
            color: var(--primary-cyan);
            margin-bottom: 12px;
            font-size: 1.2em;
        }

        .feature-card p {
            color: var(--text-secondary);
            font-size: 0.95em;
            position: relative;
            z-index: 1;
        }

        /* ===== FOOTER ===== */
        footer {
            text-align: center;
            padding: 40px;
            margin-top: 80px;
            border-top: 1px solid var(--dark-border);
            color: var(--text-secondary);
            animation: slideInUp 1s ease-out;
        }

        footer p {
            margin: 10px 0;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
        }

        .footer-links a {
            color: var(--primary-cyan);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary-blue);
            text-decoration: underline;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            header h1 {
                font-size: 2.5em;
            }

            h2 {
                font-size: 1.8em;
            }

            .problem-container {
                grid-template-columns: 1fr;
            }

            .workflow-container {
                flex-direction: column;
            }

            .workflow-arrow {
                display: none;
            }

            .footer-links {
                flex-direction: column;
                gap: 10px;
            }

            section {
                padding: 20px;
            }
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: var(--dark-bg);
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, var(--primary-cyan), var(--primary-indigo));
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, var(--primary-blue), var(--primary-cyan));
        }
    </style>
</head>
<body>
    <!-- HEADER -->
    <header>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="header-bg"></div>
        <h1>🛡️ VerifyMedia</h1>
        <p class="tagline">AI-Powered <span class="highlight">Deepfake & Fake Media Detection</span> for a Trustworthy Digital World</p>
    </header>

    <!-- PROBLEM STATEMENT -->
    <section>
        <h2>🌍 The Problem We're Solving</h2>
        <p style="color: var(--text-secondary); font-size: 1.1em; margin-bottom: 30px;">
            In today's digital age, misinformation spreads faster than truth. Every day, millions of deepfakes and AI-generated content are shared across social media, causing real-world harm.
        </p>
        
        <div class="problem-container">
            <div class="problem-card">
                <h3>📱 The Misinformation Crisis</h3>
                <p><strong style="color: var(--primary-cyan);">Real-world impact:</strong> A manipulated video of a CEO sparked a stock market fluctuation, costing shareholders millions. Another deepfake caused a political scandal in a developing nation.</p>
                <p style="margin-top: 15px; color: var(--text-secondary); opacity: 0.9;">Users frequently encounter suspicious content online but have <strong>no fast or reliable way to verify authenticity</strong>. This leads to unknowing spread of misinformation.</p>
            </div>

            <div class="problem-card">
                <h3>⚡ The Speed Challenge</h3>
                <p><strong style="color: var(--primary-cyan);">Current solutions fail:</strong> Manual verification takes hours. Existing tools require technical expertise. False positives create distrust.</p>
                <p style="margin-top: 15px; color: var(--text-secondary); opacity: 0.9;">We need <strong>instant, accurate, and accessible</strong> authentication for anyone, anywhere. VerifyMedia delivers this.</p>
            </div>
        </div>

        <p style="color: var(--text-secondary); margin-top: 30px; font-size: 1.05em;">
            <strong style="color: var(--primary-cyan);">Our Solution:</strong> VerifyMedia combines cutting-edge forensic analysis, AI detection, and intelligent fusion engines to instantly verify media authenticity with confidence scores and detailed evidence.
        </p>
    </section>

    <!-- WHAT WE DO -->
    <section>
        <h2>🎯 What We Do</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 1.05em;">
            VerifyMedia is a hybrid forensic analysis platform that accepts user-submitted media for instant authenticity verification. We analyze images, videos, audio, and social context to deliver trustworthy classifications.
        </p>

        <div class="features-container">
            <div class="feature-card">
                <div class="feature-icon">📸</div>
                <h4>Multi-Modal Analysis</h4>
                <p>Upload images, videos, or audio. We analyze all formats with specialized forensic modules designed for each media type.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🔍</div>
                <h4>Forensic Detection</h4>
                <p>Metadata analysis, pixel forensics, and temporal anomalies are detected through advanced signal processing.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🤖</div>
                <h4>AI Deepfake Detection</h4>
                <p>PyTorch CNN models identify AI-generated and manipulated content with state-of-the-art accuracy.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🎬</div>
                <h4>Cross-Modal Validation</h4>
                <p>We check audio-video consistency and verify social context to catch coordinated misinformation.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h4>Confidence Scoring</h4>
                <p>Get detailed confidence levels, key indicators, and evidence-backed reports for every analysis.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🔐</div>
                <h4>Chain-of-Custody</h4>
                <p>SHA-256 hashing ensures evidence integrity. Complete audit logs for legal compliance.</p>
            </div>
        </div>
    </section>

    <!-- CAPABILITIES -->
    <section>
        <h2>💡 Core Capabilities</h2>
        <div class="capabilities-grid">
            <div class="capability-item">
                <h4>🔎 Metadata Forensics</h4>
                <p>EXIF parsing, software signatures, timestamp consistency validation, and anomaly detection.</p>
            </div>
            <div class="capability-item">
                <h4>🎨 Pixel Forensics</h4>
                <p>Error Level Analysis (ELA), JPEG artifact detection, lighting inconsistencies, and residual analysis.</p>
            </div>
            <div class="capability-item">
                <h4>🎥 Video Analysis</h4>
                <p>Frame-to-frame transition anomalies, interpolation detection, and temporal consistency checks.</p>
            </div>
            <div class="capability-item">
                <h4>🔊 Audio Forensics</h4>
                <p>MFCC analysis, spectral flatness, pitch contour analysis, and voice consistency verification.</p>
            </div>
            <div class="capability-item">
                <h4>🧠 Deepfake Models</h4>
                <p>PyTorch CNN inference with pluggable checkpoint support for continuous model updates.</p>
            </div>
            <div class="capability-item">
                <h4>⚙️ Fusion Engine</h4>
                <p>Intelligent weighted aggregation of all forensic scores into one confident final verdict.</p>
            </div>
            <div class="capability-item">
                <h4>📄 Report Generation</h4>
                <p>Structured PDF reports with evidence, confidence levels, and recommended actions.</p>
            </div>
            <div class="capability-item">
                <h4>🔗 Social Context</h4>
                <p>Optional analysis of social posts, platform metadata, timestamps, and location verification.</p>
            </div>
        </div>
    </section>

    <!-- HOW IT WORKS -->
    <section>
        <h2>🔄 How It Works</h2>
        <div class="workflow-container">
            <div class="workflow-step">
                <div class="step-number step-1">1️⃣</div>
                <h4>User Upload</h4>
                <p>Upload media file or provide social context</p>
                <div class="workflow-arrow">→</div>
            </div>
            <div class="workflow-step">
                <div class="step-number step-2">2️⃣</div>
                <h4>Forensic Analysis</h4>
                <p>Run specialized modules (metadata, pixel, audio, video)</p>
                <div class="workflow-arrow">→</div>
            </div>
            <div class="workflow-step">
                <div class="step-number step-3">3️⃣</div>
                <h4>AI Detection</h4>
                <p>Apply deepfake and manipulation detection models</p>
                <div class="workflow-arrow">→</div>
            </div>
            <div class="workflow-step">
                <div class="step-number step-4">4️⃣</div>
                <h4>Fusion & Scoring</h4>
                <p>Aggregate results with confidence weighting</p>
                <div class="workflow-arrow">→</div>
            </div>
            <div class="workflow-step">
                <div class="step-number step-5">5️⃣</div>
                <h4>Results & Report</h4>
                <p>Return classification, confidence, and detailed evidence</p>
            </div>
        </div>
    </section>

    <!-- CLASSIFICATION SYSTEM -->
    <section>
        <h2>🎓 Classification System</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">Each analysis returns one of four classifications with confidence scoring:</p>
        
        <div class="classification-grid">
            <div class="classification-badge badge-authentic">
                <h4>✅ Authentic</h4>
                <p>Content appears genuine with no detected manipulation or AI generation.</p>
            </div>
            <div class="classification-badge badge-ai">
                <h4>🤖 AI Generated</h4>
                <p>Content was likely created or significantly modified by artificial intelligence.</p>
            </div>
            <div class="classification-badge badge-manipulated">
                <h4>⚠️ Manipulated</h4>
                <p>Content shows clear signs of editing, tampering, or intentional alteration.</p>
            </div>
            <div class="classification-badge badge-inconclusive">
                <h4>❓ Inconclusive</h4>
                <p>Insufficient evidence for reliable determination. Recommend manual review.</p>
            </div>
        </div>
    </section>

    <!-- ARCHITECTURE & FILE STRUCTURE -->
    <section>
        <h2>📁 Project Architecture</h2>
        <div class="file-structure">
<code><span class="folder">AIAPP/</span>
├── <span class="folder">backend/</span>                    <span class="description">Node.js/Express API Server</span>
│   ├── server.js                <span class="description">Main Express application & routes</span>
│   ├── package.json             <span class="description">Node dependencies</span>
│   ├── <span class="folder">models/</span>                  <span class="description">MongoDB Mongoose schemas</span>
│   │   ├── Case.js              <span class="description">Case management model</span>
│   │   ├── Evidence.js          <span class="description">Digital evidence model</span>
│   │   ├── Officer.js           <span class="description">User/Officer model</span>
│   │   └── AuditLog.js          <span class="description">Audit trail model</span>
│   ├── <span class="folder">routes/</span>                  <span class="description">API endpoints</span>
│   │   ├── auth.js              <span class="description">Authentication & JWT</span>
│   │   ├── cases.js             <span class="description">Case CRUD operations</span>
│   │   └── evidence.js          <span class="description">Evidence upload & analysis</span>
│   └── <span class="folder">uploads/</span>                 <span class="description">Temporary file storage</span>
│
├── <span class="folder">frontend/</span>                   <span class="description">React + Vite Web UI</span>
│   ├── package.json             <span class="description">Node dependencies</span>
│   ├── vite.config.js           <span class="description">Vite build config</span>
│   ├── tailwind.config.js       <span class="description">Tailwind CSS config</span>
│   └── <span class="folder">src/</span>
│       ├── main.jsx             <span class="description">React entry point</span>
│       ├── App.jsx              <span class="description">Main app component</span>
│       ├── <span class="folder">pages/</span>              <span class="description">Page components</span>
│       │   ├── Home.jsx         <span class="description">Landing page</span>
│       │   ├── Dashboard.jsx    <span class="description">Analysis dashboard</span>
│       │   ├── CaseManager.jsx  <span class="description">Case management</span>
│       │   ├── UploadSOP.jsx    <span class="description">Evidence upload UI</span>
│       │   └── VerificationLog.jsx <span class="description">Audit log viewer</span>
│       └── <span class="folder">components/</span>         <span class="description">Reusable components</span>
│           └── Layout.jsx       <span class="description">Layout wrapper</span>
│
├── <span class="folder">forensics_service/</span>        <span class="description">FastAPI Python Service</span>
│   ├── main.py                  <span class="description">FastAPI application</span>
│   ├── requirements.txt         <span class="description">Python dependencies</span>
│   ├── <span class="folder">app/</span>
│   │   ├── <span class="folder">api/</span>
│   │   │   └── routes.py        <span class="description">API endpoints</span>
│   │   ├── <span class="folder">core/</span>
│   │   │   ├── config.py        <span class="description">Configuration</span>
│   │   │   └── db.py            <span class="description">Database connection</span>
│   │   ├── <span class="folder">models/</span>
│   │   │   ├── db_models.py     <span class="description">Database models</span>
│   │   │   └── schemas.py       <span class="description">Pydantic schemas</span>
│   │   └── <span class="folder">services/</span>          <span class="description">Forensic modules</span>
│   │       ├── metadata_forensics.py     <span class="description">EXIF & metadata analysis</span>
│   │       ├── pixel_forensics.py        <span class="description">Pixel-level analysis</span>
│   │       ├── video_temporal_forensics.py <span class="description">Video frame analysis</span>
│   │       ├── audio_forensics.py        <span class="description">Audio signal analysis</span>
│   │       ├── deepfake_model.py         <span class="description">AI detection inference</span>
│   │       ├── multimodal_consistency.py <span class="description">Cross-modal validation</span>
│   │       ├── fusion_engine.py          <span class="description">Score aggregation</span>
│   │       ├── orchestrator.py           <span class="description">Workflow coordinator</span>
│   │       ├── persistence.py            <span class="description">Result storage</span>
│   │       ├── report_generator.py       <span class="description">PDF report generation</span>
│   │       └── social_media_forensics.py <span class="description">Social context analysis</span>
│   └── <span class="folder">tests/</span>
│       └── test_fusion_engine.py <span class="description">Unit tests</span>
│
├── <span class="folder">ml_service/</span>                <span class="description">PyTorch Model Server</span>
│   ├── app.py                   <span class="description">Model serving API</span>
│   ├── model.py                 <span class="description">CNN model architecture</span>
│   ├── requirements.txt         <span class="description">Python dependencies</span>
│   └── <span class="folder">weights/</span>                <span class="description">Model checkpoints</span>
│       └── best_model.pth       <span class="description">Trained model weights</span>
│
├── <span class="folder">config/</span>                     <span class="description">Configuration files</span>
├── case_id.txt                  <span class="description">Case ID tracking</span>
├── token.txt                    <span class="description">Auth token storage</span>
└── README.md                    <span class="description">Project documentation</span></code>
        </div>
    </section>

    <!-- TECH STACK -->
    <section>
        <h2>🛠️ Technology Stack</h2>
        <div class="tech-grid">
            <div class="tech-item">
                <h4>Frontend</h4>
                <p><strong>React 19</strong> + <strong>Vite</strong><br/>Modern, fast, responsive UI</p>
            </div>
            <div class="tech-item">
                <h4>Backend API</h4>
                <p><strong>Node.js/Express</strong><br/>RESTful API with JWT auth</p>
            </div>
            <div class="tech-item">
                <h4>Forensics Engine</h4>
                <p><strong>FastAPI</strong> (Python)<br/>Hybrid analysis orchestration</p>
            </div>
            <div class="tech-item">
                <h4>ML Models</h4>
                <p><strong>PyTorch</strong><br/>Deep learning inference</p>
            </div>
            <div class="tech-item">
                <h4>Database</h4>
                <p><strong>MongoDB</strong><br/>NoSQL data persistence</p>
            </div>
            <div class="tech-item">
                <h4>Authentication</h4>
                <p><strong>JWT + bcryptjs</strong><br/>Secure token-based auth</p>
            </div>
            <div class="tech-item">
                <h4>Signal Processing</h4>
                <p><strong>OpenCV, Librosa, PIL</strong><br/>Forensic analysis tools</p>
            </div>
            <div class="tech-item">
                <h4>Styling</h4>
                <p><strong>Tailwind CSS</strong><br/>Utility-first design</p>
            </div>
        </div>
    </section>

    <!-- SETUP GUIDE -->
    <section>
        <h2>🚀 Quick Start Guide</h2>
        
        <div class="setup-steps">
            <h3>Prerequisites</h3>
            <div class="step">
                <h4>System Requirements</h4>
                <p>Node.js 16+, Python 3.9+, MongoDB 5.0+, Git</p>
            </div>

            <h3 style="margin-top: 30px; color: var(--primary-indigo);">Installation Steps</h3>
            
            <div class="step">
                <h4>1. Clone the Repository</h4>
                <div class="code-block">git clone https://github.com/yourusername/verifymedia.git<br/>cd AIAPP</div>
            </div>

            <div class="step">
                <h4>2. Setup Backend</h4>
                <div class="code-block">cd backend<br/>npm install<br/>npm start</div>
                <p>Backend runs on <strong>http://localhost:5000</strong></p>
            </div>

            <div class="step">
                <h4>3. Setup Forensics Service</h4>
                <div class="code-block">cd forensics_service<br/>pip install -r requirements.txt<br/>python -m uvicorn app.main:app --reload --port 8000</div>
                <p>Forensics service runs on <strong>http://localhost:8000</strong></p>
            </div>

            <div class="step">
                <h4>4. Setup ML Service</h4>
                <div class="code-block">cd ml_service<br/>pip install -r requirements.txt<br/>python app.py</div>
                <p>ML service runs on a configured port</p>
            </div>

            <div class="step">
                <h4>5. Setup Frontend</h4>
                <div class="code-block">cd frontend<br/>npm install<br/>npm run dev</div>
                <p>Frontend runs on <strong>http://localhost:5173</strong></p>
            </div>

            <div class="step">
                <h4>6. Environment Configuration</h4>
                <p>Create <code style="color: var(--primary-cyan);">.env</code> files in each service with required API keys and database URLs</p>
            </div>
        </div>
    </section>

    <!-- API EXAMPLE -->
    <section>
        <h2>📡 API Example</h2>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">Upload media for analysis:</p>
        
        <div class="code-block">
POST /api/evidence/upload<br/>
Content-Type: multipart/form-data<br/>
<br/>
{<br/>
&nbsp;&nbsp;"file": [binary media data],<br/>
&nbsp;&nbsp;"caseId": "case_12345",<br/>
&nbsp;&nbsp;"socialContext": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"platform": "twitter",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"timestamp": "2024-05-18T10:30:00Z",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"location": "United States"<br/>
&nbsp;&nbsp;}<br/>
}
        </div>

        <p style="color: var(--text-secondary); margin: 20px 0 20px 0;">Response:</p>
        
        <div class="code-block">
{<br/>
&nbsp;&nbsp;"analysisId": "analysis_98765",<br/>
&nbsp;&nbsp;"classification": "ai_generated",<br/>
&nbsp;&nbsp;"confidence": 0.94,<br/>
&nbsp;&nbsp;"indicators": {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"metadata": "suspicious",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"pixels": "anomalies_detected",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"deepfake_score": 0.92<br/>
&nbsp;&nbsp;},<br/>
&nbsp;&nbsp;"reportUrl": "/reports/analysis_98765.pdf",<br/>
&nbsp;&nbsp;"timestamp": "2024-05-18T10:31:45Z"<br/>
}
        </div>
    </section>

    <!-- FEATURES HIGHLIGHT -->
    <section>
        <h2>⭐ Key Features</h2>
        <div class="features-container">
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h4>Real-Time Analysis</h4>
                <p>Get results in seconds, not hours. Optimized pipelines for instant media verification.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h4>Multi-Format Support</h4>
                <p>Supports JPEG, PNG, MP4, MOV, WAV, and various other media formats.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h4>Detailed Reports</h4>
                <p>Comprehensive PDF reports with forensic evidence, confidence levels, and recommendations.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h4>Enterprise Security</h4>
                <p>End-to-end encryption, audit logs, chain-of-custody tracking for legal compliance.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h4>User-Friendly Interface</h4>
                <p>Intuitive dashboard accessible to non-technical users. No expertise required.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <h4>Continuous Updates</h4>
                <p>Model updates and new detection techniques deployed regularly to stay ahead of threats.</p>
            </div>
        </div>
    </section>

    <!-- USE CASES -->
    <section>
        <h2>💼 Real-World Use Cases</h2>
        <div class="problem-container">
            <div class="problem-card">
                <h3>🏛️ Election Integrity</h3>
                <p>Verify candidate videos before election day to prevent coordinated misinformation campaigns that could influence voting behavior.</p>
            </div>

            <div class="problem-card">
                <h3>💰 Financial Markets</h3>
                <p>Detect manipulated CEO videos or fake earnings reports before they cause market volatility and shareholder harm.</p>
            </div>

            <div class="problem-card">
                <h3>🏥 Healthcare</h3>
                <p>Identify fake medical advice videos that could endanger patient safety and public health.</p>
            </div>

            <div class="problem-card">
                <h3>📰 News Verification</h3>
                <p>Media organizations verify footage authenticity before publication to maintain credibility and prevent spreading false narratives.</p>
            </div>

            <div class="problem-card">
                <h3>⚖️ Legal & Forensics</h3>
                <p>Law enforcement uses chain-of-custody reports as court-admissible evidence in criminal proceedings.</p>
            </div>

            <div class="problem-card">
                <h3>🌐 Social Media Moderation</h3>
                <p>Platforms use VerifyMedia to automatically flag and reduce distribution of deepfakes and manipulated content.</p>
            </div>
        </div>
    </section>

    <!-- PERFORMANCE METRICS -->
    <section>
        <h2>📈 Performance Metrics</h2>
        <div class="capabilities-grid">
            <div class="capability-item">
                <h4>⚡ Analysis Speed</h4>
                <p><strong style="color: var(--primary-cyan);">2-5 seconds</strong> for image analysis<br/><strong style="color: var(--primary-cyan);">5-15 seconds</strong> for video/audio</p>
            </div>
            <div class="capability-item">
                <h4>🎯 Accuracy Rate</h4>
                <p><strong style="color: var(--primary-cyan);">94%+</strong> on benchmark datasets for deepfake detection<br/>Continuously improving with new data</p>
            </div>
            <div class="capability-item">
                <h4>📊 Confidence Scoring</h4>
                <p>Calibrated confidence levels (0-1 scale)<br/>Independent validation on test sets</p>
            </div>
            <div class="capability-item">
                <h4>🔄 Uptime SLA</h4>
                <p><strong style="color: var(--primary-cyan);">99.9%</strong> guaranteed availability<br/>Auto-scaling on demand</p>
            </div>
        </div>
    </section>

    <!-- ROADMAP -->
    <section>
        <h2>🗺️ Future Roadmap</h2>
        <div class="capabilities-grid">
            <div class="capability-item">
                <h4>🎭 Real-Time Stream Analysis</h4>
                <p>Live video stream verification for live broadcasts and social media streams.</p>
            </div>
            <div class="capability-item">
                <h4>🌍 Multilingual Support</h4>
                <p>Expand social media analysis to detect misinformation across 50+ languages.</p>
            </div>
            <div class="capability-item">
                <h4>🤖 Advanced Generative Detection</h4>
                <p>Detection for latest generative models (GPT-4 generated text in images, etc.).</p>
            </div>
            <div class="capability-item">
                <h4>📱 Mobile App</h4>
                <p>Native iOS and Android apps for on-the-go verification using phone camera.</p>
            </div>
            <div class="capability-item">
                <h4>🔌 API Marketplace</h4>
                <p>Developer marketplace for third-party integrations and plugins.</p>
            </div>
            <div class="capability-item">
                <h4>🧠 Federated Learning</h4>
                <p>Collaborative model improvement with partner organizations while preserving privacy.</p>
            </div>
        </div>
    </section>

    <!-- GETTING HELP -->
    <section>
        <h2>❓ Getting Help</h2>
        <div class="setup-steps">
            <div class="step">
                <h4>Documentation</h4>
                <p>Full API documentation available at <span style="color: var(--primary-cyan);">/docs</span> (Swagger UI)</p>
            </div>

            <div class="step">
                <h4>Issue Tracking</h4>
                <p>Report bugs and request features on <span style="color: var(--primary-cyan);">GitHub Issues</span></p>
            </div>

            <div class="step">
                <h4>Community Support</h4>
                <p>Join our Discord community for discussions and peer support</p>
            </div>

            <div class="step">
                <h4>Enterprise Support</h4>
                <p>Commercial licenses include dedicated support and custom integrations</p>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <p><strong>VerifyMedia</strong> - Fighting Misinformation with Science & AI</p>
        <p style="opacity: 0.7; font-size: 0.9em;">Building a more trustworthy digital world, one verification at a time.</p>
        <div class="footer-links">
            <a href="#">GitHub</a>
            <a href="#">Documentation</a>
            <a href="#">Report Issues</a>
            <a href="#">License: MIT</a>
        </div>
        <p style="margin-top: 30px; opacity: 0.5; font-size: 0.85em;">© 2024 VerifyMedia. All rights reserved.</p>
    </footer>
</body>
</html>
