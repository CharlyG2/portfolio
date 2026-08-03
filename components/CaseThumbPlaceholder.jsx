export function PendingPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 112 80" preserveAspectRatio="none">
      <rect width="112" height="80" fill="#12161F" />
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1={-20 + i * 30}
          y1="0"
          x2={20 + i * 30}
          y2="80"
          stroke="#1B212D"
          strokeWidth="10"
        />
      ))}
      <circle cx="56" cy="40" r="3" fill="#5B6272" />
    </svg>
  );
}

export function AnalysisPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 112 80" preserveAspectRatio="none">
      <rect width="112" height="80" fill="#12161F" />
      <polyline
        points="10,55 32,45 48,58 66,30 88,38 102,20"
        fill="none"
        stroke="#3D5AFE"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      {[
        [10, 55],
        [32, 45],
        [48, 58],
        [66, 30],
        [88, 38],
        [102, 20],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill="#8FA0FF" />
      ))}
    </svg>
  );
}
