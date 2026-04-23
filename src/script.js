document.addEventListener("DOMContentLoaded", () => {

  const mealGrid = document.getElementById("mealGrid");
  const filterSection = document.getElementById("filterSection");

  let allMeals = [];
  let categories = [];

  function showSkeleton() {
    mealGrid.innerHTML = Array(12).fill(0).map(() => `
      <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-3 animate-pulse space-y-2">
        <div class="w-full h-40 bg-white/10 rounded-xl"></div>
        <div class="h-3 w-3/4 bg-white/10 rounded"></div>
        <div class="mt-4 h-8 w-20 bg-white/10 rounded-full"></div>
      </div>
    `).join("");
filterSection.innerHTML= Array(8).fill(0).map(()=>`    <div class="bg-white/10 rounded-xl px-12 py-5 rounded-full bg-white/20 animate-pulse"></div>
`).join("");    
}

  function displayMeals(meals) {
    mealGrid.innerHTML = meals.map(meal => `
      <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition relative">
        <img src="${meal.strMealThumb}" class="w-full h-40 object-cover" />
        <div class="p-4 space-y-1">
          <h3 class="text-xl font-bold">${meal.strMeal}</h3>
          <p class="text-sm text-gray-300">${meal.strArea}</p>
          <span class="text-sm text-orange-300 bg-black/50 absolute top-2 left-2 font-semibold rounded-full px-2 py-1">${meal.strCategory}</span>
          <button class="bg-orange-500 text-white px-4 py-1 cursor-pointer font-raleway rounded-full hover:bg-orange-600">view</button>
        </div>
      </div>
    `).join("");
  }

  function createCategoryButtons() {
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.className = "px-5 py-2 rounded-full bg-orange-500 text-white transition border border-orange-500 cursor-pointer";
    allBtn.addEventListener("click",() =>{  
      setActive(allBtn);
      displayMeals(allMeals);
    });
    filterSection.innerHTML="";
    filterSection.appendChild(allBtn);

    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.className = "px-5 py-2 rounded-full bg-orange-500 hover:bg-white/10 border border-orange-500 cursor-pointer text-white  transition";

      btn.addEventListener("click",() => { 
        setActive(btn);
        const filtered = allMeals.filter(meal =>
          meal.strCategory.toLowerCase() === cat.toLowerCase()
        );
        displayMeals(filtered);
      });
      filterSection.appendChild(btn);
    });
    setActive(allBtn);
  }

  function setActive(activeBtn) {
    const buttons = filterSection.querySelectorAll("button");

    buttons.forEach(btn => {
      btn.classList.remove("bg-white/10","border");
      btn.classList.add("bg-orange-500", "text-white");
    });

    activeBtn.classList.add("bg-white/10","border");
    activeBtn.classList.remove("bg-orange-500", "text-white");
  }

  async function loadMeals() {
    try {
      showSkeleton();

      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
      const data = await res.json();

      if (!data.meals) return;

      allMeals = data.meals.slice(0, 12);

      categories = [...new Set(allMeals.map(m => m.strCategory))];

      setTimeout(() => {
        createCategoryButtons();
        displayMeals(allMeals);
      }, 500);

    } catch (err) {
      console.log(err);
      mealGrid.innerHTML = `
        <div class="text-center text-red-400 col-span-full">
          ⚠️ Failed to load meals
        </div>
      `
      filterSection.innerHTML="";
    }
  }

  loadMeals();

});