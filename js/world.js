var WorldEngine = function(game) {
  var game = game;

  var worldCooldownDuration = 6000;
  var worldCooldown         = true;
  var worldCooldownTimeout  = null;

  var stopCooldownTimeout = function () {
    clearTimeout(worldCooldownTimeout);
  };

  var stopChainCooldownTimeout = function () {
    clearTimeout(worldChainCooldownTimeout);
  };

  var startCooldownTimeout = function () {
    worldCooldownTimeout = setTimeout(function(){
      worldCooldown = true;
      stopCooldownTimeout();
    }, worldCooldownDuration);
  };

  var createWorld = function () {
    left     =  300;
    postion  =  Math.floor(Math.random() * 450);
    duration = 1500;

    var $world = $('<img class="world" src="./assets/holes.png">');
    $('.game').append($world);
    $world.css({
      'position' : 'absolute',
      'left' : left,
      'top' : postion + 'px'
    }).animate({
      left: 0
    }, {
      duration : duration,
      easing: 'linear',
      complete: function() {
        console.log($(this))
        $(this).remove();
      },
      progress: function () {

        game.findPosition();

        var currentWorld = $(this).position();
        var WorldTop     = currentWorld.top;
        var WorldBottom  = currentWorld.top + 60;
        var WorldLeft    = currentWorld.left;

        // check if cloudTop/cloudBottom is between beeTop and beeBottom
        var WorldTopRange    = game.beeTop <= WorldTop && WorldTop <= game.beeBottom;
        var WorldBottomRange = game.beeTop <= WorldBottom && WorldBottom <= game.beeBottom;
        var WorldLeftRange   = game.beeLeft <= WorldLeft && WorldLeft <= game.beeRight;

        if ( (WorldTopRange || WorldBottomRange) && WorldLeftRange) {
          console.log("Change World");
          game.changeWorld();
        }
      }
    });
  }

  this.loop = function () {
    if (worldCooldown) {
      worldCooldown = false;
      startCooldownTimeout();
      createWorld();
    }
  };
};
