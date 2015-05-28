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

  var frac;
  var frac2;
  var relation;

  function create() {
      frac = random_fraction(50,0);
      window.frac = frac;
      frac2 = random_fraction(240,0);
      relation = game.add.bitmapText(175, 64 / 1.6, "desyrel", "?", 64);

      //console.log("Equal: " + frac.isEqual(frac2));
      //console.log("Greater: " + frac.isGreater(frac2));
      //console.log("Less: " + frac.isLess(frac2));

      correct = function()
      {
        console.log("correct");
        frac.randomize();
        frac2.randomize();
        relation.setText("?");
      }

      incorrect = function()
      {
        console.log("incorrect");
        frac.randomize();
        frac2.randomize();
        relation.setText("?");
      }

      game.input.keyboard.onPressCallback = function(key) {
        if (key == '<' || key == ',')
        {
          relation.setText("<");
          frac.isLess(frac2) ? correct() : incorrect();
        } 
        else if (key == '>' || key == '.')
        {
          relation.setText(">");
          frac.isGreater(frac2) ? correct() : incorrect();
        }
        else if (key == '=' || key == '+')
        {
          relation.setText("=");
          frac.isEqual(frac2) ? correct() : incorrect();
        }
      }
  }

  var factor = 1;
  var factdir = 0.01;

  function update() {
    factor += factdir;
    if (Math.abs(factor) > 1) factdir = -factdir;

    //game.camera.scale.setTo(factor / 4 + 1, factor / 4 + 1);
  }
});


function random_int(max,min) {
  if (min === undefined) min = 1;
  return Math.floor((Math.random() * max) + min);
}

function gcf(a, b) {
    if (arguments.length < 2) {
        return a;
    }
    var c;
    a = Math.abs(a);
    b = Math.abs(b);

    while (b) {
        c = a % b;
        a = b;
        b = c;
    }
    return a;
}

function reduce_fraction(n,d) {
  var gf = gcf(n,d);
  return { numerator: n / gf, 
    denominator: d / gf
  };
}

function Fraction(n,d,x,y,font_size)
{
  this.numerator = n;
  this.denominator = d;
  
  this.x = x;
  this.y = y;
  
  this.font = 'desyrel';
  this.font_size = font_size || 64;
  
  this.numText = game.add.bitmapText(this.x, this.y, this.font, "", this.font_size);
  this.lineText =  game.add.bitmapText(this.x, this.y + this.font_size / 5, this.font, "___", this.font_size);
  this.denText =  game.add.bitmapText(this.x, this.y + this.font_size * 1.1, this.font, "", this.font_size);

  this.update(this.numerator, this.denominator);
  this.setXY(this.x, this.y);
}

Fraction.prototype.setXY = function(x,y) {
  var width = this.lineText.width;
  var numWidth = this.numText.width;
  var denWidth = this.denText.width;

  if (numWidth < 1) numWidth = 45;
  if (denWidth < 1) denWidth = 45;

  this.numText.position.setTo(this.x + (width - numWidth) / 4, this.y);
  this.lineText.position.setTo(this.x, this.y + this.font_size / 5);
  this.denText.position.setTo(this.x + (width - denWidth) / 4, this.y + this.font_size * 1.1);
};

Fraction.prototype.randomize = function()
{
   var n = random_int(20);
   var d = random_int(20);
   
   if (n > d) {
     var tmp = n;
     n = d;
     d = tmp;
   }
   this.update(n,d);
}

function random_fraction(x,y, font_size)
{
   var n = random_int(20);
   var d = random_int(20);
   
   if (n > d) {
     var tmp = n;
     n = d;
     d = tmp;
   }
   
   return new Fraction(n,d,x,y,font_size);
}

Fraction.prototype.update = function(n,d)
{
    this.numerator = n;
    this.denominator = d;
    this.numText.setText("" + n);
    this.denText.setText("" + d);
};

Fraction.prototype.reduce = function()
{
  var result = reduce_fraction(this.numerator, this.denominator);
  this.update(result.numerator, result.denominator);
};

Fraction.prototype.isEqual = function(other)
{
    return (other.numerator * this.denominator) == (this.numerator * other.denominator);
};

Fraction.prototype.isGreater = function(other)
{
    return (this.numerator / this.denominator) > (other.numerator / other.denominator);
};

Fraction.prototype.isLess = function(other)
{
    return (this.numerator / this.denominator) < (other.numerator / other.denominator);
};

