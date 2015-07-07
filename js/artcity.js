'use strict';

//Make sure the document is ready before applying jQuery library
$(document).ready(function() {

  //Attempt to make modal hide
  //set up a click handler on the button
  //then hide the modal form
  // $('#form-button-submit-art').modal('hide')


  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown()


  //Hero button, auto scroll to art finder div with id filters
  $('#hero-button').click(function() {
    $('html, body').animate({
      scrollTop: $("#filters").offset().top
    }, 2000);
  });

  //Get dropdown button to save selection in the button
  $("#chooseCity-dropdown-menu").on('click', 'li a', function() {
    $(".dropdown-btn:first-child").text($(this).text());
    $(".dropdown-btn:first-child").val($(this).text());
    $(".dropdown-btn:first-child").css("background-color", "#f8f8f8").css("color", "#f40e4c");
  });


  // Ajax call for the modal form
  // Saves the entered data from the form and creates a new artwork
  // FIXME: need to implement for the tag checkboxes
  var createArtwork = function(venueId) {
    var fd = new FormData();
    fd.append('title', $('#title').val());
    fd.append('artist', $('#artist').val());
    fd.append('neighborhood', $('#neighborhood').val());
    fd.append('street', $('#street').val());
    fd.append('city', $('#city').val());
    fd.append('description', $('#description').val());
    fd.append('zip', $('#zip').val());
    fd.append('image', $('#file')[0].files[0]);
    $.ajax({
      url: 'https://infinite-fortress-3977.herokuapp.com/venues/' + venueId + '/artworks',
      processData: false,
      cache: false,
      contentType: false,
      type: 'POST',
      data: fd
    }).done(function(response) {
      console.log(response);
    });
  }

  //Submit form button
  //Creates new venue and new artwork
  $("#form-button-submit-art").click(function() {
    var venue = {
      venue: {
        name: $('#venue').val(),
        street: $('#street').val(),
        city: $('#city').val(),
        zip: $('#zip').val(),
      }
    };
    $.ajax({
      url: 'https://infinite-fortress-3977.herokuapp.com/venues',
      type: 'POST',
      data: venue
    }).done(function(response) {
      createArtwork(response.id);
    })

    //Attempt to make modal close when button clicked
    $("#uploadArt").modal("hide");

  });


  var checkedTags = [];


  console.log(checkedTags);






  // // TO CREATE ARTWORK
  // var file = $('#upload-art-from-computer')[0].files[0];
  // // <input id="#yourfancyuploadimagefileinput" type='file'/>

  // var fd = new FormData();
  // fd.append('image', file);
  // fd.append('title', YOURJQUERY.val here);
  // fd.append('artist', YOURJQUERY.val here);
  // fd.append('venue', YOURJQUERY.val here);
  // fd.append('neighborhood', YOURJQUERY.val here);
  // fd.append('city', YOURJQUERY.val here);
  // fd.append('description', YOURJQUERY.val here);
  // // gather all of your other form data

  // $.ajax({
  //   url: YOUR BACKEND ur,
  //   data: fd,
  //   type: 'POST',
  //   contentType: false,
  //   cache: false,
  //   processData: false
  // }).done(function(response){




  //HANDLEBARS TEMPLATE CONTROLLER

  var artworks = (function() {

    var chosenCity = 'Boston';
    var defaultCity = 'Boston';

    //Limits possible cities for now
    var possibleCities = {
      "Boston": 'Boston',
      "New York": 'newyork',
      "Chicago": 'chicago',
      "Los Angeles": 'losangeles'
    };

    // Sets possible cities or default city
    var _recordChosenCity = function(choice) {
      chosenCity = possibleCities[choice] || defaultCity;
    };

    //reaching out to a database and grabbing the artwork info and then pushing into html template
    //Pulls JSON into an array

    // Gets value of checked tags and maps into array
    // allows search by tag
    // TODO: Why do we need .get()
    // TODO: get rid of weird widget code
    var getArtworks = function() {
      var clicked = $('input[type="checkbox"]:checked').map(function() {
        return this.value
      }).get();
      // 'widget[]=first-widget&gadget[]=a-gadget&widget[]=another%20widget'
      var querystring = "https://infinite-fortress-3977.herokuapp.com/artworks/search?city=" + chosenCity + '&';
      clicked.forEach(function(tag) {
        querystring += 'tag[]=' + tag + '&';
      });
      console.log(querystring);

      //Gets rid of the trailing '&'
      querystring = querystring.substring(0, querystring.length - 1);
      $.get(querystring).done(function(response) {
        _renderArtworks(response);
      });
    };

    var templatingFunction;

    //printing the data
    var _renderArtworks = function(artworks) {

      //extracting the html and putting into handlebars. Handlebars is a bower component, you installed handlebars and bootstrap
      templatingFunction = templatingFunction || Handlebars.compile($('#artwork-index').html());
      console.log($('#artwork-index').html());

      //the first characters is a key, the second is the value
      var result = templatingFunction({
        artworks: artworks
      });

      //puts the converted JSON into the art image display area
      $('#art-images-display').html(result); //.html includes tags...getter and a setter


    };

    return {
      // The first is the key, the second is the new artwork value and the chosend city
      indexArtworks: getArtworks,
      recordChosenCity: _recordChosenCity
    };

  })();



  //Records the chosen city from the dropdown menu
  $('a').click(function() {
    var chosenCity = $(this).text();
    artworks.recordChosenCity(chosenCity);

  });


  //function calls artwork handlebars template
  $("#filter-city-button").click(function() {
    artworks.indexArtworks();
  });

  //END HANDLEBARS TEMPLATE



}); //End of document ready
