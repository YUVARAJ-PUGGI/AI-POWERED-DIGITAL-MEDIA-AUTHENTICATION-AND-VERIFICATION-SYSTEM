import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CaseManager from './pages/CaseManager';
import UploadSOP from './pages/UploadSOP';
import VerificationLog from './pages/VerificationLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cases" element={<CaseManager />} />
          <Route path="upload" element={<UploadSOP />} />
          <Route path="audit" element={<VerificationLog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
