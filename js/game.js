var Game = function(){
  // jQuery Objects
  var $game            = $('.game');
  var $score           = $('#score');
  var $startGameButton = $('#startGameButton');
  var $gameOver        = $('#gameOver');

  // Game varibles
  var score     = 0;
  var shoot     = false;
  var movement  = false;
  var dimension = 0;

  // Objects
  var bee    = new Bee();
  var food   = new FoodEngine(this);
  var cloud  = new CloudEngine(this);
  var world  = new WorldEngine(this);

  // Loop
  var gameInterval = null;

  // Generate food
  var addFood = function () {
    foods.push( new Food() );
  };

  var gameloop = function () {
    bee.loop(movement, shoot);
    food.loop();
    cloud.loop(dimension);
    world.loop();
  };

  var startGameLoop = function () {
    gameInterval = setInterval(gameloop, 1000/60);
  };

  var stopGameLoop = function () {
    clearInterval(gameInterval);
  };

  var bindKeysAndButtons = function () {
    $startGameButton.on('click',function(){
      $(this).hide();
      $gameOver.hide();
      startGameLoop();
    });

    $(document).on('keyup', function(e){
      switch (e.keyCode) {
        case 87:
          movement = false;
          break;
        case 68:
          shoot = false;
          break;
      }
    });

    $(document).on('keydown', function(e){
      switch (e.keyCode) {
        case 87:
          movement = true;
          break;
        case 68:
          shoot = true;
          break;
      }
    });
  };

  // Init game
  var init = function(){
    bindKeysAndButtons();
  };

  init();

  // Score
  this.addScore = function (points) {
    score+= points;
    $score.text("Score " + score);
  };

  this.gameOver = function () {
    stopGameLoop();
     $('.food').stop().remove()
     $('.cloud').stop().remove()
     $('.XLclouds').stop().remove()
    $gameOver.show();
    $startGameButton.text("RESTART").show();
    $('#bee').css({
      'position':'relative',
      'left': "20%",
      'top':'230px'
      });
  };

  this.changeWorld = function () {
    dimension++;

    if (dimension % 2 === 1) {
      $('.game').css('background-image','url("/Users/joice/flappy/assets/forestbackground.png")');
    } else if (dimension % 2 === 0) {
      $('.game').css('background-image','url("/Users/joice/flappy/assets/mountainbackground.png")');
    }

    $('.food').stop().remove()
    $('.clouds').stop().remove()
    $('.XLclouds').stop().remove()
  };
};

$(document).ready(function(){
  $('#gameOver').hide();
  var game = new Game();
});
