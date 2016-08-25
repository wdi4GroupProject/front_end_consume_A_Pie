console.log("meal_planner JS connected");
// Calendar function - Steph
$(document).ready(function() {
   var $recipeImage         = $('#recipePicturesPlanner');
   var $recipeTitle         = $('#recipe-title');
   var $recipeDirections    = $('#intructions');
   var $recipeIngredients   = $('#ingredient-img');
   var $recipeCalories      = $('#calories');
   var userID              = "57bcf4656862c50300de1058"; // for ajax calls
   var URL = 'https://team5-backend.herokuapp.com/API/recipes';
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
        // console.log(data[i]);
        $recipeImage.append(
          $('<div class="hoverContainer"><div class="hovereffect"><img style="height: 200px; width: 200px; padding: 10px;" src='+ data[i].image_url +'><div class="overlay"><h2>' + data[i].title + '</h2><a href="./recipe.html?recipe_id=' + data[i]._id + '"><i class="icon-external-link"></i></a> <i class="icon-frown"></i> <i class="icon-heart"></i> </div></div></div>')
        );
      }
   })
      .fail(function(request, textStatus, errorThrown) {
        $recipeDirections.html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
      });

// vertical calendar display
var verDay  = $('#day_display'),
    verDate = $('#date_display'),
    verDate_formatted = 0,
    // verDate_value = nil;
    j       = 0;

// function for updating dates
var update_dates = function(counter){
   verDay.html( moment().add(counter, 'd').format('dddd') );
   verDate.html( moment().add(counter, 'd').format('DD MMM YYYY') );
   verDate_formatted = moment().add(counter, 'd').format('YYYY-MM-DD');
  //  var verDate_value = new Date(moment().add(counter, 'd').format('YYYY,MM,DD'));
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
    user_id: userID
  },
  beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
     }
 })
 .done(function(data) {
   $('#display_day_body').html("");
   for (var k = 0; k < data.length; k++) {
     $('#display_day_body').append('<div class="mealCont" id="'+ data[k]._id +'"><a class="deleteMeal" id="delete_'+ data[k]._id +'"></a><h3 class="mealNumDisplay">meal</h3></div>');
     for (var l = 0; l < data[k].recipes.length; l++){
       $('#'+data[k]._id).append('<img src="'+ data[k].recipes[l].image_url +'" width = "60">');
     }
   }
   $('#display_day_body').append('<div class="addMeal"><h3 class="mealNumDisplay">add meal <br> <b>+</b> </h3></div>');
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
       user_id: userID
     },
     beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
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
    // dataType: 'json',
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
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

// // allow only one recipe to be selected
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
               $(this).append( '<img src="'+ ($('img.selectRecipe').attr('src')) + '" width="60">' );
               $(this).removeClass('selectMeal');
               $('div.rightPanel img').removeClass();
               $(this).dequeue();
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
  // show: {
  //     effect: "drop",
  //     duration: 1000
  // },
  // hide: {
  //     effect: "drop",
  //     duration: 1000
  //   },
    closeText: null,
    title: 'recipe',
    buttons: [
      {
        id:"btn-delete",
        text: "Delete",
        click: function() {
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

// indicate recipe has been liked
$('#recipePicturesPlanner').on('click', '.icon-heart', function() {
  $(this).toggleClass('recipeFav');
});

// hide recipe when dislike
$('#recipePicturesPlanner').on('click', '.icon-frown', function() {
  if (confirm('Are you sure you want to hide this recipe?')) {
    $(this).closest('.hoverContainer').hide();
  } else {
    return false;
  }
});



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
});
