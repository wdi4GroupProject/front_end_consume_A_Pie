console.log("meal_planner JS connected");



$(document).ready(function() {

   var $recipeImage         = $('#recipePicturesPlanner');
   var $recipeTitle         = $('#recipe-title');
   var $recipeDirections    = $('#intructions');
   var $recipeIngredients   = $('#ingredient-img');
   var $recipeCalories      = $('#calories');
   var userID              = "57bcf4656862c50300de1058"; // for ajax calls

   // Calendar function - Steph
   $.ajax({

     url: 'https://team5-backend.herokuapp.com/API/recipes',
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
          $('<div class="hoverContainer"><div class="hovereffect"><img id="'+ data[i]._id +'" style="height: 200px; width: 200px; padding: 10px;" src='+ data[i].image_url +'><div class="overlay"><h2>' + data[i].title + '</h2><p> <i class="icon-external-link"></i> <i class="icon-heart"></i></p></div></div></div>')
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
       $('#'+data[k]._id).append('<img id="thumb_'+ data[k].recipes[l]._id +'" src="'+ data[k].recipes[l].image_url +'" width = "60">');
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


// allow only one recipe to be selected
$('.rightPanel').on('click', '.hoverContainer', function() {
  $('.selectRecipe').removeClass('selectRecipe');
    $($(this).find('img')).addClass('selectRecipe');
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
    var meal_id = this.id;
    var recipeID = $('.selectRecipe').attr('id');
    console.log(meal_id);
    console.log(recipeID);
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/meals/'+meal_id,
      type: 'PUT',
      data: {
        recipes: recipeID
      },
      dataType: 'json',
      beforeSend: function(xhr) {
           xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
         }
     })
     .done(function(data) {
       alert('edited');
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
          var recipeID = $('.selectedRecipeInMeal').attr('id').split('_')[1];
          var mealID = $('.selectedRecipeInMeal').parent().attr('id') ;
          console.log(recipeID);
          console.log();
          $.ajax({
            url: 'https://team5-backend.herokuapp.com/API/meals/'+ mealID, // +'?recipe='+ recipeID,
            data: {
              recipe: recipeID
            },
            type: 'DELETE',
            // dataType: 'json',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
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







// AJAX to get favourite recipes

// AJAX to fav recipe

// AJAX to remove fav from recipe

// AJAX to get blacklist recipes

// AJAX to blacklist recipe

// AJAX to remove blacklist from recipe

});
