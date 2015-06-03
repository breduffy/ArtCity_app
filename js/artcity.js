'use strict';

// var gameRef;
// var gameRef, gameAuth, player;

//Make sure the document is ready before applying jQuery library
$(document).ready(function(){

  //Attempt to make modal hide
    // $('#uploadArt').modal({
    //   show:false;
    // });


  //Show modal to upload art
  $('#uploadArt').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })


  //Hero button, scroll to art finder div with id filters
  $('#hero-button').click(function() {
    $('html, body').animate({scrollTop: $("#filters").offset().top}, 2000);
  });



  //Click button to display art
  $("#filter-city-button").click(function(){
    $.ajax({
      url: 'http://localhost:3000/venues/artwork?city=boston',
      type: 'GET',
      dataType: 'json'
    })
      .done (function(response) {
        //FIXME: it should not be parse but something else....stringify? parses the json text into the div art-images-display div
      $('#art-images-display').html(JSON.stringify(response));
      console.log("Art found");
      console.log(response);
    })
      .fail (function(response) {
      "No Art was found."
    });

  });


  // Create a POST AJAX (upload art) submission and check if filled out correctly



});//End of document ready
