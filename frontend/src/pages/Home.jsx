import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Zap, BarChart3, Lock, Sparkles, CheckCircle2, TrendingUp, AlertCircle, Eye, Play, Layers, Scan, Fingerprint } from 'lucide-react';

const ModernBackground = () => (
  <>
    <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-dark-950 to-slate-900" />

    <div className="fixed inset-0 -z-20 bg-grid-pattern opacity-5" />

    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute -top-40 -left-28 h-96 w-96 rounded-full bg-accent-cyan/20 blur-[100px] animate-mesh-drift" />
      <div className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-accent-blue/15 blur-[120px] animate-mesh-drift" style={{ animationDelay: '-7s' }} />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-purple/20 blur-[110px] animate-mesh-drift" style={{ animationDelay: '-13s' }} />
    </div>

    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-cyan/10 animate-orbit-slow" />
      <div className="absolute left-1/2 top-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-purple/10 animate-orbit-slow" style={{ animationDirection: 'reverse', animationDuration: '38s' }} />
    </div>

    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -left-24 top-1/4 h-40 w-[42rem] rotate-[-16deg] bg-gradient-to-r from-transparent via-accent-cyan/25 to-transparent blur-2xl animate-prism-drift" />
      <div className="absolute -right-24 bottom-1/4 h-40 w-[40rem] rotate-[12deg] bg-gradient-to-r from-transparent via-accent-purple/25 to-transparent blur-2xl animate-prism-drift" style={{ animationDelay: '-8s' }} />
      <div className="absolute left-1/4 top-1/2 h-28 w-[34rem] rotate-[6deg] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent blur-xl animate-prism-drift" style={{ animationDelay: '-14s' }} />
    </div>

    <div className="fixed inset-0 -z-10 pointer-events-none">
      {[...Array(14)].map((_, idx) => (
        <span
          key={`spark-${idx}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent-cyan/60 animate-vfx-twinkle"
          style={{
            left: `${8 + ((idx * 91) % 84)}%`,
            top: `${6 + ((idx * 53) % 86)}%`,
            animationDelay: `${idx * 0.35}s`,
            animationDuration: `${2.8 + (idx % 4)}s`
          }}
        />
      ))}
    </div>

    <div className="fixed inset-0 -z-10 bg-noise-pattern opacity-[0.06] pointer-events-none" />
  </>
);

const Home = () => {
  const navigate = useNavigate();
  const [navTransition, setNavTransition] = useState(null);
  const navTimerRef = useRef(null);

  useEffect(() => () => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }
  }, []);

  const startCinematicNavigation = (path, modeLabel) => {
    if (navTransition) return;
    setNavTransition({ path, modeLabel });

    navTimerRef.current = setTimeout(() => {
      navigate(path, {
        state: {
          cinematic: true,
          cinematicMode: modeLabel,
          from: 'home'
        }
      });
    }, 700);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <ModernBackground />

      {navTransition && (
        <div className="fixed inset-0 z-[100] bg-dark-950/85 backdrop-blur-md flex items-center justify-center px-4">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700/50 bg-dark-800/60 p-12 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-blue/10 animate-gradient-morph" />
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent-cyan/20 blur-3xl animate-gradient-morph" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent-blue/20 blur-3xl animate-gradient-morph" style={{ animationDelay: '2s' }} />
            
            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              {/* Forensic HUD Loader - Enhanced Edition */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Outer ring - rotating with gradient glow */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan border-r-accent-blue animate-spin" style={{ animationDuration: '3s', boxShadow: '0 0 25px rgba(6, 182, 212, 0.6), inset 0 0 15px rgba(6, 182, 212, 0.2)' }} />
                
                {/* Middle ring - counter-rotating with enhanced glow */}
                <div className="absolute inset-3 rounded-full border border-accent-cyan/50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse', boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }} />
                
                {/* Pulsing energy ring */}
                <div className="absolute inset-6 rounded-full border border-accent-blue/30 animate-pulse" style={{ animationDuration: '2s' }} />
                
                {/* Grid overlay - enhanced visibility */}
                <div className="absolute inset-0 rounded-full opacity-30" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px'
                }} />
                
                {/* Center shield icon with glow */}
                <Shield className="w-8 h-8 text-accent-cyan relative z-20" style={{ filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))' }} />
              </div>

              {/* Phase indicators - enhanced animation */}
              <div className="space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 animate-phase-flow" style={{ animationDelay: '0s' }}>
                  <div className="w-2 h-2 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite' }} />
                  <span className="text-xs font-mono text-accent-cyan">Integrity Check</span>
                </div>
                <div className="flex items-center justify-center gap-2 animate-phase-flow" style={{ animationDelay: '0.3s' }}>
                  <div className="w-2 h-2 rounded-full bg-accent-blue" style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite', animationDelay: '0.3s' }} />
                  <span className="text-xs font-mono text-accent-blue">Forensic Scan</span>
                </div>
                <div className="flex items-center justify-center gap-2 animate-phase-flow" style={{ animationDelay: '0.6s' }}>
                  <div className="w-2 h-2 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite', animationDelay: '0.6s' }} />
                  <span className="text-xs font-mono text-accent-cyan">Generating Verdict</span>
                </div>
              </div>

              {/* Signal bars - enhanced with glow */}
              <div className="flex items-end justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-accent-blue to-accent-cyan rounded-sm"
                    style={{
                      width: '4px',
                      height: `${(i + 1) * 8}px`,
                      animation: `signal-bar 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      boxShadow: `0 0 10px rgba(59, 130, 246, 0.6)`
                    }}
                  />
                ))}
              </div>

              {/* Progress description */}
              <p className="text-xs text-slate-500 px-4">This typically takes 2-5 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 animate-fadeInUp holo-frame rounded-3xl p-8 md:p-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
            <span className="text-sm font-medium text-accent-cyan">Next-Gen Media Forensics</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tight">
            <span className="block bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple bg-clip-text text-transparent animate-gradient-rotate">
              Detect Deepfakes
            </span>
            <span className="block text-slate-100 mt-2">in Seconds</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered media authentication using hybrid forensic analysis. Identify AI-generated and fake media before it spreads.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => startCinematicNavigation('/app/upload', 'Verification')}
              disabled={Boolean(navTransition)}
              className="group btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Verification
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => startCinematicNavigation('/app/dashboard', 'Dashboard')}
              disabled={Boolean(navTransition)}
              className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <TrendingUp className="w-5 h-5" />
              View Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-slate-800/50">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-cyan">98.8%</div>
              <p className="text-sm text-slate-400">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-blue">50ms</div>
              <p className="text-sm text-slate-400">Analysis Time</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-purple">7 Methods</div>
              <p className="text-sm text-slate-400">Detection Layers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade media forensics at your fingertips
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'AI Detection',
                description: 'Advanced neural networks detect AI-generated content',
                color: 'from-accent-cyan to-accent-blue'
              },
              {
                icon: Lock,
                title: 'SHA-256 Hashing',
                description: 'Cryptographic integrity verification for evidence',
                color: 'from-accent-blue to-accent-indigo'
              },
              {
                icon: BarChart3,
                title: 'Forensic Analysis',
                description: 'Multi-layer pixel, frequency, and metadata analysis',
                color: 'from-accent-indigo to-accent-purple'
              },
              {
                icon: TrendingUp,
                title: 'Real-time Reports',
                description: 'Exportable findings with confidence scores',
                color: 'from-accent-purple to-accent-cyan'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group glass-panel p-6 hover:shadow-glow-lg transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-dark-950" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-200">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Upload Media',
                description: 'Drop your image or video file for instant analysis',
                icon: Sparkles
              },
              {
                step: '02',
                title: 'Multi-Layer Analysis',
                description: 'AI model, pixel forensics, metadata examination',
                icon: Zap
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Verdict, confidence score, detailed breakdown',
                icon: CheckCircle2
              },
              {
                step: '04',
                title: 'Export Report',
                description: 'Save findings as PDF or JSON for records',
                icon: Lock
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-6 items-start group animate-fadeInUp"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-dark-950">{item.step}</span>
                  </div>
                  {idx < 3 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-accent-cyan to-transparent" />
                  )}
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section - The Challenge */}
      <section className="relative px-4 py-20 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-sm">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">The Challenge</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-red-500">Deepfakes Are Everywhere</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AI-generated media is becoming indistinguishable from reality. Without detection, these fake videos and images spread misinformation at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Problem Visualization */}
            <div className="space-y-6">
              <div className="glass-panel p-8 border-red-500/30 bg-red-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-deepfake-pulse">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold">The Threat</h3>
                </div>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>98% of people can't distinguish real from fake media</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Deepfakes spread 6x faster than real content on social media</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Used in political manipulation, fraud, and identity theft</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-500 font-bold shrink-0">•</span>
                    <span>Traditional detection methods fail against advanced AI models</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual Deepfake Comparison */}
            <div className="space-y-6">
              <div className="glass-panel p-8 relative overflow-hidden h-80 bg-gradient-to-br from-red-950/20 to-dark-800/40 border-red-500/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-deepfake-pulse" />
                  <div className="relative z-10 text-center space-y-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                    <div>
                      <p className="text-sm text-slate-400 mb-2">AI-Generated Video Example</p>
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 transition-all group">
                        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Watch Threat Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Detection Technology Visualization */}
            <div className="space-y-6 lg:order-1">
              <div className="glass-panel p-8 relative overflow-hidden h-80 bg-gradient-to-br from-green-950/20 to-dark-800/40 border-accent-cyan/30">
                <div className="absolute inset-0">
                  {/* Animated Detection Layers */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-accent-cyan/20 to-transparent opacity-0 animate-detection-sweep"></div>
                  <div className="absolute top-1/4 left-0 right-0 h-1/3 bg-gradient-to-b from-accent-blue/20 to-transparent opacity-0 animate-detection-sweep" style={{ animationDelay: '0.4s' }}></div>
                  <div className="absolute top-1/2 left-0 right-0 h-1/3 bg-gradient-to-b from-accent-purple/20 to-transparent opacity-0 animate-detection-sweep" style={{ animationDelay: '0.8s' }}></div>
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-4">
                  <Scan className="w-12 h-12 text-accent-cyan" />
                  <p className="text-sm text-slate-300 font-medium">Multi-Layer Detection Analysis</p>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Overview */}
            <div className="space-y-6 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5">
                <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm font-medium text-accent-cyan">Our Solution</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">
                  AI-Powered Detection<br />You Can Trust
                </h3>
                
                <p className="text-slate-400 text-lg">
                  VeriTrace combines advanced machine learning with forensic analysis to identify AI-generated and manipulated media with military-grade accuracy.
                </p>

                {/* Detection Methods */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass-panel p-4 border-accent-cyan/30 bg-accent-cyan/5">
                    <div className="flex items-start gap-3">
                      <Layers className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-sm">AI Detection</p>
                        <p className="text-xs text-slate-500 mt-1">EfficientNet neural network</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel p-4 border-accent-blue/30 bg-accent-blue/5">
                    <div className="flex items-start gap-3">
                      <Fingerprint className="w-5 h-5 text-accent-blue flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-sm">Forensics</p>
                        <p className="text-xs text-slate-500 mt-1">7 analysis methods</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => startCinematicNavigation('/app/upload', 'Verification')}
                disabled={Boolean(navTransition)}
                className="group btn-primary inline-flex items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Verify Media Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-20 border-t border-slate-800/50">
            <div className="glass-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent-cyan mb-2">7</div>
              <p className="text-slate-400">Detection Methods</p>
              <p className="text-xs text-slate-500 mt-2">Pixel forensics, metadata, frequency analysis, and more</p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent-blue mb-2">98.8%</div>
              <p className="text-slate-400">Accuracy</p>
              <p className="text-xs text-slate-500 mt-2">Tested on 10,000+ real and fake samples</p>
            </div>
            
            <div className="glass-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent-purple mb-2">50ms</div>
              <p className="text-slate-400">Analysis Time</p>
              <p className="text-xs text-slate-500 mt-2">Get results in milliseconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Trust Section */}
      <section className="relative px-4 py-20 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Trusted by Professionals
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Used by digital forensics teams, media organizations, and security researchers worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { value: '1000+', label: 'Files Analyzed' },
              { value: '98.8%', label: 'Accuracy Rate' },
              { value: '15+', label: 'Detection Methods' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 hover:border-accent-cyan/50 transition-all animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-slate-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-10 md:p-16 text-center border-glow animate-fadeInUp relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-slate-400">
                Verify the authenticity of your media files in seconds with our advanced AI detection system.
              </p>
              
              <button
                onClick={() => startCinematicNavigation('/app/upload', 'Verification')}
                disabled={Boolean(navTransition)}
                className="group btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Zap className="w-5 h-5" />
                Start Verification Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-cyan" />
                VeriTrace
              </h3>
              <p className="text-sm text-slate-500">
                Professional media authentication and AI detection
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Tools</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => startCinematicNavigation('/app/upload', 'Verification')} disabled={Boolean(navTransition)} className="hover:text-accent-cyan transition-colors disabled:opacity-60 disabled:cursor-not-allowed">Upload & Analyze</button></li>
                <li><button onClick={() => startCinematicNavigation('/app/dashboard', 'Dashboard')} disabled={Boolean(navTransition)} className="hover:text-accent-cyan transition-colors disabled:opacity-60 disabled:cursor-not-allowed">Dashboard</button></li>
                <li><button onClick={() => startCinematicNavigation('/app/audit', 'History')} disabled={Boolean(navTransition)} className="hover:text-accent-cyan transition-colors disabled:opacity-60 disabled:cursor-not-allowed">History</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Features</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-accent-cyan transition-colors">AI Detection</a></li>
                <li><a href="#" className="hover:text-accent-cyan transition-colors">Forensics</a></li>
                <li><a href="#" className="hover:text-accent-cyan transition-colors">Reports</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-300">Info</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-accent-cyan transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent-cyan transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent-cyan transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-center text-sm text-slate-500">
              © 2026 VeriTrace. Professional Media Authenticity Detection.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
