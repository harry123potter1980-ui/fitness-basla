interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  value?: string | number;
  unit?: string;
}

const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  label,
  value,
  unit 
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--secondary))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(68 100% 50% / 0.5))'
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        {value !== undefined && (
          <span className="text-2xl font-bold text-foreground">
            {value}
            {unit && <span className="text-sm text-muted-foreground ml-0.5">{unit}</span>}
          </span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
