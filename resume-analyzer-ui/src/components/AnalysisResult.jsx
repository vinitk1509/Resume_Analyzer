import './AnalysisResult.css';

const RatingBar = ({ rating, outOf = 10, color = '#6366f1' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
    <div style={{
      flex: 1,
      height: '8px',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${(rating / outOf) * 100}%`,
        height: '100%',
        background: `linear-gradient(90deg, ${color}, #818cf8)`,
        transition: 'width 0.6s ease-out',
      }}></div>
    </div>
    <div style={{
      minWidth: '40px',
      fontWeight: '700',
      fontSize: '0.95rem',
      color,
    }}>
      {rating}/{outOf}
    </div>
  </div>
);

const Badge = ({ label, variant = 'primary' }) => {
  const colors = {
    primary: { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: '#6366f1' },
    success: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '#10b981' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '#f59e0b' },
    danger: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '#ef4444' },
  };
  
  const style = colors[variant] || colors.primary;
  
  return (
    <span style={{
      display: 'inline-block',
      padding: '6px 12px',
      backgroundColor: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      margintRight: '8px',
    }}>
      {label}
    </span>
  );
};

export default function AnalysisResult({ data, onReset }) {
  const getScoreBadge = (score) => {
    if (score >= 75) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  const getRatingVariant = (rating) => {
    if (rating >= 7) return 'success';
    if (rating >= 5) return 'warning';
    return 'danger';
  };

  return (
    <>
      {/* Overall Score - Hero Section */}
      <div className="card glow-success" style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.05))',
        textAlign: 'center',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}>
        <p style={{ margin: '0 0 20px 0', opacity: 0.8, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          📊 Resume Assessment
        </p>
        <div className="score" style={{ marginBottom: '20px' }}>
          {data.overall_score}
        </div>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 20px' }}>
          {data.summary}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Badge label={`${data.overall_score >= 75 ? '✓' : '→'} Overall Performance`} variant={getScoreBadge(data.overall_score)} />
        </div>
      </div>

      {/* Technical Skills */}
      <div className="card">
        <div className="section-title">💻 Technical Skills</div>
        <RatingBar rating={data.technical_skills.rating} outOf={10} color="#818cf8" />
        
        {data.technical_skills.strong_areas && data.technical_skills.strong_areas.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, marginBottom: '8px' }}>Strengths:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {data.technical_skills.strong_areas.map((skill, i) => (
                <Badge key={i} label={skill} variant="success" />
              ))}
            </div>
          </div>
        )}

        {data.technical_skills.missing_critical_skills && data.technical_skills.missing_critical_skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, marginBottom: '8px' }}>Skills to Develop:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {data.technical_skills.missing_critical_skills.map((skill, i) => (
                <Badge key={i} label={skill} variant="warning" />
              ))}
            </div>
          </div>
        )}

        <p style={{ fontStyle: 'italic', opacity: 0.85, lineHeight: '1.6' }}>
          {data.technical_skills.feedback}
        </p>
      </div>

      {/* Experience */}
      <div className="card">
        <div className="section-title">🏢 Experience Quality</div>
        <RatingBar rating={data.experience_analysis.quality_rating} outOf={10} color="#10b981" />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', opacity: 0.7 }}>Impact-Based</p>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem' }}>
              {data.experience_analysis.impact_based ? '✓ Yes' : '○ Needs Work'}
            </p>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', opacity: 0.7 }}>Quantified Results</p>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem' }}>
              {data.experience_analysis.quantified_achievements ? '✓ Yes' : '○ Needs Work'}
            </p>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', opacity: 0.7 }}>Leadership Shown</p>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem' }}>
              {data.experience_analysis.leadership_indicators ? '✓ Yes' : '○ Needs Work'}
            </p>
          </div>
        </div>

        <p style={{ fontStyle: 'italic', opacity: 0.85, lineHeight: '1.6' }}>
          {data.experience_analysis.feedback}
        </p>
      </div>

      {/* Projects */}
      <div className="card">
        <div className="section-title">🚀 Projects & Innovation</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, marginBottom: '8px' }}>Innovation Rating</p>
            <RatingBar rating={data.projects_analysis.innovation_rating} outOf={10} color="#f59e0b" />
          </div>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, marginBottom: '8px' }}>Technical Depth</p>
            <RatingBar rating={data.projects_analysis.technical_depth} outOf={10} color="#8b5cf6" />
          </div>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8, marginBottom: '8px' }}>Real-World Relevance</p>
            <RatingBar rating={data.projects_analysis.real_world_relevance} outOf={10} color="#ec4899" />
          </div>
        </div>

        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '8px',
          marginBottom: '16px',
        }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', opacity: 0.7, fontWeight: '500' }}>Complexity Level</p>
          <Badge label={data.projects_analysis.complexity_level || 'Not specified'} variant="primary" />
        </div>

        <p style={{ fontStyle: 'italic', opacity: 0.85, lineHeight: '1.6' }}>
          {data.projects_analysis.feedback}
        </p>
      </div>

      {/* Strengths */}
      {data.strengths && data.strengths.length > 0 && (
        <div className="card glow-success">
          <div className="section-title">✨ Your Strengths</div>
          <ul style={{ margin: 0, padding: 0 }}>
            {data.strengths.map((item, i) => (
              <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(99, 102, 241, 0.1)', listStyle: 'none' }}>
                <span style={{ color: '#10b981', fontWeight: '600', marginRight: '8px' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {data.weaknesses && data.weaknesses.length > 0 && (
        <div className="card glow-danger">
          <div className="section-title">⚠️ Areas for Improvement</div>
          <ul style={{ margin: 0, padding: 0 }}>
            {data.weaknesses.map((w, i) => (
              <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', listStyle: 'none' }}>
                <span style={{ color: '#ef4444', fontWeight: '600', marginRight: '8px' }}>○</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvement Suggestions */}
      {data.improvement_suggestions && data.improvement_suggestions.length > 0 && (
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(99, 102, 241, 0.05))',
          borderColor: 'rgba(245, 158, 11, 0.3)',
        }}>
          <div className="section-title" style={{ color: '#f59e0b' }}>💡 Actionable Recommendations</div>
          <ul style={{ margin: 0, padding: 0 }}>
            {data.improvement_suggestions.map((item, i) => (
              <li key={i} style={{
                padding: '12px 0',
                paddingLeft: '24px',
                borderBottom: '1px solid rgba(245, 158, 11, 0.1)',
                listStyle: 'none',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#f59e0b',
                  fontWeight: '600',
                }}>
                  {i + 1}.
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final Verdict */}
      <div className="card glow-success" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.08))',
        textAlign: 'center',
        paddingTop: '40px',
        paddingBottom: '40px',
        marginBottom: '0',
      }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '20px' }}>🎯 Final Verdict</div>
        <h2 style={{ fontSize: '1.8rem', margin: '0 0 20px 0', lineHeight: '1.4' }}>
          {data.final_verdict}
        </h2>
        <p style={{ fontSize: '0.95rem', opacity: 0.8, maxWidth: '500px', margin: '0 auto' }}>
          Use the recommendations above to strengthen your resume and increase your chances of landing interviews.
        </p>
      </div>

      {/* Action Buttons */}
      {onReset && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '30px',
          paddingTop: '30px',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
        }}>
          <button
            onClick={onReset}
            style={{
              padding: '14px 30px',
              border: '2px solid #6366f1',
              background: 'transparent',
              color: '#818cf8',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(99, 102, 241, 0.1)';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🔄 Analyze Another Resume
          </button>
        </div>
      )}
    </>
  );
}
