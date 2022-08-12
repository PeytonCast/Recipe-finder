// assign some variables
var keyword = '';


// take in a keyword search and return a recipe.
function getRecipe() {
    keyword = $('#recipe-search').val();
    if (keyword === '') {
        // TODO: custom modal to return a "you can't leave this blank" message
        return;
    }
    console.log(keyword);
    // saves the keyword to local storage.
    save(keyword.toLowerCase());

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    // build the query URL
    let url = "https://api.spoonacular.com/recipes/complexSearch?query=" + keyword + "&number=10&apiKey=443f5ece0cd74abf98a041d74e73cb36";

    fetch(url, requestOptions)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.results[0].title);

        let recipeHTML = `
            <h2>${data.results[0].title}</h2>
            <img src="${data.results[0].image}" alt="Food Image">`;

            $('#recipe-box').html(recipeHTML);
        
    })
    .catch(error => console.log('error', error));
}

//ul example from previous project
   // <ul class="list-unstyled">
            //     <li>Temperature: ${data.main.temp}&#8457;</li>
            //     <li>Humidity: ${data.main.humidity}%</li>
            //     <li>Wind Speed: ${data.wind.speed} mph</li>
            //     <li id="uvindex">UV Index: ${uvi}</li>
            // </ul>

function save(keyword) {
    let exists = false;
    // does keyword already exist in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["keyword" + i] === keyword) {
            exists = true;
            break;
        }
    }
    // Save to localStorage if keyword is new
    if (exists === false) {
        localStorage.setItem('keyword' + localStorage.length, keyword);
    }
}


// keyword search button event listener
$('#search-button').on("click", (event) => {
    event.preventDefault();
    keyword = $('#recipe-search').val();
    getRecipe(event)
    });