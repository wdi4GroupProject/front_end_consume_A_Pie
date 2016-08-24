$(function() {
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

});



// Calendar function

// AJAX call to retrieve meals today

// create divs based on meals today

// fill meals with pictures of recipe's today & title
