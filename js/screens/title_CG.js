/* =======================================================================
 *  TitleScreen for CookingGame a.k.a. "The Kitchen"
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
        this.font.draw(renderer, "GELD:"+parseInt(game.data.money)+"/"+parseInt(game.data.money_required_to_win), 350, 550, "left");
      },
      

    })), 3);
    

    // add the cooking book button
    var button = new game.HUD.myButton(340, 260, "kochbuch_zu", 128,128);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book );
      button.setMouseOverText("KOCHBUCH");
    }
    me.game.world.addChild( button );

    // add the living room link
    button = new game.HUD.myButton(720, 360, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.living_room );
      button.setMouseOverText("WOHNZIMMER");
      button.setClickSound( "door_close" );
    }
    me.game.world.addChild( button, 4 );

    // add the fridge link
    button = new game.HUD.myButton(64, 360, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.fridge );
      button.setMouseOverText("KUEHLSCHRANK");
      button.setClickSound( "fridge_open" );
    }
    me.game.world.addChild( button, 4 );

    // add the shelf link
    button = new game.HUD.myButton(64, 100, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.shelf );
      button.setMouseOverText("REGAL");
      button.setClickSound( null );
    }
    me.game.world.addChild( button, 4 );

    // spices
    button = new game.HUD.myButton( 100, 250, "Spices_tex", 128, 128);
    if( button ){
      button.setHyperlink( game.ultralink.nowhere );
      button.setMouseOverText("GEWUERZE: VOLL");
    }
    me.game.world.addChild( button , 4);

    // fruit basket
    if( game.data.fridge.fruits > 0 )
    {
      button = new game.HUD.myButton( 220, 220, "Fruits_tex", 128, 128);
      if( button ){
        button.setHyperlink( game.ultralink.nowhere );
        button.setMouseOverText("OBSTKORB: VOLL");
        button.setClickSound("squelch_1");
      }
      me.game.world.addChild( button , 4);
    }
    
    // oven button
    if( game.data.flag_oven_clickable )
    {
      button = new game.HUD.myButton(500, 400, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.reset_oven );
        button.setMouseOverText("IM OFEN BACKEN");
        button.setClickSound( "oven_sfx" );
      }
      me.game.world.addChild( button );
    }
    // fruit basket button
    if( game.data.flag_fruit_basket_clickable )
    {
      button = new game.HUD.myButton(220, 220, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.reset_fruit_basket );
        button.setMouseOverText("OBSTSALAT ZUB.");
        button.setClickSound("knive_on_plate");
      }
      me.game.world.addChild( button );
    }

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
          this.font.draw(renderer, this.mouse_over_text, 200, 500, "center");
          this.mouse_over_text = null;
        }
      },
      

    })), 3);

    // fill with available ingredients with z-index 3 or higher
    var ingredient = null;
    // tomatos
    if( game.data.fridge.tomatos > 0 ){
      //me.game.world.addChild( new me.Sprite ( 128, 150, me.loader.getImage('Tomate') ), 3 );
      ingredient = new game.HUD.myButton( 64, 150, "Tomate", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("TOMATEN:"+game.data.fridge.tomatos);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // sour cream
    if( game.data.fridge.sour_cream > 0 ){
      ingredient = new game.HUD.myButton( 192, 150, "SaureSahne_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("SAURE SAHNE:"+game.data.fridge.sour_cream);
      }
      me.game.world.addChild( ingredient , 4);
    }
    // eggs
    if( game.data.fridge.eggs > 0 ){
      ingredient = new game.HUD.myButton( 240, 280, "Eier_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("EIER:"+game.data.fridge.eggs);
      }
      me.game.world.addChild( ingredient , 4);
    }
    // butter
    if( game.data.fridge.butter > 0 ){
      ingredient = new game.HUD.myButton( 80, 220, "Butter_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("BUTTER:"+game.data.fridge.butter);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // cheese
    if( game.data.fridge.cheese > 0 ){
      ingredient = new game.HUD.myButton( 256, 150, "Kaese_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("KAESE:"+game.data.fridge.cheese);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // curd
    if( game.data.fridge.curd > 0 ){
      ingredient = new game.HUD.myButton( 500, 80, "Quark_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("QUARK:"+game.data.fridge.curd);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // mozarella
    if( game.data.fridge.mozzarella > 0 ){
      ingredient = new game.HUD.myButton( 400, 70, "Mozarella_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("MOZARELLA:"+game.data.fridge.mozzarella);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // sweet pepper
    if( game.data.fridge.sweet_pepper > 0 ){
      ingredient = new game.HUD.myButton( 150, 16, "Paprika_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("PAPRIKA:"+game.data.fridge.sweet_pepper);
      }
      me.game.world.addChild( ingredient , 4);
    }
    // bacon
    if( game.data.fridge.bacon > 0 ){
      ingredient = new game.HUD.myButton( 260, 50, "Schinken_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("SCHINKEN:"+game.data.fridge.bacon);
      }
      me.game.world.addChild( ingredient , 3);
    }

    // add the back (to kitchen) button
    var button = new game.HUD.myButton(720, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setMouseOverText("KUECHE");
      button.setClickSound( "fridge_close" );
    }
    me.game.world.addChild( button , 4);

    // add bottom bar with z-index 3
    me.game.world.addChild(new me.Sprite (0,400,me.loader.getImage('bottom_bar') ), 3);
  },

 
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  Shelft Screen
 */
game.ShelfScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Regal_BG')
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
          this.font.draw(renderer, this.mouse_over_text, 200, 500, "center");
          this.mouse_over_text = null;
        }
      },
      

    })), 3);

    // fill with available ingredients with z-index 3 or higher
    var ingredient = null;
    // bread rolls
    if( game.data.fridge.rolls > 0 ){
      ingredient = new game.HUD.myButton( 200, 290, "Semmeln_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("BROT:"+game.data.fridge.rolls);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // potatoes
    if( game.data.fridge.potatoes > 0 ){
      ingredient = new game.HUD.myButton( 320, 280, "Kartoffel_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("KARTOFFELN:"+game.data.fridge.potatoes);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // garlic
    if( game.data.fridge.garlic > 0 ){
      ingredient = new game.HUD.myButton( 440, 280, "Knoblauch_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("KNOBLAUCH:"+game.data.fridge.garlic);
      }
      me.game.world.addChild( ingredient , 4);
    }
    // onions
    if( game.data.fridge.onions > 0 ){
      ingredient = new game.HUD.myButton( 540, 280, "Zwiebel_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("ZWIEBELN:"+game.data.fridge.onions);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // milk
    if( game.data.fridge.milk > 0 ){
      ingredient = new game.HUD.myButton( 100, 280, "Milch_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("H-MILCH:"+game.data.fridge.milk);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // pasta
    if( game.data.fridge.pasta > 0 ){
      ingredient = new game.HUD.myButton( 100, 80, "Nudeln_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("NUDELN:"+game.data.fridge.pasta);
      }
      me.game.world.addChild( ingredient , 4);
    }
    // wraps
    if( game.data.fridge.tortilla_wraps > 0 ){
      ingredient = new game.HUD.myButton( 180, 80, "Wraps_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("WRAPS:"+game.data.fridge.tortilla_wraps);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // kidney beans
    if( game.data.fridge.kidney_beans > 0 ){
      ingredient = new game.HUD.myButton( 280, 80, "KidneyBohnenCan_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("KIDNEY BOHNEN:"+game.data.fridge.kidney_beans);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // baked beans
    if( game.data.fridge.baked_beans > 0 ){
      ingredient = new game.HUD.myButton( 380, 80, "BakedBeansCan_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("BAKED BEANS:"+game.data.fridge.baked_beans);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // chips
    if( game.data.fridge.chips > 0 ){
      ingredient = new game.HUD.myButton( 530, 72, "Chips_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("CHIPS:"+game.data.fridge.chips);
      }
      me.game.world.addChild( ingredient , 3);
    }

    // add the back (to kitchen) button
    var button = new game.HUD.myButton(720, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.kitchen );
      button.setMouseOverText("KUECHE");
      button.setClickSound( null );
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
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
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
      },
      

    })), 3);
    
    // play new music track
    if( game.current_music_track != "Jahzzar_Sometimes" )
    {
        game.current_music_track = "Jahzzar_Sometimes";
        me.audio.stopTrack();
        me.audio.playTrack( game.current_music_track );
    }

    // add the start button
    var button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
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