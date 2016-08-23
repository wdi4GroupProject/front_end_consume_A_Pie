console.log("recipe JS connected");

// AJAX call to get recipe
$.ajax({
  url: "https://team5-backend.herokuapp.com/API/recipes",
  // headers: {'X-Mashape-Key': "eacbvBkAmomshikYXvMKDr0B269ap16OPTRjsn9MD1cVErXCtc",
  // "Content-Type": "application/x-www-form-urlencoded",
  // "Accept": "application/json"
  // },
  type: "GET",
  dataType: 'json',
  beforeSend: function() {
    $loader.show();
  }
}).done(successFunction)
  .fail(failFunction)
  .always(alwaysFunction);
});

function alwaysFunction(){
  $loader.hide();
}
function successFunction(data){
  $quote.html('<strong>&ldquo;</strong><em> '+ data.quote +' </em><strong>&rdquo;</strong>');
  $author.html('<small>- ' + data.author + '</small>');
  $('input#input-search').val(data.author);
}
function failFunction(request, textStatus, errorThrown){
  $quote.text(textStatus + ' occurred during your request: '+ errorThrown );
}

// populate HTML page with recipe data
