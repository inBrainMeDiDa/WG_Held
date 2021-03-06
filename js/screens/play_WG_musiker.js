/*
 *  comment! Maybe leave the dialiogs here ?
 */



 /* =======================================================================
 *  Dialog version of TitleScreen for Living Room
 */
game.LinvingRoomDialogScreen = me.ScreenObject.extend({
 
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
    // inhabitants
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_Bew')
      ),
      3
    );
   

    // add the dialog holder
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function() {
        this._super(me.Renderable, 'init', [32, 500, me.game.viewport.width, me.game.viewport.height]);

        this.name = "dialog_holder";
        this.current_dialog_index = 0;
        this.dialog_sprite = null;
      },

      update : function (dt) {
        return true;
      },


      draw : function (renderer) {
        if( this.current_dialog_index != game.data.dialog_pointer )
        {
          this.bShowDialog = true;
          this.current_dialog_index = game.data.dialog_pointer;

          if( this.dialog_sprite != null ){
            me.game.world.removeChild( this.dialog_sprite );
          }

          // pick dialog image
          switch( this.current_dialog_index )
          {
            case 1: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paul_1'));
                    break;
            case 2: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paul_2'));
                    break;
            case 3: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paula_1'));
                    break;
            case 4: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paula_2'));
                    break;
            case 5: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paula_3'));
                    break;
            case 6: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_a_brotchips'));
            		game.data.last_recommented_recipe_index = 3;
                    break;
            case 7: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_hint_0'));
                    break;
            case 8: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_milch_eier'));
                    break;
            case 9: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_a_griessbrei'));
            		game.data.last_recommented_recipe_index = 4;
                    break;
            case 10: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_paula_4'));
                    break;
            case 11: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_a_obstsalat'));
            		game.data.last_recommented_recipe_index = 7;
                    break;
            case 12: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_moneymoney'));
            		var my_state_holder = me.game.world.getChildByName("sound_state_holder");
			        if( my_state_holder[0] && my_state_holder[0].get_state_index() > 0 ){
			          me.audio.play( "cash_bell" );
			        }
			        game.data.money += 345;
                    break;
            case 13: this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_freeplay'));
                    break;
            default: console.log( "dialog pointer: "+this.current_dialog_index );
                     this.dialog_sprite = null;
          }

          
          if( this.dialog_sprite != null ){
            this.dialog_sprite.name = "dialog_sprite";
            me.game.world.addChild( this.dialog_sprite );
          }    
        }
      },
      

    })), 4);
    
    // play new music track
	if( game.current_music_track != "wgmusic" )
      {
        game.current_music_track = "wgmusic";
        me.audio.stopTrack();
        me.audio.playTrack( game.current_music_track );
      }
	 var my_state_holder = me.game.world.getChildByName("music_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
      {
        me.audio.pauseTrack();
      }

    // next button
    var button = new game.HUD.myButton(700, 536, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.next_dialog );
      
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


/* =======================================================================
 *  Feedback version of TitleScreen for Living Room
 */
game.LinvingRoomFeedbackScreen = me.ScreenObject.extend({
 
 /**
   *  action to perform on state change
   */
  onResetEvent : function() {
 
    // flag feedback given
    game.data.feedback_given = true;

	switch( game.data.last_recipe_ranking )
    {
        case 0: game.data.dialog_pointer = game.data.dialogs.FEEDBACK_0; break;

        case 1: game.data.dialog_pointer = game.data.dialogs.FEEDBACK_1; break;

        case 2: game.data.dialog_pointer = game.data.dialogs.FEEDBACK_2; break;
    }

    console.log("Feedback, dialog_pointer: "+game.data.dialog_pointer);

    // title screen
    me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_BG')
      ),
      2
    );
    // inhabitants
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_Bew')
      ),
      3
    );
    
    if( this.dialog_sprite != null ){
            me.game.world.removeChild( this.dialog_sprite );
	}
	// pick dialog image
	switch( game.data.dialog_pointer )
	{
	    case game.data.dialogs.FEEDBACK_0:
	    		this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_feedback_0_1'));
	            break;
	    case game.data.dialogs.FEEDBACK_1:
	    		this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_feedback_1_1'));
	            break;
	    case game.data.dialogs.FEEDBACK_2:
	    		this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_feedback_2_1'));
	            break;

	    default: console.log( "dialog pointer: "+this.current_dialog_index );
	             this.dialog_sprite = null;
	}

	  
	if( this.dialog_sprite != null ){
	    this.dialog_sprite.name = "dialog_sprite";
	    me.game.world.addChild( this.dialog_sprite, 4 );
	}    

    // play new music track
	if( game.current_music_track != "wgmusic" )
      {
        game.current_music_track = "wgmusic";
        me.audio.stopTrack();
        me.audio.playTrack( game.current_music_track );
      }
	 var my_state_holder = me.game.world.getChildByName("music_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
      {
        me.audio.pauseTrack();
      }

    // reset dialog pointer
    game.data.dialog_pointer = game.data.last_canonic_dialog_pointer;
	if( game.data.last_recipe_index == game.data.last_recommented_recipe_index )
	{
	    game.data.dialog_pointer += 1;
	    console.log("story prog., dialog_pointer: "+game.data.dialog_pointer);
	}
	console.log("story back, dialog_pointer: "+game.data.dialog_pointer);

    // next button
    var button = new game.HUD.myButton(700, 536, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.living_room );
      
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

   /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
      
   }

});


/* =======================================================================
 *  Hint version of TitleScreen for Living Room
 */
game.LinvingRoomHintScreen = me.ScreenObject.extend({
 
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
    // inhabitants
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_Bew')
      ),
      3
    );
    
    if( this.dialog_sprite != null ){
            me.game.world.removeChild( this.dialog_sprite );
	}

	// pick random dialog image
	var rnd = Math.floor((Math.random() * 26) + 1); 
	this.dialog_sprite = new me.Sprite (0,416,me.loader.getImage('dialog_hint_'+rnd));
	

	  
	if( this.dialog_sprite != null ){
	    this.dialog_sprite.name = "dialog_sprite";
	    me.game.world.addChild( this.dialog_sprite, 4 );
	}    

    // play new music track
	if( game.current_music_track != "wgmusic" )
      {
        game.current_music_track = "wgmusic";
        me.audio.stopTrack();
        me.audio.playTrack( game.current_music_track );
      }
	 var my_state_holder = me.game.world.getChildByName("music_state_holder");
      if( my_state_holder[0] && my_state_holder[0].get_state_index() == 0 )
      {
        me.audio.pauseTrack();
      }

    // next button
    var button = new game.HUD.myButton(700, 536, "button_arrow_book_right", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.living_room );
      
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

   /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
      
   }

});