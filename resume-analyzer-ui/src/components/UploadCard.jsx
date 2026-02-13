import { useRef, useState } from 'react';
import axios from 'axios';

export default function UploadCard({ setAnalysis, setLoading }) {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!fileRef.current?.files?.[0]) {
      setError('Please select a resume file first');
      return;
    }

    const file = fileRef.current.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, Word document, or text file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/resume/analyze',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setAnalysis(response.data);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Upload Your Resume</h2>
        <p style={{ opacity: 0.7, marginBottom: '20px' }}>
          Get AI-powered insights on your resume quality
        </p>
      </div>

      <div style={{
        border: '2px dashed rgba(99, 102, 241, 0.3)',
        borderRadius: '16px',
        padding: '40px 20px',
        textAlign: 'center',
        marginBottom: '30px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.8)';
          e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)';
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
          e.currentTarget.style.backgroundColor = 'transparent';
          if (e.dataTransfer.files?.[0]) {
            fileRef.current.files = e.dataTransfer.files;
            setFileName(e.dataTransfer.files[0].name);
            setError('');
          }
        }}
        onClick={() => fileRef.current?.click()}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📄</div>
        <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: '600' }}>
          {fileName || 'Click to select or drag & drop'}
        </p>
        <p style={{ opacity: 0.6, margin: 0, fontSize: '0.9rem' }}>
          Supported: PDF, Word (.doc, .docx), Text (.txt)
        </p>
      </div>

      {fileName && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderLeft: '4px solid #10b981',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.95rem',
        }}>
          ✓ Selected: <strong>{fileName}</strong>
        </div>
      )}

      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderLeft: '4px solid #ef4444',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.95rem',
          color: '#fca5a5',
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="upload-container">
        <button
          className="secondary-btn"
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          📁 Choose File
        </button>

        <button
          className="primary-btn"
          onClick={handleUpload}
          disabled={!fileName}
          style={{ opacity: !fileName ? 0.5 : 1, cursor: !fileName ? 'not-allowed' : 'pointer' }}
        >
          🚀 Analyze Resume
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt"
      />
    </div>
  );
}
