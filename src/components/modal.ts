import type { Meal } from "../types/meal";

function getIngredients(meal: Meal): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
    }
  }
  return ingredients;
}

export function openModal(meal: Meal): void {
  const existing = document.getElementById("meal-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "meal-modal";
  modal.className =
    "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
      <button id="close-modal" class="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black">&times;</button>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full rounded-xl mb-4"/>
      <h2 class="text-2xl font-bold mb-1">${meal.strMeal}</h2>
      <p class="text-sm text-gray-500 mb-4">${meal.strCategory} · ${meal.strArea}</p>
      <h3 class="font-semibold mb-2">Ingredients</h3>
      <ul class="list-disc list-inside mb-4 text-sm">
        ${getIngredients(meal)
          .map((i) => `<li>${i}</li>`)
          .join("")}
      </ul>
      <h3 class="font-semibold mb-2">Instructions</h3>
      <p class="text-sm text-gray-600 whitespace-pre-line">${meal.strInstructions}</p>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById("close-modal")!.onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
}
