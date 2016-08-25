// Calendar function
$(document).ready(function() {

$(".se-pre-con").fadeOut("slow");

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


  (function() {
    var $frame = $('#horizontalCal');
    var $wrap  = $frame.parent();

    // call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 10,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $wrap.find('.horPrev'),
      next: $wrap.find('.horNext')
    });
  }());


  // horizontal calendar display
  var dayCont  = $('div.dayDiv');
      dateCont = $('div.dateDiv');

  for (i = -10; i < dateCont.length; i++) {
    var dayDisplay  = moment().add(i, 'd').format('ddd');
        dateDisplay = moment().add(i, 'd').format('DD MMM');

    dayCont.eq(i +10).html(dayDisplay);
    dateCont.eq(i +10).html(dateDisplay);
  }
});

// AJAX call to retrieve meals today

// create divs based on meals today

// fill meals with pictures of recipe's today & title
// Calendar function
$(document).ready(function() {

  (function() {
    var $frame = $('#horizontalCal');
    var $wrap  = $frame.parent();

    // call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 10,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $wrap.find('.horPrev'),
      next: $wrap.find('.horNext')
    });
  }());


  // horizontal calendar display
  var dayCont  = $('div.dayDiv');
      dateCont = $('div.dateDiv');

  for (i = -10; i < dateCont.length; i++) {
    var dayDisplay  = moment().add(i, 'd').format('ddd');
        dateDisplay = moment().add(i, 'd').format('DD MMM');

    dayCont.eq(i +10).html(dayDisplay);
    dateCont.eq(i +10).html(dateDisplay);
  }
});

// AJAX call to retrieve meals today

// create divs based on meals today

// fill meals with pictures of recipe's today & title
