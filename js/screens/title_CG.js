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
    }
    me.game.world.addChild( button, 4 );

     // add the fridge link
    button = new game.HUD.myButton(64, 360, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.fridge );
      button.setMouseOverText("KUEHLSCHRANK");
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
    button = new game.HUD.myButton( 220, 220, "Fruits_tex", 128, 128);
    if( button ){
      button.setHyperlink( game.ultralink.nowhere );
      button.setMouseOverText("OBSTKORB: VOLL");
    }
    me.game.world.addChild( button , 4);

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
      ingredient = new game.HUD.myButton( 128, 150, "Tomate", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("TOMATEN:"+game.data.fridge.tomatos);
      }
      me.game.world.addChild( ingredient , 3);
    }
    // baked beans
    if( game.data.fridge.baked_beans > 0 ){
       //me.game.world.addChild( new me.Sprite ( 64, 150, me.loader.getImage('BakedBeansCan_textur') ), 4 );
      ingredient = new game.HUD.myButton( 64, 150, "BakedBeansCan_textur", 128, 128);
      if( ingredient ){
        ingredient.setHyperlink( game.ultralink.nowhere );
        ingredient.setMouseOverText("BAKED BEANS:"+game.data.fridge.baked_beans);
      }
      me.game.world.addChild( ingredient , 4);
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
    

    // add the start button
    var button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
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
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "GEBACKENE BOHNEN", 128, 100);
        this.font.draw(renderer, "MIT TOMATEN", 128, 150);
        this.font.draw(renderer, "TOMATEN:", 128, 250); this.font.draw(renderer, game.data.fridge.tomatos+"/2", 432, 250);
        this.font.draw(renderer, "BAKED BEANS:", 128, 300); this.font.draw(renderer, game.data.fridge.baked_beans+"/1", 432, 300);

        if( game.data.fridge.tomatos > 1 && game.data.fridge.baked_beans > 0 ){
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    if( game.data.fridge.tomatos > 1 && game.data.fridge.baked_beans > 0 )
    {
       // add the start button
      var button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_1 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    var button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_1 );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_2 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
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
   
        this.font.draw(renderer, "BROT:", 128, 250); this.font.draw(renderer, game.data.fridge.rolls+"/1", 432, 250);
        this.font.draw(renderer, "BUTTER:", 128, 300); this.font.draw(renderer, game.data.fridge.butter+"/1", 432, 300);
        this.font.draw(renderer, "ZWIEBEL:", 128, 350); this.font.draw(renderer, game.data.fridge.onions+"/1", 432, 350);
        this.font.draw(renderer, "KNOBLAUCH:", 128, 400); this.font.draw(renderer, game.data.fridge.garlic+"/1", 432, 400);
        

        if( game.data.fridge.rolls > 0 && game.data.fridge.butter > 0 &&
            game.data.fridge.onions > 0 && game.data.fridge.garlic > 0){
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    if( game.data.fridge.rolls > 0 && game.data.fridge.butter > 0 &&
        game.data.fridge.onions > 0 && game.data.fridge.garlic > 0 )
    {
       // add the start button
      var button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_2 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    var button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_2 );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_1 );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_3 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
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
   
        this.font.draw(renderer, "WRAPS:", 128, 250); this.font.draw(renderer, game.data.fridge.tortilla_wraps+"/1", 432, 250);
        this.font.draw(renderer, "SAURE SAHNE:", 128, 300); this.font.draw(renderer, game.data.fridge.sour_cream+"/2", 432, 300);
        this.font.draw(renderer, "ZWIEBEL:", 128, 350); this.font.draw(renderer, game.data.fridge.onions+"/1", 432, 350);
        this.font.draw(renderer, "PAPRIKA:", 128, 400); this.font.draw(renderer, game.data.fridge.sweet_pepper+"/1", 432, 400);
        this.font.draw(renderer, "SCHINKEN:", 128, 450); this.font.draw(renderer, game.data.fridge.bacon+"/1", 432, 450);
        

        if( game.data.fridge.wraps > 0 && game.data.fridge.sour_cream > 1 &&
            game.data.fridge.onions > 0 && game.data.fridge.sweet_pepper > 0 && game.data.fridge.bacon > 0 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    if( game.data.fridge.wraps > 0 && game.data.fridge.sour_cream > 1 &&
        game.data.fridge.onions > 0 && game.data.fridge.sweet_pepper > 0 && game.data.fridge.bacon > 0 )
    {
       // add the start button
      var button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_3 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    var button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_3 );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_2 );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_4 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
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
   
        this.font.draw(renderer, "MILCH:", 128, 250); this.font.draw(renderer, game.data.fridge.milk+"/1", 432, 250);
        this.font.draw(renderer, "BUTTER:", 128, 300); this.font.draw(renderer, game.data.fridge.butter+"/2", 432, 300);
        this.font.draw(renderer, "EIER:", 128, 350); this.font.draw(renderer, game.data.fridge.eggs+"/1", 432, 350);
        this.font.draw(renderer, "GRIESS:", 128, 400); this.font.draw(renderer, "1/1", 432, 400);
        this.font.draw(renderer, "ZUCKER:", 128, 450); this.font.draw(renderer, "1/1", 432, 450);
        

        if( game.data.fridge.milk > 0 && game.data.fridge.butter > 0 && game.data.fridge.eggs > 0 )
        {
          this.font.draw(renderer, " START", 250, 500);
        }
      },
      

    })), 3);
    
    if( game.data.fridge.milk > 0 && game.data.fridge.butter > 0 && game.data.fridge.eggs > 0 )
    {
       // add the start button
      var button = new game.HUD.myButton(408, 480, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.cooking_game_4 );
      }
      me.game.world.addChild( button );
    }
   
    // add view recipe button
    var button = new game.HUD.myButton(568, 100, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.recipe_4 );
    }
    me.game.world.addChild( button );

    // add the back (to previous page) button
    button = new game.HUD.myButton(128, 480, "button_arrow_book_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_3 );
    }
    me.game.world.addChild( button );

    // add the next (page) button
    button = new game.HUD.myButton(632, 480, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.cooking_book_4 );
    }
    me.game.world.addChild( button );

    // add the back (to kitchen) button
    button = new game.HUD.myButton(8, 480, "button_back", 64,64);
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