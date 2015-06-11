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
        me.loader.getImage('Kuechenzeile_BG')
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
        this.font.draw(renderer, "KUECHE", 268, 480);
        this.font.draw(renderer, " KOCHBUCH", 210, 210);
      },
      

    })), 3);
    

    // add the cooking game book button
    var button = new game.HUD.myButton(250, 240, "Salat", 128,128);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_game_1 );
    }
    me.game.world.addChild( button );
    // add bottom bar with z-index 3
    me.game.world.addChild(new game.HUD.BottomBar(0,400), 3);

  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  TitleScreen for Recipe 1
 */
game.CookingGameRecipeScreen = me.ScreenObject.extend({
 
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


/*
 *  Button to get to the Cooking Book screen
 */
game.HUD.Button_CookingBook = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "Topf";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "cooking_screen_button_icon"
      // define the object z order
      this.z = Infinity;
   },
   onClick:function (event)
   {
      // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }

      me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen());
      me.state.change(me.state.TITLE);
      return false;
   },
});