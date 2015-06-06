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
 
    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);

    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.audio.play("cling");
        me.state.change(me.state.PLAY);
      }
    });

    // add the cooking game demo button
    var button = new game.HUD.Button_CookingDemo(250, 480, "button_arrow_right", 64,64);
    me.game.world.addChild( button );

    // add the J&R game demo button
    var button = new game.HUD.Button(330, 400, "button_arrow_right", 64,64);
    me.game.world.addChild( button );
  },
 
  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.mouse.LEFT);
    me.event.unsubscribe(this.handler);
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
      me.audio.play("cling");
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
      me.audio.play("cling");
      me.state.set(me.state.PLAY, new game.PlayScreen());
      me.state.change(me.state.PLAY);
      return false;
   },
});