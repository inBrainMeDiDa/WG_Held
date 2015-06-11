/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

var theHUD = null;

game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";
        this.active_gamecontroller = null;
        this.timer = null;

        // enable our global pointer towards this container object
        theHUD = this;
    },
    get_timer : function(){
        return this.timer;
    },
    set_active_gamecontroller : function( gc ){
        if( this.active_gamecontroller ){
          this.removeChild( this.active_gamecontroller );
          this.active_gamecontroller = null;
          console.log("alter GC weg!");
        }
        if( gc ){
          this.active_gamecontroller = gc;
           console.log("neuer GC...");
          this.addChild( gc );
           console.log("...fertig");
        }
    },
    get_active_gamecontroller : function(){
      return this.active_gamecontroller;
    },
});






/* =======================================================================
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend( {
  /**
  * constructor
  */
  init: function(x, y) {
 
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
 
    // create a font
    this.font = new me.BitmapFont("32x32_font", 32);
    this.font.set("left");
 
    // local copy of the global score
    this.score = -1;
  },
 
  // update function
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    if (this.score != game.data.score) {
      this.score = game.data.score;
      return true;
    }
    return false;
  },

  //draw the score
  draw : function (renderer) {
    this.font.draw (renderer, "PUNKTE:"+game.data.score, this.pos.x, this.pos.y);
  }
});

// time display and main game clock
game.HUD.TimerItem = me.Renderable.extend( {
  /**
  * constructor
  */

  init: function(x, y) {
 
    this.name = "TheTimer";
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);


    this.name = "TheTimer";
    // cout-down time in milliseconds
    this.initial_time_remaining = 60000;
    this.time_remaining = this.initial_time_remaining;
 
    // create a font
    this.font = new me.BitmapFont("32x32_font", 32);
    this.font.set("left");
 
    // local copy of the global score
    this.score = -1;
    this.timebar = null;
    this.bTimeout = false;

  },


  set_timebar : function(tmbr){
    this.timebar = tmbr;
  },
 
  // update function
  update : function (dt) {
    // we don't draw anything fancy here, so just
    // return true if the score has been updated
    if (this.time_remaining > dt) {
      this.time_remaining -= dt;

      if( this.timebar ){
        this.timebar.set_value(this.get_rel_time());
      }

      return true;
    }
    else{
      this.time_remaining = 0;

      // check whether the current recipe entry is a waiting timer
      var myGC = me.game.world.getChildByName("CookingGameController");
      if( myGC[0] && !myGC[0].recipe_finished() ){
        console.log( "current_recipe_entry = "+myGC[0].get_current_recipe_entry() );
        // then proceed to next entry
        myGC[0].step_recipe();
        return true;
      }

      // Timeout
      if( theHUD && !this.bTimeout ){
        console.log("Timeout!");
        this.bTimeout = true;
        //me.game.world.removeChild(this);
        // never change playstate from here!
        /* me.state.set(me.state.PLAY, new game.PlayScreen_JR());
         * me.state.change(me.state.PLAY);
         * me.game.world.removeChild(this);
         */
      }
      return false;
    }
    return false;
  },

  // draw something
  draw : function (renderer) {
    this.font.draw (renderer, Math.floor(this.time_remaining/1000)+"/"+Math.floor(this.initial_time_remaining/1000), this.pos.x, this.pos.y);
  },
  // set time
  set_timer : function(time){
    this.initial_time_remaining = time;
    this.time_remaining = this.initial_time_remaining;
  },
  // get absolute time remaining
  get_abs_time : function(){
    return this.time_remaining;
  },
  // get relative time remaining
  get_rel_time : function(){
    return (this.time_remaining / this.initial_time_remaining);
  }
});


/* =======================================================================
 * bottom bar
 */
game.HUD.BottomBar = me.GUI_Object.extend(
{
   init:function (x, y)
   {
      var settings = {}
      settings.image = "bottom_bar";
      settings.framewidth = 1024;
      settings.frameheight = 256;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "bottombar"
      // define the object z order
      this.z = -1;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      console.log("clicked!");
      // don't propagate the event
      return false;
   }
});


/* =======================================================================
 * simple charge bar
 */
game.HUD.ChargeBar = me.GUI_Object.extend(
{
   init:function (x, y)
   {
      var settings = {}
      settings.image = "chargebar";
      settings.framewidth = 512;
      settings.frameheight = 32;

      settings.spritewidth = 256;
      settings.spriteheight = 64;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "chargebar"
      // define the object z order
      this.z = 0;
      this.initial_width = this.width;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      return false;
   },
   // set the chargebar value between 1.0 (full) and 0.0 (hidden)
   set_value : function(pct){
      if( pct > 1.0 ){
        pct = 1.0;
      }
      else if( pct < 0.0 ){
        pct = 0.0
      }
      this.width = pct*this.initial_width;
   }
});


/* =======================================================================
 * simple charge bar background
 */
game.HUD.ChargeBarBG = me.GUI_Object.extend(
{
   init:function (x, y)
   {
      var settings = {}
      settings.image = "chargebar_bg";
      settings.framewidth = 512;
      settings.frameheight = 32;

      settings.spritewidth = 256;
      settings.spriteheight = 64;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "chargebar"
      // define the object z order
      this.z = -1;
      this.initial_width = this.width;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      return false;
   },
});
/* =======================================================================
 * simple canvas
 */
game.HUD.myCanvas = me.GUI_Object.extend(
{
   init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "chargebar_bg";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "ingredient_icon"
      // define the object z order
      this.z = 1;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      return false;
   },
});

