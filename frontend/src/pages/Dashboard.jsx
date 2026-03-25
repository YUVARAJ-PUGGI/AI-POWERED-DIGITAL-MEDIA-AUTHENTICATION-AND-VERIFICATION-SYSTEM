import { Activity, AlertTriangle, CheckCircle2, FileVideo } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const mockRadarData = [
  { subject: 'Face Consistency', A: 95, fullMark: 100 },
  { subject: 'A/V Sync', A: 92, fullMark: 100 },
  { subject: 'Compression Artifacts', A: 85, fullMark: 100 },
  { subject: 'Metadata Anomalies', A: 98, fullMark: 100 },
  { subject: 'Voice Print', A: 88, fullMark: 100 },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="glass-panel p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="mt-4 text-sm">
      <span className="text-emerald-400 font-medium">{trend}</span>
      <span className="text-slate-500 ml-2">vs last week</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Cases" value="24" icon={Activity} trend="+12%" colorClass="bg-neon-blue/80 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
        <StatCard title="Evidence Processed" value="142" icon={FileVideo} trend="+5%" colorClass="bg-neon-purple/80 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
        <StatCard title="Tamper Alerts (7d)" value="3" icon={AlertTriangle} trend="-2" colorClass="bg-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
        <StatCard title="Verified Authentic" value="95%" icon={CheckCircle2} trend="+1%" colorClass="bg-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Cases List */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Recent Uploads</h3>
            <button className="text-sm text-neon-blue hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-dark-900/40 rounded-xl border border-dark-700/50 hover:border-dark-600 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                    <FileVideo className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-neon-cyan transition-colors">Interrogation_Room_A_Cam.mp4</h4>
                    <p className="text-xs text-slate-400 mt-1">Case #CR-2026-{204+i} • Uploaded 2h ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-400">92% Authentic</p>
                    <p className="text-xs text-slate-500">Hash Verified</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Radar Visualizer Demo */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-2">Deepfake Analysis Profile</h3>
          <p className="text-xs text-slate-400 mb-6">Aggregate scores of recent multimedia evidence</p>
          
          <div className="flex-1 min-h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'none' }} axisLine={false} />
                <Radar name="Authenticity" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-3 bg-neon-blue/10 border border-neon-blue/20 rounded-lg flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-neon-blue mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neon-blue">System Normal</p>
              <p className="text-xs text-slate-400">Model confidence levels are within standard operating thresholds.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
