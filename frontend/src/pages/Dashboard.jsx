import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, Shield, Zap, BarChart3, Clock } from 'lucide-react';

const AnimatedCounter = ({ endValue, duration = 2000, label, icon: Icon, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentValue = 0;
    const increment = endValue / (duration / 50);
    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= endValue) {
        setCount(endValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(currentValue));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [endValue, duration]);

  return (
    <div className="group glass-panel p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp hover:glow-cyan">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2 group-hover:text-accent-cyan transition-colors">{label}</p>
          <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
            {count.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${color} shadow-lg group-hover:shadow-2xl transition-all group-hover:scale-110 group-hover:animate-pulse-glow`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const VerdictDistributionChart = ({ verdicts }) => {
  const total = verdicts.AI_GENERATED + verdicts.AUTHENTIC + verdicts.INCONCLUSIVE;
  if (total === 0) {
    return (
      <div className="glass-panel p-6 flex items-center justify-center h-64">
        <p className="text-slate-400">No data available yet</p>
      </div>
    );
  }

  const aiPercent = (verdicts.AI_GENERATED / total) * 100;
  const authPercent = (verdicts.AUTHENTIC / total) * 100;
  const inconclusivePercent = (verdicts.INCONCLUSIVE / total) * 100;

  return (
    <div className="glass-panel p-6 space-y-6">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-accent-cyan" />
        Verdict Distribution
      </h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-300">AI Generated</span>
            <span className="text-sm font-semibold text-accent-indigo">{Math.round(aiPercent)}%</span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden border border-dark-600/50">
            <div
              className="h-full bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-indigo rounded-full transition-all duration-1000 shadow-lg shadow-accent-indigo/50"
              style={{ width: `${aiPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-300">Authentic</span>
            <span className="text-sm font-semibold text-accent-cyan">{Math.round(authPercent)}%</span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden border border-dark-600/50">
            <div
              className="h-full bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-cyan rounded-full transition-all duration-1000 shadow-lg shadow-accent-cyan/50"
              style={{ width: `${authPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-300">Inconclusive</span>
            <span className="text-sm font-semibold text-accent-blue">{Math.round(inconclusivePercent)}%</span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden border border-dark-600/50">
            <div
              className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue rounded-full transition-all duration-1000 shadow-lg shadow-accent-blue/50"
              style={{ width: `${inconclusivePercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-dark-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-indigo">{verdicts.AI_GENERATED}</p>
          <p className="text-xs text-slate-400 mt-1">Flagged</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-cyan">{verdicts.AUTHENTIC}</p>
          <p className="text-xs text-slate-400 mt-1">Verified</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent-blue">{verdicts.INCONCLUSIVE}</p>
          <p className="text-xs text-slate-400 mt-1">Unclear</p>
        </div>
      </div>
    </div>
  );
};

const RecentActivityFeed = ({ recentItems }) => {
  const getVerdictColor = (verdict) => {
    if (verdict === 'AI_GENERATED') return 'text-accent-indigo';
    if (verdict === 'AUTHENTIC') return 'text-accent-cyan';
    return 'text-accent-blue';
  };

  const getVerdictBg = (verdict) => {
    if (verdict === 'AI_GENERATED') return 'bg-accent-indigo/10 border border-accent-indigo/30';
    if (verdict === 'AUTHENTIC') return 'bg-accent-cyan/10 border border-accent-cyan/30';
    return 'bg-accent-blue/10 border border-accent-blue/30';
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Activity className="w-5 h-5 text-accent-cyan" />
        Recent Verifications
      </h3>

      {recentItems.length === 0 ? (
        <p className="text-slate-400 text-center py-8">No verification activity yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {recentItems.map((item, index) => (
            <div
              key={item._id}
              className={`p-4 rounded-xl border border-dark-700/50 hover:border-accent-blue/30 transition-all transform hover:scale-102 hover:shadow-lg ${getVerdictBg(item.aiAnalysis?.verdict || 'INCONCLUSIVE')} animate-fadeInUp`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 truncate">{item.originalName}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold uppercase ${getVerdictColor(item.aiAnalysis?.verdict || 'INCONCLUSIVE')}`}>
                    {item.aiAnalysis?.verdict || 'INCONCLUSIVE'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.aiAnalysis?.confidence || 0}% Confidence
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const cinematicEntry = Boolean(location.state && location.state.cinematic);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch('http://localhost:5000/api/evidence/analytics/summary', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const data = await response.json();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Analytics request timed out. Showing the last available state.');
        } else {
          setError(err.message);
        }
        console.error('Analytics fetch error:', err);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${cinematicEntry ? 'animate-cinematic-pop' : ''}`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-dark-700 border-t-accent-blue animate-spin mx-auto" />
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative space-y-8 ${cinematicEntry ? 'animate-cinematic-pop-enter' : ''}`}>
      {cinematicEntry && <div className="cinematic-veil animate-cinematic-veil" />}

      {/* Hero Section */}
      <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-accent-blue/10 via-dark-800 to-accent-cyan/5 overflow-hidden relative border-glow animate-slideInDown">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-blue/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-accent-cyan animate-neon-flicker" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-cyan text-glow">Active Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">Media Authenticity Hub</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Real-time AI detection and forensic analysis. Verify media integrity before it spreads.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div style={{ animationDelay: '0ms' }}>
          <AnimatedCounter
            endValue={analytics?.total || 0}
            label="Total Verifications"
            icon={Activity}
            color="bg-accent-blue/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>
        <div style={{ animationDelay: '100ms' }}>
          <AnimatedCounter
            endValue={analytics?.verdicts?.AI_GENERATED || 0}
            label="AI Generated Flagged"
            icon={AlertTriangle}
            color="bg-accent-indigo/80 shadow-[0_0_15px_rgba(94,234,212,0.5)]"
          />
        </div>
        <div style={{ animationDelay: '200ms' }}>
          <AnimatedCounter
            endValue={analytics?.verdicts?.AUTHENTIC || 0}
            label="Verified Authentic"
            icon={CheckCircle2}
            color="bg-accent-cyan/80 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          />
        </div>
        <div style={{ animationDelay: '300ms' }}>
          <AnimatedCounter
            endValue={analytics?.averageConfidence || 0}
            label="Avg Confidence"
            icon={TrendingUp}
            color="bg-accent-cyan/80 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            duration={3000}
          />
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VerdictDistributionChart verdicts={analytics?.verdicts || { AI_GENERATED: 0, AUTHENTIC: 0, INCONCLUSIVE: 0 }} />
        </div>

        {/* Quick Stats */}
        <div className="glass-panel p-6 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-cyan" />
            Quick Stats
          </h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-dark-900/40 border border-accent-cyan/30 hover:border-accent-cyan/60 transition-all glow-box">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Detection Rate</span>
                <span className="text-2xl font-bold text-neon-blue">
                  {analytics && analytics.total > 0
                    ? Math.round(
                        ((analytics.verdicts.AI_GENERATED + analytics.verdicts.AUTHENTIC) /
                          analytics.total) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 bg-dark-700 rounded-full overflow-hidden border border-dark-600/50">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan shadow-lg shadow-neon-cyan/50"
                  style={{
                    width: `${analytics && analytics.total > 0 ? Math.round(((analytics.verdicts.AI_GENERATED + analytics.verdicts.AUTHENTIC) / analytics.total) * 100) : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-900/40 border border-dark-700/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">False Positive Risk</span>
                <span className="text-2xl font-bold text-accent-blue">Low</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Safety-first flagging protocol enabled</p>
            </div>

            <div className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent-cyan mt-0.5" />
                <div>
                  <p className="font-medium text-accent-cyan">Integrity Protected</p>
                  <p className="text-xs text-accent-cyan/80 mt-1">SHA-256 verification enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivityFeed recentItems={analytics?.recent || []} />

      {error && (
        <div className="glass-panel p-6 bg-accent-indigo/10 border border-accent-indigo/30 text-accent-indigo text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
