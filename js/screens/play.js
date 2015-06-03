game.PlayScreen = me.ScreenObject.extend({


    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
	
		// global vars
		var selected_ingredient = null;
		var temp_ingredient = null;
		var ingredients = [];
		var max_selection_dist = 80;
		
		var vector_a = new me.Vector2d(0,0);
		var vector_b = new me.Vector2d(0,0);
		
         // load a level
		me.levelDirector.loadLevel("testmap");
		
		// enable input
		// map mouse to keyboard for selection handling
		me.input.bindKey(me.input.KEY.S, "select");
		me.input.bindPointer(me.input.KEY.S);

		
		// reset the score
        game.data.score = 0;
		
		/*
		 *	event listeners
		 */
		 this.pointerDown= me.event.subscribe("pointerdown", 
		 function (event) {
			
			if(!selected_ingredient)
			{
				//alert("select new");
				ingredients = [];
				tomatos = me.game.world.getChildByName("tomato");
				cheese = me.game.world.getChildByName("kaese");

				// append tomatos to ingredients-array
				for(var i = 0; i < tomatos.length; ++i)
				{
					// first, tell every tomato item it is a tomato
					tomatos[i].set_texture_string("Tomate");
					// append to ingredients
					ingredients.push(tomatos[i]);
				}
				// append cheese to ingredients-array
				for(var i = 0; i < cheese.length; ++i)
				{
					// first, tell every cheese item it is cheese
					cheese[i].set_texture_string("Kaese_textur");
					// append to ingredients
					ingredients.push(cheese[i]);
				}

				for(var i = 0; i < ingredients.length; ++i)
				{
					temp_ingredient = ingredients[i];
					
					vector_a.x = temp_ingredient.pos.x - event.gameX;
					vector_a.y = temp_ingredient.pos.y - event.gameY;
					
					if(selected_ingredient)
					{
						vector_b.x = selected_ingredient.pos.x - event.gameX;
						vector_b.y = selected_ingredient.pos.y - event.gameY;
					}
					
					if( !selected_ingredient || vector_a.length2() < vector_b.length2() )
					{
						selected_ingredient = temp_ingredient;
					}
				}
				
				if( selected_ingredient )
				{
					vector_b.x = selected_ingredient.pos.x - event.gameX;
					vector_b.y = selected_ingredient.pos.y - event.gameY;
					
					if( vector_b.length2() < max_selection_dist*max_selection_dist )
					{
						selected_ingredient.b_selected = true;
					}
					else
					{
						selected_ingredient = null;
					}
				}
			}
		});
		
		this.pointerUp= me.event.subscribe("pointerup", 
		 function (event) {
			
			if(selected_ingredient)
			{
				selected_ingredient.b_selected = false;
				selected_ingredient = null;
			}
			
		});
		
		
		// register event listeners
		me.input.registerPointerEvent("pointerdown", me.game.viewport, 
										function (event) {me.event.publish("pointerdown", [ event ]);});
				
		me.input.registerPointerEvent("pointerup", me.game.viewport, 
										function (event) {me.event.publish("pointerup", [ event ]);});

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

	
	
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
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
	
		// global vars
		var selected_coin = null;
		var temp_coin = null;
		var coins = [];
		
		var vector_a = new me.Vector2d(0,0);
		var vector_b = new me.Vector2d(0,0);
		
		
         // load a level
		me.levelDirector.loadLevel("area02");
		me.game.world.addChild(new me.ColorLayer("background", "#6633FF", 0));
		console.log(me.levelDirector.levelCount());
		
		// enable input
		// map mouse to keyboard
		me.input.bindKey(me.input.KEY.S, "select");
		me.input.bindPointer(me.input.KEY.S);

		
		// reset the score
        game.data.score = 0;
        
		
		/*
		 *	event listeners
		 */

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

	
	
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
