var bInitialized = false;

game.TitleScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // title screen
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('title_screen')
      ),
      1
    );
 
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        // font for the scrolling text
        this.font = new me.BitmapFont("32x32_font", 32);
 
         // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2600 }, 30000).onComplete(this.scrollover.bind(this)).start();
 
        this.scroller = "                INBRAIN IST SUPER.                INBRAIN MACHT TOLLE SPIELE.                ";
        this.scrollerpos = 800;
      },
 
      // some callback for the tween objects
      scrollover : function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2600 }, 30000).onComplete(this.scrollover.bind(this)).start();
      },
 
      update : function (dt) {
        return true;
      },
 
      draw : function (renderer) {
        this.font.draw(renderer, "WG-HELD !", 320, 120);
        this.font.draw(renderer, "DEMOS:", 360, 300);
        this.font.draw(renderer, " JUMP+RUN", 400, 432);
        this.font.draw(renderer, " KOCHSPIEL", 310, 504);
        this.font.draw(renderer, this.scroller, this.scrollerpos, 568);
      },
      onDestroyEvent : function() {
        //just in case
        this.scrollertween.stop();
      }
    })), 2);

    if( !bInitialized ){
      // add sound state holer here once
      me.game.world.addChild( new game.State_Holder(888, 888, "sound_state_holder") );
      // add music state holer here once
      me.game.world.addChild( new game.State_Holder(888, 888, "music_state_holder") );
       // add the sound button
      button = new game.HUD.Button_Sound(8, 8, "button_sound_on", 64,64);
      me.game.world.addChild( button );

      // add the music button
      button = new game.HUD.Button_Music(80, 8, "button_music_on", 64,64);
      me.game.world.addChild( button );

      // the back to menu button
      button = new game.HUD.Button_BackToMain(720, 8, "button_arrow_left", 64,64);
      me.game.world.addChild( button );

      bInitialized = true;
    }

    // add the cooking game demo button
    var button = new game.HUD.Button_CookingScreen(250, 480, "button_arrow_right", 64,64);
    me.game.world.addChild( button );

    // add the J&R game demo button
    button = new game.HUD.Button_JRScreen(330, 400, "button_arrow_right", 64,64);
    me.game.world.addChild( button );
  },
 
  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
   }
});
/* =======================================================================
 * customizable button
 */
game.HUD.Button = me.GUI_Object.extend(
{
   init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_arrow_right";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "ingredient_icon"
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
      
      me.state.set(me.state.PLAY, new game.PlayScreen_JR());
      me.state.change(me.state.PLAY);
      return false;
   },
});

/*
 *
 */
game.HUD.Button_CookingDemo = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_arrow_right";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "cooking_demo_button_icon"
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

      me.state.set(me.state.PLAY, new game.PlayScreen_CG());
      me.state.change(me.state.PLAY);
      return false;
   },
});


/*
 *  Button to get to the Cooking game screen
 */
game.HUD.Button_CookingScreen = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_arrow_right";
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

      me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
      me.state.change(me.state.TITLE);
      return false;
   },
});


/*
 *    Button to get to the J&R title screen
 */
game.HUD.Button_JRScreen = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_arrow_right";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "JR_screen_button_icon"
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

      me.state.set(me.state.TITLE, new game.JRGameTitleScreen());
      me.state.change(me.state.TITLE);
      return false;
   },
});


/*
 *  Back to menu button
 */
game.HUD.Button_BackToMain = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_arrow_right";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "back_to_main_screen_button_icon"
      // define the object z order
      this.z = Infinity;
      // persistent across level change
      this.isPersistent = true;
   },
   onClick:function (event)
   {
      // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }

      me.state.set(me.state.TITLE, new game.TitleScreen());
      me.state.change(me.state.TITLE);
      return false;
   },
});


/*
 *    Sound On / OFF Button
 */
game.HUD.Button_Sound = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_sound_on";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "sound_button"
      // define the object z order
      this.z = Infinity;
      // persistent across level change
      this.isPersistent = true;
   },
   onClick:function (event)
   {
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] ){
        my_state_holder[0].set_state_index( (my_state_holder[0].get_state_index()+1) % 2 );
        
        // play sound if sound is turned on
        if( my_state_holder[0].get_state_index() > 0 ){
           me.audio.play("cling");
        }
      }
      return false;
   },
});


/*
 *    Music ON / OFF Button
 */
game.HUD.Button_Music = me.GUI_Object.extend(
{
  init:function (x, y, img, w, h)
   {
      var settings = {}
      settings.image = "button_music_on";
      if(img && img != "")
      {
        settings.image = img;
      }
      settings.spritewidth = w;
      settings.spriteheight = h;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "music_button"
      // define the object z order
      this.z = Infinity;
      // persistent across level change
      this.isPersistent = true;
   },
   onClick:function (event)
   {
      var my_state_holder = me.game.world.getChildByName("music_state_holder");
      if( my_state_holder[0] ){
        my_state_holder[0].set_state_index( (my_state_holder[0].get_state_index()+1) % 2 );
        
        // play sound if sound is turned on
        if( my_state_holder[0].get_state_index() > 0 ){
           me.audio.play("cling");
        }
      }
      return false;
   },
});



/*=======================================================================
 * state holder entity (invisible, unique -> created by title screen once)
 * purpose: to hold the current sound/music state (on/off) and make it accessible
 */
game.State_Holder = me.GUI_Object.extend(
{
   init:function (x, y, the_name)
   {
      var settings = {}
      settings.image = "button_sound_on";
      settings.framewidth = 64;
      settings.frameheight = 64;
      // super constructor
      this._super(me.GUI_Object, "init", [x, y, settings]);
      // give a name
      this.name = "sound_state_holder"
      if( the_name && the_name != "" ){
        this.name = the_name;
      }
      // define the object z order
      this.z = -1;
       // persistent across level change
      this.isPersistent = true;
      // set default sound state to "on" = 1
      this.current_state_index = 1;
   },

   get_state_index : function(){
      return this.current_state_index;
   },

   set_state_index : function( new_state ){
      this.current_state_index = new_state;

      var icon = null;
      if( this.name == "sound_state_holder" )
      {
        if( new_state == 0 ){
            icon = me.game.world.getChildByName("sound_button");
            me.game.world.removeChild(icon[0]);
            me.game.world.addChild( new game.HUD.Button_Sound(8, 8, "button_sound_off", 64,64) );
        }else{
            icon = me.game.world.getChildByName("sound_button");
            me.game.world.removeChild(icon[0]);
            me.game.world.addChild( new game.HUD.Button_Sound(8, 8, "button_sound_on", 64,64) );
        }
      }
      else if( this.name == "music_state_holder" )
      {
        if( new_state == 0 ){
            icon = me.game.world.getChildByName("music_button");
            me.game.world.removeChild(icon[0]);
            me.game.world.addChild( new game.HUD.Button_Music(80, 8, "button_music_off", 64,64) );
        }else{
            icon = me.game.world.getChildByName("music_button");
            me.game.world.removeChild(icon[0]);
            me.game.world.addChild( new game.HUD.Button_Music(80, 8, "button_music_on", 64,64) );
        }
      }
   },

   onClick:function (event)
   {
      return false;
   }
});