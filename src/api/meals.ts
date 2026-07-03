import type { Meal, MealApiResponse } from "../types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data: MealApiResponse = await res.json();
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data: MealApiResponse = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data: MealApiResponse = await res.json();
  return data.meals ?? [];
}
