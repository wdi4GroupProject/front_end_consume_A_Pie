
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

    //logout
    $("#logout").on('click', function() {
      var token = sessionStorage.getItem('token');
      $.ajax({
          url: "https://team5-backend.herokuapp.com/API/logout",
          type: 'GET',
          beforeSend: function(xhr) {   
            xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
          }
        }).done(function(data) {
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          window.location = 'index.html';
        })
        .fail(function(request, textStatus, errorThrown) {
          alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
        });
    });

    // function to get params from URL
    var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    console.log(query);
    var vars = query.split("&");
    console.log(vars);
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
  console.log(URL);
  //Recipe ajax call
    // $btn3.on('click', function() {
    //   console.log('click click click');
      $.ajax({

        url: URL,
        type: 'GET',

        dataType: 'json',
        beforeSend: function(xhr) {   
          xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
        }

       }).done(function(data) {
        $recipeImage.html(
        $("<img src=\"" + data.image_url + "\">"));

        $recipeTitle.html(
        $("<p> Title: " + data.title + "</p>"));

        $recipeDirections.html(
        $("<p>" + data.directions + "</p>"));

        $recipeIngredients.html(
        $("<p>" + data.ingredients + "</p>"));

        $recipeCalories.html(
        $("<p> Calories: " + data.total_calories + "</p>"));

      })
      .fail(function(request, textStatus, errorThrown) {
        $recipeDirections.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
      });

  });



// populate HTML page with recipe data
