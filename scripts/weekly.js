console.log("weekly JS connected");
$(function() {
$('#run_button').on('click',function(e){
var $userId       = $('#userid');
var $dayDate      = $('#daydate');
var $mealNum      = $('#mealnum');
var $mealrecipes  = $('#mealrecipes');
var $recipeId     = $('.pull-right fav-margin');
var $recipeImage  = $('#meal-image-holder');

//day variables
var d = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var n = weekday[d.getDay()];

// get today's date
var getDayFormat = function(day){
var dd = day.getDate();
var mm = day.getMonth()+1; //January is 0!
var yyyy = day.getFullYear();

if(dd<10) {
    dd='0'+dd;
}

if(mm<10) {
    mm='0'+mm;
}

return yyyy+'-'+mm+'-'+(dd);
};

var day_x =  new Date();
if($('#date_input').val()) {
  var date_input = $('#date_input').val().split('-');
  day_x = new Date(date_input[0],date_input[1]-1,date_input[2]) ;
}
var date_array = [];
var date_array_formatted = [];
for (var i=1; i<8; i++){
  date_array[i] = new Date(day_x.getFullYear(),day_x.getMonth(),day_x.getDate()+i-1);
  date_array_formatted[i] = getDayFormat(date_array[i]);
  $('#day'+i+'_day').html(weekday[d.getDay(i)]);
  $('#day'+i+'_date').html(date_array_formatted[i]);
}



// AJAX call to retrieve meals for date

// Create meals for date
var userID = "57badab5fee98669d2a81e1d";
// Fill meal with recipe title & pictures

// to refactor to single ajax call followed by population of data
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/meals',
      type: 'GET',
      data: {
        start   : date_array_formatted[1],
        end     : date_array_formatted[1],
        user_id : userID
      },
      datatype: 'json',
       }).done(function(data) {
       //scan through meals database
       $('#day'+1+'_meal_container').html('');
       var meal_container = [];
       for (var i=0; i < data.length; i++) {
        meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
        $('#day'+1+'_meal_container').append(meal_container[i]);
        for (var j=0; j < data[i].recipes.length; j++){
           var recipe_container = [];
           recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
           $('#' + data[i]._id).append(recipe_container[j]);
        }
       }
     })
     .fail(function(request, textStatus, errorThrown) {
       $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
     });

     $.ajax({
       url: 'https://team5-backend.herokuapp.com/API/meals',
       type: 'GET',
       data: {
         start   : date_array_formatted[2],
         end     : date_array_formatted[2],
         user_id : userID
       },
       datatype: 'json',
        }).done(function(data) {
        //scan through meals database
        $('#day'+2+'_meal_container').html('');
        var meal_container = [];
        for (var i=0; i < data.length; i++) {
         meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
         $('#day'+2+'_meal_container').append(meal_container[i]);
         for (var j=0; j < data[i].recipes.length; j++){
            var recipe_container = [];
            recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
            $('#' + data[i]._id).append(recipe_container[j]);
         }
        }
      })
      .fail(function(request, textStatus, errorThrown) {
        $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
      });

      $.ajax({
        url: 'https://team5-backend.herokuapp.com/API/meals',
        type: 'GET',
        data: {
          start   : date_array_formatted[3],
          end     : date_array_formatted[3],
          user_id : userID
        },
        datatype: 'json',
         }).done(function(data) {
         //scan through meals database
         $('#day'+3+'_meal_container').html('');
         var meal_container = [];
         for (var i=0; i < data.length; i++) {
          meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
          $('#day'+3+'_meal_container').append(meal_container[i]);
          for (var j=0; j < data[i].recipes.length; j++){
             var recipe_container = [];
             recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
             $('#' + data[i]._id).append(recipe_container[j]);
          }
         }
       })
       .fail(function(request, textStatus, errorThrown) {
         $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
       });

       $.ajax({
         url: 'https://team5-backend.herokuapp.com/API/meals',
         type: 'GET',
         data: {
           start   : date_array_formatted[4],
           end     : date_array_formatted[4],
           user_id : userID
         },
         datatype: 'json',
          }).done(function(data) {
          //scan through meals database
          $('#day'+4+'_meal_container').html('');
          var meal_container = [];
          for (var i=0; i < data.length; i++) {
           meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
           $('#day'+4+'_meal_container').append(meal_container[i]);
           for (var j=0; j < data[i].recipes.length; j++){
              var recipe_container = [];
              recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
              $('#' + data[i]._id).append(recipe_container[j]);
           }
          }
        })
        .fail(function(request, textStatus, errorThrown) {
          $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
        });

        $.ajax({
          url: 'https://team5-backend.herokuapp.com/API/meals',
          type: 'GET',
          data: {
            start   : date_array_formatted[5],
            end     : date_array_formatted[5],
            user_id : userID
          },
          datatype: 'json',
           }).done(function(data) {
           //scan through meals database
           $('#day'+5+'_meal_container').html('');
           var meal_container = [];
           for (var i=0; i < data.length; i++) {
            meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
            $('#day'+5+'_meal_container').append(meal_container[i]);
            for (var j=0; j < data[i].recipes.length; j++){
               var recipe_container = [];
               recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
               $('#' + data[i]._id).append(recipe_container[j]);
            }
           }
         })
         .fail(function(request, textStatus, errorThrown) {
           $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
         });

         $.ajax({
           url: 'https://team5-backend.herokuapp.com/API/meals',
           type: 'GET',
           data: {
             start   : date_array_formatted[6],
             end     : date_array_formatted[6],
             user_id : userID
           },
           datatype: 'json',
            }).done(function(data) {
            //scan through meals database
            $('#day'+6+'_meal_container').html('');
            var meal_container = [];
            for (var i=0; i < data.length; i++) {
             meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
             $('#day'+6+'_meal_container').append(meal_container[i]);
             for (var j=0; j < data[i].recipes.length; j++){
                var recipe_container = [];
                recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
                $('#' + data[i]._id).append(recipe_container[j]);
             }
            }
          })
          .fail(function(request, textStatus, errorThrown) {
            $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
          });

          $.ajax({
            url: 'https://team5-backend.herokuapp.com/API/meals',
            type: 'GET',
            data: {
              start   : date_array_formatted[7],
              end     : date_array_formatted[7],
              user_id : userID
            },
            datatype: 'json',
             }).done(function(data) {
             //scan through meals database
             $('#day'+7+'_meal_container').html('');
             var meal_container = [];
             for (var i=0; i < data.length; i++) {
              meal_container[i]= '<div id="'+data[i]._id +'" class="col-lg-3 col-md-3 col-xs-6 thumb thumbnail img-responsive"></div>';
              $('#day'+7+'_meal_container').append(meal_container[i]);
              for (var j=0; j < data[i].recipes.length; j++){
                 var recipe_container = [];
                 recipe_container[j] = '<a href="/views/recipe.html?recipe_id=' + data[i].recipes[j]._id + '"><img src='+ data[i].recipes[j].image_url +'></a>';
                 $('#' + data[i]._id).append(recipe_container[j]);
              }
             }
           })
           .fail(function(request, textStatus, errorThrown) {
             $recipeId.html("Request " + request.status + " " + textStatus + " " + errorThrown);
           });
  });
  $('#run_button').trigger('click');
 });
