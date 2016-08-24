console.log("meal_planner JS connected");
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
// Calendar function - Steph

// AJAX call to retrieve meals for date

// AJAX call to show picture & title of meal for day

// AJAX POST to add meal to day

// AJAX POST to delete meal from day

// AJAX POST to add recipe to meal

// AJAX POST to delete recipe from meal

// AJAX to get favourite recipes

// AJAX to fav recipe

// AJAX to remove fav from recipe

// AJAX to get blacklist recipes

// AJAX to blacklist recipe

// AJAX to remove blacklist from recipe
