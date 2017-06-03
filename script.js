/* global $ */

$(document).ready(function(){
  
  window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};
  
  $('#searchBar').off();
  $('#searchBar').keyup(function(){
    $('#results').empty();
    var searchTerm = $('#searchBar').val();
    var url = 'https://api.giphy.com/v1/gifs/search?&q='+searchTerm+'&limit=15&api_key=dc6zaTOxFJmzC';
    
    $.getJSON(url, function(giphy){
      for(var i = 0; i < giphy.data.length; i++) {
         $('#results').append('<li><img class="showing" src="'+giphy.data[i].images.downsized_still.url+'"><img class="hidden" src="'+giphy.data[i].images.preview_gif.url+'"></li>');
      }
    });
  });
  
    //Show preview gif on mouseenter or taphold
    $('#results').on('mouseenter taphold','img', function(){
      $(this).parent().find('.hidden').show();
      $(this).parent().find('.showing').hide();
    });
    
    //Stop preview gif on mouseleave
    $('#results').on('mouseleave','li', function(){
      $(this).find('.hidden').hide();
      $(this).find('.showing').show();
    });
  
  //Open gif in iframe on smaller devices
  if($(window).width() <= 640){
    $('#results').on('click', 'img', function(e){
    var link = $(this).parent().find('.hidden').attr('src');
    console.log(link);
  $('iframe').attr('src', link);  
  $('#iframeContain').show(); 
  });
  
  $('#close').on('click', function(){
    $('#iframeContain').hide();
    $('iframe').attr('src', '');  
  });
  } else {
     //Turn whole li into link and open in new tab
    $('#results').on('click','img', function(){
      var link = $(this).parent().find('.hidden').attr('src');
      window.open(link);
    });
 
  }
  
});