/*----------------
  a pot entity
 ----------------- */
game.PotOfWisdomEntity = me.Entity.extend({
 
  /* -----
 
  constructor
 
  ------ */
 
  init: function(x, y, settings) {
    // call the constructor
    this._super(me.Entity, 'init', [x, y, settings]);
 
    // set the default horizontal & vertical speed (accel vector)
    this.body.setVelocity(0, 0);
 
    // set the display to follow our position on both axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    // ensure the player is updated even when outside of the viewport
    //this.alwaysUpdate = true;
 
  },
 
  /* -----
 
  update the player pos
 
  ------ */
  update: function(dt) {
 
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
    return false;
  }
});
 
/*----------------
  a collectable ingredient entity
 ----------------- */
game.IngredientEntity = me.CollectableEntity.extend({

  // extending the init function is not mandatory
  // unless you need to add some extra initialization
  init: function(x, y, settings) {
  
    // call the parent constructor
    this._super(me.CollectableEntity, 'init', [x, y , settings]);
    this.texture_string = "coin";
  	this.b_selected = false;
  	
  	// default accel vector
  	this.body.setVelocity(3,15);
 
  },
  get_texture_string : function(){
    return this.texture_string;
  },
  set_texture_string : function( new_texture_string ){
    this.texture_string = new_texture_string;
  },
 
	 // update the entity
	update : function (dt) {

		if ( this.b_selected )
		{
		  //this.pos.x -= 10;
		  this.pos.x = me.input.mouse.pos.x;
		  this.pos.y = me.input.mouse.pos.y;
		}
	
		if( this.pos.y < 400 )
		{
			// apply physics to the body (this moves the entity)
			this.body.update(dt);
		}

		// handle collisions against other shapes
		me.collision.check(this);

		// return true if we moved or if the renderable was updated
		return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
	},
 
  // this function is called by the engine, when
  // an object is touched by something (here collected)
  onCollision : function (response, other) {

    // make sure it cannot be collected "again"
    this.body.setCollisionMask(me.collision.types.NO_OBJECT);
 
    var myGC = me.game.world.getChildByName("CookingGameController");
    if( myGC[0] && this.texture_string == myGC[0].get_current_recipe_entry() ){
      // give some score if the ingredient given was correct
      game.data.score += 1;
       // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }
    }
  	
    // remove it
    me.game.world.removeChild(this);
    return false
  }
});