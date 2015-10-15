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
      sortBy:'order'
    });
  });

  //game mechanics
  $('.multiplechoices').on('click',function(e){
    var $this = $(this);
    var originalScore = $this.prevAll('.score').data('score');
    var totalChoices = $this.find('label').length;
    var totalIncorrect = $this.find('label input.false:checked').length;
    var calculate = totalChoices-totalIncorrect==1?0:Math.round(originalScore*(1-(totalIncorrect/(totalChoices-1))));
    $($this.prevAll('.score').get(0)).text(calculate);
  });
  $('select[name="one"]').on('change', function() {
    $(this).closest('.form-group').siblings('.info').children('.one').text( this.value );
  });

  $('select[name="two"]').on('change', function() {
    $(this).closest('.form-group').siblings('.info').children('.two').text( this.value );
  });
});
