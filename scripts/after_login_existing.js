// Calendar function
$(document).ready(function() {

  (function() {
    var $frame = $('#horizontalCal');
    var $wrap  = $frame.parent();

    // call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 10,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $wrap.find('.horPrev'),
      next: $wrap.find('.horNext')
    });
  }());


  // horizontal calendar display
  var dayCont  = $('div.dayDiv');
      dateCont = $('div.dateDiv');

  for (i = -10; i < dateCont.length; i++) {
    var dayDisplay  = moment().add(i, 'd').format('ddd');
        dateDisplay = moment().add(i, 'd').format('DD MMM');

    dayCont.eq(i +10).html(dayDisplay);
    dateCont.eq(i +10).html(dateDisplay);
  }
});

// var d = new Date();
// var weekday = new Array(7);
// weekday[0]=  "Sunday";
// weekday[1] = "Monday";
// weekday[2] = "Tuesday";
// weekday[3] = "Wednesday";
// weekday[4] = "Thursday";
// weekday[5] = "Friday";
// weekday[6] = "Saturday";
//
// // get today's date
// var getDayFormat = function(day){
// var dd = day.getDate();
// var mm = day.getMonth()+1; //January is 0!
// var yyyy = day.getFullYear();
//
// if(dd<10) {
//     dd='0'+dd;
// }
//
// if(mm<10) {
//     mm='0'+mm;
// }
//
// return yyyy+'-'+mm+'-'+(dd);
// };







var display_date = new Date(moment().format('YYYY,MM,DD'));
$('#display-day').html(moment().format('dddd'));
$('#display-date').html(moment().format('DD MMMM YYYY'));
// var display_date_formatted = moment().add(2, 'd').format('YYYY-MM-DD');
// alert(display_date);

// generate 21 dates of the week
var date_array = [];
var date_array_formatted = [];
for (var i=0; i<21; i++){
  date_array_formatted[i] = moment().add((i-10), 'd').format('YYYY-MM-DD');
  date_array[i] = new Date(moment().add((i-10), 'd').format('YYYY,MM,DD'));
}
var start_date = date_array_formatted[0];
var end_date = date_array_formatted[date_array_formatted.length-1];


// AJAX call to retrieve meals for the week
var userID = "57bcf4656862c50300de1058";
var meals_for_21days = {};
$.ajax({
  url: 'https://team5-backend.herokuapp.com/API/meals',
  type: 'GET',
  data: {
    start   : start_date,
    end     : end_date,
    user_id : userID
  },
  datatype: 'json',
  beforeSend: function(xhr) {
       xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3YmNmNDY1Njg2MmM1MDMwMGRlMTA1OCIsImlhdCI6MTQ3MjAwMTEyNSwiZXhwIjoxNDcyMDM3MTI1fQ.rFPdKI7mxUZA7NV9-0IgsoRd2r4nryQ8kIg-tVnWzkQ");
     }
   }).done(function(data) {
    meals_for_21days = data;
    // console.log(meals_for_21days);
    // console.log('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    var display_day_meals = find_same_day_meals(display_date, meals_for_21days);
    create_new_meal_divs(display_day_meals);
    fill_calendar(meals_for_21days);
    // console.log(same_day_meals);
 })
 .fail(function(request, textStatus, errorThrown) {
   alert("Request " + request.status + " " + textStatus + " " + errorThrown);
 });

  // checks 2 dates are the same
  var same_day_check = function(target_date1, target_date2){
    var ddA = target_date1.getDate();
    var mmA = target_date1.getMonth()+1; //January is 0!
    var yyyyA = target_date1.getFullYear();

    var ddB = new Date(target_date2).getDate();
    var mmB = new Date(target_date2).getMonth()+1; //January is 0!
    var yyyyB = new Date(target_date2).getFullYear();

    if( (ddA===ddB) && (mmA===mmB) && (yyyyA===yyyyB) ){
      return true;} else { return false;}
  };

  // returns meals for matching days
  var find_same_day_meals = function(target_date1, data){
    var same_day_meals = [];
    for(var j = 0 ; j < data.length ; j++){
      if( same_day_check( target_date1, data[j].day )){
      same_day_meals.push(data[j]);
      }
    }
    return same_day_meals;
  };

// create meal divs and recipe images with link to recipes
 var create_new_meal_divs = function (target_meals){
   // clear the display
   $('#display_day_body').html("");
   if(target_meals.length === 0){
    $('#display_day_body').html('<div class="col-lg-12 text-center"><a href="./meal_planner.html"><h1>Plan my meal!</h1></a><div>');
   } else{

  for(var k = 0; k < target_meals.length; k++){
    var meal_container= '<div id="'+target_meals[k]._id +'" class="row"></div>';
    console.log(meal_container);

    $('#display_day_body').append(meal_container);

    for (var l=0; l < target_meals[k].recipes.length; l++){
      var recipe_container = '<div class="col-lg-4 col-md-4 col-xs-6 thumb" id="'+ target_meals[k].recipes[l]._id +'"><a class="thumbnail" href="./recipe.html?recipe_id=' + target_meals[k].recipes[l]._id + '"><img "img-responsive" src='+ target_meals[k].recipes[l].image_url +'></a></div>';
      $('#' + target_meals[k]._id).append(recipe_container);
    }
  }
  }
 };

// fill calendar div tiles with meal tiles and number of recipes in the meal
var fill_calendar = function(data){
  var calendar_meals = [];
  for (var m=0; m<21; m++){
    calendar_meals[m] = find_same_day_meals(date_array[m], data);
    for (var n=0; n<calendar_meals[m].length; n++){
      if (calendar_meals[m][n].recipes.length === 1){
      $('#cal_meal_'+m).append('<div>'+calendar_meals[m][n].recipes.length+' Recipe </div>');}
      else {
      $('#cal_meal_'+m).append('<div>'+calendar_meals[m][n].recipes.length+' Recipes </div>');
      }
    }
  }
};

// find display date on click
var update_display_date = function(){
  // get the div number day highlighted
  var highlighted_div_num = $('ul li.active div.recipeDiv').attr('id').split('_')[2];

  // update the display date in html and value
  display_date = new Date(moment().add(highlighted_div_num-10, 'd').format('YYYY,MM,DD'));
  $('#display-day').html(moment().add(highlighted_div_num-10, 'd').format('dddd'));
  $('#display-date').html(moment().add(highlighted_div_num-10, 'd').format('DD MMMM YYYY'));
  // display_date_formatted = moment().add(highlighted_div_num-10, 'd').format('YYYY-MM-DD');
  // alert(display_date);

  // populate the display according to the display date
  var display_day_meals = find_same_day_meals(display_date, meals_for_21days);
  create_new_meal_divs(display_day_meals);
};

$('#reload').on('click', update_display_date);
