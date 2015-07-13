
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,
        // money
        money : 200,
        // dialog pointer
        dialog_pointer : 0,
        
        // ingredient storage
        fridge : {
            tomatos         : 3,
            baked_beans     : 1,
            kidney_beans    : 1,
            salat           : 1,
            rolls           : 0, // = Semmeln
            tortilla_wraps  : 0,
            sour_cream      : 0,
            bacon           : 0,
            onions          : 0,
            garlic          : 0, // = Knoblauch
            sweet_pepper    : 0, // = Paprika
            milk            : 0,
            eggs            : 0,
            butter          : 0,
            curd            : 0, // = Quark
            potatoes        : 0,
            pasta           : 0,
            mozzarella      : 0,
        },

        backpack : {
            load            : 0, // = space in backpack

            tomatos         : 0,
            baked_beans     : 0,
            kidney_beans    : 0,
            salat           : 0,
            rolls           : 0, // = Semmeln
            tortilla_wraps  : 0,
            sour_cream      : 0,
            bacon           : 0,
            onions          : 0,
            garlic          : 0, // = Knoblauch
            sweet_pepper    : 0, // = Paprika
            milk            : 0,
            eggs            : 0,
            butter          : 0,
            curd            : 0, // = Quark
            potatoes        : 0,
            pasta           : 0,
            mozzarella      : 0,
        },
        
    },
    // global hyperlinks used for navigation between screens.
    // Because it's a cool idea, I call them ultralinks.
    ultralink : {
        nowhere         : 9999,
        new_game        : 998,
        resume_game     : 997,
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
        // detailed recipes
        recipe_1        : 41,
        recipe_2        : 42,
        recipe_3        : 43,
        recipe_4        : 44,
        // misc.
        next_dialog     : 5,
        cooking_game_1  : 6,
        living_room     : 7,
        dialog_room     : 8,
        hall_room       : 9,
        JR_title        : 10,
        JR_bafoeg       : 11
    },
    // Maiko's
    warp : {
        count : 0
    },

    update_dialog_pointer : function(){
        switch( game.data.dialog_pointer ){
            // exit after first sequence
            case 4:  me.state.set(me.state.TITLE, new game.LinvingRoomTitleScreen());
                     me.state.change(me.state.TITLE);
                     break;
            default: game.data.dialog_pointer += 1;

        }
    },

    reset_game_state : function(){
        game.data.dialog_pointer = 0;

        game.data.fridge.tomatos         = 0;
        game.data.fridge.baked_beans     = 0;
        game.data.fridge.kidney_beans    = 0;
        game.data.fridge.salat           = 0;
        game.data.fridge.rolls           = 0; // = Semmeln
        game.data.fridge.tortilla_wraps  = 0;
        game.data.fridge.sour_cream      = 0;
        game.data.fridge.bacon           = 0;
        game.data.fridge.onions          = 0;
        game.data.fridge.garlic          = 0; // = Knoblauch
        game.data.fridge.sweet_pepper    = 0; // = Paprika
        game.data.fridge.milk            = 0;
        game.data.fridge.eggs            = 0;
        game.data.fridge.butter          = 0;
        game.data.fridge.curd            = 0; // = Quark
        game.data.fridge.potatoes        = 0;
        game.data.fridge.pasta           = 0;
        game.data.fridge.mozzarella      = 0;

        game.data.backpack.tomatos         = 0;
        game.data.backpack.baked_beans     = 0;
        game.data.backpack.kidney_beans    = 0;
        game.data.backpack.salat           = 0;
        game.data.backpack.rolls           = 0; // = Semmeln
        game.data.backpack.tortilla_wraps  = 0;
        game.data.backpack.sour_cream      = 0;
        game.data.backpack.bacon           = 0;
        game.data.backpack.onions          = 0;
        game.data.backpack.garlic          = 0; // = Knoblauch
        game.data.backpack.sweet_pepper    = 0; // = Paprika
        game.data.backpack.milk            = 0;
        game.data.backpack.eggs            = 0;
        game.data.backpack.butter          = 0;
        game.data.backpack.curd            = 0; // = Quark
        game.data.backpack.potatoes        = 0;
        game.data.backpack.pasta           = 0;
        game.data.backpack.mozzarella      = 0;
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
		
        me.pool.register("GoodsEntity", game.GoodsEntity, true);
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
