import { useState } from "react";
import { X, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MealInsert } from "@/types/fitness";

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (meal: MealInsert) => void;
}

const mealTypes = [
  "Kahvaltı",
  "Öğle Yemeği",
  "Akşam Yemeği",
  "Ara Öğün",
  "Atıştırmalık",
];

const AddMealModal = ({ isOpen, onClose, onAdd }: AddMealModalProps) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && calories && mealType) {
      const today = new Date().toISOString().split('T')[0];
      onAdd({
        name,
        calories: parseInt(calories),
        protein: parseInt(protein) || 0,
        carbs: parseInt(carbs) || 0,
        fat: parseInt(fat) || 0,
        meal_type: mealType,
        meal_date: today,
      });
      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
      setMealType("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-card border border-border animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground">
            <Utensils className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Öğün Ekle</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="meal-name" className="text-foreground">Yemek Adı</Label>
            <Input
              id="meal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Tavuklu Salata"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="meal-type" className="text-foreground">Öğün Tipi</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="mt-1.5 bg-secondary border-border">
                <SelectValue placeholder="Öğün seçin" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {mealTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="meal-calories" className="text-foreground">Kalori (kcal)</Label>
            <Input
              id="meal-calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="450"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="protein" className="text-foreground">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="30"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="carbs" className="text-foreground">Karb (g)</Label>
              <Input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="40"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-foreground">Yağ (g)</Label>
              <Input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="15"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-volt font-semibold"
          >
            Öğünü Kaydet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddMealModal;
