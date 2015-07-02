/* =======================================================================
 *  TitleScreen for Living Room
 */
game.LinvingRoomTitleScreen = me.ScreenObject.extend({
 
 /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_BG')
      ),
      2
    );
 
    // add a new renderable component to draw some text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font 
        this.font = new me.BitmapFont("32x32_font", 32);
        this.name = "mouse_over_text_holder";
        this.mouse_over_text = null;
      },

      update : function (dt) {
        return true;
      },
 
      drawMouseOverText : function(text){
        this.mouse_over_text = text;       
      },

      draw : function (renderer) {

        if( this.mouse_over_text != null ){
          this.font.draw(renderer, this.mouse_over_text, 300, 500, "center");
          this.mouse_over_text = null;
        }
        
      },
      

    })), 3);
    

    // add the kitchen link
    var button = new game.HUD.myButton(32, 280, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setMouseOverText("KUECHE");
    }
    me.game.world.addChild( button );
    
    // add bottom bar with z-index 3
    me.game.world.addChild(
      new me.Sprite (
        0,400,
        me.loader.getImage('bottom_bar')
      ),
      3
    );
  },
});
