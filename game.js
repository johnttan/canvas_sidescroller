(function($){


  var gameEngine = function(canvasID){
    var self = this;
    this.models = [];
    var canvas = $(canvasID)[0];
    var screen = canvas.getContext('2d');
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };
    var background = new backgroundEngine(screen, gameSize, 'images/background.png');
    this.addModel = function(model){
      self.models.push(model);
    }
    var player = new playerModel(screen, gameSize, 10, gameSize.y-100, this.addModel);
    for(var i=0;i<5;i++){
      var y;
      if(i == 1){
        y = gameSize.y / 2;
      }else if(i < 4){
        y = gameSize.y / 2 + 100 * i;
      }else{
        y = gameSize.y / 2 - 100 * i;
      }
    }
    this.models.push(new enemyModel(screen, gameSize, gameSize.x-100, gameSize.y / 2, this.addModel))
    this.models.push(background, player);
    this.tick = function(){
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      _.each(self.models, function(el){el.update(); el.draw()});
      requestAnimationFrame(self.tick);
    }
    this.background = background;
    this.gameSize = gameSize;
    this.screen = screen;
    this.canvas = canvas;
    this.start = function(){
      self.tick();
    }
  }
  $(function(){
    var Game = new gameEngine('#gameCanvas');
    console.log(Game)
    $('#startGame').click(Game.start);
  })
})(jQuery)