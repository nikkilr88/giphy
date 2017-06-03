/* global $ */

$(document).ready(function(){
  $('#searchBar').off();
  $('#searchBar').keyup(function(){
    $('#results').empty();
    var searchTerm = $('#searchBar').val();
    var url = 'https://api.giphy.com/v1/gifs/search?&q='+searchTerm+'&limit=10&api_key=dc6zaTOxFJmzC';
    
    $.getJSON(url, function(giphy){
      for(var i = 0; i < giphy.data.length; i++) {
        $('#results').append('<li><a href="'+giphy.data[i].images.original.url+'" target="_blank"><img class="showing" src="'+giphy.data[i].images.downsized_still.url+'"><img class="hidden" src="'+giphy.data[i].images.preview_gif.url+'"></a></li>');
      }
    });
  });
  $('#results').on('mouseenter','img', function(){
    $(this).parent().find('.hidden').show();
    $(this).parent().find('.showing').hide();
  });
  $('#results').on('mouseleave','li', function(){
    $(this).find('.hidden').hide();
    $(this).find('.showing').show();
  });
});