game.PlayScreen_CG = me.ScreenObject.extend({


    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
	
		// global vars
		var selected_ingredient = null;
		var temp_ingredient = null;
		var ingredients = [];
		var max_selection_dist = 160;
		
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
		this.pointerDownHandler = me.input.registerPointerEvent("pointerdown", me.game.viewport, 
										function (event) {me.event.publish("pointerdown", [ event ]);});
				
		this.pointerUpHandler = me.input.registerPointerEvent("pointerup", me.game.viewport, 
										function (event) {me.event.publish("pointerup", [ event ]);});

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        // configure the GameController
        this.HUD.set_active_gamecontroller( new game.HUD.CookingGameController(888,888) );
    	var GC = this.HUD.get_active_gamecontroller();
    	if( GC ){
    		GC.set_recipe(["Kaese_textur", 5000,
	                      "timer_tex", 5000,
	                      "Tomate", 2000, 
	                      "timer_tex", 3000,
	                      "Tomate", 2000,
	                      "timer_tex", 5000,] );
    	}
    },


	
	
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        /* HACK: this makes evil stuff happen on state change
         * for some reason yet unknown.
         
        me.input.unbindKey(me.input.KEY.S);
    	me.input.unbindPointer(me.input.mouse.LEFT);
    	me.event.unsubscribe(this.pointerDownHandler);
    	me.event.unsubscribe(this.pointerUpHandler);
    	*/
    }
});


/* =======================================================================
 * the one and only cooking game controller class
 */
game.HUD.CookingGameController = me.Renderable.extend( {
  /**
  * constructor
  */
  init: function(x, y) {
 
    // call the parent constructor
    // (size does not matter here)
    this._super(me.Renderable, 'init', [x, y, 10, 10]);
    // give a name
    this.name = "CookingGameController";
    // array of strings that holds the recipe (and suiting textures)
    this.current_recipe = [];
    this.recipe_pointer = 0;
    // endgame_font must be initialized as null for it is needed at game's end
    this.endgame_font = null;
    // get met the timer!
    this.Timer = me.game.world.getChildByName("TheTimer");
    this.Timer = this.Timer[0];

    this.set_recipe( ["Kaese_textur", 10000,
                      "timer_tex", 3000,
                      "Kaese_textur", 5000, 
                      "timer_tex", 3000,
                      "Tomate", 2000,
                      "timer_tex", 3000,] );
    
    // local copy of the global score
    this.score = -1;

    if( theHUD ){
      // add bottom bar
      theHUD.addChild(new game.HUD.BottomBar(0,400));
      // add our child score object at the right-bottom position
      theHUD.addChild(new game.HUD.ScoreItem(10, 540));
       // add the time bar
      var timebar = new game.HUD.ChargeBar(180,-10);
      theHUD.addChild(new game.HUD.ChargeBarBG(180,-10));
      theHUD.addChild( timebar );
      // add the timer
      theHUD.timer = new game.HUD.TimerItem(180, 10);
      theHUD.timer.set_timebar( timebar );
      theHUD.addChild( theHUD.timer );
      // add the icon canvas
      theHUD.addChild( new game.HUD.myCanvas(400,-10,"Tomate", 128, 128) );
    }
   
  },
 

  // set current recipe
  set_recipe : function( new_recipe ){
    if( !new_recipe || new_recipe.length < 1 )
      return;

    this.current_recipe = new_recipe;
    this.recipe_pointer = 0;

    this.Timer = me.game.world.getChildByName("TheTimer")[0];


    if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
      console.log("this.recipe_pointer: "+this.recipe_pointer);
      this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
    }
    this.update_ingredient_icon();
  },


  // update ingredient icon
  update_ingredient_icon : function(){
    // setup a new icon, discard the old one
    var icon = theHUD.getChildByName("ingredient_icon");
    for( var i=0; i < icon.length; ++i){
      theHUD.removeChild(icon[i]);
    }
    theHUD.addChild( new game.HUD.myCanvas(400,-10,this.current_recipe[ this.recipe_pointer ], 128, 128) );
  },

  //
  step_recipe : function(){
    if( theHUD ){
      // increment the recipe pointer
      if( this.recipe_pointer < this.current_recipe.length-2 ){
        this.recipe_pointer += 2;
      }
      console.log("next on schedule: "+this.current_recipe[ this.recipe_pointer ]);
      
      this.update_ingredient_icon();
      // set the Timer
      if( this.Timer && this.recipe_pointer < this.current_recipe.length-1 ){
        this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
      }
    }
  },


  // get current recipe entry
  get_current_recipe_entry : function(){
    return this.current_recipe[ this.recipe_pointer ];
  },


  // 
  recipe_finished : function(){

    // if there is a font defined, the game is over
    if( this.endgame_font ){
      return true;
    }

    if( this.recipe_pointer >= this.current_recipe.length-2 ){

      // display end screen
      //theHUD.addChild( new game.HUD.myCanvas(0,0,"book_BG", 800, 600) );
      me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      200
      );

      // add a font
      this.endgame_font = new me.BitmapFont("32x32_font", 32);
      
      return true;
    }else{
      return false;
    }
  },

  // needed to draw text to the screen
  draw : function (renderer) {

    if( this.endgame_font ){
      this.endgame_font.draw(renderer, "AUSWERTUNG:", 300, 160);
      this.endgame_font.draw(renderer, "PUNKTE ERREICHT: "+game.data.score+"/"+(this.current_recipe.length/4), 40, 220);
    
      if( game.data.score >= (this.current_recipe.length/4) ){
        this.endgame_font.draw(renderer, "EXZELLENT !", 300, 320);
      }else if( game.data.score < 1 ){
        this.endgame_font.draw(renderer, "DAS WAR NIX !", 250, 320);
      }else{
        this.endgame_font.draw(renderer, "NA JA...ESSBAR.", 220, 320);
      }

    }
  },

  // update function
  update : function (dt) {
    // find the Timer
    if( !this.Timer ){
      this.Timer = me.game.world.getChildByName("TheTimer");
      if( this.Timer[0] ){
        this.Timer = this.Timer[0];
        this.Timer.set_timer(this.current_recipe[ this.recipe_pointer + 1]);
      }
    }
    // return true if the score has been updated
    if (this.score != game.data.score) {
      this.score = game.data.score;

      // update next recipe entry 
      if( this.score > 0 )
      {    
        this.step_recipe();
      }
      return true;
    }
    return false;
  },

  onDestroyEvent: function() {
       if( theHUD ){
        var icon = theHUD.getChildByName("ingredient_icon");
        for( var i=0; i < icon.length; ++i){
          theHUD.removeChild(icon[i]);
        }

        var Timer = me.game.world.getChildByName("TheTimer");
        theHUD.removeChild(Timer[0]);
      }
  },

});