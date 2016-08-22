console.log("recipe JS connected");

$(function() {

var $recipeImage        = $('#recipeimage');
var $recipeTitle        = $('#recipe-title');
var $recipeDirections   = $('#intructions');
var $recipeIngredients  = $('#ingredient-img');

// AJAX call to get recipe

//Recipe ajax call
  // $btn3.on('click', function() {
  //   console.log('click click click');
    $.ajax({

      url: 'https://team5-backend.herokuapp.com/API/recipes',
      type: 'GET',

      dataType: 'json',
     }).done(function(data) {
       $recipeImage.html(
         $("<img src=\"" + data[0].image_url + "\">"));

      $recipeTitle.html(
       $("<p> Title: " + data[0].title + "</p>"));

      $recipeDirections.html(
     $("<p> Directions: " + data[0].directions + "</p>"));

      $recipeIngredients.html(
      $("<p> Ingredients: " + data[0].ingredients + "</p>"));
    })
    .fail(function(request, textStatus, errorThrown) {
      $recipeDirections.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
    });
  });



// populate HTML page with recipe data
