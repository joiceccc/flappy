$(document).ready(function(){

  console.log("start");
  //create main state will contain in the game

  // Global Variables
  var gameloop = null;
  var cloudloop = null;
  var foodloop = null;
  var movement = {
    up: false,
    down: false
  };
  var score = 0

  var createbird =  function () {
    //create bird
    var bird = document.createElement("img");
    bird.src = 'bird.png';

    bird.setAttribute('id','bird')

    $('.game').append(bird);
     $('#bird').css({
      'position' : 'relative',
      'left' : '30px',
      'top' : '225px'
    });
  };

  var bindKeys = function () {
    $(document).on('keyup', function(e){
      switch (e.keyCode) {
        case 87:
          movement.up = false;
          break;
      }
    });

    $(document).on('keydown', function(e){
      switch (e.keyCode) {
        case 87:
          movement.up = true;
          break;
      }
    });
  };

  var moveBird = function () {
    var position = $('#bird').position();

    if (movement.up) {
      if (position.top > 0 ){
      $('#bird').css({top: position.top - 5});
      } else { console.log("reached top");}
    }
  };

  var gravity = function () {
    var $bird = $('#bird');
    var position = $bird.position();
    if (position.top < 438) {
      console.log(position.top)
    $bird.css({top: position.top + 2}) } else { console.log("lost ")}

    };

  // raandomly pick a height for the clouds
  var random = function(){
    var number = Math.floor(Math.random() * 450);
    return number;
  }


  // create cloud at position of x and y
  var generatefood = function(y){
    var $food = $("<img>").attr("src", 'pipe.png');
    $('.game').append($food);
    $food.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $food.animate({left: 0}, {
      duration : 1500,
      easing: 'linear',
      complete: function(){
        $(this).remove();
      },
      progress : function() {
        var $bird        = $('#bird');
        var birdPosition = $bird.position();
        var birdTop      = birdPosition.top;
        var birdBottom   = birdPosition.top + 50;
        var birdLeft     = birdPosition.left;
        var birdRight    = birdPosition.left + 50;
        var currentFood = $(this).position();
        var foodTop     = currentFood.top;
        var foodBottom  = currentFood.top + 50;
        var foodLeft    = currentFood.left;

        // check if cloudTop/cloudBottom is between birdTop and birdBottom
        var foodTopRange    = birdTop <= foodTop && foodTop <= birdBottom;
        var foodBottomRange = birdTop <= foodBottom && foodBottom <= birdBottom;
        var foodLeftRange   = birdLeft <= foodLeft && foodLeft <= birdRight;

        if ( (foodTopRange || foodBottomRange) && foodLeftRange) {
          $(this).remove();
          score = score + 1
          console.log(score)
       $('#score').text("Score " + score);
        }
      }
    });
  };

var generateblock = function(y){
    var $cloud = $("<img>").attr("src", 'cloud.png');
    $('.game').append($cloud);
    $cloud.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $cloud.animate({left: 0}, {
      duration : 1500,
      easing: 'linear',
      complete: function(){
        $(this).remove();
      },
      progress : function() {
        var $bird        = $('#bird');
        var birdPosition = $bird.position();
        var birdTop      = birdPosition.top;
        var birdBottom   = birdPosition.top + 50;
        var birdLeft     = birdPosition.left;
        var birdRight    = birdPosition.left + 50;
        var currentCloud = $(this).position();
        var cloudTop     = currentCloud.top;
        var cloudBottom  = currentCloud.top + 50;
        var cloudLeft    = currentCloud.left;

        // check if cloudTop/cloudBottom is between birdTop and birdBottom
        var cloudTopRange    = birdTop <= cloudTop && cloudTop <= birdBottom;
        var cloudBottomRange = birdTop <= cloudBottom && cloudBottom <= birdBottom;
        var cloudLeftRange   = birdLeft <= cloudLeft && cloudLeft <= birdRight;

        if ( (cloudTopRange || cloudBottomRange) && cloudLeftRange) {
          console.log("die")
          clearInterval(gameloop);
          clearInterval(cloudloop);
          clearInterval(foodloop);

          // var gameloop = null;
          // var cloudloop = null;
          // var foodloop = null;
       restartGame();

        }
      }
    });
  };

var gameload = function() {

    var score = document.createElement("h3");

        score.setAttribute('id','score')

      $('.game').append(score);

       $('#score').css({
          'position' : 'absolute',
          'left' : '75%',
          'top' : '0%'
          });
      $('#score').text("score " +  " 0");
    var startGameButton = document.createElement("button");


    startGameButton.setAttribute('id','startGameButton')

    $('.game').append(startGameButton);

       $('#startGameButton').css({
         'position' : 'absolute',
         'left' : '45%',
         'top' : '40%'
           });
      $('#startGameButton').text("START");

}



  var startGame = function () {
    console.log("start");

    bindKeys();
    generatefood(random());

    foodloop = setInterval(function(){
      generatefood(random());
    }, 1000);
    cloudloop = setInterval(function(){
      generateblock(random());
    }, 3500);
    gameloop = setInterval(function(){
      moveBird();
      gravity();


    }, 17);
    };

  var restartGame = function () {



      $('#bird').remove();

      createbird();

      gameload();

      score = 0





$('#startGameButton').one('click',function(){

    startGame();
     $(this).remove();
  });

  }



restartGame();

});
