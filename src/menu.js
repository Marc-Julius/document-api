const moreMeals = document.getElementById("moreMeals");
function showSkeleton() {
  moreMeals.innerHTML = Array(12).fill(0).map(() => `
    <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-3 animate-pulse space-y-2">
      <div class="w-full h-40 bg-white/10 rounded-xl"></div>
        <div class="h-3 w-3/4 bg-white/10 rounded"></div>
      <div class="mt-4 h-8 w-20 bg-orange-500/40 rounded-full"></div>

    </div>
  `).join("");
}

async function loadMoreMeals() {
  try {
    showSkeleton();
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();

    if (!data.meals) return;

    const meals = data.meals.slice(8, 20); 
    moreMeals.innerHTML=``;
    moreMeals.innerHTML = meals.map(meal => `
      <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition">

        <img src="${meal.strMealThumb}" 
          class="w-full h-40 object-cover" />

        <div class="p-4 space-y-2">
          <h3 class="text-sm font-semibold">${meal.strMeal}</h3>
          <p class="text-xs text-white/60">${meal.strCategory}</p>
        </div>

      </div>
    `).join("");

  } catch (err) {
    console.log(err);
    moreMeals.innerHTML = `
      <div class="text-center text-red-400 col-span-full">
        ⚠️ Failed to load meals
      </div>
    `;
  }
}

loadMoreMeals();