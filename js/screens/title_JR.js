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
    
    // play new music track
    if( game.current_music_track != "Steve_Combs__Delta_Is_Theme_Y" )
    {
          //game.current_music_track = "Steve_Combs__Delta_Is_Theme_Y";
          current_music_track = null;
          me.audio.stopTrack();
          //me.audio.playTrack( game.current_music_track );
    }
    var my_state_holder = me.game.world.getChildByName("music_state_holder");
    if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
    {
      me.audio.pauseTrack();
    }

    // add the J&R game button
    var button = new game.HUD.myButton(450, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_bafoeg );
    }
    me.game.world.addChild( button );
  },
 

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {},
});

/* =======================================================================
 *  TitleScreen for J&R Game ( Nero Discount )
 */
game.JRDiscountTitleScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Nero_aussen_BG')
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
        this.font.draw(renderer, "SUPERMARKT", 280, 50);
        this.font.draw(renderer, "WEISST DU, WAS", 128, 120);
        this.font.draw(renderer, "DU ALLES", 128, 154);
        this.font.draw(renderer, "BRAUCHST?", 128, 188);
        this.font.draw(renderer, "NUTZE DIE", 128, 300);
        this.font.draw(renderer, "PFEILTASTEN.", 128, 340);
        this.font.draw(renderer, "'LEER'=SPRINGEN", 128, 390);
      },
      

    })), 3);
    
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

    // play new music track
    if( game.current_music_track != "Steve_Combs__Delta_Is_Theme_Y" )
    {
        //game.current_music_track = "Steve_Combs__Delta_Is_Theme_Y";
        current_music_track = null;
        me.audio.stopTrack();
        //me.audio.playTrack( game.current_music_track );
    }
    var my_state_holder = me.game.world.getChildByName("music_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
      {
        me.audio.pauseTrack();
      }

    // add the J&R gamebutton
    var button = new game.HUD.myButton(632, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_bafoeg );
      button.setMouseOverText("START");
    }
    me.game.world.addChild( button );

    // add info button
    button = new game.HUD.myButton(632, 400, "button_info", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_DiscounterInfo );
      button.setMouseOverText("ANGEBOTE");
    }
    me.game.world.addChild( button );

    // add the return button
    button = new game.HUD.myButton(80, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.hall_room );
    }
    me.game.world.addChild( button );
    button.setMouseOverText("ZUR WG");
    button.setClickSound( "door_close" );
  },
 

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});


/* =======================================================================
 *  InfoScreen for J&R Game ( Nero Discount )
 */
game.JRDiscountInfoScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Nero_aussen_BG')
      ),
      2
    );
 
    // add small symbols:
    me.game.world.addChild( new me.Sprite (200,195,me.loader.getImage('tomatos')),3);
    me.game.world.addChild( new me.Sprite (200,245,me.loader.getImage('eggs')),3);
    me.game.world.addChild( new me.Sprite (200,295,me.loader.getImage('potatoes')),3);
    me.game.world.addChild( new me.Sprite (200,345,me.loader.getImage('tortilla_wraps')),3);


    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 32);
        this.small_font = new me.BitmapFont("32x32_font", 32, 0.75);
      },
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "ANGEBOTE:", 280, 50);
        this.small_font.draw(renderer, "1X  = 4 TOMATEN", 150, 200);
        this.small_font.draw(renderer, "1X  = 6 EIER", 150, 250);
        this.small_font.draw(renderer, "1X  = 5 KARTOFFELN", 150, 300);
        this.small_font.draw(renderer, "1X  = 4 WRAPS", 150, 350);
        
      },
      

    })), 3);
    
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

    // add the J&R game demo button
    var button = new game.HUD.myButton(632, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_bafoeg );
      button.setMouseOverText("START");
    }
    me.game.world.addChild( button );

    // add the return button
    button = new game.HUD.myButton(80, 480, "button_back", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_Discounter );
    }
    me.game.world.addChild( button );
    button.setMouseOverText("SUPERMARKT");
  },
 

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});