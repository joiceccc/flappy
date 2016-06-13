var Bee = function() {
  // Bee element
  var $bee                  = $('#bee');

  // shootcooldown
  var shootCooldownDuration = 200;
  var shootCooldown         = true;
  var shootCooldownTimeout  = null;

  var moveUp = function (movement) {
    var position = $bee.position();
    if (position.top > 0 ){
      $bee.css({top: position.top - 5});
    } else {
      console.log("reached top");
    }
  };

  var gravity = function(){
    // Apply gavity
    var position = $bee.position();
    if (position.top < 438) {
      $bee.css({top: position.top + 2});
    }
  };

  var stopCooldownTimeout = function () {
    clearTimeout(shootCooldownTimeout);
  };

  var startCooldownTimeout = function () {
    shootCooldownTimeout = setTimeout(function(){
      shootCooldown = true;
      stopCooldownTimeout();
    }, shootCooldownDuration);
  };

  var shootBullet = function (shoot) {
    var y = $bee.position().top;
    var $spike = $('<h4 id="generateSpikes">-</h4>');

    $('.game').append($spike);

    $spike.css({
      'position' : 'absolute',
      'left' : '30%',
      'top' : (y - 5 ),
    }).animate({
      left: 400
    }, {
      duration : 1000,
      easing: 'linear',
      complete: function(){
        $(this).remove();
      },
      progress : function() {
        var $spike = $(this);

        var spikePosition = $spike.position();
        var spikeTop      = spikePosition.top;
        var spikeBottom   = spikePosition.top + 10;
        var spikeLeft     = spikePosition.left;

        $(".clouds").each(function(index,element) {
          var $cloud        = $(element);
          var cloudPosition = $cloud.position();
          var cloudTop      = cloudPosition.top - 30;
          var cloudBottom   = cloudPosition.top + 70 ;
          var cloudLeft     = cloudPosition.left;
          var cloudRight    = cloudPosition.left + 50;


          var cloudLeftRange   = cloudLeft <= spikeLeft && spikeLeft <= cloudRight;
          var cloudTopRange    = cloudTop  <= spikeTop && spikeTop <= cloudBottom;
          var cloudBottomRange = cloudTop <= spikeBottom && spikeBottom <= cloudBottom;

          if ((cloudTopRange || cloudBottomRange) &&  cloudLeftRange  ) {
            console.log ("hit")
            console.log($cloud)
            $cloud.remove();
          };
        });

        $(".XLclouds").each(function(index,element) {
          var $xlCloud      = $(element);
          var cloudPosition = $xlCloud.position();
          var xlCloudTop    = cloudPosition.top - 30;
          var xlCloudBottom = cloudPosition.top + 70 ;
          var xlCloudLeft   = cloudPosition.left;
          var xlCloudRight  = cloudPosition.left + 50;

          var XLcloudLeftRange   = xlCloudLeft <= spikeLeft && spikeLeft <= xlCloudRight;
          var XLcloudTopRange    = xlCloudTop  <= spikeTop && spikeTop <= xlCloudBottom;
          var XLcloudBottomRange = xlCloudTop <= spikeBottom && spikeBottom <= xlCloudBottom;

         if ((XLcloudTopRange || XLcloudBottomRange) &&  XLcloudLeftRange  ) {

            console.log ($xlCloud.data("hp"));
            //$xlCloud.fadeIn().fadeOut().fadeIn();
            $spike.remove();

            if($xlCloud.hasClass('firstBlink')){
               $xlCloud.addClass('secondBlink');
            }

            $xlCloud.addClass('firstBlink');

            var cloudslives = $xlCloud.data("hp")

            cloudslives = cloudslives - 1

              $xlCloud.data("hp",cloudslives)

            if ($xlCloud.data("hp") === 0 ){
            $xlCloud.remove()}
          }
        });
      }
    });
  };

  this.loop = function (movement, shoot) {
    if (shoot && shootCooldown) {
      shootCooldown = false;
      startCooldownTimeout();
      shootBullet(shoot);
    }

    if (movement) {
      moveUp();
    }

    gravity();
  };
};
