// CX to do
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
      window.location = 'index.html';
  })
  .fail(function(request, textStatus, errorThrown) {
    alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
  });
});

$("#btn-login").on('click',function(){
  var $email = $("#login-username"),
  $password = $("#login-password");
  $.ajax({
    url: "https://team5-backend.herokuapp.com/API/login",
    data: {
      "email": $email.val(),
      "password": $password.val()
    },
    type: 'POST',
    dataType:'json'
  }).done(function(data) {
    alert(data);
    window.location = 'index.html';
})
.fail(function(request, textStatus, errorThrown) {
  alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
});
});
$('#btn-fblogin').on('click',function(){
  $.ajax({
    url: "https://crossorigin.me/https://team5-backend.herokuapp.com/API/auth/google",
    type: 'GET',
  }).done(function(data) {
    window.location = 'index.html';
})
.fail(function(request, textStatus, errorThrown) {
  alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
});
});

});
