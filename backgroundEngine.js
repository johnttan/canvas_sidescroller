var backgroundEngine = function(screen, gameSize, imageSrc){
  this.screen = screen;
  this.gameSize = gameSize
  this.background = new Image();
  this.background2 = new Image();
  this.background.src = 'images/background.png';
  this.background2.src = 'images/background.png';
  var self = this;
  this.background.onload = function(){
    self.screen.drawImage(self.background, 0, 0);
  };
  this.backTick1 = 0;
  this.backTick2 = 0;
}
backgroundEngine.prototype.draw = function(){
  this.screen.drawImage(this.background, this.backTick1, 0);
  this.backTick1 -= 1;
  if(this.backTick1 == -2000+this.gameSize.x){
    console.log('start drawing secondary image');
    this.backTick2 = this.gameSize.x;
    this.screen.drawImage(this.background2, this.backTick2, 0);
    this.backTick2 -= 1;
  }else if(this.backTick1 < -2000+this.gameSize.x){
    this.screen.drawImage(this.background2, this.backTick2, 0);
    this.backTick2 -= 1;
  }
  if(this.backTick1 <= -2000){
    console.log('resetting image ticks')
    this.backTick1 = 0;
    this.backTick2 = 0;
  }
}
backgroundEngine.prototype.update = function(){
}