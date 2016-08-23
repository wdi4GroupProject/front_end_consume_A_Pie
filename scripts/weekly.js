console.log("weekly JS connected");
$(function() {

var $userId       = $('#userid');
var $dayDate      = $('#daydate');
var $mealNum      = $('#mealnum');
var $mealrecipes  = $('#mealrecipes');
var $mealId       = $('#mealid');
var $meal11       = $('#meal11');
var $meal12       = $('#meal12');
var $meal13       = $('#meal13');
var $meal14       = $('#meal14');
var $meal15       = $('#meal15');



// AJAX call to retrieve meals for date

// Create meals for date

// Fill meal with recipe title & pictures

    $.ajax({
      url: 'https://team5-backend.herokuapp.com/API/meals',
      type: 'GET',
      datatype: 'json',
       }).done(function(data) {
       //scan through meals database
       for (i=0; i < meals.length; i++) {
         if (data[i].day === currentday) {
           $mealrecipes.html(data[i].recipes);
              $.ajax({
                url: 'https://team5-backend.herokuapp.com/API/recipes',
                type: 'GET',
                datatype: 'json',
                }).done(function(data) {
                  //call for images corresponding of recipe ids.
                })
                  .fail(function(request, textStatus, errorThrown) {
                    $result.html("Request " + request.status + " " + textStatus + " " + errorThrown);
                  });

         }
       }
     })
     .fail(function(request, textStatus, errorThrown) {
       $result.html("Request " + request.status + " " + textStatus + " " + errorThrown);
     });
   });
});
