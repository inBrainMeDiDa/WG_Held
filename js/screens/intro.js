var bInitialized = false;

game.IntroScreen = me.ScreenObject.extend({
    // call when the loader is resetted
    onResetEvent: function () {
        me.game.reset();

        var that = this;
        this.handle = me.event.subscribe(
            me.event.KEYDOWN,
            function (action, keyCode) {
                if (keyCode == me.input.KEY.ESC) {
                    that.switchToMenu();
            }
        });

        this.introIndex = 0;
        this.setRemainingTimeAndImageByIntroIndex();
    },

    switchToMenu: function()
    {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.change(me.state.MENU);
    },

    init: function (x, y) {
        this.current_introPic = ["Intro01", 6000,
                                 "Intro02", 3000,
                                 "Intro03", 1000,
                                 "Intro04", 1000,
                                 "Intro05", 1000,
                                 "Intro06", 5000,
                                 "Intro07", 1000,
                                 "Intro08", 2000,
                                 "Intro09", 2000,
                                 "Intro10", 2000,
                                 "Intro11", 5000,
                                 "Intro12", 8000,
                                 "Intro13", 1000,
                                 "Intro14", 1000,
                                 "Intro15", 2000,
                                 "Intro16", 8000];
    },

    // destroy object at end of loading
    onDestroyEvent: function () {
        // cancel the callback
        if (this.handle) {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    },

    setRemainingTimeAndImageByIntroIndex: function ()
    {
        if (this.introIndex >= (this.current_introPic.length / 2))
        {
            this.switchToMenu();
            return;
        }

        if (this.current_child)
            me.game.world.removeChild(this.current_child);

        this.current_child = new me.ImageLayer("loadscreenbg03", 800, 600, this.current_introPic[this.introIndex * 2], 1)

        me.game.world.addChild(this.current_child);
        this.remaining_time = this.current_introPic[this.introIndex * 2 + 1];
        this.introIndex++;

        var that = this;
        window.setTimeout(
            function () { that.setRemainingTimeAndImageByIntroIndex(); },
            this.remaining_time);
    },
});
