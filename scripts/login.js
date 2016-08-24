console.log("login JS connected");

// CX to do
// provide user_id in sessions for use in rest of app
$(function(){


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
    sessionStorage.setItem("user",data.id);
    sessionStorage.setItem("token",data.token);
    window.location = 'after_login_existing.html';
})
.fail(function(request, textStatus, errorThrown) {
  alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
});
});
// $("#logout").on('click',function(){
//   var token = sessionStorage.getItem('token');
//   $.ajax({
//     url: "https://team5-backend.herokuapp.com/API/logout",
//     type: 'GET',
//     beforeSend: function(xhr) {   
//       xhr.setRequestHeader("Authorization", "Bearer "+token+"");   
//     }
//   }).done(function(data) {
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');
//     window.location = 'index.html';
// })
// .fail(function(request, textStatus, errorThrown) {
//   alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
// });
// });


});
