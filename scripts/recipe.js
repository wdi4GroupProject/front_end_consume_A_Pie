
$(function() {

  //user authentication
  var user = sessionStorage.getItem('user'),
  token = sessionStorage.getItem('token');
  $.ajax({
      url: "https://team5-backend.herokuapp.com/API/authentication",
      data: {
        "user": user,
      },
      type: 'POST',
      dataType: 'json',
      beforeSend: function(xhr) {   
        xhr.setRequestHeader("Authorization", "Bearer "+token+"");   
      }
    }).done(function(data) {
      console.log(data);
    })
    .fail(function(request, textStatus, errorThrown) {
      console.log(textStatus);
      window.location='login.html';
    });
  // function to get params from URL
  var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
  }();


var $recipeImage        = $('#recipeimage');
var $recipeTitle        = $('#recipe-title');
var $recipeDirections   = $('#intructions');
var $recipeIngredients  = $('#ingredient-img');
var $recipeCalories     = $('#calories');


// var image1_url = "/views/recipe.html?recipe_id="+ <?>.id
// var image1 = "<a href="+ image1_url+ "><img src= "+ <?>.image_url+ "></a>"

// AJAX call to get recipe

var recipe_id = QueryString.recipe_id;
var URI = recipe_id;
var URL = 'https://team5-backend.herokuapp.com/API/recipes/'+URI;

    $.ajax({

      url: URL,
      type: 'GET',

      dataType: 'json',
      beforeSend: function(xhr) {   
        xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
      }
     }).done(function(data) {
      $recipeImage.html(
      $("<img class='img-responsive thumbnail pull-left' style='min-height: 400px; max-height: 500px; max-width: 500px;' src=\"" + data.image_url + "\">"));

      $recipeTitle.html(
      $("<p>  " + data.title + "</p>"));

      $recipeDirections.html(
      $("<h3>Directions</h3><p> " + data.directions + "</p>"));

      var ingredients_html = [];
      for(var i=0; i< data.ingredients.length; i++){
        ingredients_html.push("<p>" + data.ingredients[i] + "</p>");
      }

      $recipeIngredients.html(ingredients_html);

      $recipeCalories.html(
      $('<h3 style="font-weight:bold">Calories: ' + data.total_calories + '</h3>'));

    })
    .fail(function(request, textStatus, errorThrown) {
      $recipeDirections.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
    });

  });



// populate HTML page with recipe data
