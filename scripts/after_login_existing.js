// Calendar function
$(document).ready(function() {
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
        xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
      }
    }).done(function(data) {
      console.log(data);
    })
    .fail(function(request, textStatus, errorThrown) {
      console.log(textStatus);
      window.location = 'login.html';
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

  (function() {
    var $frame = $('#horizontalCal');
    var $wrap = $frame.parent();

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



    // horizontal calendar display
    var dayCont = $('div.dayDiv');
    dateCont = $('div.dateDiv');

    for (i = -10; i < dateCont.length; i++) {
      var dayDisplay = moment().add(i, 'd').format('ddd');
      dateDisplay = moment().add(i, 'd').format('DD MMM');

      dayCont.eq(i + 10).html(dayDisplay);
      dateCont.eq(i + 10).html(dateDisplay);
    }


    // set display date to today's date on load
    var display_date = new Date(moment().format('YYYY,MM,DD'));
    $('#display-day').html(moment().format('dddd'));
    $('#display-date').html(moment().format('DD MMMM YYYY'));

    // generate 21 dates of the week
    var date_array = []; // used to populate the calendar
    var date_array_formatted = []; // this is needed for the ajax call
    for (var i = 0; i < 21; i++) {
      date_array_formatted[i] = moment().add((i - 10), 'd').format('YYYY-MM-DD');
      date_array[i] = new Date(moment().add((i - 10), 'd').format('YYYY,MM,DD'));
    }
    var start_date = date_array_formatted[0]; // ajax call parameter
    var end_date = date_array_formatted[date_array_formatted.length - 1]; // ajax call parameter


    // AJAX call to retrieve meals for the week
    // var userID = "57bcf4656862c50300de1058"; // change to login user from sessions
    var meals_for_21days = {};
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/meals',
      type: 'GET',
      data: {
        start: start_date,
        end: end_date,
        user_id: user
      },
      datatype: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token + ""); 
      }

    }).done(function(data) {
      meals_for_21days = data;

      var display_day_meals = find_same_day_meals(display_date, meals_for_21days);
      create_new_meal_divs(display_day_meals);
      get_user_favourites();
      get_user_blacklist();
      fill_calendar(meals_for_21days);
    })

    .fail(function(request, textStatus, errorThrown) {
      alert("Request " + request.status + " " + textStatus + " " + errorThrown);
    });

    // checks 2 dates are the same
    var same_day_check = function(target_date1, target_date2) {
      var ddA = target_date1.getDate();
      var mmA = target_date1.getMonth() + 1; //January is 0!
      var yyyyA = target_date1.getFullYear();

      var ddB = new Date(target_date2).getDate();
      var mmB = new Date(target_date2).getMonth() + 1; //January is 0!
      var yyyyB = new Date(target_date2).getFullYear();

      if ((ddA === ddB) && (mmA === mmB) && (yyyyA === yyyyB)) {
        return true;
      } else {
        return false;
      }
    };

    // returns meals for matching days
    var find_same_day_meals = function(target_date1, data) {
      var same_day_meals = [];
      for (var j = 0; j < data.length; j++) {
        if (same_day_check(target_date1, data[j].day)) {
          same_day_meals.push(data[j]);
        }
      }
      return same_day_meals;
    };

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
         for(var p=0; p < data.length; p++){
            $('.heart_'+data[p]._id+'_').addClass('recipeFav');
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
         for(var p=0; p < data.length; p++){
            $('.frown_'+data[p]._id+'_').addClass('recipeDis');
         }
      })
       .fail(function(request, textStatus, errorThrown) {
         alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
       });
    };

    // AJAX to fav or unlike recipe
    var addon_user_favourites = function(recipeID_fav){
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/users?action=like&recipe_id='+recipeID_fav +'&id=' + user,
      type: 'PUT',
      beforeSend: function(xhr) {   
        xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
      }
       })
       .done(function(data) {
         console.log('recipe toggled on favourites list');
      })
       .fail(function(request, textStatus, errorThrown) {
         alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
       });
    };

    // AJAX to blacklist recipe & to remove the same recipes from blacklist
    var addon_user_blacklist = function(recipeID_dis){
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/users?action=dislike&id='+ user + '&recipe_id=' + recipeID_dis,
      type: 'PUT',
      beforeSend: function(xhr) {   
        xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
      }
       })
       .done(function(data) {
         console.log('recipe toggled on blacklist');
      })
       .fail(function(request, textStatus, errorThrown) {
         alert("Error. Request " + request.status + " " + textStatus + " " + errorThrown);
       });
    };

    $('#display_day_body').on('click', 'i.icon-frown', function() {
      var recipeID_dislike = this.getAttribute("class").split('_')[1];
      console.log(recipeID_dislike);
      addon_user_blacklist(recipeID_dislike);
      $('.frown_' + recipeID_dislike + '_').toggleClass('recipeDis');
    });

    $('#display_day_body').on('click', 'i.icon-heart', function() {
      var recipeID_heart = this.getAttribute("class").split('_')[1];
      console.log(recipeID_heart);
      addon_user_favourites(recipeID_heart);
      $('.heart_' + recipeID_heart + '_').toggleClass('recipeFav');
    });



    // create meal divs and recipe images with link to recipes
    var create_new_meal_divs = function(target_meals) {
      // clear the display
      $('#display_day_body').html("");
      if (target_meals.length === 0) {
        $('#display_day_body').html('<div class="col-lg-12 text-center"><a href="./meal_planner.html"><h1>Plan my meal!</h1></a><div>');
      } else {

        for (var k = 0; k < target_meals.length; k++) {
          var meal_container = '<div id="' + target_meals[k]._id + '" class="row" style="padding: 20px 0 20px 0 ;border-bottom: 3px solid grey"></div>';
          // console.log(meal_container);

          $('#display_day_body').append(meal_container);

          for (var l = 0; l < target_meals[k].recipes.length; l++) {
            var recipe_container =
            '<div class="hoverContainer" style="width:200px; height: 200px"><div class="hovereffect" style="width:200px; height: 200px"><div class="thumbnail" id="' + target_meals[k].recipes[l]._id + '"><img style=" height: 180px width: 180px !important; overflow: auto; object-fit:cover;" class="img-responsive" src=' + target_meals[k].recipes[l].image_url + '><div class="overlay"><h2>' + target_meals[k].recipes[l].title + '</h2><p><a href="./recipe.html?recipe_id=' + target_meals[k].recipes[l]._id + '"><i class="icon-external-link"></i></a><i class="icon-frown frown_' + target_meals[k].recipes[l]._id + '_"></i><i class="icon-heart heart_' + target_meals[k].recipes[l]._id + '_"></i></p></div></div></div>';

            $('#' + target_meals[k]._id).append(recipe_container);
          }
        }
      }
    };

    // fill calendar div tiles with meal tiles and number of recipes in the meal
    var fill_calendar = function(data) {
      var calendar_meals = [];
      for (var m = 0; m < 21; m++) {
        calendar_meals[m] = find_same_day_meals(date_array[m], data);
        for (var n = 0; n < calendar_meals[m].length; n++) {
          if (calendar_meals[m][n].recipes.length === 1) {
            $('#cal_meal_' + m).append('<div>' + calendar_meals[m][n].recipes.length + ' Recipe </div>');
          } else {
            $('#cal_meal_' + m).append('<div>' + calendar_meals[m][n].recipes.length + ' Recipes </div>');
          }
        }
      }
    };

    // find display date on click
    var update_display_date = function() {
      // get the div number day highlighted
      var highlighted_div_num = $('ul li.active div.recipeDiv').attr('id').split('_')[2];

      // update the display date in html and value
      display_date = new Date(moment().add(highlighted_div_num - 10, 'd').format('YYYY,MM,DD'));
      $('#display-day').html(moment().add(highlighted_div_num - 10, 'd').format('dddd'));
      $('#display-date').html(moment().add(highlighted_div_num - 10, 'd').format('DD MMMM YYYY'));

      // populate the display according to the display date
      var display_day_meals = find_same_day_meals(display_date, meals_for_21days);
      create_new_meal_divs(display_day_meals);
      get_user_favourites();
      get_user_blacklist();
    };

    $('#reload').on('click', update_display_date);

  }());
});
