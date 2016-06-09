$(document).ready(function(){

  console.log("start");
  //create main state will contain in the game

  // Global Variables
  var gameloop = null;
  var cloudloop = null;
  var foodloop = null;
  var worldloop = null;
  var bonusloop = null;
  var fivefoodloop = null;
  var largecloudloop= null;
  var changeworld = 0
  var bonuscounter = 0
  var largecloudcounter = {}
  var movement = {
    up: false,
    down: false
  };
  var shoot = false
  var score = 0

  var createbird =  function () {
    //create bird
    var bird = document.createElement("img");
    bird.src = 'bee50.png';

    bird.setAttribute('id','bird')

    $('.game').append(bird);
     $('#bird').css({
      'position' : 'relative',
      'left' : '20%',
      'top' : '230px'
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
    $(document).on('keyup', function(e){
      switch (e.keyCode) {
        case 68:
          shoot = false;
          break;
      }
    });
    $(document).on('keydown', function(e){
      switch (e.keyCode) {
        case 68:
          console.log("shoot");
          shoot = true;
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
    if (shoot) {
      shootfunction(position.top);

    }
  };

  var gravity = function () {
    var $bird = $('#bird');
    var position = $bird.position();
    if (position.top < 438) {
    //  console.log(position.top)
    $bird.css({top: position.top + 2}) }

    };

  // raandomly pick a height for the clouds
  var random = function(){
    var number = Math.floor(Math.random() * 450);
    return number;
  }


  // create cloud at position of x and y
  var generatefood = function(y){
    var $food = $("<img>").attr("src", 'honey.png');
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

    if (changeworld % 2 === 1) {
          var $cloud = $("<img>").attr("src", 'smallyellowbird.png');;
        } else if (changeworld % 2 === 0) {
          var $cloud = $("<img>").attr("src", 'hungryclouds.png');;
         }

    $cloud.addClass("clouds");

    $('.game').append($cloud);
    $cloud.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $cloud.animate({left: 0}, {
      duration : 10000,
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
            // $bird.css({top: position.top + 20})
          console.log("die")
          var gameOver = document.createElement("h1");


           gameOver.setAttribute('id','gameOver')

            $('.game').append(gameOver);

             $('#gameOver').css({
               'position' : 'absolute',
                'left' : '23%',
                'top' : '30%'
                 });
           $('#gameOver').text("GAME OVER");

          clearInterval(gameloop);
          clearInterval(cloudloop);
          clearInterval(foodloop);
          clearInterval(worldloop);
          clearInterval(bonusloop);
          clearInterval(fivefoodloop);
          // var gameloop = null;
          // var cloudloop = null;
          // var foodloop = null;
       restartGame();

        }

      }
    });
  };

var generateLargeblock = function(y){


    var $XLcloud = $("<img>").attr("src", 'largehungryclouds.png');

    $XLcloud.addClass("XLclouds").data("hp", 3);

    $('.game').append($XLcloud);
    $XLcloud.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $XLcloud.animate({left: 0}, {
      duration : 30000,
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
        var currentXLCloud = $(this).position();
        var XLcloudTop     = currentXLCloud.top;
        var XLcloudBottom  = currentXLCloud.top + 50;
        var XLcloudLeft    = currentXLCloud.left;



        // check if cloudTop/cloudBottom is between birdTop and birdBottom
        var XLcloudTopRange    = birdTop <= XLcloudTop && XLcloudTop <= birdBottom;
        var XLcloudBottomRange = birdTop <= XLcloudBottom && XLcloudBottom <= birdBottom;
        var XLcloudLeftRange   = birdLeft <= XLcloudLeft && XLcloudLeft <= birdRight;




        if ( (XLcloudTopRange || XLcloudBottomRange) && XLcloudLeftRange) {
            // $bird.css({top: position.top + 20})
          console.log("die")
          var gameOver = document.createElement("h1");


           gameOver.setAttribute('id','gameOver')

            $('.game').append(gameOver);

             $('#gameOver').css({
               'position' : 'absolute',
                'left' : '23%',
                'top' : '30%'
                 });
           $('#gameOver').text("GAME OVER");

          clearInterval(gameloop);
          clearInterval(cloudloop);
          clearInterval(foodloop);
          clearInterval(worldloop);
          clearInterval(bonusloop);
          clearInterval(fivefoodloop);
          clearInterval(largecloudloop);

       restartGame();

        }

      }
    });
  };

var generateWorld = function(y){
    var $world = $("<img>").attr("src", 'holes.png');
    $('.game').append($world);
    $world.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $world.animate({left: 0}, {
      duration : 1500,
      easing: 'linear',
      complete: function(){
        console.log($(this))
        $world.remove();
      },
      progress : function() {
        var $bird        = $('#bird');
        var birdPosition = $bird.position();
        var birdTop      = birdPosition.top;
        var birdBottom   = birdPosition.top + 50;
        var birdLeft     = birdPosition.left;
        var birdRight    = birdPosition.left + 50;
        var currentWorld = $(this).position();
        var worldTop     = currentWorld.top;
        var worldBottom  = currentWorld.top + 50;
        var worldLeft    = currentWorld.left;


        var worldTopRange    = birdTop <= worldTop && worldTop <= birdBottom;
        var worldBottomRange = birdTop <= worldBottom && worldBottom <= birdBottom;
        var worldLeftRange   = birdLeft <= worldLeft && worldLeft <= birdRight;

        if ( (worldTopRange || worldBottomRange) && worldLeftRange) {
          console.log("change world")
          changeworld = changeworld + 1

          if (changeworld % 2 === 1) {
          $('.game').css('background-color', ' #A6D785').fadeIn("slow");
        } else if (changeworld % 2 === 0) {
          $('.game').css('background-color', ' #cbe5f8').fadeIn("slow");
         }



        }
      }
    });
  };

var generateBonus = function(y){

    bonuscounter = bonuscounter + 1
    var $bonus = $("<img>").attr("src", 'honey.png');
    $('.game').append($bonus);
    $bonus.css({
      'position' : 'absolute',
      'left' : '300px',
      'top' : y + 'px'
    });


    $bonus.animate({left: 0}, {
      duration : 1000,
      easing: 'linear',
      complete: function(){
        console.log($(this))
        $(this).remove();
      },
      progress : function() {
        var $bird        = $('#bird');
        var birdPosition = $bird.position();
        var birdTop      = birdPosition.top;
        var birdBottom   = birdPosition.top + 50;
        var birdLeft     = birdPosition.left;
        var birdRight    = birdPosition.left + 50;

        var currentBonus = $(this).position();
        var bonusTop     = currentBonus.top;
        var bonusBottom  = currentBonus.top + 50;
        var bonusLeft    = currentBonus.left;



        var bonusTopRange    = birdTop <= bonusTop && bonusTop <= birdBottom;
        var bonusBottomRange = birdTop <= bonusBottom && bonusBottom <= birdBottom;
        var bonusLeftRange   = birdLeft <= bonusLeft && bonusLeft <= birdRight;


        if ( (bonusTopRange || bonusBottomRange) && bonusLeftRange) {
          console.log("Bonues yeahh")

          $(this).remove();
          score = score + 1
          $('#score').text("Score " + score);



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
         'left' : '40%',
         'top' : '45%'
           });
      $('#startGameButton').text("START");

}



  var startGame = function () {
    console.log("start");
    $('#gameOver').remove();
    bindKeys();
    generatefood(random());


    worldloop = setInterval(function(){
      generateWorld(random());
    }, 6000);

    foodloop = setInterval(function(){
      generatefood(random());
    }, 1000);

    largecloudloop = setInterval(function(){
      generateLargeblock(random());
    }, 7000);

    bonusloop = setInterval(function(){
      console.log( 'bonusloop start');
        var bonusNum = random();
          fivefoodloop = setInterval(function(){
            generateBonus(bonusNum);
            console.log("Bonuscounter: " + bonuscounter);
            if (bonuscounter > 10) {
              clearInterval(fivefoodloop);
              bonuscounter = 0;
            }
          },150);
      }, 8000);

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

      changeworld = 0





$('#startGameButton').one('click',function(){

    startGame();
     $(this).remove();
  });

  }



restartGame();

});
