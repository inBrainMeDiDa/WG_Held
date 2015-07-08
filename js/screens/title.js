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
        this.font = new me.BitmapFont("32x32_font", 32, 0.75);
 
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
        this.font.draw(renderer, " WG", 310, 504);
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
      button = new game.HUD.Button_BackToMain(720, 8, "button_x", 64,64);
      me.game.world.addChild( button );

      bInitialized = true;
    }

    // add the cooking game demo button
    var button = new game.HUD.myButton(250, 480, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.living_room );
    }
    me.game.world.addChild( button );

    // add the J&R game demo button
    button = new game.HUD.myButton(330, 400, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.JR_title );
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
 * customizable button
 */
game.HUD.myButton = me.GUI_Object.extend(
{
   init:function (x, y, img, w, h)
   {
      var settings = {};
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
      this.name = "button";
      // define the object z order
      this.z = Infinity;
      // store hyperlink destination
      this.link_destination = game.ultralink.main_menu

      // mouse-over hint
      this.font = me.game.world.getChildByName("mouse_over_text_holder");
      this.font = this.font[0];
  
      this.mouse_over_text = "TEST";
      this.vector_to_pointer = new me.Vector2d(0,0);
   },

   draw : function (renderer) {
      
      this._super(me.GUI_Object, "draw", [renderer]);


      if( this.font != null ){
      
        this.vector_to_pointer.set( me.input.mouse.pos.x - this.pos.x - 32,
                                    me.input.mouse.pos.y - this.pos.y - 32);
        if( this.vector_to_pointer.length2() < 4096 ){
          this.font.drawMouseOverText( this.mouse_over_text );
        }
      }
   },

   setMouseOverText : function( text ){
      this.mouse_over_text = text;
   },


   onClick:function (event)
   {
      // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
        me.audio.play("cling");
      }
      // do something
      switch( this.link_destination ){
        case game.ultralink.living_room: 
            me.state.set(me.state.TITLE, new game.LinvingRoomTitleScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.kitchen: 
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
            // Fill the fridge with the stuff from your backpack
            // when entering the kitchen
            //Tomatos:
            game.data.fridge.tomatos += game.data.backpack.tomatos;
            game.data.backpack.tomatos = 0;
            //Backed beans:
            game.data.fridge.baked_beans += game.data.backpack.baked_beans;
            game.data.backpack.baked_beans = 0;
            //Kidney beans:
            game.data.fridge.kidney_beans += game.data.backpack.kidney_beans;
            game.data.backpack.kidney_beans = 0;
            //Rolls:
            game.data.fridge.rolls += game.data.backpack.rolls;
            game.data.backpack.rolls = 0;
            break;
        case game.ultralink.fridge: 
            me.state.set(me.state.TITLE, new game.FridgeScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book: 
            me.state.set(me.state.TITLE, new game.CookingGameWelcomeScreen() );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_1:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_1 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_2:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_2 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_1:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_1 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_2:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_2 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_game_1:
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_1"));
            me.state.change(me.state.PLAY);
            break;  
        case game.ultralink.JR_title: 
            me.state.set(me.state.TITLE, new game.JRGameTitleScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.JR_bafoeg: 
            me.state.set(me.state.PLAY, new game.PlayScreen_JR());
            me.state.change(me.state.PLAY);
            break;
        default:
            me.state.set(me.state.TITLE, new game.TitleScreen());
            me.state.change(me.state.TITLE);
      }

      //console.log("button dest. : "+this.link_destination);
      return false;
   },
   setHyperlink : function( dest ){
      if( dest && dest != "" ){
        this.link_destination = dest;        
      }
      return true;
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