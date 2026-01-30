import { Dumbbell, Clock, Flame, Trash2 } from "lucide-react";

interface WorkoutCardProps {
  name: string;
  duration: number;
  calories: number;
  type: string;
  completed?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const WorkoutCard = ({ name, duration, calories, type, completed = false, onClick, onDelete }: WorkoutCardProps) => {
  return (
    <div 
      className={`
        relative p-4 rounded-2xl border transition-all duration-300
        hover:scale-[1.02] hover:border-primary/50
        ${completed 
          ? 'bg-primary/5 border-primary/30' 
          : 'bg-card border-border'
        }
      `}
    >
      {completed && (
        <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground glow-volt">
          ✓ Completed
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={onClick}>
        <div className={`p-3 rounded-xl ${completed ? 'bg-primary/20' : 'bg-secondary'}`}>
          <Dumbbell className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{calories} kcal</span>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
