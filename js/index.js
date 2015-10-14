$(document).ready(function(){
  //**PORTFOLIO
  //Plugin setup for portfolio section
  var $container = $('.grid');

  // preventing top scroll for buttons
  $('a[href="#"]').click(function(e){e.preventDefault();});

  // filter items on button click
  $('.control').on( 'click', 'a', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });

  // initializing isotope when all image are ready
  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector: '.element-item',
      sortBy:'random'
    });
  });
});