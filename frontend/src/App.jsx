import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CaseManager from './pages/CaseManager';
import UploadSOP from './pages/UploadSOP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cases" element={<CaseManager />} />
          <Route path="upload" element={<UploadSOP />} />
          <Route path="audit" element={<div className="p-8 text-xl">Audit Logs & Chain of Custody (Coming Soon...)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
