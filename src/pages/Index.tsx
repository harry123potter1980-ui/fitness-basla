import { useState } from "react";
import { Flame, Footprints, Timer, Plus, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/fitness/Navigation";
import StatCard from "@/components/fitness/StatCard";
import ProgressRing from "@/components/fitness/ProgressRing";
import WorkoutCard from "@/components/fitness/WorkoutCard";
import MealCard from "@/components/fitness/MealCard";
import AddWorkoutModal from "@/components/fitness/AddWorkoutModal";
import AddMealModal from "@/components/fitness/AddMealModal";

interface Workout {
  id: number;
  name: string;
  duration: number;
  calories: number;
  type: string;
  completed: boolean;
}

interface Meal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: 1, name: "Sabah Kardiyo", duration: 30, calories: 250, type: "Kardiyo", completed: true },
    { id: 2, name: "Üst Vücut Güç", duration: 45, calories: 320, type: "Güç Antrenmanı", completed: false },
  ]);

  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: "Yulaf Ezmesi", calories: 350, protein: 12, carbs: 55, fat: 8, mealType: "Kahvaltı" },
    { id: 2, name: "Tavuklu Salata", calories: 420, protein: 35, carbs: 25, fat: 18, mealType: "Öğle Yemeği" },
  ]);

  const calorieGoal = 2000;
  const totalCaloriesConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalCaloriesBurned = workouts.filter(w => w.completed).reduce((sum, w) => sum + w.calories, 0);
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;
  const calorieProgress = Math.min((totalCaloriesConsumed / calorieGoal) * 100, 100);

  const addWorkout = (workout: Omit<Workout, "id" | "completed">) => {
    setWorkouts([...workouts, { ...workout, id: Date.now(), completed: false }]);
  };

  const addMeal = (meal: Omit<Meal, "id">) => {
    setMeals([...meals, { ...meal, id: Date.now() }]);
  };

  const toggleWorkoutComplete = (id: number) => {
    setWorkouts(workouts.map(w => 
      w.id === id ? { ...w, completed: !w.completed } : w
    ));
  };

  const renderHomeTab = () => (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="pt-2">
        <p className="text-muted-foreground">Merhaba,</p>
        <h1 className="text-2xl font-bold text-foreground">Bugün nasıl hissediyorsun? 💪</h1>
      </div>

      {/* Main Progress */}
      <div className="flex flex-col items-center p-6 rounded-3xl bg-card border border-border">
        <ProgressRing 
          progress={calorieProgress} 
          size={160} 
          strokeWidth={12}
          value={totalCaloriesConsumed}
          unit="kcal"
          label={`/ ${calorieGoal} hedef`}
        />
        <div className="flex items-center gap-2 mt-4">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            Net: <span className="font-semibold text-foreground">{netCalories} kcal</span>
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          title="Yakılan Kalori"
          value={totalCaloriesBurned}
          unit="kcal"
          highlight
        />
        <StatCard
          icon={<Timer className="w-5 h-5" />}
          title="Antrenman Süresi"
          value={workouts.filter(w => w.completed).reduce((sum, w) => sum + w.duration, 0)}
          unit="dk"
        />
      </div>

      {/* Today's Workouts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Bugünkü Antrenmanlar</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("workout")}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            Tümü
          </Button>
        </div>
        <div className="space-y-3">
          {workouts.slice(0, 2).map((workout) => (
            <WorkoutCard 
              key={workout.id}
              {...workout}
              onClick={() => toggleWorkoutComplete(workout.id)}
            />
          ))}
        </div>
      </div>

      {/* Recent Meals */}
      <div className="pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Son Öğünler</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("nutrition")}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            Tümü
          </Button>
        </div>
        <div className="space-y-3">
          {meals.slice(0, 2).map((meal) => (
            <MealCard key={meal.id} {...meal} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkoutTab = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Antrenmanlar</h1>
          <p className="text-muted-foreground">Bugün {workouts.filter(w => w.completed).length}/{workouts.length} tamamlandı</p>
        </div>
        <Button 
          onClick={() => setShowWorkoutModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-volt"
        >
          <Plus className="w-5 h-5 mr-1" />
          Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">{workouts.length}</p>
          <p className="text-xs text-muted-foreground">Toplam</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{workouts.filter(w => w.completed).length}</p>
          <p className="text-xs text-muted-foreground">Tamamlanan</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{totalCaloriesBurned}</p>
          <p className="text-xs text-muted-foreground">Yakılan kcal</p>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-3 pb-24">
        {workouts.map((workout) => (
          <WorkoutCard 
            key={workout.id}
            {...workout}
            onClick={() => toggleWorkoutComplete(workout.id)}
          />
        ))}
        {workouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz antrenman eklenmedi</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderNutritionTab = () => {
    const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
    const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
    const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);

    return (
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Beslenme</h1>
            <p className="text-muted-foreground">{totalCaloriesConsumed} / {calorieGoal} kcal</p>
          </div>
          <Button 
            onClick={() => setShowMealModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-volt"
          >
            <Plus className="w-5 h-5 mr-1" />
            Ekle
          </Button>
        </div>

        {/* Macros */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Günlük Makrolar</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{totalProtein}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{totalCarbs}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Karbonhidrat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{totalFat}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Yağ</p>
            </div>
          </div>
        </div>

        {/* Meal List */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Bugünkü Öğünler</h3>
          <div className="space-y-3 pb-24">
            {meals.map((meal) => (
              <MealCard key={meal.id} {...meal} />
            ))}
            {meals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Henüz öğün eklenmedi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProfileTab = () => (
    <div className="space-y-6 animate-slide-up pb-24">
      <div className="pt-2 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-volt">
          <span className="text-3xl font-bold text-primary">K</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Kullanıcı</h1>
        <p className="text-muted-foreground">Fitness Tutkunusu</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="Bu Hafta"
          value={workouts.length}
          unit="antrenman"
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          title="Toplam Yakılan"
          value={totalCaloriesBurned}
          unit="kcal"
          highlight
        />
      </div>

      {/* Goals */}
      <div className="p-5 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">Hedeflerim</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Günlük Kalori</span>
              <span className="text-foreground font-medium">{calorieGoal} kcal</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${calorieProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Haftalık Antrenman</span>
              <span className="text-foreground font-medium">5 gün</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-5 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">Bilgilerim</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Boy</span>
            <span className="text-foreground">175 cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kilo</span>
            <span className="text-foreground">70 kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Hedef Kilo</span>
            <span className="text-primary font-medium">68 kg</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-4">
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "workout" && renderWorkoutTab()}
        {activeTab === "nutrition" && renderNutritionTab()}
        {activeTab === "profile" && renderProfileTab()}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <AddWorkoutModal 
        isOpen={showWorkoutModal}
        onClose={() => setShowWorkoutModal(false)}
        onAdd={addWorkout}
      />

      <AddMealModal 
        isOpen={showMealModal}
        onClose={() => setShowMealModal(false)}
        onAdd={addMeal}
      />
    </div>
  );
};

export default Index;
