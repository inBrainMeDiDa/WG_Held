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
    // endgame_font must be initialized as null for it is needed at game's end
    this.endgame_font = null;
    // get met the timer!
    this.Timer = me.game.world.getChildByName("TheTimer");
    this.Timer = this.Timer[0];

    this.set_recipe( ["Kaese_textur", 10000,
                      "timer_tex", 3000,
                      "Kaese_textur", 5000, 
                      "timer_tex", 3000,
                      "Tomate", 2000,
                      "timer_tex", 3000,] );
    
    // local copy of the global score
    this.score = -1;

    if( theHUD ){
      // add bottom bar
      theHUD.addChild(new game.HUD.BottomBar(0,400));
      // add our child score object at the right-bottom position
      theHUD.addChild(new game.HUD.ScoreItem(10, 540));
       // add the time bar
      var timebar = new game.HUD.ChargeBar(180,-10);
      theHUD.addChild(new game.HUD.ChargeBarBG(180,-10));
      theHUD.addChild( timebar );
      // add the timer
      theHUD.timer = new game.HUD.TimerItem(180, 10);
      theHUD.timer.set_timebar( timebar );
      theHUD.addChild( theHUD.timer );
      // add the icon canvas
      theHUD.addChild( new game.HUD.myCanvas(400,-10,"Tomate", 128, 128) );
    }
   
  },
 

  // set current recipe
  set_recipe : function( new_recipe ){
    if( !new_recipe || new_recipe.length < 1 )
      return;

    this.current_recipe = new_recipe;
    this.recipe_pointer = 0;

    this.Timer = me.game.world.getChildByName("TheTimer")[0];


    if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
      console.log("this.recipe_pointer: "+this.recipe_pointer);
      this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
    }
    this.update_ingredient_icon();
  },


  // update ingredient icon
  update_ingredient_icon : function(){
    // setup a new icon, discard the old one
    var icon = theHUD.getChildByName("ingredient_icon");
    for( var i=0; i < icon.length; ++i){
      theHUD.removeChild(icon[i]);
    }
    theHUD.addChild( new game.HUD.myCanvas(400,-10,this.current_recipe[ this.recipe_pointer ], 128, 128) );
  },

  //
  step_recipe : function(){
    if( theHUD ){
      // increment the recipe pointer
      if( this.recipe_pointer < this.current_recipe.length-2 ){
        this.recipe_pointer += 2;
      }
      console.log("next on schedule: "+this.current_recipe[ this.recipe_pointer ]);
      
      this.update_ingredient_icon();
      // set the Timer
      if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
        this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
      }
    }
  },


  // get current recipe entry
  get_current_recipe_entry : function(){
    return this.current_recipe[ this.recipe_pointer ];
  },


  // 
  recipe_finished : function(){

    // if there is a font defined, the game is over
    if( this.endgame_font ){
      return true;
    }

    if( this.recipe_pointer >= this.current_recipe.length-2 ){

      // display end screen
      //theHUD.addChild( new game.HUD.myCanvas(0,0,"book_BG", 800, 600) );
      me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      200
      );

      // add a font
      this.endgame_font = new me.BitmapFont("32x32_font", 32);
      
      return true;
    }else{
      return false;
    }
  },

  // needed to draw text to the screen
  draw : function (renderer) {

    if( this.endgame_font ){
      this.endgame_font.draw(renderer, "AUSWERTUNG:", 300, 160);
      this.endgame_font.draw(renderer, "PUNKTE ERREICHT: "+game.data.score+"/"+(this.current_recipe.length/4), 40, 220);
    
      if( game.data.score >= (this.current_recipe.length/4) ){
        this.endgame_font.draw(renderer, "EXZELLENT !", 300, 320);
      }else if( game.data.score < 1 ){
        this.endgame_font.draw(renderer, "DAS WAR NIX !", 250, 320);
      }

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
        this.step_recipe();
      }
      return true;
    }
    return false;
  },

  onDestroyEvent: function() {
       if( theHUD ){
        var icon = theHUD.getChildByName("ingredient_icon");
        for( var i=0; i < icon.length; ++i){
          theHUD.removeChild(icon[i]);
        }

        var Timer = me.game.world.getChildByName("TheTimer");
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