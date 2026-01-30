import { Utensils, Trash2 } from "lucide-react";

interface MealCardProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  onClick?: () => void;
  onDelete?: () => void;
}

const MealCard = ({ name, calories, protein, carbs, fat, mealType, onClick, onDelete }: MealCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-secondary">
          <Utensils className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{mealType}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-primary">{calories}</span>
          <span className="text-sm text-muted-foreground ml-1">kcal</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-2 flex-1 mr-2">
          <div className="p-2 rounded-lg bg-secondary/50 text-center">
            <p className="text-xs text-muted-foreground">Protein</p>
            <p className="font-semibold text-foreground">{protein}g</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50 text-center">
            <p className="text-xs text-muted-foreground">Carbs</p>
            <p className="font-semibold text-foreground">{carbs}g</p>
          </div>
          <div className="p-2 rounded-lg bg-secondary/50 text-center">
            <p className="text-xs text-muted-foreground">Fat</p>
            <p className="font-semibold text-foreground">{fat}g</p>
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

export default MealCard;
