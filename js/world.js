var WorldEngine = function(game) {
  var worldgame = game;

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

        worldgame.findPosition();

        var currentWorld = $(this).position();
        var WorldTop     = currentWorld.top;
        var WorldBottom  = currentWorld.top + 60;
        var WorldLeft    = currentWorld.left;

        // check if cloudTop/cloudBottom is between beeTop and beeBottom
        var WorldTopRange    = worldgame.beeTop <= WorldTop && WorldTop <= worldgame.beeBottom;
        var WorldBottomRange = worldgame.beeTop <= WorldBottom && WorldBottom <= worldgame.beeBottom;
        var WorldLeftRange   = worldgame.beeLeft <= WorldLeft && WorldLeft <= worldgame.beeRight;

        if ( (WorldTopRange || WorldBottomRange) && WorldLeftRange) {
          console.log("Change World");
          worldgame.changeWorld();
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
