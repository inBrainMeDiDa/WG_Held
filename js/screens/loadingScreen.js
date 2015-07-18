/*
 * 
 * Brit Logo und Ladebalken
 *
 */
// a basic progress bar object
var ProgressBar = me.Renderable.extend({

    init: function (v, w, h) {
        this._super(me.Renderable, "init", [v.x, v.y, w, h]);
        // flag to know if we need to refresh the display
        this.invalidate = false;

        // default progress bar height
        this.barHeight = 19;

        // current progress
        this.progress = 1;
    },

    // make sure the screen is refreshed every frame
    onProgressUpdate: function (progress) {
        //this.progress = ~~(progress * this.width);
        this.progress = (progress * (this.width+1));
        this.invalidate = true;
    },

    // make sure the screen is refreshed every frame
    update: function () {
        if (this.invalidate === true) {
            // clear the flag
            this.invalidate = false;
            // and return true
            return true;
        }
        // else return false
        return false;
    },

    // draw function
    draw: function (renderer) {
        // draw the progress bar
        renderer.setColor("#5555aa");
        renderer.fillRect(208, (this.height - 46) - (this.barHeight / 2), this.width+2, this.barHeight+4);
        renderer.setColor("#ffdd00");
        renderer.fillRect(210, (this.height - 44) - (this.barHeight / 2), this.progress, this.barHeight);
    }
});

/** 
 * a default loading screen
 * @memberOf Brit
 * @ignore
 * @constructor
 */
game.LoadingScreen = me.ScreenObject.extend({
    // call when the loader is resetted
    onResetEvent: function () {
        me.game.reset();

        // background color
        
        //me.game.world.addChild(new me.ImageLayer("loadscreenbg01", 800, 600, "inBrainLogo01", 1));
        //me.game.world.addChild(new me.ImageLayer("loadscreenbg02", 800, 600, "inBrainLogo02", 2));
        me.game.world.addChild(new me.ImageLayer("loadscreenbg03", 800, 600, "inBrainLogo03", 1));

        // progress bar
        var progressBar = new ProgressBar(
            new me.Vector2d(),
            me.video.renderer.getWidth() - 437,
            me.video.renderer.getHeight()
        );
        this.handle = me.event.subscribe(
            me.event.LOADER_PROGRESS,
            progressBar.onProgressUpdate.bind(progressBar)
        );
        me.game.world.addChild(progressBar, 2);
    },

    // destroy object at end of loading
    onDestroyEvent: function () {
        // cancel the callback
        if (this.handle) {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    }
});
