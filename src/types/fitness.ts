export interface Workout {
  id: string;
  user_id: string;
  name: string;
  duration: number;
  calories: number;
  type: string;
  completed: boolean;
  workout_date: string;
  created_at: string;
}

export interface Meal {
  id: string;
  user_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
  meal_date: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  height: number | null;
  weight: number | null;
  target_weight: number | null;
  daily_calorie_goal: number;
  weekly_workout_goal: number;
  created_at: string;
  updated_at: string;
}

export type WorkoutInsert = Omit<Workout, 'id' | 'user_id' | 'created_at'>;
export type MealInsert = Omit<Meal, 'id' | 'user_id' | 'created_at'>;
