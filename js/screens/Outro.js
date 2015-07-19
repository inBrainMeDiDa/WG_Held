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
          1
        );
    },

    switchToMenu: function()
    {
        window.clearTimeout( this.timeoutTarget );
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
