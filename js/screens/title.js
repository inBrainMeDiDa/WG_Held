var bInitialized = false;

game.TitleScreen = me.ScreenObject.extend({
 
  /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // unbind timeout
    window.clearTimeout( game.timeoutTarget );

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
        this.font.draw(renderer, " NEUES SPIEL", 350, 414);
        if( game.data.dialog_pointer > 0 ){
          this.font.draw(renderer, " SPIEL FORTSETZEN", 310, 484);
        }
        

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
      //button = new game.HUD.Button_BackToMain(720, 8, "button_x", 64,64);
      //me.game.world.addChild( button );

      bInitialized = true;
    }

    // play new music track
    
      if( game.current_music_track != "menumusic" )
      {
          game.current_music_track = "menumusic";
          me.audio.stopTrack();
          me.audio.playTrack( game.current_music_track );
      }
      var my_state_holder = me.game.world.getChildByName("music_state_holder");
          if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
          {
            me.audio.pauseTrack();
          }
  

    // add the new game button
    var button = new game.HUD.myButton(270, 390, "button_arrow_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.new_game );
    }
    me.game.world.addChild( button );

    if( game.data.dialog_pointer > 0 )
    {
      // add the resume game button
      button = new game.HUD.myButton(250, 460, "button_arrow_right", 64,64);
      if( button ){
        button.setHyperlink( game.ultralink.resume_game );
      }
      me.game.world.addChild( button );
    }
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
      this.click_sound = "click";
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

   // hand over NULL to play no sound on click
   setClickSound : function( snd ){
      this.click_sound = snd;
   },

   onClick:function (event)
   {
      // play sound if sound is turned on
      var my_state_holder = me.game.world.getChildByName("sound_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 && this.click_sound != null ){
        me.audio.play( this.click_sound );
      }
      // do something
      switch( this.link_destination ){
        case game.ultralink.new_game:
            // reset game state, then pass on to living_room
            game.reset_game_state(); 
            me.state.set(me.state.TITLE, new game.JRGameTitleScreen());
            me.state.change(me.state.TITLE);
            break;

        case game.ultralink.resume_game: // just pass on to living_room
        case game.ultralink.living_room: 

            // on first visit, link directly to dialog screen
            if( game.data.dialog_pointer == 0 ){
              game.update_dialog_pointer();
              me.state.set(me.state.TITLE, new game.LinvingRoomDialogScreen());
              me.state.change(me.state.TITLE);
            }else{
              // check if feedback is yet to be given
              if( game.data.last_recipe_index >= 0 && !game.data.feedback_given ){

                  game.data.last_canonic_dialog_pointer = game.data.dialog_pointer;
                  me.state.set(me.state.TITLE, new game.LinvingRoomFeedbackScreen());
                  me.state.change(me.state.TITLE);
              }else{
                  me.state.set(me.state.TITLE, new game.LinvingRoomTitleScreen());
                  me.state.change(me.state.TITLE);
              }
            }
            break;
        case game.ultralink.dialog_room:
            me.state.set(me.state.TITLE, new game.LinvingRoomDialogScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.hint_screen:
            me.state.set(me.state.TITLE, new game.LinvingRoomHintScreen() );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.kitchen: 
            me.state.set(me.state.TITLE, new game.CookingGameTitleScreen());
            me.state.change(me.state.TITLE);
            //delete the backpack onscreen
            game.killDisplayBackpack("backpack_icon_1");
            game.killDisplayBackpack("backpack_icon_2");
            game.killDisplayBackpack("backpack_icon_3");
            game.killDisplayBackpack("backpack_icon_4");
            game.emptyDisplayBackpack();
            // Fill the fridge with the stuff from your backpack
            // when entering the kitchen
            game.emptyRealBackpackIntoFridge();
            

            break;
        case game.ultralink.hall_room: 
            me.state.set(me.state.TITLE, new game.HallScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.fridge: 
            me.state.set(me.state.TITLE, new game.FridgeScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.shelf: 
            me.state.set(me.state.TITLE, new game.ShelfScreen());
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
        case game.ultralink.cooking_book_3:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_3 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_4:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_4 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_5:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_5 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_6:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_6 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_7:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_7 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_book_8:
            me.state.set(me.state.TITLE, new game.CookingGameRecipeScreen_8 );
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
        case game.ultralink.recipe_3:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_3 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_4:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_4 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_5:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_5 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_6:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_6 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_7:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_7 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.recipe_8:
            me.state.set(me.state.TITLE, new game.DetailedRecipeScreen_8 );
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.cooking_game_1:
            game.data.last_recipe_index = 1;
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_1"));
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.cooking_game_2:
            // consume ingredients
            game.data.fridge.rolls -= 1; 
            game.data.fridge.butter -= 1;
            game.data.fridge.onions -= 1; 
            game.data.fridge.garlic -= 1;
            // switch to kitchen with oven ready
            game.switch_to_kitchen_oven();
            break;
        case game.ultralink.cooking_game_3:
            // consume ingredients
            game.data.fridge.tortilla_wraps -= 1; 
            game.data.fridge.sour_cream -= 2;
            game.data.fridge.onions -= 1; 
            game.data.fridge.sweet_pepper -= 1; 
            game.data.fridge.bacon -= 1;
            // switch to kitchen with oven ready
            game.switch_to_kitchen_oven();
            break;
        case game.ultralink.cooking_game_4:
            game.data.last_recipe_index = 4;
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_4"));
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.cooking_game_5:
            game.data.last_recipe_index = 5;
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_5"));
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.cooking_game_6:
            game.data.last_recipe_index = 6;
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_6"));
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.cooking_game_7:
            game.switch_to_kitchen_fruit_basket();
            break;
        case game.ultralink.cooking_game_8:
            game.data.last_recipe_index = 8;
            me.state.set(me.state.PLAY, new game.PlayScreen_CG("CG_Recipe_8"));
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.JR_title: 
            me.state.set(me.state.TITLE, new game.JRGameTitleScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.JR_Discounter:
            me.state.set(me.state.TITLE, new game.JRDiscountTitleScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.JR_DiscounterInfo:
            me.state.set(me.state.TITLE, new game.JRDiscountInfoScreen());
            me.state.change(me.state.TITLE);
            break;
        case game.ultralink.JR_DiscounterGame:
            me.state.set(me.state.PLAY, new game.PlayScreen_JR());
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.JR_bafoeg: 
            me.state.set(me.state.PLAY, new game.PlayScreen_Amt_JR());
            me.state.change(me.state.PLAY);
            break;
        case game.ultralink.next_dialog:
            game.update_dialog_pointer();
            break;
        case game.ultralink.reset_oven:
            game.reset_kitchen_oven();
            game.data.last_recipe_index = 3;
            game.data.last_recipe_ranking = 1;
            game.data.feedback_given = false;
            break;
         case game.ultralink.reset_fruit_basket:
            game.data.fridge.fruits -= 1;
            game.reset_kitchen_fruit_basket();
            game.data.last_recipe_index = 7;
            game.data.last_recipe_ranking = 1;
            game.data.feedback_given = false;
            break;
        default: console.log( "Button pressed with destination "+this.link_destination ); 
      }
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
      game.killDisplayBackpack("backpack_icon_1");
      game.killDisplayBackpack("backpack_icon_2");
      game.killDisplayBackpack("backpack_icon_3");
      game.killDisplayBackpack("backpack_icon_4");
      game.emptyDisplayBackpack();
      game.emptyBackpack();
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
          me.audio.resumeTrack();
        }else{
          me.audio.pauseTrack();
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