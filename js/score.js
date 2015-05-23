$(function () {
  gamesub.subscribe({
    channel: 'scores',
    message: function(msg) {
      console.log(msg);
      $("#scores").append("<p>" + msg + "</p>");
    }
  });
})
