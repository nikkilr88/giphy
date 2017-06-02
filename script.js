/* global $ */

$(document).ready(function(){
  $('#searchBar').off();
  $('#searchBar').keyup(function(){
    $('#results').empty();
    var searchTerm = $('#searchBar').val();
    var url = 'https://api.giphy.com/v1/gifs/search?&q='+searchTerm+'&api_key=dc6zaTOxFJmzC';
    
    $.getJSON(url, function(giphy){
      for(var i = 0; i < giphy.data.length; i++) {
        $('#results').append('<li><a href="'+giphy.data[i].images.original.url+'" target="_blank"><img class="showing" src="'+giphy.data[i].images.original_still.url+'"><img class="hidden" src="'+giphy.data[i].images.original.url+'"></a></li>');
      }
    });
  });
  $('#results').on('mouseenter','li', function(){
    $(this).find('.hidden').show();
    $(this).find('.showing').hide();
  });
  $('#results').on('mouseleave','li', function(){
    $(this).find('.hidden').hide();
    $(this).find('.showing').show();
  });
});