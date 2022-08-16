let API_key = 'AIzaSyDS0Je3yXD8OLa8niXdjgI9l0NeyW8YOuY'
let search_input = document.getElementById('recipe-search')
let search_Btn = document.getElementById('search-button')
console.log(search_input.value)
var youtube = {
fetchYoutubeResults: function(food){
fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q='+'how to cook'+food+'h&videoDefinition=any&key=' + API_key)
.then((response)=>response.json())
.then((data) => this.showResults(data))

},
showResults: function(data){
   for(i = 0; i<5; i++){
    
    document.getElementById('img' + (i+1)).src = data.items[i + 1].snippet.thumbnails.high.url;
    console.log(data.items[i + 1].snippet.thumbnails.high.url)
   }
},
searchResults: function() {
    youtube.fetchYoutubeResults(search_input.value)
}
}
search_Btn.addEventListener('click', youtube.searchResults() )

//I NEED TO MAKE A YOUTUBE SEARCH EVERY TIME I SEARCH FOR A RECIPE
//WHEN I SEARCH SOMETHING IN THE SEARCH BOX
//only if search box has content
//THEN I FILL IN THE VAR SEARCH_INPUT INTO THE YOUTUBE API
//using the submit btn i will run the function to fetch the api data
//DONE get the API links nessesary to valadate request
//fetch resonse JSON ect
//THEN I WILL CICLE THROUGH THE DATA AND APLY IT TO THE PAGE 5 TIMES 
//for loop or direct acsses methed

//BONUS
//find a way to save the video search to local storage to be listed in a saved tutorials
//make a div for the saved tutorials
