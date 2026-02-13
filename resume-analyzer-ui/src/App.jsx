import { useState } from 'react';
import './App.css';
import UploadCard from './components/UploadCard';
import Loader from './components/Loader';
import AnalysisResult from './components/AnalysisResult';
import ATSChecker from './components/ATSChecker';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('analyzer');

  const handleAnalyzerReset = () => {
    setAnalysis(null);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="main-container">
        <div className="header">
          <div className="title">✨ Resume AI Suite</div>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'analyzer' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('analyzer');
                setAnalysis(null);
              }}
            >
              <span className="tab-icon">📊</span>
              <span className="tab-label">Resume Analyzer</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'ats' ? 'active' : ''}`}
              onClick={() => setActiveTab('ats')}
            >
              <span className="tab-icon">🎯</span>
              <span className="tab-label">ATS Checker</span>
            </button>
          </div>
        </div>

        {/* Resume Analyzer Tab */}
        {activeTab === 'analyzer' && (
          <>
            <UploadCard
              setAnalysis={setAnalysis}
              setLoading={setLoading}
            />

            {loading && <Loader />}

            {analysis && !loading && (
              <AnalysisResult data={analysis} onReset={handleAnalyzerReset} />
            )}
          </>
        )}

        {/* ATS Checker Tab */}
        {activeTab === 'ats' && (
          <ATSChecker />
        )}
      </div>
    </div>
  );
}

export default App;
