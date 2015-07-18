
/* Game namespace */
var game = {

    current_music_track : "Electric_Mirrors_Dream_Unlimited_Company",

    // an object where to store game information
    data : {
        // score
        score : 0,
        // money
        money : 200,    money_required_to_win : 1701,
        // dialog pointer
        dialog_pointer : 0,
        // flag whether the oven should be clicked or not
        flag_oven_clickable : false,
        // flag whether the fruit_basket should be clicked or not
        flag_fruit_basket_clickable : false,
        // ingredient storage
        fridge : {
            tomatos         : 3,    tomatos_cost : 10,
            cheese          : 1,    cheese_cost : 15,
            chips           : 0,    chips_cost : 5,
            baked_beans     : 1,    baked_beans_cost : 8,
            kidney_beans    : 1,    kidney_beans_cost : 8,
            salat           : 1,    salat_cost : 6,
            rolls           : 0,    rolls_cost : 12,// = Semmeln 
            tortilla_wraps  : 0,    tortilla_wraps_cost : 10,
            sour_cream      : 0,    sour_cream_cost : 2,
            bacon           : 0,    bacon_cost : 25,
            onions          : 0,    onions_cost : 1,
            garlic          : 0,    garlic_cost : 2,// = Knoblauch
            sweet_pepper    : 0,    sweet_pepper_cost : 3,// = Paprika
            milk            : 0,    milk_cost : 10,
            eggs            : 0,    eggs_cost : 12,
            butter          : 0,    butter_cost : 5,
            curd            : 0,    curd_cost : 2, // = Quark
            potatoes        : 0,    potatoes_cost : 15,
            pasta           : 0,    pasta_cost : 10,
            mozzarella      : 0,    mozzarella_cost : 12,
            fruits          : 0,    fruits_cost : 30,
        },

        backpackLoad : 0, // = space in backpack


        backpack : {
            tomatos         : 0,
            cheese          : 0,
            chips           : 0,
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
            fruits          : 0
        },

        displayBackpack : {
        position1 : "",
        position2 : "",
        position3 : "",
        position4 : "",
        },  
    },
    // global hyperlinks used for navigation between screens.
    // Because it's a cool idea, I call them ultralinks.
    ultralink : {
        nowhere         : 9999,
        reset_oven      : 9998,
        reset_fruit_basket : 9997,
        new_game        : 998,
        resume_game     : 997,
        main_menu       : 0,
        kitchen         : 1,
        fridge          : 2,
        shelf           : 3,
        // CG welcome screen
        cooking_book    : 4, 
        // recipes
        cooking_book_1  : 41, 
        cooking_book_2  : 42, 
        cooking_book_3  : 43, 
        cooking_book_4  : 44, 
        cooking_book_5  : 45, 
        cooking_book_6  : 46,
        cooking_book_7  : 47, 
        cooking_book_8  : 48, 
        // detailed recipes
        recipe_1        : 51,
        recipe_2        : 52,
        recipe_3        : 53,
        recipe_4        : 54,
        recipe_5        : 55,
        recipe_6        : 56,
        recipe_7        : 57,
        recipe_8        : 58,
        // misc.
        next_dialog     : 6,
        cooking_game_1  : 71,
        cooking_game_2  : 72,
        cooking_game_3  : 73,
        cooking_game_4  : 74,
        cooking_game_5  : 75,
        cooking_game_6  : 76,
        cooking_game_7  : 77,
        cooking_game_8  : 78,
        living_room     : 8,
        dialog_room     : 9,
        hall_room       : 10,
        JR_title        : 11,
        JR_bafoeg       : 12
    },

    emptyDisplayBackpack : function(){
        game.data.displayBackpack.position1 = "";
        game.data.displayBackpack.position2 = "";
        game.data.displayBackpack.position3 = "";
        game.data.displayBackpack.position4 = "";
    },

    killDisplayBackpack : function(string){
        icon = me.game.world.getChildByName(string);
      for( var i=0; i < icon.length; ++i){
        me.game.world.removeChild(icon[i]);
      }
    },

    lowerBackpackLoad : function(){
        if(game.data.backpackLoad > 0){
            game.data.backpackLoad -= 1;
        }
    },
 
    updateDisplayBackpack : function(string){
    var icon = null;

    if(game.data.displayBackpack.position1 == ""){
      game.data.displayBackpack.position1 = string;

      this.killDisplayBackpack("backpack_icon_1");
      icon =  new game.HUD.myCanvas(294, 525,string, 32, 32);
      if( icon != null ){
        icon.name = "backpack_icon_1";
        // persistent across level change
        icon.isPersistent = true;
        icon.alwaysUpdate = true;
        icon.updateWhenPaused =true;
        me.game.world.addChild( icon , Infinity);
        console.log("child added. "+string);
      }   
    }else if(game.data.displayBackpack.position2 == ""){
      game.data.displayBackpack.position2 = string;

    this.killDisplayBackpack("backpack_icon_2");
      icon =  new game.HUD.myCanvas(326, 525,string, 32, 32);
      if( icon != null ){
        icon.name = "backpack_icon_2";
        // persistent across level change
        icon.isPersistent = true;
        icon.alwaysUpdate = true;
        icon.updateWhenPaused =true;
        me.game.world.addChild( icon , Infinity);
      }
    }else if(game.data.displayBackpack.position3 == ""){
      game.data.displayBackpack.position3 = string;

    this.killDisplayBackpack("backpack_icon_3");
      icon =  new game.HUD.myCanvas(294, 560,string, 32, 32);
      if( icon != null ){
        icon.name = "backpack_icon_3";
        // persistent across level change
        icon.isPersistent = true;
        icon.alwaysUpdate = true;
        icon.updateWhenPaused =true;
        me.game.world.addChild( icon , Infinity );
      }
    }else if(game.data.displayBackpack.position4 == ""){
      game.data.displayBackpack.position4 = string;

    this.killDisplayBackpack("backpack_icon_4");
      icon =  new game.HUD.myCanvas(326, 560,string, 32, 32);
      if( icon != null ){
        icon.name = "backpack_icon_4";
        // persistent across level change
        icon.isPersistent = true;
        icon.alwaysUpdate = true;
        icon.updateWhenPaused =true;
        me.game.world.addChild( icon , Infinity);
      }
    }
  },

    switch_to_kitchen_oven : function(){
        if( game.data.flag_oven_clickable ){
            return;
        } else {
            game.data.flag_oven_clickable = true;
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
        }
    },
    reset_kitchen_oven : function(){
            game.data.flag_oven_clickable = false;
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
    },
    switch_to_kitchen_fruit_basket : function(){
        if( game.data.flag_fruit_basket_clickable ){
            return;
        } else {
            game.data.flag_fruit_basket_clickable = true;
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
        }
    },
    reset_kitchen_fruit_basket : function(){
            game.data.flag_fruit_basket_clickable = false;
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
    },
    update_dialog_pointer : function(){
        switch( game.data.dialog_pointer ){
            // exit after first sequence
            case 5:  me.state.set(me.state.TITLE, new game.LinvingRoomTitleScreen());
                     me.state.change(me.state.TITLE);
                     break;
            default: game.data.dialog_pointer += 1;

        }
    },

    reset_game_state : function(){
        game.data.dialog_pointer = 0;

        game.data.fridge.tomatos         = 300;
        game.data.fridge.cheese          = 100;
        game.data.fridge.chips           = 100;
        game.data.fridge.baked_beans     = 100;
        game.data.fridge.kidney_beans    = 100;
        game.data.fridge.salat           = 100;
        game.data.fridge.rolls           = 100; // = Semmeln
        game.data.fridge.tortilla_wraps  = 100;
        game.data.fridge.sour_cream      = 100;
        game.data.fridge.bacon           = 100;
        game.data.fridge.onions          = 100;
        game.data.fridge.garlic          = 100; // = Knoblauch
        game.data.fridge.sweet_pepper    = 100; // = Paprika
        game.data.fridge.milk            = 100;
        game.data.fridge.eggs            = 100;
        game.data.fridge.butter          = 100;
        game.data.fridge.curd            = 100; // = Quark
        game.data.fridge.potatoes        = 100;
        game.data.fridge.pasta           = 100;
        game.data.fridge.mozzarella      = 100;
        game.data.fridge.fruits          = 1;

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
        game.data.backpack.fruits          = 0;
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
    me.state.set(me.state.LOADING, new game.LoadingScreen());
    me.state.change(me.state.LOADING);
},

	
    // Run on game resources loaded.
    "loaded" : function () {

        // set the "Play/Ingame" Screen Objects

        //Brit Intro
        //me.state.set(me.state.INTRO, new game.IntroScreen());
        //End
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
         me.pool.register("ReturnFieldEntity", game.ReturnFieldEntity, true);

        // register ingredient entities
		me.pool.register("tomato", game.IngredientEntity, true);
		me.pool.register("kaese", game.IngredientEntity, true);
        me.pool.register("baked_beans", game.IngredientEntity, true);
        me.pool.register("kidney_beans", game.IngredientEntity, true);
        me.pool.register("butter", game.IngredientEntity, true);
        me.pool.register("chips", game.IngredientEntity, true);
        me.pool.register("eggs", game.IngredientEntity, true);
        me.pool.register("potatoes", game.IngredientEntity, true);
        me.pool.register("garlic", game.IngredientEntity, true);
        me.pool.register("milk", game.IngredientEntity, true);
        me.pool.register("mozzarella", game.IngredientEntity, true);
        me.pool.register("pasta", game.IngredientEntity, true);
        me.pool.register("sweet_pepper", game.IngredientEntity, true);
        me.pool.register("curd", game.IngredientEntity, true);
        me.pool.register("sour_cream", game.IngredientEntity, true);
        me.pool.register("bacon", game.IngredientEntity, true);
        me.pool.register("rolls", game.IngredientEntity, true);
        me.pool.register("tortilla_wraps", game.IngredientEntity, true);
        me.pool.register("onions", game.IngredientEntity, true);


		me.pool.register("pot", game.PotOfWisdomEntity,true);

         //new game
        me.pool.register("RespawnEntity", game.RespawnEntity, true);
		
		// enable the keyboard
        me.input.bindKey(me.input.KEY.E,    "empty", true);
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
		me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.SPACE,     "jump", true);
				
        // Start the game.
        me.state.change(me.state.MENU);

        // FOR TESTING THE FRIDGE
        /*game.reset_game_state(); 
        me.state.set(me.state.TITLE, new game.ShelfScreen());
        me.state.change(me.state.TITLE);
        */
    }
};
