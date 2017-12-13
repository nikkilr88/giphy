/* global $ */

var start, limit, data;
 
$(function() {

  window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  $('#searchBar').off();
  $('#searchBar').keyup(function() {
    
    start = 20;
    var searchTerm = $('#searchBar').val();

    if (searchTerm !== '') {
      var url = 'https://api.giphy.com/v1/gifs/search?&q=' + searchTerm + '&limit=100&api_key=dc6zaTOxFJmzC';
    }

    showHideLoad();

    //Get data
    $.getJSON(url, function(giphy) {
      data = giphy;
      displayPreview(data);
    });
  });

  //Load more gifs
  $('#load').on('click', loadMore);

  //Show preview gif on mouseenter or taphold
  $('#results').on('mouseenter taphold', 'img', function() {
    $(this).parent().find('.gif').show();
    $(this).parent().find('.photo').hide();
  });

  //Stop preview gif on mouseleave
  $('#results').on('mouseleave', 'li', function() {
    $(this).find('.gif').hide();
    $(this).find('.photo').show();
  });

  //Open gif in iframe on smaller devices
  if ($(window).width() <= 640) {
    $('#results').on('click', 'img', function(e) {
      var link = $(this).parent().find('.hidden').attr('src');
      console.log(link);
      $('iframe').attr('src', link);
      $('#iframeContain').show();
      $('iframe').show();
    });

    $('#close').on('click', function() {
      $('#iframeContain').hide();
      $('iframe').hide();
      $('iframe').attr('src', '');
    });
  }
  else {
    //Turn whole li into link and open in new tab
    $('#results').on('click', 'img', function() {
      var link = $(this).parent().find('.hidden').attr('src');
      window.open(link);
    });

  }

});

function displayPreview(data) {
  for (var i = 0; i < 20; i++) {
    $('#results').append('<li><img class="photo" src="' + data.data[i].images.downsized_still.url + '"><img class="gif" src="' + data.data[i].images.preview_gif.url + '"></li>');
  }
}

function loadMore() {
  if (start < 90) {

    limit = start + 10;
    for (var i = start; i < limit; i++) {
      $('#results').append('<li><img class="photo" src="' + data.data[i].images.downsized_still.url + '"><img class="gif" src="' + data.data[i].images.preview_gif.url + '"></li>');
    }
    start = start + 10;
  }
  else {
    $('#load').text('All Loaded').css('opacity', '0.3');
  }
}

function showHideLoad() {
  $('#results').empty();
  $('#load').text('Load More').css('opacity', '1');

  if ($('#searchBar').val() === '') {
    $('#load').hide();
  }
  else {
    setTimeout(function() {
      $('#load').show();
    }, 1000);

  }
}
