/* =======================================================================
 *  TitleScreen for J&R Game
 */
game.JRGameTitleScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Amt_aussen_BG')
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
        this.font.draw(renderer, "DAS AMT", 280, 50);
        this.font.draw(renderer, "FINDE ALLE DOKUMENTE", 128, 120);
        this.font.draw(renderer, "UND GEHE NICHT IM", 128, 154);
        this.font.draw(renderer, "AMT VERLOREN!", 128, 188);
        this.font.draw(renderer, "NUTZE DIE PFEILTASTEN", 128, 300);
        this.font.draw(renderer, "X = SPRINGEN", 128, 334);
        this.font.draw(renderer, " START", 510, 504);
      },
      

    })), 3);
    

    // add the J&R game demo button
    var button = new game.HUD.myButton(450, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_bafoeg );
    }
    me.game.world.addChild( button );
  },
 

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});