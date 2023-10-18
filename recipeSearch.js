function getRecipe(){
    var apiUrl = 'https://api.edamam.com/api/recipes/v2';
    var appId = '6d9dec2e';
    var appKey = '6aac0b6d7499cbc03c91fa0e81f57356';
    var query = document.getElementById("ingredient").value;
    var cuisineType = document.getElementById("cuisineType").value;
    
    //var apiUrl = 'https://api.edamam.com/search';
    
axios
    .get(apiUrl, {
        params: {
            type: 'public',
            q: query,
            app_id: appId,
            app_key: appKey,
            cuisineType: cuisineType,
        }
    })
    .then((response) => {
        var recipes = response.data.hits; // the recipes are in the 'hits' property of the API response
        console.log(recipes);
        // Get a reference to the element to display the recipes
        var recipeContainer = document.getElementById('recipe-container');

        // Clear the container to remove any previous search results
        recipeContainer.innerHTML = '';

        // Iterate through the recipes and create HTML elements to display each one
        recipes.forEach((recipe) => {
            var recipeData = recipe.recipe;

            // Create HTML elements for each recipe
            var recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card'); 

            var recipeImage = document.createElement('img');
            recipeImage.src = recipeData.image;
            
            var recipeTitle = document.createElement('h2');
            recipeTitle.textContent = recipeData.label;

            var ingredientTitle = document.createElement('h5');
            ingredientTitle.textContent = 'Ingredients:';

            var ingredientsList = document.createElement('ul');
            recipeData.ingredientLines.forEach((ingredient) => {
                var ingredientItem = document.createElement('li');
                ingredientItem.textContent = ingredient;
                ingredientsList.appendChild(ingredientItem);
            });

            var nutrientsTitle = document.createElement('h5');
            nutrientsTitle.textContent = 'Nutrients:';
            
            var nutrientsList = document.createElement('ul');

            var calciumLi = document.createElement('li');
            calciumLi.textContent = recipeData.totalNutrients.CA.label + " " + Math.round(recipeData.totalNutrients.CA.quantity) + " " + recipeData.totalNutrients.CA.unit;

            var fatLi = document.createElement('li');
            fatLi.textContent = recipeData.totalNutrients.FAT.label + " " + Math.round(recipeData.totalNutrients.CA.quantity) + " " + recipeData.totalNutrients.CA.unit;
            
            var carbsLi = document.createElement('li');
            carbsLi.textContent = recipeData.totalNutrients.CHOCDF.label + " " + Math.round(recipeData.totalNutrients.CHOCDF.quantity) + " " + recipeData.totalNutrients.CHOCDF.unit;
            
            var proteinLi = document.createElement('li');
            proteinLi.textContent = recipeData.totalNutrients.PROCNT.label + " " + Math.round(recipeData.totalNutrients.PROCNT.quantity) + " " + recipeData.totalNutrients.PROCNT.unit;

            nutrientsList.appendChild(calciumLi);
            nutrientsList.appendChild(fatLi);
            nutrientsList.appendChild(carbsLi);
            nutrientsList.appendChild(proteinLi);

            //nutrients.appendChild(calcium);

            // Create a link to the full recipe (assuming 'url' is a property in the API response)
            var recipeLink = document.createElement('a');
            recipeLink.href = recipeData.url;
            recipeLink.textContent = 'Full Recipe';


            // Append elements to the recipe card
            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(ingredientTitle);
            recipeCard.appendChild(ingredientsList);
            recipeCard.appendChild(nutrientsTitle);
            recipeCard.appendChild(nutrientsList);
            recipeCard.appendChild(recipeLink);

            // Append the recipe card to the recipe container
            recipeContainer.appendChild(recipeCard);
        });
    })
    .catch((error) => {
        console.error('API request failed:', error);
    });

}