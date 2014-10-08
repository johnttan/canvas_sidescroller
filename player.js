var playerModel = function(screen, gameSize, x, y, addModel){
  var self = this;
  this.addModel = addModel;
  this.x = x;
  this.y = y;
  this.sizey = 50;
  this.sizex = 50;
  this.keystate = {};
  this.velocity = 8;
  this.innerTicks = 0;
  this.projectileTicks = -10;
  this.allowedKeys = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    32: 'SPACE'

  }
  $(document).keydown(function(e){
    if(e.which in self.allowedKeys){
      self.keystate[self.allowedKeys[e.which]] = true;
      // Check for case where 2 opposite keys are pressed. Disables older keypress.
      // if(self.keystate[self.allowedKeys[e.which+2]]){
      //   self.keystate[self.allowedKeys[e.which+2]] = false;
      // }
      // if(self.keystate[self.allowedKeys[e.which-2]]){
      //   self.keystate[self.allowedKeys[e.which-2]] = false;
      // }
      console.log('keydown', e.which)
    }
  })
  $(document).keyup(function(e){
    if(e.which in self.allowedKeys){
      self.keystate[self.allowedKeys[e.which]] = false;
      console.log('keyup', e.which)
    }
  })
  this.screen = screen;
  this.gameSize = gameSize;
  var self = this;
  this.draw = function(){
    self.screen.fillRect(self.x, self.y, this.sizex, this.sizey);
    console.log('player', self.x, self.y)
  }
  this.keys = {
    'UP': 38,
    'DOWN':40,
    'RIGHT':39,
    "LEFT":37,
    'SPACE':32
  }
  this.update = function(){
    self.innerTicks += 1;
    if(self.keystate.UP){
      if(self.y-self.velocity > 0){
        self.y -= self.velocity;
      }
    }
    if(self.keystate.DOWN){
      if(self.y+self.velocity < gameSize.y - self.sizey){
        self.y += self.velocity;
      }
    }
    if(self.keystate.LEFT){
      if(self.x > 0 && self.x - self.velocity > 0){
        self.x -= self.velocity;
      }
    }
    if(self.keystate.RIGHT){
      if(self.x + self.velocity < gameSize.x - self.sizex){
        self.x += self.velocity;
      }
    }
    if(self.keystate.SPACE){
      // Projectile rate limit.
      if(self.innerTicks - self.projectileTicks > 10){
        self.addModel(new projectileModel(self.screen, self.gameSize, self.x, self.y+self.sizey/2))
        self.projectileTicks = self.innerTicks;
      }
    }

  }

}