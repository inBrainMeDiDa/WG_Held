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
    // inhabitants
    me.game.world.addChild(
      new me.Sprite (
        0,0,
        me.loader.getImage('Musiker_WG_Bew')
      ),
      3
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
    
    // button for Paul (hidden)
    button = new game.HUD.myButton(450, 220, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.dialog_room );
      button.setMouseOverText("PAUL");
    }
    me.game.world.addChild( button, 0 );

    // button for Paula (hidden)
    button = new game.HUD.myButton(160, 220, "button_arrow_left", 64,64);
    if( button ){
      button.setHyperlink( game.ultralink.dialog_room );
      button.setMouseOverText("PAULA");
    }
    me.game.world.addChild( button, 0 );

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
    

    // add the kitchen link
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