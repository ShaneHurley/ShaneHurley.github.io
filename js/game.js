var fracgame;
var game;

$(function () {
  $("#test_score").click(function() {
    gamesub.publish({
        channel: 'scores',
        message: "It works!!!"
    });
  });


  game = new Phaser.Game(640, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

  function preload() {
      game.load.baseURL = 'http://examples.phaser.io/assets/';
      game.load.crossOrigin = 'anonymous';
      game.load.bitmapFont('desyrel', 'fonts/bitmapFonts/desyrel.png', 'fonts/bitmapFonts/desyrel.xml');
  }


  function create() {
      fracgame = new FractionGame(game, 50, 0); 
  }

  function update() {
    fracgame.update();
  }
  //var factor = 1;
  //var factdir = 0.01;

  //function update() {
    //factor += factdir;
    //if (Math.abs(factor) > 1) factdir = -factdir;

    ////game.camera.scale.setTo(factor / 4 + 1, factor / 4 + 1);
  //}
});


