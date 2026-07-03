import { searchMeals, getMealById } from "./api/meals";
import { openModal } from "./components/modal";
import type { Meal } from "./types/meal";

let debounceTimer: ReturnType<typeof setTimeout>;

async function handleSearch(query: string): Promise<void> {
  const grid = document.getElementById("results-grid")!;

  if (!query.trim()) {
    grid.innerHTML =
      '<p class="text-gray-400 col-span-full text-center">Type something to search meals...</p>';
    return;
  }

  grid.innerHTML =
    '<p class="text-gray-400 col-span-full text-center">Loading...</p>';

  try {
    const meals = await searchMeals(query);

    if (meals.length === 0) {
      grid.innerHTML =
        '<p class="text-gray-400 col-span-full text-center">No meals found.</p>';
      return;
    }

    grid.innerHTML = meals
      .map(
        (meal: Meal) => `
      <div class="meal-card cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transition" data-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-48 object-cover"/>
        <div class="p-3">
          <h3 class="font-semibold text-sm">${meal.strMeal}</h3>
          <p class="text-xs text-gray-500">${meal.strCategory}</p>
        </div>
      </div>
    `,
      )
      .join("");

    document.querySelectorAll(".meal-card").forEach((card) => {
      card.addEventListener("click", async () => {
        const id = (card as HTMLElement).dataset.id!;
        const meal = await getMealById(id);
        if (meal) openModal(meal);
      });
    });
  } catch (error) {
    grid.innerHTML =
      '<p class="text-red-400 col-span-full text-center">Something went wrong. Try again.</p>';
  }
}

const searchInput = document.getElementById("search-input") as HTMLInputElement;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => handleSearch(searchInput.value), 300);
});
