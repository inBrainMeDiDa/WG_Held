var bInitialized = false;

game.OutroScreen = me.ScreenObject.extend({
    // call when the loader is resetted
    onResetEvent: function () {
        me.game.reset();

        var that = this;
        this.handle = me.event.subscribe(
            me.event.KEYDOWN,
            function (action, keyCode) {
                if (keyCode == me.input.KEY.ESC) {
                    game.dialog_pointer = 0;
                    that.switchToMenu();
            }
        });

        // title screen
        me.game.world.addChild(
          new me.Sprite(
            800, 600,
            me.loader.getImage('Outro')
          ),
          4
        );
    },

    switchToMenu: function()
    {
        window.clearTimeout( this.timeoutTarget );

        // reset game state, then pass on to living_room
        game.reset_game_state(); 

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.change(me.state.MENU);
    },

    init: function (x, y) 
    {},

    // destroy object at end of loading
    onDestroyEvent: function () {
        // cancel the callback
        if (this.handle) {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    },

});


/* =======================================================================
 *  TitleScreen Outro hotfix
 */
game.HotOutro = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // reset game state
    game.reset_game_state();

    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Outro')
      ),
      2
    );
    
    // play new music track
    if( game.current_music_track != "Steve_Combs__Delta_Is_Theme_Y" )
    {
          //game.current_music_track = "Steve_Combs__Delta_Is_Theme_Y";
          current_music_track = null;
          me.audio.stopTrack();
          //me.audio.playTrack( game.current_music_track );
    }
    var my_state_holder = me.game.world.getChildByName("music_state_holder");
    if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
    {
      me.audio.pauseTrack();
    }
  },
 

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {},
});
