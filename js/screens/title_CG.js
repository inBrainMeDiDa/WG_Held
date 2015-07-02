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
    

    // add the cooking book button
    var button = new game.HUD.myButton(250, 240, "Salat", 128,128);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book );
      button.setMouseOverText("KOCHBUCH");
    }
    me.game.world.addChild( button );

    // add the living room link
    button = new game.HUD.myButton(730, 360, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.living_room );
      button.setMouseOverText("WOHNZIMMER");
    }
    me.game.world.addChild( button, 4 );

     // add the fridge link
    button = new game.HUD.myButton(64, 360, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.fridge );
      button.setMouseOverText("KUEHLSCHRANK");
    }
    me.game.world.addChild( button, 4 );

    // add bottom bar with z-index 3
    me.game.world.addChild(new me.Sprite (0,400,me.loader.getImage('bottom_bar') ), 3);

  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  Fridge Screen
 */
game.FridgeScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Vorrat_BG')
      ),
      2
    );


    // fill with available ingredients with z-index 3 or higher
      // tomatos
      if( game.data.fridge.tomatos > 0 ){
         me.game.world.addChild( new me.Sprite ( 128, 150, me.loader.getImage('Tomate') ), 3 );
      }
      // baked beans
      if( game.data.fridge.baked_beans > 0 ){
         me.game.world.addChild( new me.Sprite ( 64, 150, me.loader.getImage('BakedBeansCan_textur') ), 4 );
      }
     
 
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
        this.font.draw(renderer, "VORRAT:", 64, 404);
        this.font.draw(renderer, "AUSREICHEND", 300, 404);

        if( this.mouse_over_text != null ){
          this.font.draw(renderer, this.mouse_over_text, 300, 500, "center");
          this.mouse_over_text = null;
        }
      },
      

    })), 3);

    // add the back (to kitchen) button
    var button = new game.HUD.myButton(720, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setMouseOverText("KUECHE");
    }
    me.game.world.addChild( button , 4);

    // add bottom bar with z-index 3
    me.game.world.addChild(new me.Sprite (0,400,me.loader.getImage('bottom_bar') ), 3);
  },

 
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  Title- / Welcome-Screen for Cooking Book
 */
game.CookingGameWelcomeScreen = me.ScreenObject.extend({
 
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
    

    // add the start button
    var button = new game.HUD.myButton(450, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    var button = new game.HUD.myButton(128, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
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
        this.font = new me.BitmapFont("32x32_font", 32);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "REZEPT 1", 280, 50);
        this.font.draw(renderer, "GEBACKENE BOHNEN", 128, 120);
        this.font.draw(renderer, "MIT TOMATEN.", 128, 154);
        this.font.draw(renderer, "TOMATEN:"+game.data.fridge.tomatos+"/2", 128, 250);
        this.font.draw(renderer, "BAKED BEANS:"+game.data.fridge.baked_beans+"/1", 128, 300);
        this.font.draw(renderer, "ZUBEREITUNG", 128, 350);
        if( game.data.fridge.tomatos > 1 && game.data.fridge.baked_beans > 0 ){
          this.font.draw(renderer, " START", 510, 424);
        }
      },
      

    })), 3);
    
    if( game.data.fridge.tomatos > 1 && game.data.fridge.baked_beans > 0 )
    {
       // add the start button
      var button = new game.HUD.myButton(450, 400, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_1 );
      }
      me.game.world.addChild( button );
    }
   
    // add the back (to previous page) button
    var button = new game.HUD.myButton(128, 480, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    var button = new game.HUD.myButton(632, 480, "button_arrow_right", 64,64);
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
 *  TitleScreen for Recipe 2
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
        this.font = new me.BitmapFont("32x32_font", 32);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "REZEPT 2", 280, 50);
        this.font.draw(renderer, "THE CAKE IS A LIE!", 120, 150);
        this.font.draw(renderer, "THE CAKE IS A LIE!", 120, 200);
        this.font.draw(renderer, "THE CAKE IS A LIE!", 120, 250);
        this.font.draw(renderer, "THE CAKE IS A LIE!", 120, 300);
        this.font.draw(renderer, "", 128, 234);
        this.font.draw(renderer, " CAKE", 510, 504);
      },
      

    })), 3);
    

    // add the start button
    var button = new game.HUD.myButton(450, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_game_1 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    var button = new game.HUD.myButton(128, 480, "button_arrow_left", 64,64);
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