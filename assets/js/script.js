// define the global recipe object
var recipeObj = {
    id: 0,
    title: '',
    image: '',
    video: '',
    summary: '',
  };

// take in a keyword search and return a recipe
function getRecipe(keyword) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    // build the query URL
    let url = "https://api.spoonacular.com/recipes/complexSearch?query=" + keyword + "&number=20&apiKey=5c477e30c76a4b648544b129c184d9ee";

    fetch(url, requestOptions)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // randomize the choice - currently pulls 20 results from the API
        const recipeChoice = Math.floor(Math.random() * data.results.length);
        
        // set the variables to the object for saving
        recipeObj.id = data.results[recipeChoice].id;
        recipeObj.image = data.results[recipeChoice].image;
        recipeObj.title = data.results[recipeChoice].title;

        // displays the title and photo to the page
        let recipeHTML = `
            <h3 id="h3" >${recipeObj.title}</h3>
            <img class='container' id="img" src="${recipeObj.image}" alt="Food Image">`;
            $('#save-recipe').css("display", "block");
            $('#recipe-data').html(recipeHTML);

        youTubeMe(recipeObj.title);
        getSummary(recipeObj.id);
    })
    .catch(function(error) {
        if (error = "TypeError: Cannot read properties of undefined (reading 'id')"){
            modal("There was a problem with your search. Please try again!");
        } else {
            modal("There was a problem with the Spoonacular API <br>" + error);
        }
    });
}

function getSummary(id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    // build the query URL
    let url = "https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false&apiKey=5c477e30c76a4b648544b129c184d9ee";

    fetch(url, requestOptions)
    .then(handleErrors)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // set the summary to the object for saving
        recipeObj.summary = data.summary;
        console.log("summary data: " + data);
        console.log("summary data: " + data.summary);
        // displays the summary to the page
        let summaryHTML = `<p>${recipeObj.summary}</p>`;
            $('#summary').html(summaryHTML);

    })
    .catch(function(error) {
            modal(error);
    });
}


// saves the keyword to local storage if it doesn't already exist there
function save(recipe) {
    let exists = false;
    // does recipe already exist in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["recipe" + i] === JSON.stringify(recipe)) {
            exists = true;
        }
    }
    // Save to localStorage only if recipe is new
    if (exists === false) {
        localStorage.setItem('recipe' + localStorage.length, JSON.stringify(recipe));
        // updates the saved recipe dropdown
        showSavedRecipes();
    }
    
}

// builds the previously searched recipies into a selector drop
function showSavedRecipes() {
    var savedEl = '';
    for (let i = 0; i < localStorage.length; i++) {
        let savedRecipe = JSON.parse(localStorage.getItem("recipe" + i));
        savedEl += `<option value="recipe${i}">${savedRecipe.title}</option>`;
    }
        // add the options to the dropdown
        $("#saved-recipes-dropdown").html("")
        $("#saved-recipes-dropdown").html(savedEl)
}

// get the youtube video and display it to the page
function youTubeMe(food) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    // build the query URL
    let url =('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + food + 'h&videoDefinition=any&key=AIzaSyCORVcYja6ySmnUMQhlN3rGb3MvH_Ad64I');

    fetch(url, requestOptions)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        // build the youtube url that gets saved and used
        let youtubeURL = "https://www.youtube.com/embed/" + data.items[0].id.videoId + "?controls=0";
        // displays the title and photo to the page
        let youtubeHTML = `
            <h3>How to Cook It:</h3>
            <iframe width="420" height="315" id="iframe" class='container'
            src="${youtubeURL}">
            </iframe>`
            // set the video key in the object
            recipeObj.video = youtubeURL;
            
            $('#youtube-video').html(youtubeHTML);
    })
    .catch(function(error) {
            modal("There was a problem with the YouTube API <br>" + error);
    });
}

// modal for pop up alerts
function modal(text) {
    $('#myModal').css("display", "block");
    $('#modal-text').html(text);
    $('.close').on("click", (event) => {
        event.preventDefault();
        $('#myModal').css("display", "none");
    })
}

// error handling
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// keyword search button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    keyword = $('#recipe-search').val(); 
    // if the field is left blank, modal pops-up
    keyword = keyword.replace(/^\s+|\s+$/gm,'');
    if (keyword.length === 0) {
        modal("This field cannot be left blank");
    } else {
        getRecipe(keyword);
    }
    });

// save button event listener
$('#save-recipe').on("click", (event) => {
    event.preventDefault();
    save(recipeObj);
    });

// an event listener for the dropdown that replaces the recipe html and video with the selected recipe
$('#saved-recipes-dropdown').change(function() {
    // pull the key/value pair from local storage
    let recipeKey = $(this).val();
    let recipeId = JSON.parse(localStorage.getItem(recipeKey));
    
    // make sure to set the correct data to recipeObj for the other APIs to access
    recipeObj.id = recipeId.id;
    recipeObj.image = recipeId.image;
    recipeObj.title = recipeId.title;
    recipeObj.video = recipeId.video;
    recipeObj.summary = recipeId.summary;


    // show previous results on the page
    let newRecipeHTML = `
        <h3 id="h3" >${recipeObj.title}</h3>
        <img  id="img" src="${recipeObj.image}" alt="Food Image">`;
        
        $('#recipe-data').html(newRecipeHTML);
           
    // repeating myself a bit here: stealing these from youTubeMe() and getSummary()
    let youtubeHTML = `
        <h3>How to Cook It:</h3>
        <iframe width="420" height="315" id='iframe'
        src="${recipeObj.video}">
        </iframe>`
    
        $('#youtube-video').html(youtubeHTML);

    let summaryHTML = `<p>${recipeObj.summary}</p>`;
    $('#summary').html(summaryHTML);

});

// makes sure the saved recipes appear on the page at load
showSavedRecipes();