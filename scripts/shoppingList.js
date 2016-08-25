$(function() {
  //user authentication
  // var user = sessionStorage.getItem('user'),
  // token = sessionStorage.getItem('token');
  // $.ajax({
  //     url: "https://team5-backend.herokuapp.com/API/authentication",
  //     data: {
  //       "user": user,
  //     },
  //     type: 'POST',
  //     dataType: 'json',
  //     beforeSend: function(xhr) {   
  //       xhr.setRequestHeader("Authorization", "Bearer "+token+"");   
  //     }
  //   }).done(function(data) {
  //     console.log(data);
  //   })
  //   .fail(function(request, textStatus, errorThrown) {
  //     console.log(textStatus);
  //     window.location='login.html';
  //   });

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
var $start_date,$end_date;
  $("#start_date").datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(dateText, inst) {
      $start_date = dateText;
    }
  });
  $("#end_date").datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function(dateText, inst) {
      $end_date = dateText;
    }
  });
  //populate shopping list
  $('#submit').on('click',function(){
    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/meals',
      type: 'GET',
      data: {
        start: $start_date,
        end: $end_date,
        user_id: '57bcf4656862c50300de1058'
      },
      datatype: 'json',
      // beforeSend: function(xhr) {
      //   xhr.setRequestHeader("Authorization", "Bearer " + token + "");
      // }

    }).done(function(data) {
      var list = [];
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].recipes.length; j++) {
          if (data[i].recipes[j].ingredients.length > 0) {
            list = list.concat(data[i].recipes[j].ingredients);
          }

        }
      }
      var sortedList = list.sort(),
        newList = [],
        count = {};
      for (var n = 0; n < sortedList.length; n++) {
        count[sortedList[n]] = (count[sortedList[n]] || 0) + 1;
        if (sortedList[n] !== sortedList[n + 1]) {
          newList.push(count[sortedList[n]].toString() + 'x' + sortedList[n]);
        }

      }
      $('#shoppinglist').text(newList);

    })
    .fail(function(request, textStatus, errorThrown) {
      alert("Request " + request.status + " " + textStatus + " " + errorThrown);
    });

  });

});
