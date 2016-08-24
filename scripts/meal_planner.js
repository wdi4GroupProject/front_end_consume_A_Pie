console.log("meal_planner JS connected");

// Calendar function - Steph

$(document).ready(function() {

   var $recipeImage         = $('#recipePicturesPlanner');
   var $recipeTitle         = $('#recipe-title');
   var $recipeDirections    = $('#intructions');
   var $recipeIngredients   = $('#ingredient-img');
   var $recipeCalories      = $('#calories');

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
          $('<img style="height: 200px; width: 200px; padding: 10px;" src='+ data[i].image_url +'>')
        );
      }

   })
      .fail(function(request, textStatus, errorThrown) {
        $recipeDirections.html("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
      });

   });

// vertical calendar display
var verDay  = $('div.verDayDisplay');
    verDate = $('div.verDateDisplay');
    j       = 0;

 verDay.html( moment().add(j, 'd').format('dddd') );
 verDate.html( moment().add(j, 'd').format('DD MMM YYYY') );

 $('.verPrev').click(function() {
   j -= 1;
   verDay.html( moment().add(j, 'd').format('dddd') );
   verDate.html( moment().add(j, 'd').format('DD MMM YYYY') );
 });

 $('.verNext').click(function() {
   j += 1;
   verDay.html( moment().add(j, 'd').format('dddd') );
   verDate.html( moment().add(j, 'd').format('DD MMM YYYY') );
 });

// console.log( moment(verDate.html()).startOf('date').format('x') );


// meal display + add recipes to meal - Steph

// user meals display, click to add new meal div
 var count = 4;
 $('.addMeal').click(function() {
   $("<div />", { "class":"mealCont", "id":"meal" + count })
    .html( '<a class="deleteMeal"></a><h3 class="mealNumDisplay">meal ' + count + '</h3> <div />' )
    .insertBefore( $('.addMeal'));
  count++;
});

// allow only one recipe to be selected
$('div.rightPanel img').click(function() {
  // $(this).toggleClass('selectRecipe');
  $('.selectRecipe').removeClass('selectRecipe');
  // set class and input name for clicked item
  $(this).addClass('selectRecipe');

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
  $('#dialog').html( '<img src="'+ selectedImg + '" width="300" height="300"><br><p>' + recipes[0].title + '</p>' );
  $('#dialog').dialog("open");
});

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

  // delete meals
  $('.verticalMeals').on('click', '.deleteMeal', function() {
    if(confirm("Are you sure you want to delete this meal?")) {
    $(this).parent().remove();
  } else { return false; }
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
