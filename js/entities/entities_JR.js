/*=======================================================================
 * /  /   /   / / / / / / / / / / / / / /
 *=======================================================================
 */
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

    //Warp-Count erhöhen um Levelsprung auszulösen
    game.warp.count =+ 1;

    console.log(game.warp.count);

     // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    // remove it
    me.game.world.removeChild(this);

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
  an goods entity
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
 
// this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {
    // do something when collected
    console.log("kollidiert");
    if(this.description == "tomatos"){
      game.data.backpack.tomatos =+ 1;
      console.log("Tomaten im Rucksack: " + game.data.backpack.tomatos );
    }

    if(this.description == "baked_beans"){
      game.data.backpack.baked_beans =+ 1;
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