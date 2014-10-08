var projectileModel = function(screen, gameSize, x, y, enemy){
  var self = this;
  this.screen = screen;
  this.gameSize = gameSize;
  this.x = x;
  this.y = y;
  this.velocity = 10;
  this.sizey = 5;
  this.sizex = 5;
  this.draw = function(){
    self.screen.fillRect(self.x, self.y, this.sizex, this.sizey);
  }
  this.update = function(){
    if(enemy){
      this.x -= this.velocity;
    }else{
      this.x += this.velocity;
    }
  }
}