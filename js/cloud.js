var CloudEngine = function(game) {
  var cloudgame = game;



  var randomTimeoutStarted    = false;

  var cloudSMActive           = false;
  var cloudSMCooldownDuration = 3000;
  var cloudSMCooldown         = true;
  var cloudSMCooldownTimeout  = null;

  var cloudLGActive           = false;
  var cloudLGCooldownDuration = 6000;
  var cloudLGCooldown         = true;
  var cloudLGCooldownTimeout  = null;

  var stopSMCooldownTimeout = function () {
    clearTimeout(cloudSMCooldownTimeout);
  };

  var stopLGCooldownTimeout = function () {
    clearTimeout(cloudLGCooldownTimeout);
  };

  var startSMCooldownTimeout = function () {
    cloudSMCooldownTimeout = setTimeout(function(){
      cloudSMCooldown = true;
      stopSMCooldownTimeout();
    }, cloudSMCooldownDuration);
  };

  var startLGCooldownTimeout = function () {
    cloudLGCooldownTimeout = setTimeout(function(){
      cloudLGCooldown = true;
      stopLGCooldownTimeout();
    }, cloudLGCooldownDuration);
  };

  var createCloud = function (imagePath, pixelSize, hp , speed , cloudClass) {
    var postion = Math.floor(Math.random() * (500 - pixelSize));

    var $cloud = $('<img src="' + imagePath + '" class=" ' + cloudClass + '" data-hp="' + hp + '">"');
    $('.game').append($cloud);
    $cloud.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : postion + 'px'
    }).animate({
      left: 0
    }, {
      duration : speed,
      easing: 'linear',
      complete: function(){
        $(this).remove();
      },
      progress: function () {

        cloudgame.findPosition(); //

        var currentCloud = $(this).position();
        var cloudTop     = currentCloud.top;
        var cloudBottom  = currentCloud.top + 50;
        var cloudLeft    = currentCloud.left;

        // check if cloudTop/cloudBottom is between beeTop and beeBottom
        var cloudTopRange    = cloudgame.beeTop <= cloudTop && cloudTop <= cloudgame.beeBottom;
        var cloudBottomRange = cloudgame.beeTop <= cloudBottom && cloudBottom <= cloudgame.beeBottom;
        var cloudLeftRange   = cloudgame.beeLeft <= cloudLeft && cloudLeft <= cloudgame.beeRight;

        if ( (cloudTopRange || cloudBottomRange) && cloudLeftRange) {
          console.log("Die");
          cloudgame.gameOver();
        }
      }
    });
  };

  var randomDelay = function () {
    var delaySMTimeout = setTimeout(function(){
      cloudSMActive = true;
    }, Math.random() * 2000);

    var delayLGTimeout = setTimeout(function(){
      cloudLGActive = true;
    }, Math.random() * 2000);
  };


  this.loop = function (dimension) {
    if (!randomTimeoutStarted) {
      randomDelay();
      randomTimeoutStarted = true;
    }

    if (cloudSMActive && cloudSMCooldown) {
      var cloudSMImage = dimension % 2 === 0 ? "./assets/hungryclouds.png" : "./assets/yellowbird.png" ;
      cloudSMCooldown = false;
      startSMCooldownTimeout();
      createCloud(cloudSMImage, 75, 1 , 1500 , "clouds" );
    }

    else if (cloudLGActive && cloudLGCooldown) {
      var cloudLGImage = dimension % 2 === 0 ? "./assets/largehungryclouds.png" : "./assets/largeyellowbird.png" ;
      cloudLGCooldown = false;
      startLGCooldownTimeout();
      console.log("");
      createCloud(cloudLGImage, 130, 3 , 8500 ,"XLclouds");
    }
  };
};
