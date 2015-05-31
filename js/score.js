
$(function () {
  var teams = {
    current: 0
  };

  gamesub.subscribe({
    channel: 'scores',
    message: function(msg) {
      if (!teams[msg.team])
      {
        teams.current += 1;
        teams[msg.team] = 'team' + teams.current;
        $("#" + teams[msg.team] + " h1").text(msg.team);
      }

      $("#" + teams[msg.team] + " h2").text(msg.score);
      console.log(msg);
    }
  });
})
