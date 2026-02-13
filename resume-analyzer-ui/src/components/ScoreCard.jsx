export default function ScoreCard({ score, summary }) {
  return (
    <div className="card">
      <h2>Overall Score</h2>
      <div className="score">{score}/100</div>
      <p>{summary}</p>
    </div>
  );
}
