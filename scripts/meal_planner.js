
// Calendar function - Steph
$(document).ready(function() {
  var $recipeImage         = $('#recipePicturesPlanner');
  var $recipeTitle         = $('#recipe-title');
  var $recipeDirections    = $('#intructions');
  var $recipeIngredients   = $('#ingredient-img');
  var $recipeCalories      = $('#calories');
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

   var populate_recipeImage = function(data){
     for (var i = 0; i < data.length; i++) {
       $recipeImage.append(
         $('<div class="hoverContainer"><div class="hovereffect"><img id="'+ data[i]._id +'" class="img-responsive" style="height: 200px; width: 200px; padding: 10px;" src='+ data[i].image_url +'><div class="overlay"><h2>' + data[i].title + '</h2><p> <a href="./recipe.html?recipe_id' + data[i]._id + '"><i class="icon-external-link"></i> </a><i class="icon-frown" id="frown_' + data[i]._id + '"></i> <i class="icon-heart" id="heart_' + data[i]._id + '"></i></p></div></div></div>')
       );
     }
   };

   var populate_user_recommendations = function(){
   $.ajax({
     url: "https://team5-backend.herokuapp.com/API/recipes?user_id=" +user ,
     type: 'GET',
     dataType: 'json',
     beforeSend: function(xhr) {   
       xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
     }
    })
    .done(function(data) {
      $recipeImage.html("");
      populate_recipeImage(data);
      get_user_favourites();
      get_user_blacklist();
   })
      .fail(function(request, textStatus, errorThrown) {
        alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
      });
    };

    //trigger on load
    populate_user_recommendations();

    // trigger on click
    $('#recommendations_tab').on('click', function() {
      populate_user_recommendations();
    });

// vertical calendar display
var verDay  = $('#day_display'),
    verDate = $('#date_display'),
    verDate_formatted = 0,
    j       = 0;

// function for updating dates
var update_dates = function(counter){
   verDay.html( moment().add(counter, 'd').format('dddd') );
   verDate.html( moment().add(counter, 'd').format('DD MMM YYYY') );
   verDate_formatted = moment().add(counter, 'd').format('YYYY-MM-DD');
};

// ajax call based on verDate
var meals_ajax_call = function(){
$.ajax({
  url: 'https://team5-backend.herokuapp.com/API/meals',
  type: 'GET',
  dataType: 'json',
  data: {
    start: verDate_formatted,
    end: verDate_formatted,
    user_id: user
  },
  beforeSend: function(xhr) {   
    xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
  }
 })
 .done(function(data) {
   $('#display_day_body').html("");
   for (var k = 0; k < data.length; k++) {
     $('#display_day_body').append('<div style="overflow:auto;" class="mealCont thumb col-sm-12 " id="' + data[k]._id + '"><a class="deleteMeal " id="delete_'+ data[k]._id +'"></a><h3 class="mealNumDisplay">meal</h3></div>');

     for (var l = 0; l < data[k].recipes.length; l++){
       $('#'+data[k]._id).append('<img id="thumb_'+ data[k].recipes[l]._id +'" class="thumbnail img-responsive col-sm-3 col-sm-offset-1 " src="'+ data[k].recipes[l].image_url +'" style="height: 60px; width: 60px; object-fit:contain !important;">');
     }
   }
   $('#display_day_body').append('<div class="addMeal col-sm-3 "><h3 class="mealNumDisplay">add meal <br> <b>+</b> </h3></div>');
 })
   .fail(function(request, textStatus, errorThrown) {
     $('#display_day_body').html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
   });
};
update_dates();
meals_ajax_call();

// creating previous day button
 $('.verPrev').click(function() {
   j -= 1;
   update_dates(j);
   meals_ajax_call();
 });
// creating next day button
 $('.verNext').click(function() {
   j += 1;
   update_dates(j);
   meals_ajax_call();
 });
// meal display + add recipes to meal - Steph
// user meals display, click to add new meal div
 $('div.verticalMeals').on('click', '.addMeal', function(){
  //  console.log('click me');
   $.ajax({
     url: 'https://team5-backend.herokuapp.com/API/meals',
     type: 'POST',
     dataType: 'json',
     data: {
       day: verDate_formatted,
       user_id: user
     },
     beforeSend: function(xhr) {   
       xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
     }
    })
    .done(function(data) {
      meals_ajax_call();
    })
      .fail(function(request, textStatus, errorThrown) {
        $('#display_day_body').html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
    });
});

// delete meals
$('.verticalMeals').on('click', '.deleteMeal', function() {
  if(confirm("Are you sure you want to delete this meal?")) {
  var delete_meal_id = this.id.split("_")[1];
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/meals?id='+delete_meal_id,
    type: 'DELETE',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
   })
   .done(function(data) {
     $('#delete_'+delete_meal_id).parent().remove();
   })
    .fail(function(request, textStatus, errorThrown) {
      $('#display_day_body').html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
   });
} else { return false; }
});

// allow only one recipe to be selected
$('.rightPanel').on('click', '.hoverContainer', function() {
  if( $($(this).find('img')).hasClass('selectRecipe') ) {
    $($(this).find('img')).removeClass('selectRecipe');
  } else {
    $('.selectRecipe').removeClass('selectRecipe');
    $($(this).find('img')).addClass('selectRecipe');
  }
});

// add recipes to meal div
$('.verticalMeals').on('click', 'div.mealCont', function() {
  // can only click meal list if one recipe is selected
  if ( $('div.rightPanel img').hasClass('selectRecipe') && ($('.selectRecipe').length === 1) ) {
  // selected meal and recipes css change and revert on interval
    $(this).addClass('selectMeal')
           .delay(1000)
           .queue(function() {
               $(this).append( '<img id="thumb_'+ $('.selectRecipe').attr('id') +'" src="'+ ($('img.selectRecipe').attr('src')) + '" width="60">' );
               $(this).removeClass('selectMeal');
               $('div.rightPanel img').removeClass();
               $(this).dequeue();
           });
  // ajax call to create meal
  var meal_id = this.id;
  var recipeID = $('.selectRecipe').attr('id');
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/meals/'+meal_id,
    type: 'PUT',
    data: {
      recipes: recipeID
    },
    dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
   })
   .done(function(data) {
     console.log(data);
   })
    .fail(function(request, textStatus, errorThrown) {
      alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
   });

  // if click meal before selecting recipe, send prompt?
  } else {
    console.log('Select a recipe to add to your meal');
  }
});
// selected recipes in meal - popup on click
$('.verticalMeals').on('click', 'img', function() {
  var selectedImg = $(this).attr('src');
  $('.selectedRecipeInMeal').removeClass('selectedRecipeInMeal');
  $(this).addClass('selectedRecipeInMeal');
  $('#dialog').html( '<img src="'+ selectedImg + '" width="300" height="300">' );
  $('#dialog').dialog("open");
});
// delete recipe from meal
$("#dialog").dialog({
  autoOpen: false,
  modal: true,
  draggable: true,
  closeOnEscape: true,
    closeText: null,
    title: 'recipe',
    buttons: [
      {
        id:"btn-delete",
        text: "Delete",
        click: function() {
          var recipeID = $('.selectedRecipeInMeal').attr('id').split('_')[1];
          var mealID = $('.selectedRecipeInMeal').parent().attr('id') ;
          $.ajax({
            url: 'https://team5-backend.herokuapp.com/API/meals/'+ mealID, // +'?recipe='+ recipeID,
            data: {
              recipe: recipeID
            },
            type: 'DELETE',
            // dataType: 'json',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization", "Bearer " + token);
               }
           })
           .done(function(data) {
            //  $('#delete_'+delete_meal_id).parent().remove();

           })
            .fail(function(request, textStatus, errorThrown) {
              alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
           });
           $('.selectedRecipeInMeal').remove();
           $(this).dialog( "close" );
        }
      },
      {
        text: "Back",
        click: function() {
          $(this).dialog( "close" );
        }
      }
    ]
  });



  // AJAX to fav recipe & to remove the same recipes from fav list
  var addon_user_favourites = function(recipeID_fav){
    console.log (recipeID_fav);
    // console.log (userID);
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users?action=like&recipe_id='+recipeID_fav +'&id=' + user,
    type: 'PUT',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
      //  console.log ('like');
      //  console.log (data);
    })
     .fail(function(request, textStatus, errorThrown) {
       console.log(request);
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };

  // AJAX to blacklist recipe & to remove the same recipes from blacklist
  var addon_user_blacklist = function(recipeID_dis){
    console.log (recipeID_dis);
    // console.log (user);
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users?action=dislike&id='+ user + '&recipe_id=' + recipeID_dis,
    type: 'PUT',
    // dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
      //  console.log ('dislike');
       console.log (data);
    })
     .fail(function(request, textStatus, errorThrown) {
       console.log(request);
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };

  $('#recipePicturesPlanner').on('click', 'i.icon-frown', function() {
    if (confirm('Are you sure you want to hide this recipe?')) {
      var recipeID_dislike = this.id.split('_')[1];
      addon_user_blacklist(recipeID_dislike);
      $(this).closest('.hoverContainer').hide();
    } else {
      return false;
    }
  });

  $('#recipePicturesPlanner').on('click', 'i.icon-heart', function() {
    var recipeID_heart = this.id.split('_')[1];
    addon_user_favourites(recipeID_heart);
    $(this).toggleClass('recipeFav');
  });


  // AJAX to populate favourite recipes
  var populate_user_favourites = function(){
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users/list?action=like&user_id='+user,
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
       $recipeImage.html("");
       $recipeImage.append('<h2 class="text-center col-md-12">To remove like, click on recipe\'s heart</h2>');
       populate_recipeImage(data);
       get_user_favourites();
       get_user_blacklist();
    })
     .fail(function(request, textStatus, errorThrown) {
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };

  $('#favourites_tab').on('click', function() {
    populate_user_favourites();
  });


  // AJAX to populate blacklist recipes
  var populate_user_blacklist = function(){
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users/list?action=dislike&user_id='+user,
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
       for (var i = 0; i < data.length; i++) {
         $recipeImage.html("");
         $recipeImage.append('<h2 class="text-center col-md-12">To remove dislike, click on recipe\'s frowny face</h2>');
         populate_recipeImage(data);
         get_user_favourites();
         get_user_blacklist();
       }
    })
     .fail(function(request, textStatus, errorThrown) {
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };

  $('#blacklist_tab').on('click', function() {
    populate_user_blacklist();
  });


  // AJAX to get favourite recipes
  var get_user_favourites = function(){
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users/list?action=like&user_id='+user,
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
       for(var k=0; k < data.length; k++){
          $('#heart_'+data[k]._id).addClass('recipeFav');
       }
    })
     .fail(function(request, textStatus, errorThrown) {
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };


  // AJAX to get blacklist recipes
  var get_user_blacklist = function(){
  $.ajax({
    url: 'https://team5-backend.herokuapp.com/API/users/list?action=dislike&user_id='+user,
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {   
      xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
    }
     })
     .done(function(data) {
       for(var k=0; k < data.length; k++){
          $('#frown_'+data[k]._id).addClass('recipeDis');
       }
    })
     .fail(function(request, textStatus, errorThrown) {
       alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
     });
  };


}); // close doc ready function
