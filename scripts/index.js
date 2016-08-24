$(function(){
  $("#logout").on('click',function(){
    var token = sessionStorage.getItem('token');
    $.ajax({
      url: "https://team5-backend.herokuapp.com/API/logout",
      type: 'GET',
      beforeSend: function(xhr) {   
        xhr.setRequestHeader("Authorization", "Bearer "+token+"");   
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



});
