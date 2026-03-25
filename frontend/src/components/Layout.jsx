import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, FolderOpen, Upload, FileSignature, LogOut, Bell } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, onClick, active, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      active
        ? 'bg-gradient-to-r from-accent-cyan/20 to-transparent border-l-4 border-accent-cyan text-accent-cyan'
        : 'text-slate-400 hover:text-white hover:bg-dark-700/50'
    } disabled:opacity-60 disabled:cursor-not-allowed`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navTransition, setNavTransition] = useState(null);
  const navTimerRef = useRef(null);

  useEffect(() => () => {
    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }
  }, []);

  useEffect(() => {
    // Clear transition overlay when route actually changes.
    setNavTransition(null);
  }, [location.pathname]);

  const startLayoutNavigation = (path, modeLabel) => {
    if (navTransition || location.pathname === path) return;

    setNavTransition({ modeLabel });

    if (navTimerRef.current) {
      clearTimeout(navTimerRef.current);
    }

    navTimerRef.current = setTimeout(() => {
      navigate(path, {
        state: {
          cinematic: true,
          cinematicMode: modeLabel,
          from: 'layout'
        }
      });
    }, 550);

    // Safety fallback: never let the overlay stay forever.
    setTimeout(() => {
      setNavTransition(null);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-dark-900 overflow-hidden">
      {navTransition && (
        <div className="fixed inset-0 z-[120] bg-dark-950/85 backdrop-blur-md flex items-center justify-center px-4">
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-700/50 bg-dark-800/60 p-10 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-blue/10 animate-gradient-morph" />
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent-cyan/20 blur-3xl animate-gradient-morph" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent-blue/20 blur-3xl animate-gradient-morph" style={{ animationDelay: '2s' }} />
            
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              {/* Forensic HUD Loader - Enhanced Edition */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer ring - rotating with gradient glow */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-cyan border-r-accent-blue animate-spin" style={{ animationDuration: '3s', boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 12px rgba(6, 182, 212, 0.2)' }} />
                
                {/* Middle ring - counter-rotating with enhanced glow */}
                <div className="absolute inset-3 rounded-full border border-accent-cyan/50 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse', boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)' }} />
                
                {/* Pulsing energy ring */}
                <div className="absolute inset-6 rounded-full border border-accent-blue/30 animate-pulse" style={{ animationDuration: '2s' }} />
                
                {/* Grid overlay - enhanced visibility */}
                <div className="absolute inset-0 rounded-full opacity-30" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent)',
                  backgroundSize: '40px 40px'
                }} />
                
                {/* Center shield icon with glow */}
                <Shield className="w-6 h-6 text-accent-cyan relative z-20" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
              </div>

              {/* Phase indicators - compact enhanced */}
              <div className="space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-1.5 animate-phase-flow" style={{ animationDelay: '0s' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 6px rgba(6, 182, 212, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite' }} />
                  <span className="text-xs font-mono text-accent-cyan">Integrity</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 animate-phase-flow" style={{ animationDelay: '0.3s' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" style={{ boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite', animationDelay: '0.3s' }} />
                  <span className="text-xs font-mono text-accent-blue">Forensic</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 animate-phase-flow" style={{ animationDelay: '0.6s' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" style={{ boxShadow: '0 0 6px rgba(6, 182, 212, 0.8)', animation: 'phase-pulse 2s ease-in-out infinite', animationDelay: '0.6s' }} />
                  <span className="text-xs font-mono text-accent-cyan">Verdict</span>
                </div>
              </div>

              {/* Signal bars - compact enhanced */}
              <div className="flex items-end justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-accent-blue to-accent-cyan rounded-sm"
                    style={{
                      width: '3px',
                      height: `${(i + 1) * 6}px`,
                      animation: `signal-bar 1.5s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      boxShadow: `0 0 8px rgba(59, 130, 246, 0.6)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-y-0 border-l-0 rounded-none rounded-r-2xl flex flex-col z-10 relative">
        <div className="p-6 flex items-center space-x-3">
          <button
            type="button"
            onClick={() => startLayoutNavigation('/', 'Home')}
            disabled={Boolean(navTransition)}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Shield className="w-8 h-8 text-accent-cyan" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">VeriTrace</h1>
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            onClick={() => startLayoutNavigation('/app/dashboard', 'Dashboard')}
            active={location.pathname.includes('dashboard')}
            disabled={Boolean(navTransition)}
          />
          <SidebarItem
            icon={FolderOpen}
            label="Media Library"
            onClick={() => startLayoutNavigation('/app/cases', 'Collections')}
            active={location.pathname.includes('cases')}
            disabled={Boolean(navTransition)}
          />
          <SidebarItem
            icon={Upload}
            label="Upload Media"
            onClick={() => startLayoutNavigation('/app/upload', 'Verification')}
            active={location.pathname.includes('upload')}
            disabled={Boolean(navTransition)}
          />
          <SidebarItem
            icon={FileSignature}
            label="Verification Log"
            onClick={() => startLayoutNavigation('/app/audit', 'Audit')}
            active={location.pathname.includes('audit')}
            disabled={Boolean(navTransition)}
          />
        </nav>

        <div className="p-6 border-t border-dark-700/50 space-y-4">
          <button
            type="button"
            onClick={() => startLayoutNavigation('/', 'Home')}
            disabled={Boolean(navTransition)}
            className="w-full text-left flex items-center space-x-3 text-slate-400 hover:text-accent-cyan cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
        
        {/* Header */}
        <header className="h-20 glass-panel border-x-0 border-t-0 rounded-none bg-dark-800/40 flex items-center justify-between px-8 z-10 relative">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold glowing-text">Public Media Trust Portal</h2>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-neon-blue rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-blue to-neon-cyan p-[2px]">
                <div className="w-full h-full bg-dark-800 rounded-full flex items-center justify-center font-bold text-sm">
                  JD
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Public User</p>
                <p className="text-xs text-slate-400">Community Verification</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 z-10 relative z-0">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default Layout;
