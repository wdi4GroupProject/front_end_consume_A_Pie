$(function(){
  $("#logout").on('click',function(){
    $.ajax({
      url: "https://team5-backend.herokuapp.com/API/logout",
      type: 'GET',
    }).done(function(data) {
      window.location = 'index.html';
  })
  .fail(function(request, textStatus, errorThrown) {
    alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
  });
});



});
