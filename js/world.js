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
        var $bee        = $('#bee');
        var beePosition = $bee.position();
        var beeTop      = beePosition.top;
        var beeBottom   = beePosition.top + 60;
        var beeLeft     = beePosition.left;
        var beeRight    = beePosition.left + 60;

        var currentWorld = $(this).position();
        var WorldTop     = currentWorld.top;
        var WorldBottom  = currentWorld.top + 60;
        var WorldLeft    = currentWorld.left;

        // check if cloudTop/cloudBottom is between beeTop and beeBottom
        var WorldTopRange    = beeTop <= WorldTop && WorldTop <= beeBottom;
        var WorldBottomRange = beeTop <= WorldBottom && WorldBottom <= beeBottom;
        var WorldLeftRange   = beeLeft <= WorldLeft && WorldLeft <= beeRight;

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
