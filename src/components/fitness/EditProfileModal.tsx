import { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile } from "@/types/fitness";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (updates: Partial<Profile>) => void;
}

const EditProfileModal = ({ isOpen, onClose, profile, onSave }: EditProfileModalProps) => {
  const [displayName, setDisplayName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
  const [weeklyWorkoutGoal, setWeeklyWorkoutGoal] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setHeight(profile.height?.toString() || "");
      setWeight(profile.weight?.toString() || "");
      setTargetWeight(profile.target_weight?.toString() || "");
      setDailyCalorieGoal(profile.daily_calorie_goal?.toString() || "2000");
      setWeeklyWorkoutGoal(profile.weekly_workout_goal?.toString() || "5");
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      display_name: displayName || null,
      height: height ? parseInt(height) : null,
      weight: weight ? parseFloat(weight) : null,
      target_weight: targetWeight ? parseFloat(targetWeight) : null,
      daily_calorie_goal: parseInt(dailyCalorieGoal) || 2000,
      weekly_workout_goal: parseInt(weeklyWorkoutGoal) || 5,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-card border border-border animate-slide-up max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground glow-volt">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height" className="text-foreground">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-foreground">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="targetWeight" className="text-foreground">Target Weight (kg)</Label>
            <Input
              id="targetWeight"
              type="number"
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="65"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dailyCalorieGoal" className="text-foreground">Daily Calorie Goal</Label>
              <Input
                id="dailyCalorieGoal"
                type="number"
                value={dailyCalorieGoal}
                onChange={(e) => setDailyCalorieGoal(e.target.value)}
                placeholder="2000"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="weeklyWorkoutGoal" className="text-foreground">Weekly Workouts</Label>
              <Input
                id="weeklyWorkoutGoal"
                type="number"
                value={weeklyWorkoutGoal}
                onChange={(e) => setWeeklyWorkoutGoal(e.target.value)}
                placeholder="5"
                className="mt-1.5 bg-secondary border-border focus:border-primary"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-volt font-semibold"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
