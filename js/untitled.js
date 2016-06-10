var FoodEngine = function(game) {
  var game = game;

  var foodCooldownDuration = 2000;
  var foodChainCooldownDuration = 4000;
  var foodCooldown         = true;
  var foodChainCooldown    = true;
  var foodCooldownTimeout  = null;
  var foodChainCooldownTimeout  = null;

  var stopCooldownTimeout = function () {
    clearTimeout(foodCooldownTimeout);
  };

  var stopChainCooldownTimeout = function () {
    clearTimeout(foodCooldownTimeout);
  };

  var startCooldownTimeout = function () {
    foodCooldownTimeout = setTimeout(function(){
      foodCooldown = true;
      stopCooldownTimeout();
    }, foodCooldownDuration);
  };

  var startChainCooldownTimeout = function () {
    foodChainCooldownTimeout = setTimeout(function(){
      foodChainCooldown = true;
      stopChainCooldownTimeout();
    }, duration);
  };

  var createFood = function (left, position, duration) {
    left     = left || 300;
    postion  = position || Math.floor(Math.random() * 450);
    duration = duration || 1500;

    var $food = $('<img src="./assets/honey.png">');
    $('.game').append($food);
    $food.css({
      'position' : 'absolute',
      'left' : left,
      'top' : postion + 'px'
    }).animate({
      left: 0
    }, {
      duration : duration,
      easing: 'linear',
      complete: function() {
        $(this).remove();
      },
      progress: function () {
        var $bee        = $('#bee');
        var beePosition = $bee.position();
        var beeTop      = beePosition.top;
        var beeBottom   = beePosition.top + 50;
        var beeLeft     = beePosition.left;
        var beeRight    = beePosition.left + 50;

        var currentFood = $(this).position();
        var foodTop     = currentFood.top;
        var foodBottom  = currentFood.top + 50;
        var foodLeft    = currentFood.left;

        // check if cloudTop/cloudBottom is between beeTop and beeBottom
        var foodTopRange    = beeTop <= foodTop && foodTop <= beeBottom;
        var foodBottomRange = beeTop <= foodBottom && foodBottom <= beeBottom;
        var foodLeftRange   = beeLeft <= foodLeft && foodLeft <= beeRight;

        if ( (foodTopRange || foodBottomRange) && foodLeftRange) {
          game.addScore(1);
          $(this).remove();
        }
      }
    });
  }

  this.loop = function () {
    if (foodCooldown) {
      foodCooldown = false;
      startCooldownTimeout();

      createFood();
    }

    if (foodChainCooldown) {
      foodChainCooldown = false;
      startChainCooldownTimeout();

      var position = Math.floor(Math.random() * 450);
      for (var i=0; i<10; i++) {
        var left = 300 + (i * 50);
        var duration = left / 0.2;
        createFood(left, position, duration);
      }
    }
  };
};
