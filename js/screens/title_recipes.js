// blah


/* =======================================================================
 *  TitleScreen for Recipe 1
 */
game.CookingGameRecipeScreen_1 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "GEBACKENE BOHNEN", 128, 100);
        this.font.draw(renderer, "MIT TOMATEN", 128, 150);
        this.font.draw(renderer, "2 BAKED BEANS", 128, 250);
        this.font.draw(renderer, "4 EIER", 128, 300);
        this.font.draw(renderer, "4 TOMATEN", 128, 350);
        this.font.draw(renderer, "2 ZWIEBELN", 128, 400);
        this.font.draw(renderer, "2 BROT", 128, 450);

        if( game.data.fridge.tomatos > 3 && game.data.fridge.baked_beans > 1 &&
            game.data.fridge.onions > 1 && game.data.fridge.rolls > 1 && 
            game.data.fridge.eggs > 3 ){
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    var button = null;

    if( game.data.fridge.tomatos > 3 && game.data.fridge.baked_beans > 1 &&
        game.data.fridge.onions > 1 && game.data.fridge.rolls > 1 && 
        game.data.fridge.eggs > 3 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_1 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_1 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_2 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 1
 */
game.DetailedRecipeScreen_1 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_eggnbeans')
      ),
      3
    );
    
    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 2 (Brotchips)
 */
game.CookingGameRecipeScreen_2 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "BROTCHIPS", 128, 100);
   
        this.font.draw(renderer, "BROT", 128, 250);
        this.font.draw(renderer, "BUTTER", 128, 300); 
        this.font.draw(renderer, "1 ZWIEBEL", 128, 350); 
        this.font.draw(renderer, "1 KNOBLAUCH", 128, 400); 
        

        if( !game.data.flag_oven_clickable && game.data.fridge.rolls > 0 && game.data.fridge.butter > 0 &&
            game.data.fridge.onions > 0 && game.data.fridge.garlic > 0){
          this.font.draw(renderer, "OFEN", 250, 500);
        }
      },
      

    })), 3);
    

    var button = null;

    if( !game.data.flag_oven_clickable && game.data.fridge.rolls > 0 && game.data.fridge.butter > 0 &&
        game.data.fridge.onions > 0 && game.data.fridge.garlic > 0 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_2 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_2 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_3 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 2 (Brotchips)
 */
game.DetailedRecipeScreen_2 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_bc')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_2 );
    }
    me.game.world.addChild( button );
    button.setClickSound( "page_turn" );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 3 (Flammkuchen)
 */
game.CookingGameRecipeScreen_3 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "FLAMMKUCHEN", 128, 100);
   
        this.font.draw(renderer, "WRAPS", 128, 250);
        this.font.draw(renderer, "2 SAURE SAHNE", 128, 300);
        this.font.draw(renderer, "1 ZWIEBEL", 128, 350); 
        this.font.draw(renderer, "1 PAPRIKA", 128, 400);
        this.font.draw(renderer, "1 SCHINKEN", 128, 450);
        

        if( !game.data.flag_oven_clickable && game.data.fridge.tortilla_wraps > 0 && game.data.fridge.sour_cream > 1 &&
            game.data.fridge.onions > 0 && game.data.fridge.sweet_pepper > 0 && game.data.fridge.bacon > 0 )
        {
          this.font.draw(renderer, " OFEN", 250, 500);
        }
      },
      

    })), 3);
    

    var button = null;

    if( !game.data.flag_oven_clickable && game.data.fridge.tortilla_wraps > 0 && game.data.fridge.sour_cream > 1 &&
        game.data.fridge.onions > 0 && game.data.fridge.sweet_pepper > 0 && game.data.fridge.bacon > 0 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_3 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_3 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_2 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_4 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 3 (Flammkuchen)
 */
game.DetailedRecipeScreen_3 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_fk')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_3 );
    }
    me.game.world.addChild( button );
    button.setClickSound( "page_turn" );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 4 (Griessbrei)
 */
game.CookingGameRecipeScreen_4 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "GRIESSBREI", 128, 100);
   
        this.font.draw(renderer, "MILCH", 128, 250); 
        this.font.draw(renderer, "BUTTER", 128, 300);
        this.font.draw(renderer, "2 EIER", 128, 350);
        this.font.draw(renderer, "GRIESS (DA)", 128, 400);
        this.font.draw(renderer, "ZUCKER (DA)", 128, 450);
        

        if( game.data.fridge.milk > 0 && game.data.fridge.butter > 0 && game.data.fridge.eggs > 0 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    

    var button = null;
    if( game.data.fridge.milk > 0 && game.data.fridge.butter > 0 && game.data.fridge.eggs > 0 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_4 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_4 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_3 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_5 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 4 (Griessbrei)
 */
game.DetailedRecipeScreen_4 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_gb')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_4 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 5 (Kartoffeln mit Quark)
 */
game.CookingGameRecipeScreen_5 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "KARTOFFELN", 128, 100);
        this.font.draw(renderer, "MIT QUARK", 128, 150);
   
        this.font.draw(renderer, "12 KARTOFFELN", 128, 250); 
        this.font.draw(renderer, "QUARK", 128, 300);
        this.font.draw(renderer, "MILCH", 128, 350);
        this.font.draw(renderer, "2 ZWIEBELN", 128, 400);
        this.font.draw(renderer, "1 PAPRIKA", 128, 450);
        

        if( game.data.fridge.milk > 0 && game.data.fridge.curd > 0 && game.data.fridge.sweet_pepper > 0 
           && game.data.fridge.onions > 1 && game.data.fridge.potatoes > 11 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    var button = null;

    if( game.data.fridge.milk > 0 && game.data.fridge.curd > 0 && game.data.fridge.sweet_pepper > 0 
           && game.data.fridge.onions > 1 && game.data.fridge.potatoes > 11 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_5 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_5 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_4 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_6 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 5 (Kartoffeln mit Quark)
 */
game.DetailedRecipeScreen_5 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_kq')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_5 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 6 (Nudeln mit Tomatensosse)
 */
game.CookingGameRecipeScreen_6 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "NUDELN MIT", 128, 100);
        this.font.draw(renderer, "TOMATENSOSSE", 128, 150);
   
        this.font.draw(renderer, "9 TOMATEN", 128, 250); 
        this.font.draw(renderer, "1 MOZARELLA", 128, 300);
        this.font.draw(renderer, "1 ZWIEBEL", 128, 350);
        this.font.draw(renderer, "1 KNOBLAUCH", 128, 400);
        

        if( game.data.fridge.tomatos > 8 && game.data.fridge.mozzarella > 0
           && game.data.fridge.onions > 1 && game.data.fridge.garlic > 1 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    var button = null;

    if( game.data.fridge.tomatos > 8 && game.data.fridge.mozzarella > 0
           && game.data.fridge.onions > 1 && game.data.fridge.garlic > 1 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_6 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_6 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_5 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_7 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 6 (Nudeln mit Tomatensosse)
 */
game.DetailedRecipeScreen_6 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_pasta')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_6 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 7 (Obstsalat)
 */
game.CookingGameRecipeScreen_7 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "GESUNDER", 128, 100);
        this.font.draw(renderer, "OBSTSALAT", 128, 150);
        
        this.font.draw(renderer, "VOLLER", 128, 250); 
        this.font.draw(renderer, "OBSTKORB", 128, 300);
        
         if( game.data.fridge.fruits > 0 ) 
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    var button = null;
    if( !game.flag_fruit_basket_clickable && game.data.fridge.fruits > 0 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_7 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_7 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_6 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_8 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 7 (Obstsalat)
 */
game.DetailedRecipeScreen_7 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_os')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_7 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 8 ( Chili con Carne )
 */
game.CookingGameRecipeScreen_8 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "CHILI CON", 128, 100);
        this.font.draw(renderer, "CARNE", 128, 150);
        
        this.font.draw(renderer, "KIDNEY BOHNEN", 128, 250); 
        this.font.draw(renderer, "2 TOMATEN", 128, 300);
        this.font.draw(renderer, "2 ZWIEBELN", 128, 350);
        this.font.draw(renderer, "1 PABRIKA", 128, 400);
        
        if( game.data.fridge.tomatos > 1 && game.data.fridge.kidney_beans > 0
           && game.data.fridge.onions > 1 && game.data.fridge.sweet_pepper > 0 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    var button = null;

    if( game.data.fridge.tomatos > 1 && game.data.fridge.kidney_beans > 0
           && game.data.fridge.onions > 1 && game.data.fridge.sweet_pepper > 0 )
    {
       // add the start button
      button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_8 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_8 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_7 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );


    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 *  Detail View of Recipe 8 ( Chili con Carne )
 */
game.DetailedRecipeScreen_8 = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // background
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('book_BG')
      ),
      2
    );
    // recipe
     me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_chili')
      ),
      3
    );

    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_8 );
      button.setClickSound( "page_turn" );
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});