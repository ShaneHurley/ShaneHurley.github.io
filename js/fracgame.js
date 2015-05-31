
function FractionGame(game,x,y)
{
  // modes: start, waiting_for_player, playing, game_over
  this.mode = 'start';
  this.score = 0;
  this.correct_value = 5;
  this.incorrect_value = -5;
  this.start_at = game.time.time;
  this.elapsed = 0;
  this.plays = 0;
  this.team_name = window.location.getParameter("team");
  this.players = parseInt(window.location.getParameter("players"));

  this.font = "desyrel";
  this.font_size = 64;

  this.game = game;

  this.x = x || 0;
  this.y = y || 0;

  this.message = this.game.add.bitmapText(this.x, this.y + this.font_size / 1.6 + 150, 
      "desyrel", "Press space to begin", this.font_size);
  this.frac1 = new Fraction(this.game, this.x + 100, this.y + 150);
  this.frac2 = new Fraction(this.game, this.x + 290, this.y + 150);
  this.relation = this.game.add.bitmapText(this.x + 225, this.y + this.font_size / 1.6 + 150, 
      "desyrel", "?", this.font_size);
  this.score_text = this.game.add.bitmapText(this.x + 300, this.y, this.font, "Score: 0", this.font_size);
  this.timer_text = this.game.add.bitmapText(this.x + 0, this.y, this.font, "Timer: 30", this.font_size);
  this.kill();

  var fgame = this;
  this.game.input.keyboard.onPressCallback = function(key) {
    if (fgame.mode == "game_over") return;

    console.log("mode: " + fgame.mode);
    if (fgame.mode == 'start' || fgame.mode == 'waiting_for_player')
    {
      if (key != ' ') return;

      fgame.revive();
      fgame.plays = fgame.plays + 1;

      if (fgame.plays > fgame.players)
      {
        fgame.mode = 'game_over';
        fgame.kill("Game Over");
        fgame.timer_text.kill();
        return;
      }
      if (fgame.mode == 'waiting_for_player')
      {
        fgame.adjust_score(30 - fgame.elapsed);
        fgame.mode = 'playing';
        fgame.set_timer(30);
        return;
      }
      else
      {
        fgame.mode = 'playing';
        fgame.set_timer(30);
      }
    }

    if (key == '<' || key == ',')
    {
      fgame.relation.setText("<");
      fgame.frac1.isLess(fgame.frac2) ? fgame.correct() : fgame.incorrect();
    } 
    else if (key == '>' || key == '.')
    {
      fgame.relation.setText(">");
      fgame.frac1.isGreater(fgame.frac2) ? fgame.correct() : fgame.incorrect();
    }
    else if (key == '=' || key == '+')
    {
      fgame.relation.setText("=");
      fgame.frac1.isEqual(fgame.frac2) ? fgame.correct() : fgame.incorrect();
    }
  }
}

FractionGame.prototype.adjust_score = function(delta)
{
  this.score = this.score + delta;
  this.score_text.setText("Score: " + this.score);
  gamesub.publish({
      channel: 'scores',
      message: {
        team: this.team_name,
        score: this.score,
        play: this.plays
      }
  });
}

FractionGame.prototype.correct = function()
{
  this.adjust_score(this.correct_value);
  this.frac1.randomize();
  this.frac2.randomize();

  this.relation.setText("?");
}

FractionGame.prototype.incorrect = function()
{
  this.adjust_score(this.incorrect_value);
  this.frac1.randomize();
  this.frac2.randomize();

  this.relation.setText("?");
}

FractionGame.prototype.kill = function(txt)
{
      this.frac1.kill();
      this.frac2.kill();
      this.relation.kill(); 
      if (txt)
      {
        this.message.setText(txt);
      }
      this.message.revive();
}

FractionGame.prototype.revive = function()
{
      this.frac1.revive();
      this.frac2.revive();
      this.relation.revive(); 
      this.message.kill();
}

FractionGame.prototype.set_timer = function(new_time)
{
  this.elapsed = 30 - new_time;
  this.start_at = this.game.time.time - this.elapsed * 1000;
}

FractionGame.prototype.update = function()
{
  if (this.mode == 'start') 
     return;

  var new_elapsed = Math.floor((this.game.time.time - this.start_at) / Phaser.Timer.SECOND);
  if (new_elapsed > this.elapsed)
  {
    this.elapsed = new_elapsed;
    this.timer_text.setText("Timer: " + (30 - this.elapsed));

    if (this.mode == 'playing' && this.elapsed >= 30)
    {
      this.mode = 'waiting_for_player';
      this.kill('next player,\npress space');
      this.set_timer(6);
    }
  }
}
