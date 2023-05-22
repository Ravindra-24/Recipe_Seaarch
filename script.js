

const searchBox = document.querySelector('#input');
const searchBtn = document.querySelector('#search-btn');
const loaderContainer = document.querySelector('.loader');
const resultHeadContainer = document.querySelector('.result-head');

const app_key = '12c5aabac4b3bf47c6787b8c097f52f9';
const app_id = 'b7add9aa';
const showLoader = () => {
    loaderContainer.style.display = 'flex';
}
const hideLoader = () =>{
     loaderContainer.style.display = 'none';
    }

    const resultHead =(searchValue)=>`
    <h1 >Search results for ${searchValue}</h1>`

    const recipeContainer = (image,label,calories,cuisineType,dietLabels,totalWeight,mealType,yield,url)=>`
    <div style="width:250px; height:fit-content;" class=' max-w-md bg-white rounded-3xl shadow-xl overflow-hidden'>
    <div class='max-w-md mx-auto'>
      <div class='h-[200px] w-full h-2/3' style='background-image:url(${image});background-size:cover;background-position:center'>
       </div>
      <div class='p-4 sm:p-6'>
        <p class='font-bold text-gray-700 text-[18px] leading-7 mb-1'>${label}</p>
        <div class='flex flex-row'>
        </div>
        <p class='text-[#7C7C80] font-[12px] mt-2'>
            <ul>
            <li>Cuisine Type: ${cuisineType}</li>
            <li>Meal Type: ${mealType}</li>
            <li>Diet Labels: ${dietLabels}</li>
            <li>Calories: ${(calories).toFixed(2)}</li>
            <li>Total Weight: ${(totalWeight).toFixed(2)}</li>
            <li>Yield: ${yield}</li>
            </ul>
        </p>


          <a target='_blank' href='${url}' class='block mt-4 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
              View Recipe
          </a>
      </div>
    </div>
</div>`

const genrateEndpoint = (searchValue) => `https://api.edamam.com/api/recipes/v2?type=public&q=${searchValue}&app_id=${app_id}&app_key=${app_key}`;

const getRecipe = async () => {
    if(searchBox.value === '' || searchBox.value === null){
        window.alert('Please enter a recipe name');
    }else{
    try {
        
        showLoader();
        const searchValue = searchBox.value;
        const endpoint =await fetch(genrateEndpoint(searchValue));
        const data = await endpoint.json();
        const recipes = data.hits;
        const result = document.querySelector('.result');
        result.innerHTML = '';
        if(recipes.length < 1){ result.innerHTML = `<h1 class='text-center text-2xl text-white'>No recipe found</h1>`
        resultHeadContainer.innerHTML = resultHead(searchValue);
    }else{
        resultHeadContainer.innerHTML = resultHead(searchValue);
        recipes.forEach(recipe => {
            const {label,image,calories,cuisineType,dietLabels,totalWeight,mealType,yield,url} = recipe.recipe;
            result.innerHTML += recipeContainer(image,label,calories,cuisineType,dietLabels,totalWeight,mealType,yield,url);
        })};
    } catch (error) {
        console.log(`error`, error);
    } finally{
        searchBox.value = '';
        hideLoader();
    }
}
}

searchBtn.addEventListener('click', getRecipe);