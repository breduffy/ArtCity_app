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
  // $("#filter-city-button").click(function(){
  //   $.ajax({
  //     url: 'http://localhost:3000/venues/artwork?city=boston',
  //     type: 'GET',
  //     dataType: 'json'
  //   })
  //     .done (function(response) {
  //       //FIXME: it should not be parse but something else....stringify? parses the json text into the div art-images-display div
  //     $('#art-images-display').html(JSON.parse(response));
  //     console.log("Art found");
  //     console.log(response);
  //   })
  //     .fail (function(response) {
  //     "No Art was found."
  //   });

  // });


  //HANDLEBARS TEMPLATE CONTROLLER

    var artworks = (function(){

    //reaching out to a database and grabbing the artwork info and then pushing into html template
    //taking Json(a way of storing data) and pulling it into an array
    var getArtworks = function(){
      $.get( "http://localhost:3000/venues/artwork?city=boston").done(function(response){
        _renderArtworks(response);
      });
    };

  //printing the data
    var _renderArtworks = function(artworks){

      // your code starts here
      //extracting the html and putting into handlebars. Handlebars is a bower component, you installed handlebars and bootstrap
      var templatingFunction = Handlebars.compile($('#artwork-index').html());

      //the first characters is a key, the second is the value
      var result =templatingFunction({
        artworks: artworks[0].artworks
      });
      debugger;
      $('#art-images-display').html(result);//.html includes tags...getter and a setter
      // your code ends here

    };

    return {
      indexArtworks: getArtworks
    };

    })();

    //function calls your artwork handlebars template
    $("#filter-city-button").click(function(){
      artworks.indexArtworks();
    });




  // Create a POST AJAX (upload art) submission and check if filled out correctly



});//End of document ready
