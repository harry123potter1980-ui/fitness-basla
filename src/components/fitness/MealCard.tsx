import { Utensils } from "lucide-react";

interface MealCardProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  onClick?: () => void;
}

const MealCard = ({ name, calories, protein, carbs, fat, mealType, onClick }: MealCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-2xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-secondary">
          <Utensils className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{mealType}</p>
        </div>
        <div className="ml-auto text-right">
          <span className="text-xl font-bold text-primary">{calories}</span>
          <span className="text-sm text-muted-foreground ml-1">kcal</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="p-2 rounded-lg bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground">Protein</p>
          <p className="font-semibold text-foreground">{protein}g</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground">Karb</p>
          <p className="font-semibold text-foreground">{carbs}g</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground">Yağ</p>
          <p className="font-semibold text-foreground">{fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
