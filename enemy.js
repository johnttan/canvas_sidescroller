var enemyModel = function(screen, gameSize, x, y, addModel){
  var self = this;
  this.addModel = addModel;
  this.x = x;
  this.y = y;
  this.sizey = 50;
  this.sizex = 50;
  this.velocity = 8;
  this.innerTicks = 0;
  this.projectileTicks = -10;
  this.screen = screen;
  this.gameSize = gameSize;
  var self = this;
  this.draw = function(){
    self.screen.fillRect(self.x, self.y, this.sizex, this.sizey);
    console.log('enemy', self.x, self.y)
  }
  this.update = function(){
    self.innerTicks += 1;
    if(Math.random() > 0.95){
      self.addModel(new projectileModel(self.screen, self.gameSize, self.x, self.y+self.sizey/2, true))
    }
  }

}