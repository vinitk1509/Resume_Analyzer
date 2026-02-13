export default function Loader() {
  return (
    <div className="card glow-success" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
    }}>
      <style>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        .loader-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(99, 102, 241, 0.2);
          border-top-color: #6366f1;
          border-right-color: #818cf8;
          border-radius: 50%;
          animation: rotate 1s linear infinite;
          margin: 0 auto 30px;
        }

        .loader-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 30px;
        }

        .loader-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          animation: pulse-scale 1.4s ease-in-out infinite;
        }

        .loader-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loader-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>

      <div className="loader-spinner"></div>

      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
          Analyzing Your Resume
        </h3>
        <p style={{ margin: '0 0 20px 0', opacity: 0.7, fontSize: '1rem' }}>
          Our AI is evaluating technical depth, impact, and structure...
        </p>
        
        <div className="loader-dots">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      </div>

      <div style={{
        marginTop: '40px',
        fontSize: '0.9rem',
        opacity: 0.6,
        maxWidth: '300px',
      }}>
        <p style={{ margin: '0' }}>
          This usually takes 10-30 seconds. Please don't close this tab.
        </p>
      </div>
    </div>
  );
}
