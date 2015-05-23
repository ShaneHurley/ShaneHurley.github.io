$(function () {
  $("#test_score").click(function() {
    gamesub.publish({
        channel: 'scores',
        message: "It works!!!"
    });
  });
});
