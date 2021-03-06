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
    var originalScore = $this.prevAll('.title').find('.score').data('score');
    var totalChoices = $this.find('label').length;
    var totalIncorrect = $this.find('label input.false:checked').length;
    var calculate = totalChoices-totalIncorrect==1?0:Math.round(originalScore*(1-(totalIncorrect/(totalChoices-1))));
    $($this.prevAll('.title').find('.score').get(0)).text(calculate);
  });

  $('.multiplechoices .true').on('click',function(e){
    var btnHook = $(this).closest('.modal').prev().get(0);
    if($(this).is(':checked')){
      $(btnHook).addClass('passed');
    } else {
      $(btnHook).removeClass('passed');
    }
  });

  $('select[name="one"]').on('change', function(e) {
    var oneHook = $(this).closest('.form-group').siblings('.info').children('.one');
    if($(this).children('option[data-retain="retain"]').is(':selected')){
      oneHook.addClass('retain');
    } else {
      oneHook.removeClass('retain');
    }
    oneHook.text( this.value );
  });

  $('select[name="two"]').on('change', function() {
    var twoHook = $(this).closest('.form-group').siblings('.info').children('.two');
    if($(this).children('option[data-retain="retain"]').is(':selected')){
      twoHook.addClass('retain');
    } else {
      twoHook.removeClass('retain');
    }
    twoHook.text( this.value );
  });

  //TIMER
  var timer;
  $("#start").on('click',function(){
    var init = 0;
    $.ajax({
      url: "https://amorebiblequiz.apispark.net/v2/variables/",
      "content-type": 'application/JSON',
      accept: 'application/JSON'
    }).done(function(result) {
      $( this ).addClass( "done" );
      timer = result[0].Timer;
      $("#timer").countdown(Date.now() + timer*1000, function(event) {
        $(this).text(
          event.strftime('%M:%S')
        );
      }).on("finish.countdown",function(e){
        $(this).text(
            "TIME'S UP!"
          ).addClass('text-warning');
      });;
      $('.circle').circleProgress({
        size:200,
        value: 0,
        lineCap: 'round',
        fill: { color: '#ffa500' },
        animation: { duration: timer*1000 },
        animationStartValue:1.0
      });
    });
  });

  //TIME LEFT
  var deadline;
  $.ajax({
    url: "https://amorebiblequiz.apispark.net/v2/variables/",
    "content-type": 'application/JSON',
    accept: 'application/JSON'
  }).done(function(result){
    deadline = result[0].Foo; 
    //console.log(result);
    $(".timeleft").countdown(deadline, function(event) {
      $(this).text(
        event.strftime('%H:%M:%S')
      );
    }).on("finish.countdown",function(e){
      $(this).text(
          "TIME'S UP!"
        ).addClass('text-warning h1');
    });
  });

  //PASSWORD
  $('#submit').on('click',function(){
    var $password = $("#password");
    var $parent = $(this).closest('.password');
    var pass = $password.data('pass');
    console.log($password.val());
    if($password.val()===pass){
      $("#wrapper").removeClass('hidden-answer hide');
      $parent.remove();
      $(".control>a:first").click();
    }
  });

  $('#password').keypress(function(e){
    if(e.which==13){
      e.preventDefault();
      $('#submit').click();
    }
  });
});
