/* =======================================================================
 *  TitleScreen for CookingGame
 */
game.CookingGameTitleScreen = me.ScreenObject.extend({
 
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
 
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 32);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "KOCHSPIEL", 280, 50);
        this.font.draw(renderer, "ZIEHE DIE ZUTATEN", 128, 120);
        this.font.draw(renderer, "IN DEN TOPF.", 128, 154);
        this.font.draw(renderer, "ACHTE AUF DIE ZEIT", 128, 200);
        this.font.draw(renderer, "UND REIHENFOLGE.", 128, 234);
        this.font.draw(renderer, " START", 510, 504);
      },
      

    })), 3);
    

    // add the cooking game demo button
    var button = new game.HUD.Button_CookingDemo(450, 480, "button_arrow_right", 64,64);
    me.game.world.addChild( button );
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
