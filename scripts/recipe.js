// var urlParam = function(name, w){
//     w = w || window;
//     var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
//         val = w.location.search.match(rx);
//     return !val ? '':val[1];
// };
// var useId = urlParam('_id');

console.log("recipe JS connected");

$(function() {

var $recipeImage        = $('#recipeimage');
var $recipeTitle        = $('#recipe-title');
var $recipeDirections   = $('#intructions');
var $recipeIngredients  = $('#ingredient-img');
var $recipeCalories     = $('#calories');

// AJAX call to get recipe

//Recipe ajax call
 // $btn3.on('click', function() {
 //   console.log('click click click');
   $.ajax({

     url: 'https://team5-backend.herokuapp.com/API/recipes/57ba977d5e2c685b25483814',
     type: 'GET',

     dataType: 'json',
    }).done(function(data) {
     $recipeImage.html(
     $("<img src=\"" + data.image_url + "\">"));

     $recipeTitle.html(
     $("<p>  " + data.title + "</p>"));

     $recipeDirections.html(
     $("<p>" + data.directions + "</p>"));

     $recipeIngredients.html(
     $("<p>" + data.ingredients + "</p>"));

     $recipeCalories.html(
     $("<h4> Calories: " + data.total_calories + "</h4>"));

   })
   .fail(function(request, textStatus, errorThrown) {
     $recipeDirections.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
   });
 });



// populate HTML page with recipe data
