// assign some variables
var keyword = '';
var recipeObj = {
    id: 0,
    title: '',
    image: '',
  };


// take in a keyword search and return a recipe.
function getRecipe() {
    // grab the value from the button
    keyword = $('#recipe-search').val();
    
    // modal pop up if your entry is blank
    if (keyword === '') {
        // TODO: custom modal to return a "you can't leave this blank" message
        return;
    }
    console.log(keyword);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    // build the query URL
    let url = "https://api.spoonacular.com/recipes/complexSearch?query=" + keyword + "&number=20&apiKey=443f5ece0cd74abf98a041d74e73cb36";

    fetch(url, requestOptions)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        // randomize the choice - currently pulls 10 results from the API
        const recipeChoice = Math.floor(Math.random() * data.results.length);
        console.log(recipeChoice);
        
        // set the variables to the object for saving
        recipeObj.id = data.results[recipeChoice].id;
        recipeObj.image = data.results[recipeChoice].image;
        recipeObj.title = data.results[recipeChoice].title;

        // TODO: if zero results are returned, modal pop up with the error

        // displays the title and photo to the page
        let recipeHTML = `
            <h2>${recipeObj.title}</h2>
            <img src="${recipeObj.image}" alt="Food Image">`;
            $('#save-recipe').css("display", "block");
            $('#recipe-data').html(recipeHTML);
        
    })
    .catch(error => console.log('error', error));
}

// saves the keyword to local storage if it doesn't already exist there
function save(recipe) {
    let exists = false;
    // does recipe already exist in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["recipe" + i] === JSON.stringify(recipe)) {
            exists = true;
            break;
        }
    }
    // Save to localStorage only if recipe is new
    if (exists === false) {
        localStorage.setItem('recipe' + localStorage.length, JSON.stringify(recipe));
        console.log("saved");
        showSavedRecipes();
    }
    
}


// keyword search button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    keyword = $('#recipe-search').val();
    getRecipe(event)
    });

// save button event listener
$('#save-recipe').on("click", (event) => {
    event.preventDefault();
    save(recipeObj);
    

    });


// builds the previously searched recipies into a selector drop
function showSavedRecipes() {
    var savedEl = '';
    for (let i = 0; i < localStorage.length; i++) {
        let savedRecipe = JSON.parse(localStorage.getItem("recipe" + i));
        savedEl += `<option value="Option ${i}">${savedRecipe.title}</option>`;
    }
    // create a huge block of html to be replaced everytime this function runs
    let savedHTML = `<div class="six columns" id="search-history">
        <label for="exampleRecipientInput">Saved Recipes</label>
        <select class="u-full-width" id="saved-recipes-dropdown">${savedEl}</select> 
        </div>`

    $('#search-history').replaceWith(savedHTML);
}

// makes sure the saved recipes appear on the page at load
showSavedRecipes();