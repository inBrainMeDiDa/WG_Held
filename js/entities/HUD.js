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
 * the one and only cooking game controller class
 */
game.HUD.CookingGameController = me.Renderable.extend( {
  /**
  * constructor
  */
  init: function(x, y) {
 
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // give a name
    this.name = "CookingGameController";
    // array of strings that holds the recipe (and suiting textures)
    this.current_recipe = [];
    this.recipe_pointer = 0;
    // get met the timer!
    this.Timer = me.game.world.getChildByName("TheTimer");
    this.Timer = this.Timer[0];

    this.set_recipe( ["Kaese_textur", 10000, "Kaese_textur", 5000, "Tomate", 2000] );
    
    // local copy of the global score
    this.score = -1;

    if( theHUD ){
      // add bottom bar
      theHUD.addChild(new game.HUD.BottomBar(0,400));
      // add our child score object at the right-bottom position
      theHUD.addChild(new game.HUD.ScoreItem(10, 540));
       // add the time bar
      var timebar = new game.HUD.ChargeBar(10,-10);
      theHUD.addChild(new game.HUD.ChargeBarBG(10,-10));
      theHUD.addChild( timebar );
      // add the timer
      theHUD.timer = new game.HUD.TimerItem(10, 500);
      theHUD.timer.set_timebar( timebar );
      theHUD.addChild( theHUD.timer );
      // add the icon canvas
      theHUD.addChild( new game.HUD.myCanvas(200,-10,"Tomate", 180, 180) );
    }
   
  },
 

  // set current recipe
  set_recipe : function( new_recipe ){
    if( !new_recipe || new_recipe.length < 1 )
      return;

    this.current_recipe = new_recipe;
    this.recipe_pointer = 0;

    if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
      console.log("this.recipe_pointer: "+this.recipe_pointer);
      this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
    }
  },


  // update function
  update : function (dt) {
    // find the Timer
    if( !this.Timer ){
      this.Timer = me.game.world.getChildByName("TheTimer");
      if( this.Timer[0] ){
        this.Timer = this.Timer[0];
        this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
      }
    }
    // return true if the score has been updated
    if (this.score != game.data.score) {
      this.score = game.data.score;

      // update next recipe entry 
      if( this.score > 0 )
      {    
        // setup a new icon, discard the old one
        if( theHUD ){
          // increment the recipe pointer
          if( this.recipe_pointer < this.current_recipe.length-2 ){
            this.recipe_pointer += 2;
          }
          console.log("next on schedule: "+this.current_recipe[ this.recipe_pointer ]);
          
          icon = theHUD.getChildByName("ingredient_icon");
          theHUD.removeChild(icon[0]);
          theHUD.addChild( new game.HUD.myCanvas(200,-10,this.current_recipe[ this.recipe_pointer ], 180, 180) );
        }
        // set the Timer
        if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
          this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
        }
      }
      return true;
    }
    return false;
  },

  onDestroyEvent: function() {
       if( theHUD ){
        icon = theHUD.getChildByName("ingredient_icon");
        theHUD.removeChild(icon[0]);

        Timer = me.game.world.getChildByName("TheTimer");
        theHUD.removeChild(Timer[0]);
      }
  },

});
/* =======================================================================
 * the one and only Jump&Run game controller class
 */
game.HUD.JRGameController = me.Renderable.extend( {
  /**
  * constructor
  */
  init: function(x, y) {
 
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // give a name
    this.name = "JRGameController";
    // local copy of the global score
    this.score = -1;

  },

   // set current recipe
  set_recipe : function( new_recipe ){},

  // update function
  update : function (dt) {
    if( this.score == -1 )
    {
      this.score = 0;

      // clean up stuff that belonged to the cooking game HUD
      if( theHUD ){
             
        icons = theHUD.getChildByName("ingredient_icon");
        for(var i = 0; i < icons.length; ++i){
          theHUD.removeChild(icons[i]);
        }
        timers = theHUD.getChildByName("TheTimer");
        for(var i = 0; i < timers.length; ++i){
          theHUD.removeChild(timers[i]);
        }
        victims = theHUD.getChildByName("chargebar");
        for(var i = 0; i < victims.length; ++i)
        {
          theHUD.removeChild(victims[i]);
        }
        victims = theHUD.getChildByName("bottombar");
        for(var i = 0; i < victims.length; ++i)
        {
          theHUD.removeChild(victims[i]);
        }
        
        // add our child score object at the top left corner
        theHUD.addChild(new game.HUD.ScoreItem(380, 20));
        theHUD.addChild(new game.HUD.WarpItem(10,10));

        // Do NOT load any level here if a level is loaded in
        // the playstate object since it will crash the game!
        //me.levelDirector.loadLevel("area02");
        console.log("<<< BEEP >>>");
        return false;
      }
    }
    return false;
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
    this.font.draw (renderer, "SCORE:"+game.data.score, this.pos.x, this.pos.y);
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

      // change game
      if( theHUD ){
        theHUD.set_active_gamecontroller( new game.HUD.JRGameController(888,888) );
        me.levelDirector.loadLevel("area02");
        me.game.world.addChild(new me.ColorLayer("background", "#FF3300", 0));
        me.game.world.removeChild(this);
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
    this.font.draw (renderer, "TIME: "+Math.floor(this.time_remaining/1000)+"/"+Math.floor(this.initial_time_remaining/1000), this.pos.x, this.pos.y);
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

/*
 *=======================================================================
 * /  /   /   / / / / / / / / / / / / / /
 *=======================================================================
 */

game.HUD.WarpItem = me.Renderable.extend({
    

    //constructor
    init: function(x,y){

        this._super(me.Renderable, 'init', [x, y, 15, 10])
    },

    update : function (){

        //changes to area03 on warp-count flip
        if(game.warp.count == 1){
           game.warp.count = 0;
           me.levelDirector.loadLevel("area03");
           return true;
        }

        return false;
    },

    draw : function (renderer) {
 
    }
});