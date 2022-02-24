const searchMeals = async () => {
    const searchFood = document.getElementById('search-food');
    const searchText = searchFood.value;
    const emptyInputField = document.getElementById('empty-input-field');
    const itemNotFound = document.getElementById('item-not-found');
    if (searchText == '') {
        emptyInputField.style.display = 'block';
        itemNotFound.style.display = 'none';
        clearItems();
    }
    else {
        emptyInputField.style.display = 'none';
        searchFood.value = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        searchResults(data.meals);
        /* fetch(url)
            .then(res => res.json())
            .then(data => searchResults(data.meals)); */
    }
}
const clearItems = () => {
    document.getElementById('food-cards').textContent = '';
    document.getElementById('meal-detail').textContent = '';
}
const searchResults = meals => {
    const foodCards = document.getElementById('food-cards');
    foodCards.textContent = '';
    const itemNotFound = document.getElementById('item-not-found');
    if (meals == null) {
        itemNotFound.style.display = 'block';
        clearItems();
    }
    else {
        itemNotFound.style.display = 'none';
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('cols');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            `;
            foodCards.appendChild(div);
        });
    }
}
const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    const foodCards = document.getElementById('meal-detail');
    foodCards.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary" target="blank">Watch tutorial on YouTube</a>
        </div>
    `;
    foodCards.appendChild(div);
}
document.getElementById('search-food').addEventListener('keyup', event => {
    if (event.keyCode == 13) {
        searchMeals();
    }
})