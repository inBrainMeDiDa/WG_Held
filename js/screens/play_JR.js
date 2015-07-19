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
		console.log("levelcount: " + me.levelDirector.levelCount());

		  // reset the score
        game.data.score = 0;

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);


        this.HUD.set_active_gamecontroller( new game.HUD.JRGameController(888,888) );
        // add the bottom bar
        var bottomBar = new game.HUD.myButton(0, 450, "bottom_bar", 1024, 256);
        if( bottomBar ){
          bottomBar.setHyperlink( game.ultralink.nowhere );
          bottomBar.isPersistent = true;
          bottomBar.name = "jr_bottomBar";
        }
        me.game.world.addChild( bottomBar , 3);

         // add a new renderable component to draw some text
      me.game.world.addChild(new (me.GUI_Object.extend ({
        // constructor
        init : function() {

          var settings = {}
          settings.image = "button_sound_on";
        
          settings.spritewidth = 64;
          settings.spriteheight = 64;

          this._super(me.GUI_Object, 'init', [0, 0, settings]);
          // font 
          this.font = new me.BitmapFont("32x32_font" , 32, 0.75);
          this.name = "money_counter";
          this.isPersistent = true;
        },

        update : function (dt) {
          return true;
        },
   

        draw : function (renderer) {


          this.font.draw(renderer, "GELD: "+game.data.money, 500, 570, "left");
          this.font.draw(renderer, "KOSTEN: " + game.data.backpackCost, 500, 530, "left");
        },
        

      })), 4);


    },

	
	
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        // remove bottom bar
        var bottomBarArray = me.game.world.getChildByName("jr_bottomBar");
        for (var i = 0; i < bottomBarArray.length; ++i) {
          me.game.world.removeChild(bottomBarArray[i]);
        }
        // remove money counter
        bottomBarArray = me.game.world.getChildByName("money_counter");
        for (var i = 0; i < bottomBarArray.length; ++i) {
          me.game.world.removeChild(bottomBarArray[i]);
        }
        
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
        theHUD.addChild(new game.HUD.BackpackItem(10,550));

        // Do NOT load any level here if a level is loaded in
        // the playstate object since it will crash the game!
        //me.levelDirector.loadLevel("area02");

        return false;
      }
    }
    return false;
  },
});


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


