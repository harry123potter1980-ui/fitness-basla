import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  highlight?: boolean;
}

const StatCard = ({ icon, title, value, unit, subtitle, highlight = false }: StatCardProps) => {
  return (
    <div className={`
      relative p-5 rounded-2xl border transition-all duration-300
      ${highlight 
        ? 'bg-primary/10 border-primary/30 glow-volt' 
        : 'bg-card border-border hover:border-primary/30'
      }
    `}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`
          p-2.5 rounded-xl
          ${highlight ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}
        `}>
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </span>
        {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
      </div>
      {subtitle && (
        <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
