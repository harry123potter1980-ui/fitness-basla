import { useState } from "react";
import { Flame, Timer, Plus, TrendingUp, Zap, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/fitness/Navigation";
import StatCard from "@/components/fitness/StatCard";
import ProgressRing from "@/components/fitness/ProgressRing";
import WorkoutCard from "@/components/fitness/WorkoutCard";
import MealCard from "@/components/fitness/MealCard";
import AddWorkoutModal from "@/components/fitness/AddWorkoutModal";
import AddMealModal from "@/components/fitness/AddMealModal";
import EditProfileModal from "@/components/fitness/EditProfileModal";
import RewardedAdButton from "@/components/ads/RewardedAdButton";
import AdBanner from "@/components/ads/AdBanner";
import { useAuth } from "@/hooks/useAuth";
import { useFitnessData } from "@/hooks/useFitnessData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  
  const { signOut, user } = useAuth();
  const {
    workouts,
    meals,
    profile,
    loading,
    addWorkout,
    addMeal,
    toggleWorkoutComplete,
    deleteWorkout,
    deleteMeal,
    updateProfile,
    calorieGoal,
    totalCaloriesConsumed,
    totalCaloriesBurned,
    netCalories,
    calorieProgress,
    totalWorkoutDuration,
  } = useFitnessData();

  const handleWorkoutComplete = async (id: string) => {
    await toggleWorkoutComplete(id);
    const workout = workouts.find(w => w.id === id);
    if (workout && !workout.completed) {
      setShowRewardedAd(true);
      setTimeout(() => setShowRewardedAd(false), 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderHomeTab = () => (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="pt-2">
        <p className="text-muted-foreground">Hello,</p>
        <h1 className="text-2xl font-bold text-foreground">How are you feeling today? 💪</h1>
      </div>

      {/* Main Progress */}
      <div className="flex flex-col items-center p-6 rounded-3xl bg-card border border-border">
        <ProgressRing 
          progress={calorieProgress} 
          size={160} 
          strokeWidth={12}
          value={totalCaloriesConsumed}
          unit="kcal"
          label={`/ ${calorieGoal} goal`}
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
          title="Calories Burned"
          value={totalCaloriesBurned}
          unit="kcal"
          highlight
        />
        <StatCard
          icon={<Timer className="w-5 h-5" />}
          title="Workout Duration"
          value={totalWorkoutDuration}
          unit="min"
        />
      </div>

      {/* Today's Workouts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Today's Workouts</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("workout")}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {workouts.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No workouts added yet
            </p>
          ) : (
            workouts.slice(0, 2).map((workout) => (
              <WorkoutCard 
                key={workout.id}
                {...workout}
                onClick={() => handleWorkoutComplete(workout.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Recent Meals */}
      <div className="pb-32">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Meals</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setActiveTab("nutrition")}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {meals.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No meals added yet
            </p>
          ) : (
            meals.slice(0, 2).map((meal) => (
              <MealCard key={meal.id} {...meal} mealType={meal.meal_type} />
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderWorkoutTab = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Workouts</h1>
          <p className="text-muted-foreground">{workouts.filter(w => w.completed).length}/{workouts.length} completed today</p>
        </div>
        <Button 
          onClick={() => setShowWorkoutModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-volt"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-primary">{workouts.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{workouts.filter(w => w.completed).length}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border text-center">
          <p className="text-2xl font-bold text-foreground">{totalCaloriesBurned}</p>
          <p className="text-xs text-muted-foreground">Burned kcal</p>
        </div>
      </div>

      {/* Rewarded Ad Prompt */}
      {showRewardedAd && (
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-center animate-slide-up">
          <p className="text-foreground font-medium mb-3">🎉 Great job completing your workout!</p>
          <RewardedAdButton onRewardEarned={() => setShowRewardedAd(false)} />
        </div>
      )}

      {/* Workout List */}
      <div className="space-y-3 pb-32">
        {workouts.map((workout) => (
          <WorkoutCard 
            key={workout.id}
            {...workout}
            onClick={() => handleWorkoutComplete(workout.id)}
            onDelete={() => deleteWorkout(workout.id)}
          />
        ))}
        {workouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No workouts added yet</p>
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
            <h1 className="text-2xl font-bold text-foreground">Nutrition</h1>
            <p className="text-muted-foreground">{totalCaloriesConsumed} / {calorieGoal} kcal</p>
          </div>
          <Button 
            onClick={() => setShowMealModal(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-volt"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add
          </Button>
        </div>

        {/* Macros */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Daily Macros</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center glow-volt">
                <span className="text-lg font-bold text-primary">{totalProtein}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{totalCarbs}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{totalFat}g</span>
              </div>
              <p className="text-sm text-muted-foreground">Fat</p>
            </div>
          </div>
        </div>

        {/* Meal List */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Today's Meals</h3>
          <div className="space-y-3 pb-32">
            {meals.map((meal) => (
              <MealCard 
                key={meal.id} 
                {...meal} 
                mealType={meal.meal_type}
                onDelete={() => deleteMeal(meal.id)}
              />
            ))}
            {meals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No meals added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProfileTab = () => (
    <div className="space-y-6 animate-slide-up pb-32">
      <div className="pt-2 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center glow-neon">
          <span className="text-3xl font-bold text-primary">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {profile?.display_name || user?.email?.split("@")[0] || "User"}
        </h1>
        <p className="text-muted-foreground">Fitness Enthusiast</p>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowEditProfileModal(true)}
          className="mt-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Profile
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          title="This Week"
          value={workouts.length}
          unit="workouts"
        />
        <StatCard
          icon={<Flame className="w-5 h-5" />}
          title="Total Burned"
          value={totalCaloriesBurned}
          unit="kcal"
          highlight
        />
      </div>

      {/* Goals */}
      <div className="p-5 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">My Goals</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Daily Calories</span>
              <span className="text-foreground font-medium">{calorieGoal} kcal</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-500 glow-volt"
                style={{ width: `${calorieProgress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Weekly Workouts</span>
              <span className="text-foreground font-medium">{profile?.weekly_workout_goal || 5} days</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-500 glow-volt"
                style={{ width: `${Math.min((workouts.length / (profile?.weekly_workout_goal || 5)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-5 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">My Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height</span>
            <span className="text-foreground">{profile?.height || "-"} cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight</span>
            <span className="text-foreground">{profile?.weight || "-"} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Target Weight</span>
            <span className="text-primary font-medium">{profile?.target_weight || "-"} kg</span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={signOut}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-lg mx-auto px-4 py-4 w-full">
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

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        profile={profile}
        onSave={updateProfile}
      />
    </div>
  );
};

export default Index;
