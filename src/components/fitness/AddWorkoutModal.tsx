import { useState } from "react";
import { X, Dumbbell } from "lucide-react";
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

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (workout: {
    name: string;
    duration: number;
    calories: number;
    type: string;
  }) => void;
}

const workoutTypes = [
  "Güç Antrenmanı",
  "Kardiyo",
  "HIIT",
  "Yoga",
  "Pilates",
  "Yüzme",
  "Koşu",
  "Bisiklet",
];

const AddWorkoutModal = ({ isOpen, onClose, onAdd }: AddWorkoutModalProps) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [type, setType] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && duration && calories && type) {
      onAdd({
        name,
        duration: parseInt(duration),
        calories: parseInt(calories),
        type,
      });
      setName("");
      setDuration("");
      setCalories("");
      setType("");
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
            <Dumbbell className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Antrenman Ekle</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">Antrenman Adı</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Göğüs ve Triceps"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="type" className="text-foreground">Antrenman Tipi</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="mt-1.5 bg-secondary border-border">
                <SelectValue placeholder="Tip seçin" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {workoutTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration" className="text-foreground">Süre (dk)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="45"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="calories" className="text-foreground">Kalori (kcal)</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="300"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-volt font-semibold"
          >
            Antrenmanı Kaydet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
