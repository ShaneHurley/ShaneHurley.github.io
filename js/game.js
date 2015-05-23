$(function () {
  $("#test_score").click(function() {
    gamesub.publish({
        channel: 'scores',
        message: "It works!!!"
    });
  });

        var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create });

        function preload () {

            game.load.image('logo', 'img/phaser.png');

        }

        function create () {

            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

        }
});
