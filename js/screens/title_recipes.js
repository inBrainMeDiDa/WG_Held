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
        me.loader.getImage('recipe_dummy')
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