// blah
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
    /* me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('recipe_dummy')
      ),
      3
    );
    */
    // add the return button
    var button = new game.HUD.myButton(632, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
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
 *  Detail View of Recipe 2
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
    }
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});