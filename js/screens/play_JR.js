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
