/*
 *=======================================================================
 * /	/	/	/	/	/	/	/	/	/	/	/	/	/	/	/	/
 *=======================================================================
 */
game.PlayScreen_JR = me.ScreenObject.extend({

    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
	
		
         // load a level
		me.levelDirector.loadLevel("area02");
		me.game.world.addChild(new me.ColorLayer("background", "#6633FF", 0));
		console.log("levelcount: "+me.levelDirector.levelCount());
		
		// reset the score
        game.data.score = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        //this.HUD.set_active_gamecontroller( new game.HUD.CookingGameController(888,888) );
        this.HUD.set_active_gamecontroller( new game.HUD.JRGameController(888,888) );
    },

	
	
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
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

        // Do NOT load any level here if a level is loaded in
        // the playstate object since it will crash the game!
        //me.levelDirector.loadLevel("area02");

        return false;
      }
    }
    return false;
  },
});