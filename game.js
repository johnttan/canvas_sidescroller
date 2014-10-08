(function($){


  var gameEngine = function(canvasID){
    var self = this;
    this.started = false;
    this.models = [];
    this.collided = function(r1, r2){
      if (r1.x < r2.x + r2.sizex &&
         r1.x + r1.sizex > r2.x &&
         r1.y < r2.y + r2.sizey &&
         r1.sizey + r1.y > r2.y && r1 !== r2) {
        console.log(r1, r2, 'collided')
        return true
      }else{
        return false
      }
    }
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
    this.models.push(background, player);
    for(var i=0;i<5;i++){
      var y;
      if(i == 0){
        y = gameSize.y / 2;
      }else if(i < 3){
        y = gameSize.y / 2 + 100 * i;
      }else{
        y = gameSize.y / 2 - 100 * i;
      }
      this.models.push(new enemyModel(screen, gameSize, gameSize.x-100, y, this.addModel))
    }
    this.tick = function(){
      // Stop rendering if stopped
      if(self.started==true){
        screen.clearRect(0, 0, gameSize.x, gameSize.y);
        var collidedCollection = [];
        _.each(self.models, function(el){
          _.each(self.models, function(el1){
            if(self.collided(el, el1)){
              collidedCollection.push(el, el1);
            }
          })
        })
        _.remove(self.models, function(el){
          if(collidedCollection.indexOf(el) > -1){
            return true
          }else{
            return false
          }
        })
        _.each(self.models, function(el){el.update(); el.draw()});
        requestAnimationFrame(self.tick);
      }
    }
    this.background = background;
    this.gameSize = gameSize;
    this.screen = screen;
    this.canvas = canvas;
    this.start = function(){
      self.started = true;
      self.tick();
    }
  }
  $(function(){
    var Game = new gameEngine('#gameCanvas');
    console.log(Game)
    var start = (function(Game){
      return function(){
        if(Game.started){
          console.log('starting new game')
          // Stop rendering old game.
          Game.started = false;
          Game = new gameEngine('#gameCanvas');
          Game.start();
        }else{
          Game.start();
        }
      }
    })(Game)
    $('#startGame').click(start);

  })
})(jQuery)