console.log("meal_planner JS connected");

var recipes = [{
_id: "57ba977d5e2c685b25483814",
title: "Roasted Cauliflower and Aged White Cheddar Soup",
source: "http://food2fork.com",
source_id: "35540",
ingredients: "1 small head cauliflower, cut into florets,2 tablespoons oil,salt and pepper to taste,1 tablespoon oil,1 medium onion, diced,2 cloves garlic, chopped,1 teaspoon thyme, chopped,3 cups vegetable or chicken broth,1 1/2 cups aged white cheddar, shredded,1 cup milk or cream,salt and pepper to taste ",
image_url: "http://static.food2fork.com/Roasted2BCauliflower2Band2BAged2BWhite2BCheddar2BSoup2B5002B68640e245c89.jpg",
directions: "<h3>Directions</h3><ol><li>Toss the cauliflower florets in the oil along with the salt and pepper, arrange them in a single layer on a large baking sheet and roast in a preheated 400F/200C oven until lightly golden brown, about 20-30 minutes.</li><li>Heat the oil in a large sauce pan over medium heat, add the onion and saute until tender, about 5-7 minutes.</li><li>Add the garlic and thyme and saute until fragrant, about a minute.</li><li>Add the broth, deglaze the pan, add the cauliflower, bring to a boil, reduce the heat and simmer, covered, for 20 minutes.</li><li>Puree the soup until it reaches your desired consistency with a stick blender.</li><li>Mix in the cheese, let it melt without bringing it to boil again.</li><li>Mix in the milk, season with salt and pepper and remove from heat.</li></ol><h3>Slow Cooker:</h3> <p>Implement step 1, optionally implement steps 2 & 3, place everything except the cheese and milk in the slow cooker and cook on low for 6-10 hours or high for 2-4 hours before adding the cheese and milk and cooking until the cheese has melted.</p><p>Note: The amount of broth that you are going to need will depend on how large your head of cauliflower is and how thick or thin you prefer the soup to be.</p>",
total_calories: 999
},
{
_id: "57ba97a45e2c685b25483815",
title: "Basic Crepes",
source: "http://food2fork.com",
source_id: "3068",
ingredients: "1 cup all-purpose flour,2 eggs,1/2 cup milk,1/2 cup water,1/4 teaspoon salt,2 tablespoons butter, melted",
image_url: "http://static.food2fork.com/4005704623.jpg",
directions: "<h3>Directions</h3><ol><li>In a large mixing bowl, whisk together the flour and the eggs. Gradually add in the milk and water, stirring to combine. Add the salt and butter; beat until smooth.</li><li>Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each crepe. Tilt the pan with a circular motion so that the batter coats the surface evenly.</li><li>Cook the crepe for about 2 minutes, until the bottom is light brown. Loosen with a spatula, turn and cook the other side. Serve hot.</li></ol>",
total_calories: 216
},
{
_id: "57ba97af5e2c685b25483816",
title: "Cookie Monster cupcakes",
source: "http://food2fork.com",
source_id: "9089e3",
ingredients: "12 Cupcakes (I used the Lemon and Poppyseed recipe on this website and substituted vanilla for the lemon and poppyseeds),Frosting,The frosting I made using a vegetable shortening (in Aus its called So Lite, I think in the US Crisco is similar) and icing sugar mixture. You could use butter cream but the frosting is pure white and colours beautifully. You would need to double the buttercream you usually use for 12 cupcakes,Blue colouring - use a good one for the best colour,Coconut - dyed blue to match the frosting,12 Choc chip cookies,Melted white and dark chocolate to make the eyes.",
image_url: "http://static.food2fork.com/604133_mediumd392.jpg",
directions: "<h3>Directions</h3><ol><li>I used an icecream scoop full of frosting to get the right shape and then dipped in it coconut. Press the coconut on and tidy up the shape.</li><li>When the frosting has firmed a little cut a slice out near the bottom and push a cookie in (you may have to trim the cookie little depending on the size of your cookies). Or make his mouth further up and put cookie pieces around it.</li><li>The eyes I made by using melted white to make a circle and then dark chocolate in the middle. Don't make them all exactly the same - it adds a bit of character to the finished cakes!</li><li>Simple - very messy and lots of fun!</li></ol>",
total_calories: 511
}];

$('#test1').attr("src", recipes[0].image_url);
$('#test2').attr("src", recipes[1].image_url);
$('#test3').attr("src", recipes[2].image_url);

// Calendar function - Steph

// vertical calendar display
$(document).ready(function() {
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
    .html( '<h3 class="mealNumDisplay">meal ' + count + '</h3> <div />' )
    .insertBefore( $('.addMeal') );
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
