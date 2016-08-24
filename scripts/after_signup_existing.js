console.log('Signup JS Connected');


$(function() {


  // // function to get params from URL
  // var QueryString = function () {
  // // This function is anonymous, is executed immediately and
  // // the return value is assigned to QueryString!
  // var query_string = {};
  // var query = window.location.search.substring(1);
  // var vars = query.split("&");
  // for (var i=0;i<vars.length;i++) {
  //   var pair = vars[i].split("=");
  //       // If first entry with this name
  //   if (typeof query_string[pair[0]] === "undefined") {
  //     query_string[pair[0]] = decodeURIComponent(pair[1]);
  //       // If second entry with this name
  //   } else if (typeof query_string[pair[0]] === "string") {
  //     var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
  //     query_string[pair[0]] = arr;
  //       // If third or later entry with this name
  //   } else {
  //     query_string[pair[0]].push(decodeURIComponent(pair[1]));
  //   }
  // }
  // return query_string;
  // }();


var $recipeImage         = $('#recipePictures');
var $recipeTitle         = $('#recipe-title');
var $recipeDirections    = $('#intructions');
var $recipeIngredients   = $('#ingredient-img');
var $recipeCalories      = $('#calories');


// var recipe_id = QueryString.recipe_id;
// var URI = recipe_id;
var URL = 'https://team5-backend.herokuapp.com/recipe';
console.log(URL);

$.ajax({

  url: URL,
  type: 'GET',

  dataType: 'json',
  beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
     }
 })
 .done(function(data) {
   for (var i = 0; i < data.length; i++) {
     console.log(data[i]);
     $recipeImage.append(
       $('<a href=/views/recipe.html?recipe_id=' + data[i]._id + '><img style="height: 200px; width: 200px;" src='+ data[i].image_url +'></a>')
     );
   }

})
   .fail(function(request, textStatus, errorThrown) {
     $recipeDirections.html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
   });

});
