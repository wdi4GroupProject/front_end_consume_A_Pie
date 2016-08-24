console.log("signup JS connected");

// CX to do
// auto login after signup
// provide user_id in sessions for use in rest of app
$(function(){
  $("#btn-signup").on('click',function(){
    var $email = $("#email"),
    $password = $("#password");
    $.ajax({
      url: "https://team5-backend.herokuapp.com/API/signup",
      data: {
        "email": $email.val(),
        "password": $password.val()
      },
      type: 'POST',
      dataType:'json'
    }).done(function(data) {
      sessionStorage.setItem('connectId', data);
      window.location = 'after_login.html';
  })
  .fail(function(request, textStatus, errorThrown) {
    alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
  });
});
});
