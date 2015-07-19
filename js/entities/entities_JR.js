/*=======================================================================
 * /  /   /   / / / / / / / / / / / / / /
 *=======================================================================
 */
/**
 *Return field entity
 */
 game.ReturnFieldEntity = me.Entity.extend({
  
  init:function (x, y, settings) {
        // call the constructor
           // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
    
    this.name = "ReturnFieldEntity";
    this.timerRunning = false;
    this.timerLength = 1000;
    this.currentTime = 0;

    this.b_selected = false;
  },

  getTimerRunning : function(){
    return this.timerRunning;
  },

  update : function (dt) {
    // handle collisions against other shapes
    me.collision.check(this);

    if(this.timerRunning){
      if(this.currentTime < this.timerLength){
        this.currentTime += dt;
      }else{
        this.currentTime = 0;
        this.timerRunning = false;
      }
    }

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },


  onCollision : function (response, other) {
    this.timerRunning = true;
    return false;
  },

 })

 game.CashierEntity = me.Entity.extend({
   init : function (x, y, settings) {
        // call the constructor
      this._super(me.Entity, 'init', [x, y , settings]);
  
      this.b_selected = false;
    },

    update : function (dt) {
    // handle collisions against other shapes
      me.collision.check(this);

    // return true if we moved or if the renderable was updated
      return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    onCollision : function (response, other) {

      return false;
    },
 })

/**
 * Warp Entity, (ein unsichtbarer Coin)
 */
 game.WarpEntity = me.CollectableEntity.extend({

  init:function (x, y, settings) {
        // call the constructor
           // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
  
    this.b_selected = false;
  },

  update : function (dt) {
    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },


  onCollision : function (response, other) {

     // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
    
    if(me.input.isKeyPressed('empty') && game.data.backpackCost <= game.data.money){

      game.data.money -= game.data.backpackCost;
      game.data.backpackCost = 0;
      game.killDisplayBackpack("backpack_icon_1");
      game.killDisplayBackpack("backpack_icon_2");
      game.killDisplayBackpack("backpack_icon_3");
      game.killDisplayBackpack("backpack_icon_4");
      game.emptyDisplayBackpack();
      game.emptyRealBackpackIntoFridge();

      me.state.set(me.state.TITLE, new game.HallScreen());
      me.state.change(me.state.TITLE);

    }

    return false
  },

 })

/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
    
    // default accel vector
    this.body.setVelocity(3,15);

    //set the camera to follow this entity
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    this.alwaysUpdate = true;

    //basic walking animation
    this.renderable.addAnimation("walk", [ 0, 1, 2, 3, 4, 5, 6, 7]);
    //standing animation erster frame aus dem sprite sheet
    this.renderable.addAnimation("stand", [0]);
    // set the standing animation as default
    this.renderable.setCurrentAnimation("stand");

    },



    /**
     * update the entity
     */
    update : function (dt) {
  
      if(me.input.isKeyPressed('empty')){
        var returnEntities = me.game.world.getChildByName("ReturnFieldEntity");
        var escapeFlag = true;
        if( returnEntities.length > 0){
          for(var i =0; i < returnEntities.length; ++ i){
            if(returnEntities[i].getTimerRunning() == true){
              escapeFlag = false;
              break;
            }
          }
        }
        if(escapeFlag){
          return;
        }

        console.log("E was pressed");
        if(game.data.displayBackpack.position4 != ""){
           game.killDisplayBackpack("backpack_icon_4");
           game.data.backpack[game.data.displayBackpack.position4] = 0;
           game.data.displayBackpack.position4 ="";
           game.lowerBackpackLoad();
           return;
         }else if(game.data.displayBackpack.position3 != ""){
           game.killDisplayBackpack("backpack_icon_3");
           game.data.backpack[game.data.displayBackpack.position3] = 0;
           game.data.displayBackpack.position3 ="";
           game.lowerBackpackLoad();
           return;
         }else if(game.data.displayBackpack.position2 != ""){
           game.killDisplayBackpack("backpack_icon_2");
           game.data.backpack[game.data.displayBackpack.position2] = 0;
           game.data.displayBackpack.position2 ="";
           game.lowerBackpackLoad();
           return;
        }else if(game.data.displayBackpack.position1 != ""){
           game.killDisplayBackpack("backpack_icon_1");
           game.data.backpack[game.data.displayBackpack.position1] = 0;
           console.log(game.data.displayBackpack.position1);
           game.data.displayBackpack.position1 = "";
           game.lowerBackpackLoad();
           return;
        }
      }

      if (me.input.isKeyPressed('left')) {
      // flip the sprite on horizontal axis
      this.renderable.flipX(true);
      // update the entity velocity
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else if (me.input.isKeyPressed('right')) {
      // unflip the sprite
      this.renderable.flipX(false);
      // update the entity velocity
      this.body.vel.x += this.body.accel.x * me.timer.tick;
      // change to the walking animation
      if (!this.renderable.isCurrentAnimation("walk")) {
        this.renderable.setCurrentAnimation("walk");
      }
    } else {
      this.body.vel.x = 0;
      // change to the standing animation
      this.renderable.setCurrentAnimation("stand");
    }

    if (me.input.isKeyPressed('jump')) {
      // make sure we are not already jumping or falling
      if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
      }
 
    }
 

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
  
});

/*----------------
  a goods entity
 ----------------- */
 game.GoodsEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
  
  this.description = settings.description;
    // call the parent constructor
  this._super(me.CollectableEntity, 'init', [x, y , settings]);
  
  this.b_selected = false;
  
  // default accel vector
  this.body.setVelocity(3,15);
 
  },

   /**
   * update the entity
   */
  update : function (dt) {

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },

  updateBackpack : function (string){
    game.data.backpack[string] += 1;
    game.data.backpackLoad += 1;
    game.updateDisplayBackpack(string);
  },
 
// this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    if(game.data.backpackLoad < 4){
      if(this.description == "tomatos"){
        this.updateBackpack("tomatos");
      }else if(this.description == "baked_beans"){
        this.updateBackpack("baked_beans");
      }else if(this.description == "cheese"){
        this.updateBackpack("cheese");
      }else if(this.description == "kidney_beans"){
        this.updateBackpack("kidney_beans");
      }else if(this.description == "rolls"){
        this.updateBackpack("rolls");
      }else if(this.description == "tortilla_wraps"){
        this.updateBackpack("tortilla_wraps");
      }else if(this.description == "sour_cream"){
        this.updateBackpack("sour_cream");
      }else if(this.description == "bacon"){
        this.updateBackpack("bacon");
      }else if(this.description == "onions"){
        this.updateBackpack("onions");
      }else if(this.description == "garlic"){
        this.updateBackpack("garlic");
      }else if(this.description == "sweet_pepper"){
        this.updateBackpack("sweet_pepper");
      }else if(this.description == "milk"){
        this.updateBackpack("milk");
      }else if(this.description == "eggs"){
        this.updateBackpack("eggs");
      }else if(this.description == "butter"){
        this.updateBackpack("butter");
      }else if(this.description == "curd"){
        this.updateBackpack("curd");
      }else if(this.description == "potatoes"){
        this.updateBackpack("potatoes");
      }else if(this.description == "mozzarella"){
        this.updateBackpack("mozzarella");
      }else if(this.description == "fruits"){
        this.updateBackpack("fruits");
      }else if(this.description == "chips"){
        this.updateBackpack("chips");
      }



    //give some score
    game.data.score += 1;
   // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    // remove it
    me.game.world.removeChild(this);
  }
  
    return false
  }
 });


/*----------------
  a Page entity
 ----------------- */
game.PageEntity = me.CollectableEntity.extend({

  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
  
    // call the parent constructor
  this._super(me.CollectableEntity, 'init', [x, y , settings]);
  
  this.b_selected = false;
  
  // default accel vector
  this.body.setVelocity(3,15);
 
  },
 
  /**
   * update the entity
   */
  update : function (dt) {

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
 
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
        game.data.backpack.page += 1;
        game.data.backpackLoad += 1;
        game.updateDisplayBackpack("page");
    //give some score
    game.data.score += 1;
   // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    // remove it
    me.game.world.removeChild(this);
  
    return false
  }
});

/*----------------
  a Respawn entity
 ----------------- */
game.RespawnEntity = me.CollectableEntity.extend({

  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {

    this.posX = settings.posX;
    this.posY = settings.posY;
  
    // call the parent constructor
  this._super(me.CollectableEntity, 'init', [x, y , settings]);
  
  this.b_selected = false;
  
  // default accel vector
  this.body.setVelocity(3,15);
 
  },
 
  /**
   * update the entity
   */
  update : function (dt) {

    // handle collisions against other shapes
    me.collision.check(this);

    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
 
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collided
    var player = me.game.world.getChildByName("mainPlayer")[0];
    player.pos.set(this.posX, this.posY);

    return false
  }
});