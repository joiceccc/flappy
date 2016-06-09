var Game = function(){
  // jQuery Objects
  var $game            = $('.game');
  var $score           = $('#score');
  var $startGameButton = $('#startGameButton');
  var $gameOver        = $('#gameOver');

  // Game varibles
  var score    = 0;
  var shoot    = false;
  var movement = false;

  // Objects
  var bee    = new Bee();
  var food   = new FoodEngine(this);
  var cloud  = new CloudEngine(this);

  // Loop
  var gameInterval = null;

  // Generate food
  var addFood = function () {
    foods.push( new Food() );
  };

  var gameloop = function () {
    bee.loop(movement, shoot);
    food.loop();
    cloud.loop();
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
    $gameOver.show();
    $startGameButton.text("RESTART").show();
  };
};

$(document).ready(function(){
  $('#gameOver').hide();
  var game = new Game();
});
