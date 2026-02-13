import './ATSResult.css';

export default function ATSResult({ data, onReset }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getVerdictColor = (verdict) => {
    if (verdict.includes('Strong')) return '#10b981';
    if (verdict.includes('Moderate')) return '#f59e0b';
    return '#ef4444';
  };

  const renderScoreBar = (score, label) => (
    <div className="score-item">
      <div className="score-label">{label}</div>
      <div className="score-bar-container">
        <div
          className="score-bar-fill"
          style={{
            width: `${score}%`,
            backgroundColor: getScoreColor(score)
          }}
        />
      </div>
      <div className="score-value">{score}%</div>
    </div>
  );

  return (
    <div className="ats-result-container">
      {/* Header with Overall Score */}
      <div className="ats-result-header">
        <div className="main-score-section">
          <div className="score-circle" style={{ borderColor: getScoreColor(data.ats_score) }}>
            <div className="score-number">{data.ats_score}</div>
            <div className="score-label-circle">ATS Score</div>
          </div>
          <div className="verdict-section">
            <h2 style={{ color: getVerdictColor(data.final_verdict) }}>
              {data.final_verdict?.split(' with')[0] || 'Analyzing...'}
            </h2>
            <p className="match-summary">{data.match_summary}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        {renderScoreBar(data.skills_analysis?.match_percentage || 0, '🎯 Skills Match')}
        {renderScoreBar(data.tools_technology_match?.match_percentage || 0, '⚙️ Tools & Tech')}
        {renderScoreBar((data.experience_analysis?.experience_match_score || 0) * 10, '💼 Experience')}
      </div>

      {/* Role Alignment */}
      {data.role_alignment && (
        <div className="ats-card">
          <h3>👔 Role Alignment</h3>
          <div className="alignment-grid">
            <div className="alignment-item">
              <span className="alignment-label">Job Title Match</span>
              <span className={data.role_alignment.job_title_match ? 'badge-success' : 'badge-danger'}>
                {data.role_alignment.job_title_match ? '✓ Match' : '✗ No Match'}
              </span>
            </div>
            <div className="alignment-item">
              <span className="alignment-label">Domain Match</span>
              <span className={data.role_alignment.domain_match ? 'badge-success' : 'badge-danger'}>
                {data.role_alignment.domain_match ? '✓ Match' : '✗ No Match'}
              </span>
            </div>
            <div className="alignment-item">
              <span className="alignment-label">Seniority Match</span>
              <span className={data.role_alignment.seniority_match ? 'badge-success' : 'badge-danger'}>
                {data.role_alignment.seniority_match ? '✓ Match' : '✗ No Match'}
              </span>
            </div>
          </div>
          {data.role_alignment.feedback && (
            <p className="feedback-text">{data.role_alignment.feedback}</p>
          )}
        </div>
      )}

      {/* Skills Analysis */}
      {data.skills_analysis && (
        <div className="ats-card">
          <h3>🎯 Skills Analysis</h3>
          
          {data.skills_analysis.matched_skills?.length > 0 && (
            <div className="skills-section">
              <h4 className="section-title">✓ Matched Skills</h4>
              <div className="skills-list">
                {data.skills_analysis.matched_skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge skill-matched">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {data.skills_analysis.partially_matched_skills?.length > 0 && (
            <div className="skills-section">
              <h4 className="section-title">⚡ Partially Matched Skills</h4>
              <div className="skills-list">
                {data.skills_analysis.partially_matched_skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge skill-partial">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {data.skills_analysis.missing_skills?.length > 0 && (
            <div className="skills-section">
              <h4 className="section-title">✗ Missing Skills</h4>
              <div className="skills-list">
                {data.skills_analysis.missing_skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge skill-missing">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Critical Missing Keywords */}
      {data.critical_missing_keywords?.length > 0 && (
        <div className="ats-card warning-card">
          <h3>⚠️ Critical Missing Keywords</h3>
          <div className="keywords-list">
            {data.critical_missing_keywords.map((keyword, idx) => (
              <span key={idx} className="keyword-badge">{keyword}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Analysis */}
      {data.experience_analysis && (
        <div className="ats-card">
          <h3>💼 Experience Match</h3>
          <div className="experience-grid">
            <div className="exp-item">
              <span className="exp-label">Years Required</span>
              <span className="exp-value">{data.experience_analysis.years_required}</span>
            </div>
            <div className="exp-item">
              <span className="exp-label">Your Experience</span>
              <span className="exp-value">{data.experience_analysis.years_present_in_resume}</span>
            </div>
          </div>
          {data.experience_analysis.feedback && (
            <p className="feedback-text">{data.experience_analysis.feedback}</p>
          )}
        </div>
      )}

      {/* Tools & Technologies */}
      {data.tools_technology_match && (
        <div className="ats-card">
          <h3>⚙️ Tools & Technologies</h3>
          
          {data.tools_technology_match.matched_tools?.length > 0 && (
            <div className="tools-section">
              <h4 className="section-title">✓ Matched Tools</h4>
              <div className="tools-list">
                {data.tools_technology_match.matched_tools.map((tool, idx) => (
                  <span key={idx} className="tool-badge tool-matched">{tool}</span>
                ))}
              </div>
            </div>
          )}

          {data.tools_technology_match.missing_tools?.length > 0 && (
            <div className="tools-section">
              <h4 className="section-title">✗ Missing Tools</h4>
              <div className="tools-list">
                {data.tools_technology_match.missing_tools.map((tool, idx) => (
                  <span key={idx} className="tool-badge tool-missing">{tool}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Education Match */}
      {data.education_match && (
        <div className="ats-card">
          <h3>🎓 Education Match</h3>
          <div className="education-grid">
            <div className="edu-item">
              <span className="edu-label">Required Education</span>
              <span className="edu-value">{data.education_match.required_education}</span>
            </div>
            <div className="edu-item">
              <span className="edu-label">Your Education</span>
              <span className="edu-value">{data.education_match.education_present}</span>
            </div>
            <div className="edu-item">
              <span className="edu-label">Match Status</span>
              <span className={data.education_match.match ? 'badge-success' : 'badge-danger'}>
                {data.education_match.match ? '✓ Match' : '✗ No Match'}
              </span>
            </div>
          </div>
          {data.education_match.feedback && (
            <p className="feedback-text">{data.education_match.feedback}</p>
          )}
        </div>
      )}

      {/* Soft Skills */}
      {data.soft_skills_match && (
        <div className="ats-card">
          <h3>💬 Soft Skills Match</h3>
          
          {data.soft_skills_match.matched_soft_skills?.length > 0 && (
            <div className="soft-skills-section">
              <h4 className="section-title">✓ Matched Soft Skills</h4>
              <div className="soft-skills-list">
                {data.soft_skills_match.matched_soft_skills.map((skill, idx) => (
                  <span key={idx} className="soft-skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {data.soft_skills_match.missing_soft_skills?.length > 0 && (
            <div className="soft-skills-section">
              <h4 className="section-title">✗ Missing Soft Skills</h4>
              <div className="soft-skills-list">
                {data.soft_skills_match.missing_soft_skills.map((skill, idx) => (
                  <span key={idx} className="soft-skill-badge missing">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Optimization Suggestions */}
      {data.ats_optimization_suggestions?.length > 0 && (
        <div className="ats-card suggestions-card">
          <h3>✨ ATS Optimization Suggestions</h3>
          <ol className="suggestions-list">
            {data.ats_optimization_suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Rewrite Suggestions */}
      {data.rewrite_suggestions && (
        <div className="ats-card rewrite-card">
          <h3>📝 Resume Rewrite Suggestions</h3>
          
          {data.rewrite_suggestions.summary_rewrite && (
            <div className="rewrite-section">
              <h4>Professional Summary</h4>
              <p className="rewrite-example">{data.rewrite_suggestions.summary_rewrite}</p>
            </div>
          )}

          {data.rewrite_suggestions.experience_rewrite_example && (
            <div className="rewrite-section">
              <h4>Experience Section Example</h4>
              <p className="rewrite-example">{data.rewrite_suggestions.experience_rewrite_example}</p>
            </div>
          )}

          {data.rewrite_suggestions.skills_section_improvement && (
            <div className="rewrite-section">
              <h4>Skills Section Improvement</h4>
              <p className="rewrite-example">{data.rewrite_suggestions.skills_section_improvement}</p>
            </div>
          )}
        </div>
      )}

      {/* Keyword Density */}
      {data.keyword_density && (
        <div className="ats-card">
          <h3>🔑 Keyword Density Analysis</h3>
          
          {data.keyword_density.overused_keywords?.length > 0 && (
            <div className="keyword-section">
              <h4 className="section-title">Overused Keywords</h4>
              <div className="keyword-list-inline">
                {data.keyword_density.overused_keywords.map((kw, idx) => (
                  <span key={idx} className="kw-badge overused">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {data.keyword_density.underused_keywords?.length > 0 && (
            <div className="keyword-section">
              <h4 className="section-title">Underused Keywords</h4>
              <div className="keyword-list-inline">
                {data.keyword_density.underused_keywords.map((kw, idx) => (
                  <span key={idx} className="kw-badge underused">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {data.keyword_density.optimization_feedback && (
            <p className="feedback-text">{data.keyword_density.optimization_feedback}</p>
          )}
        </div>
      )}

      {/* Reset Button */}
      <div className="ats-reset-section">
        <button className="btn-secondary-large" onClick={onReset}>
          🔄 Check Another Resume
        </button>
      </div>
    </div>
  );
}
