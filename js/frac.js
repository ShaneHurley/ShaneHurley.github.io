function Fraction(game,x,y,font_size)
{
  this.max_value = 12;
  this.game = game;
  this.x = x;
  this.y = y;
  
  this.font = 'desyrel';
  this.font_size = font_size || 64;
  
  this.numText = game.add.bitmapText(this.x, this.y, this.font, "", this.font_size);
  this.lineText =  game.add.bitmapText(this.x, this.y + this.font_size / 5, this.font, "___", this.font_size);
  this.denText =  game.add.bitmapText(this.x, this.y + this.font_size * 1.1, this.font, "", this.font_size);

  this.randomize();  
  this.setXY(this.x, this.y);
}

Fraction.prototype.kill = function() {
  this.numText.kill();
  this.lineText.kill();
  this.denText.kill();
}

Fraction.prototype.revive = function() {
  this.numText.revive();
  this.lineText.revive();
  this.denText.revive();
}

Fraction.prototype.random_int = function(max,min) {
  if (min === undefined) min = 1;
  return Math.floor((Math.random() * max) + min);
}

Fraction.prototype.gcf = function(a, b) {
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

Fraction.prototype.reduce_fraction = function(n,d) {
  var gf = gcf(n,d);
  return { numerator: n / gf, 
    denominator: d / gf
  };
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
   var n = this.random_int(this.max_value);
   var d = this.random_int(this.max_value);
   
   if (n > d) {
     var tmp = n;
     n = d;
     d = tmp;
   }
   this.update(n,d);
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

