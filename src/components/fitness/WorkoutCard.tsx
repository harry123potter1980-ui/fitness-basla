import { Dumbbell, Clock, Flame } from "lucide-react";

interface WorkoutCardProps {
  name: string;
  duration: number;
  calories: number;
  type: string;
  completed?: boolean;
  onClick?: () => void;
}

const WorkoutCard = ({ name, duration, calories, type, completed = false, onClick }: WorkoutCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 rounded-2xl border cursor-pointer transition-all duration-300
        hover:scale-[1.02] hover:border-primary/50
        ${completed 
          ? 'bg-primary/5 border-primary/30' 
          : 'bg-card border-border'
        }
      `}
    >
      {completed && (
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
          ✓ Tamamlandı
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-secondary">
          <Dumbbell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{duration} dk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>{calories} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
