import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Workout, Meal, Profile, WorkoutInsert, MealInsert } from "@/types/fitness";
import { useToast } from "@/hooks/use-toast";

export const useFitnessData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  const fetchData = useCallback(async () => {
    if (!user) {
      setWorkouts([]);
      setMeals([]);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch today's workouts
      const { data: workoutsData, error: workoutsError } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user.id)
        .eq("workout_date", today)
        .order("created_at", { ascending: false });

      if (workoutsError) throw workoutsError;
      setWorkouts(workoutsData || []);

      // Fetch today's meals
      const { data: mealsData, error: mealsError } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", user.id)
        .eq("meal_date", today)
        .order("created_at", { ascending: false });

      if (mealsError) throw mealsError;
      setMeals(mealsData || []);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast({
        title: "Hata",
        description: "Veriler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, today, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addWorkout = async (workout: WorkoutInsert) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("workouts")
        .insert({
          ...workout,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      setWorkouts([data, ...workouts]);
      toast({
        title: "Başarılı",
        description: "Antrenman eklendi.",
      });
    } catch (error: any) {
      console.error("Error adding workout:", error);
      toast({
        title: "Hata",
        description: "Antrenman eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const addMeal = async (meal: MealInsert) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("meals")
        .insert({
          ...meal,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      setMeals([data, ...meals]);
      toast({
        title: "Başarılı",
        description: "Öğün eklendi.",
      });
    } catch (error: any) {
      console.error("Error adding meal:", error);
      toast({
        title: "Hata",
        description: "Öğün eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const toggleWorkoutComplete = async (id: string) => {
    const workout = workouts.find((w) => w.id === id);
    if (!workout) return;

    try {
      const { error } = await supabase
        .from("workouts")
        .update({ completed: !workout.completed })
        .eq("id", id);

      if (error) throw error;
      setWorkouts(
        workouts.map((w) =>
          w.id === id ? { ...w, completed: !w.completed } : w
        )
      );
    } catch (error: any) {
      console.error("Error toggling workout:", error);
      toast({
        title: "Hata",
        description: "Antrenman güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const deleteWorkout = async (id: string) => {
    try {
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setWorkouts(workouts.filter((w) => w.id !== id));
      toast({
        title: "Başarılı",
        description: "Antrenman silindi.",
      });
    } catch (error: any) {
      console.error("Error deleting workout:", error);
      toast({
        title: "Hata",
        description: "Antrenman silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from("meals")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setMeals(meals.filter((m) => m.id !== id));
      toast({
        title: "Başarılı",
        description: "Öğün silindi.",
      });
    } catch (error: any) {
      console.error("Error deleting meal:", error);
      toast({
        title: "Hata",
        description: "Öğün silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user.id);

      if (error) throw error;
      setProfile({ ...profile, ...updates });
      toast({
        title: "Başarılı",
        description: "Profil güncellendi.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const calorieGoal = profile?.daily_calorie_goal || 2000;
  const totalCaloriesConsumed = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalCaloriesBurned = workouts
    .filter((w) => w.completed)
    .reduce((sum, w) => sum + w.calories, 0);
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;
  const calorieProgress = Math.min((totalCaloriesConsumed / calorieGoal) * 100, 100);
  const totalWorkoutDuration = workouts
    .filter((w) => w.completed)
    .reduce((sum, w) => sum + w.duration, 0);

  return {
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
    refetch: fetchData,
  };
};
