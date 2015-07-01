
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        // money
        money : 200,
        // ingredient storage
        fridge : {
            tomatos         : 6,
            baked_beans     : 2,
            kidney_beans    : 1,
            salat           : 1,
        }
    },
    // global hyperlinks used for navigation between screens.
    // Because it's a cool idea, I call them ultralinks.
    ultralink : {
        main_menu       : 0,
        kitchen         : 1,
        fridge          : 2,
        // CG welcome screen
        cooking_book    : 3, 
        // recipes
        cooking_book_1  : 31, 
        cooking_book_2  : 32, 
        cooking_book_3  : 33, 
        cooking_book_4  : 34, 
        cooking_game_1  : 4,
        living_room     : 5,
        JR_title        : 6,
        JR_bafoeg       : 7
    },
    // Maiko's
    warp : {
        count : 0
    },


    // Run on page load.
    "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen",  me.video.CANVAS, 800, 600, true, 'auto')) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
},

	
    // Run on game resources loaded.
    "loaded" : function () {

        // set the "Play/Ingame" Screen Objects
        me.state.set(me.state.MENU, new game.TitleScreen() );
        me.state.set(me.state.PLAY, new game.PlayScreen_CG() );
     
        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        //add a Page with possible multiple iterations
        //to the entity pool
        me.pool.register("PageEntity", game.PageEntity, true);
        //add a warp entity
        me.pool.register("WarpEntity", game.WarpEntity);
		
		me.pool.register("coin", game.IngredientEntity, true);
		me.pool.register("tomato", game.IngredientEntity, true);
		me.pool.register("kaese", game.IngredientEntity, true);
        me.pool.register("baked_beans", game.IngredientEntity, true);
		me.pool.register("pot", game.PotOfWisdomEntity,true);

         //new game
        me.pool.register("RespawnEntity", game.RespawnEntity, true);
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
		me.input.bindKey(me.input.KEY.X,     "jump", true);
				

        // Start the game.
        me.state.change(me.state.MENU);
    }
};
