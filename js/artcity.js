'use strict';

// var gameRef;
// var gameRef, gameAuth, player;

//Make sure the document is ready before applying jQuery library
$(document).ready(function(){

  //Attempt to make modal hide
    // $('#uploadArt').modal({
    //   show:false;
    // });


  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown()


  //Show modal to upload art
  $('#uploadArt').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })


  //Hero button, scroll to art finder div with id filters
  $('#hero-button').click(function() {
    $('html, body').animate({scrollTop: $("#filters").offset().top}, 2000);
  });




  //FIXME: Attempt to make filtering by attribute
  // var $results=$('.result').text(function(){
  //       /* swap text with catgories to see results better */
  //       return $(this).data('category')
  //   })
  //   var $checks=$(':checkbox[name^=fl]').change(function(){
  //       var $checked=$checks.filter(':checked');
  //       /* show all when nothing checked*/
  //       if(!$checked.length){
  //           $results.show();
  //           return;
  //       }
  //       /* create array of checked values */
  //       var checkedVals= $.map($checked, function(el){
  //           return el.value
  //       });
  //       /* hide all results, then filter for matches */
  //       $results.hide().filter(function(){
  //           var artworks=$(this).data('category').split(' ');
  //           var checkMatches=$.grep(checkedVals, function(val){
  //               return $.inArray(val, artworks) >-1;
  //           });
  //           return checkMatches.length === checkedVals.length;
  //        /* show resultas that match all checkboxes */
  //     }).show();




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

//   // whatever you want to happen afterward here
// });

//append all of your columns to the fd using the above syntax!


  //HANDLEBARS TEMPLATE CONTROLLER

    var artworks = (function(){

      var chosenCity = 'boston';
      var defaultCity = 'boston';

      var possibleCities = {
        "Boston": 'boston',
        "New York": 'newyork',
        "Chicago": 'chicago',
        "Los Angeles": 'losangeles'
      };

      var _recordChosenCity = function(choice){
        chosenCity = possibleCities[choice] || defaultCity;
      };

    //reaching out to a database and grabbing the artwork info and then pushing into html template
    //taking Json(a way of storing data) and pulling it into an array

    //attempt to make it searchable by city by changing boston to #{}?
    var getArtworks = function(){
      $.get( "http://localhost:3000/venues/artwork?city=" + chosenCity).done(function(response){
        _renderArtworks(response);
      });
    };

    var templatingFunction;

  //printing the data
    var _renderArtworks = function(artworks){

      // your code starts here
      //extracting the html and putting into handlebars. Handlebars is a bower component, you installed handlebars and bootstrap
      templatingFunction = templatingFunction || Handlebars.compile($('#artwork-index').html());
      console.log($('#artwork-index').html());

      //the first characters is a key, the second is the value
      var result = templatingFunction({
        artworks: artworks[0].artworks
      });

      $('#art-images-display').html(result);//.html includes tags...getter and a setter
      // your code ends here

    };

    return {
      indexArtworks: getArtworks,
      recordChosenCity: _recordChosenCity
    };

    })();

  //FIXME: Try to get value of dropdown selector for cities
  // Still needs to store the value
  // var chooseCity;


  $('a').click(function(){
      var chosenCity = $(this).text();
      artworks.recordChosenCity(chosenCity);
      alert(chosenCity);
    });


    //function calls your artwork handlebars template
    $("#filter-city-button").click(function(){
      artworks.indexArtworks();
    });

  //END HANDLEBARS TEMPLATE




  // Create a POST AJAX (upload art) submission and check if filled out correctly



  //FIXME: Button trigger for image file upload
  // $(document).on('change', '.btn-file :file', function() {
  //   var input = $(this),
  //   numFiles = input.get(0).files ? input.get(0).files.length : 1,
  //   label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  //   input.trigger('fileselect', [numFiles, label]);
  // });

  // $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

  //     var input = $(this).parents('.input-group').find(':text'),
  //     log = numFiles > 1 ? numFiles + ' files selected' : label;

  //     if( input.length ) {
  //       input.val(log);
  //     } else {
  //       if( log ) alert(log);
  //     }


  // });


});//End of document ready
