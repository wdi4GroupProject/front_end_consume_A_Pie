console.log("weekly JS connected");
$(function() {
//
//   Date.prototype.yyyymmdd = function() {
//     var yyyy = this.getFullYear().toString();
//     var mm = (this.getMonth()+1).toString();
//     var dd  = this.getDate().toString();
//     return (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/" +  yyyy;
//   };
//
//   var date = new Date();
//   console.log( date.yyyymmdd() );
var date = Date.now();

// AJAX call to retrieve meals for date
    //condition date === current date
    //retrieve meals
// Create meals for date
$.ajax({
    type: "POST",
    url: 'https://team5-backend.herokuapp.com/API/weekly',
    // data: JSON.stringify(xxx),
    dataType: "json",
  }).done(function(data) {
              if (canceled) {
                  return;
              }

            }
            {
              user_id: "57badab5fee98669d2a81e1d",
              day: date
          //Long code 2
          },
          error: function (request, error) {
              alert('ppp');
          }
      });
    //post meal selected to current date
// Fill meal with recipe title & pictures

    //for loop for recipe number = 0 then plus plus
    //pull in recipe for meal


  // $(document).ready(function() {
  // var $mealInfo           = $('#mealInfo');
  //   $.ajax({
  //     // url: 'dont know yet',
  //     type: 'GET',
  //     datatype: 'json',
  //    }).done(function(data) {
  //      $mealInfo.html(
  //        "<p> Date: " + data.date + "</p> <p> Meal Number: " + data.mealNumber + "</p> <p> Recipes: " + data.recipe + "</p> <p> Status: " + data.status + "</p> <p> User ID: " + data.userId + "</p>");
  //    })
  //    .fail(function(request, textStatus, errorThrown) {
  //      $result.html("Sorry! An error occured when processing your phrase. Request " + request.status + " " + textStatus + " " + errorThrown);
  //    });
  //  });
});
