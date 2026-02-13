import { useRef, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import ATSResult from './ATSResult';
import './ATSChecker.css';

export default function ATSChecker() {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!fileRef.current?.files?.[0]) {
      setError('Please select a resume file first');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please paste the job description');
      return;
    }

    const file = fileRef.current.files[0];
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, Word document, or text file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('jd', jobDescription);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/resume/ats-checker',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      console.log('Raw response:', response.data);
      
      // The backend returns the parsed JSON directly
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format from backend');
      }
      
      setAtsResult(response.data);
      setError('');
    } catch (err) {
      setError('Failed to analyze ATS compatibility. ' + (err.response?.data?.message || err.message || 'Please try again.'));
      console.error('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFileName('');
    setJobDescription('');
    setError('');
    setAtsResult(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (loading) return <Loader />;

  if (atsResult) {
    return <ATSResult data={atsResult} onReset={handleReset} />;
  }

  return (
    <div className="ats-checker-container">
      <div className="ats-header">
        <h2> ATS Compatibility Checker</h2>
        <p>Compare your resume with job description and optimize for ATS systems</p>
      </div>

      <div className="ats-content">
        {/* Resume Upload Section */}
        <div className="ats-section resume-upload">
          <h3>📄 Resume Upload</h3>
          <div
            className="dropzone"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add('dragover');
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('dragover');
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('dragover');
              if (e.dataTransfer.files?.[0]) {
                fileRef.current.files = e.dataTransfer.files;
                setFileName(e.dataTransfer.files[0].name);
                setError('');
              }
            }}
            onClick={() => fileRef.current?.click()}
          >
            <div className="dropzone-icon">📁</div>
            <p className="dropzone-text">
              {fileName || 'Click to select or drag & drop your resume'}
            </p>
            <p className="dropzone-hint">
              Supported: PDF, Word (.doc, .docx), Text (.txt)
            </p>
          </div>

          {fileName && (
            <div className="file-selected">
              ✓ Selected: <strong>{fileName}</strong>
            </div>
          )}

          <input
            ref={fileRef}
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
          />
        </div>

        {/* Job Description Section */}
        <div className="ats-section job-description">
          <h3>💼 Job Description</h3>
          <textarea
            className="jd-textarea"
            placeholder="Paste the job description here... (Include all required skills, experience, qualifications, etc.)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="12"
          />
          <p className="char-count">
            {jobDescription.length} characters
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="ats-actions">
        <button
          className="btn-secondary"
          onClick={() => fileRef.current?.click()}
        >
          📁 Choose Resume
        </button>

        <button
          className="btn-primary"
          onClick={handleAnalyze}
          disabled={!fileName || !jobDescription.trim()}
        >
          🚀 Analyze ATS Compatibility
        </button>
      </div>
    </div>
  );
}
