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

    $('.meal_cont').on('click', 'i.icon-frown', function() {
      var recipeID_dislike = this.getAttribute("class").split('_')[1];
      console.log(recipeID_dislike);
      addon_user_blacklist(recipeID_dislike);
      $('.frown_' + recipeID_dislike + '_').toggleClass('recipeDis');
    });

    $('.meal_cont').on('click', 'i.icon-heart', function() {
      var recipeID_heart = this.getAttribute("class").split('_')[1];
      console.log(recipeID_heart);
      addon_user_favourites(recipeID_heart);
      $('.heart_' + recipeID_heart + '_').toggleClass('recipeFav');
    });

  $('#run_button').on('click', function(e) {

    // get today's date or input date
    var day_x = new Date();
    if ($('#date_input').val()) {
      var date_input = $('#date_input').val().split('-');
      day_x = new Date(date_input[0], date_input[1] - 1, date_input[2]);
    }

    // day variables
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // function to get day in format for ajax call
    var getDayFormat = function(day) {
      var dd = day.getDate();
      var mm = day.getMonth() + 1; //January is 0!
      var yyyy = day.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return yyyy + '-' + mm + '-' + (dd);
    };

    // store week's dates
    var date_array = [];
    var date_array_formatted = [];
    for (var i = 1; i < 8; i++) {
      // day's date
      date_array[i] = new Date(day_x.getFullYear(), day_x.getMonth(), day_x.getDate() + i - 1);
      // day in ajax format
      date_array_formatted[i] = getDayFormat(date_array[i]);
      // update div day and date
      $('#day' + i + '_day').html(weekday[date_array[i].getDay()]);
      $('#day' + i + '_date').html(date_array_formatted[i]);
    }

    // function to check 2 dates are the same
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

    // Create meals for date
    // Fill meal with recipe title & pictures
    var populate_day_container = function(day_num, day_data){
      // clear day container
      $('#day' + day_num + '_meal_container').html('');

      // create meal containers
      for (var i = 0; i < day_data.length; i++) {
        $('#day' + day_num + '_meal_container').append('<div id="' + day_data[i]._id + '" class="row"style="padding: 20px 0 20px 0 ; "></div>');

        // populate meal containers with recipe images
        for (var j = 0; j < day_data[i].recipes.length; j++) {
          $('#' + day_data[i]._id).append('<div class="hoverContainer" style="width:150px; height: 150px"><div class="hovereffect" style="width:150px; height: 160px"><div class="thumbnail"><img style="width:150px; height: 150px; overflow: auto; object-fit:cover;" class="img-responsive" src=' + day_data[i].recipes[j].image_url + '></div><div class="overlay"><h2>' + day_data[i].recipes[j].title + '</h2><p><a href="./recipe.html?recipe_id=' + day_data[i].recipes[j]._id + '"><i class="icon-external-link"></i></a><i class="icon-frown frown_' + day_data[i].recipes[j]._id + '_"></i><i class="icon-heart heart_' + day_data[i].recipes[j]._id + '_"></i></p></div></div></div>');
        }
      }
    };

    // AJAX call to retrieve meals for date
    $.ajax({
        url: 'https://team5-backend.herokuapp.com/API/meals',
        type: 'GET',
        data: {
          start: date_array_formatted[1],
          end: date_array_formatted[7],
          user_id: user
        },
        dataType: 'json',
        beforeSend: function(xhr) {   
          xhr.setRequestHeader("Authorization", "Bearer " + token + "");   
        }
      }).done(function(data) {
        // instantiate array
        var data_daily = [];

        // for each day
        for (var l = 1; l < 8 ; l++){
          data_daily[l] = [];

          // sort data and store as menu array in daily array
          for(var k = 0; k < data.length; k++){
            if( same_day_check(date_array[l],data[k].day) ) data_daily[l].push(data[k]);
          }

          populate_day_container(l, data_daily[l]);
        }

        get_user_favourites();
        get_user_blacklist();
      })
      .fail(function(request, textStatus, errorThrown) {
        alert("Request " + request.status + " " + textStatus + " " + errorThrown);
      });
  });
  $('#run_button').trigger('click');
});
