# 用Flex搭建开发环境的原型 
在Flex中实现拖动,缩放控件等功能<br>
```
 <?xml version="1.0" encoding="utf-8"?>
<mx:Application
  xmlns:mx="http://www.adobe.com/2006/mxml"
  creationComplete="doStuff()"
  paddingBottom="0"
  paddingRight="0"
  paddingTop="0"
  paddingLeft="0"
  borderColor="#FF3300"
  borderStyle="outset"
  borderThickness="1">
 
  <mx:Script>
    <![CDATA[
    import mx.containers.VBox;
    import mx.events.DynamicEvent;
    import mx.containers.HBox;
    import mx.controls.Alert;
 
    private function doStuff() : void
    {
      Stage.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
    }
   
    private function createBox( event : MouseEvent ) : void
    {
      var box : Canvas = new Canvas();
      var but : HBox = new HBox();
      var internalBox : VBox = new VBox();
     
      box.width = 100;
      box.height = 100;
      box.setStyle( "backgroundColor", "#f00dbad" );
      box.setStyle( "backgroundAlpha", 0.2 );
      box.setStyle( "borderThickness", 1 );
      box.setStyle( "borderColor", "#f00dbad" );
      box.setStyle( "borderStyle", "solid" );     
      box.rotation=34;   
      box.addEventListener( MouseEvent.MOUSE_DOWN, mouseDownBox );
      box.addEventListener( MouseEvent.MOUSE_UP, mouseUpBox);      box.x = Stage.mouseX;
      box.y = Stage.mouseY;
      box.clipContent = false;
     
      but.width = 20;
      but.height = 20;
      but.setStyle( "backgroundColor", "#FF3300" );
      but.setStyle( "backgroundAlpha", 0.3 );
      but.setStyle( "borderThickness", 1 );
      but.setStyle( "borderColor", "#FF3300" );
      but.setStyle( "cornerRadius", 5 );
      but.setStyle( "borderStyle", "solid" );
      but.x = box.width - but.width;
      but.y = box.height - but.height;
      but.addEventListener( MouseEvent.MOUSE_DOWN, mouseDownBut );
      but.addEventListener( MouseEvent.MOUSE_UP, mouseUpBut );
     
      box.addChild( but );
      Stage.addChild( box );
    }
   
    private function test1( event : Event) : void
    {
      Alert.show( " hi " );
    }
   
    private function mouseDownBut( event : MouseEvent) : void
    {
      var but : HBox = HBox( event.target );
      var box : Canvas = Canvas ( event.target.parent );
      but.addEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBut );
      but.startDrag();
    }
   
    private function mouseUpBut( event : MouseEvent ) : void
    {
      var but : HBox = HBox( event.target );
      but.removeEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBut );
      but.stopDrag();
    }
   
    private function mouseMoveBut( event : MouseEvent ) : void
    {
      var but : HBox = HBox( event.target );
      var box : Canvas = Canvas ( event.target.parent );
      box.width = box.mouseX;
      box.height = box.mouseY;     
      event.updateAfterEvent();
    }
       
    private function mouseDownBox( event : MouseEvent ) : void
    {
      if ( event.target is Canvas )
      {
        var box : Canvas = Canvas ( event.target );
        box.parent.removeEventListener( MouseEvent.MOUSE_DOWN, createBox );
        box.addEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBox );
        box.startDrag();
      }
      else
      {
        var but : HBox = HBox( event.target );
        but.parent.parent.removeEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
    }
   
    private function mouseUpBox( event : MouseEvent ) : void
    {
      if ( event.target is Canvas )
      {
        var box : Canvas = Canvas ( event.target );
        box.removeEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBox );
        box.stopDrag();
        box.parent.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
      else
      {
        var but : HBox = HBox( event.target );
        but.parent.parent.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
    }
   
    private function mouseMoveBox( event : MouseEvent ) : void
    {
      event.updateAfterEvent();
    }
     
    ]]>
  </mx:Script>  
  
  
  <mx:Canvas id="Stage"
    width="100%" height="100%"
    clipContent="false"
    backgroundColor="#ffffff">
    <mx:VBox>
      <mx:Label
        text="Click anywhere on this screen"
        fontSize="14" fontFamily="Aerial" fontWeight="bold"/>
      <mx:Label text="(1) drag the boxes around"
        fontSize="12" fontFamily="Aerial" />
      <mx:Label text="(2) resize each of the boxes by dragging the red squares"
        fontSize="12" fontFamily="Aerial" />
      <mx:Label text="(3) create as many boxes as you want"
        fontSize="12" fontFamily="Aerial" />
    </mx:VBox>
   
  </mx:Canvas> 
<?xml version="1.0" encoding="utf-8"?>
<mx:Application
  xmlns:mx="http://www.adobe.com/2006/mxml"
  creationComplete="doStuff()"
  paddingBottom="0"
  paddingRight="0"
  paddingTop="0"
  paddingLeft="0"
  borderColor="#FF3300"
  borderStyle="outset"
  borderThickness="1">
 
  <mx:Script>
    <![CDATA[
    import mx.containers.VBox;
    import mx.events.DynamicEvent;
    import mx.containers.HBox;
    import mx.controls.Alert;
 
    private function doStuff() : void
    {
      Stage.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
    }
   
    private function createBox( event : MouseEvent ) : void
    {
      var box : Canvas = new Canvas();
      var but : HBox = new HBox();
      var internalBox : VBox = new VBox();
     
      box.width = 100;
      box.height = 100;
      box.setStyle( "backgroundColor", "#f00dbad" );
      box.setStyle( "backgroundAlpha", 0.2 );
      box.setStyle( "borderThickness", 1 );
      box.setStyle( "borderColor", "#f00dbad" );
      box.setStyle( "borderStyle", "solid" );     
      box.rotation=34;   
      box.addEventListener( MouseEvent.MOUSE_DOWN, mouseDownBox );
      box.addEventListener( MouseEvent.MOUSE_UP, mouseUpBox);      box.x = Stage.mouseX;
      box.y = Stage.mouseY;
      box.clipContent = false;
     
      but.width = 20;
      but.height = 20;
      but.setStyle( "backgroundColor", "#FF3300" );
      but.setStyle( "backgroundAlpha", 0.3 );
      but.setStyle( "borderThickness", 1 );
      but.setStyle( "borderColor", "#FF3300" );
      but.setStyle( "cornerRadius", 5 );
      but.setStyle( "borderStyle", "solid" );
      but.x = box.width - but.width;
      but.y = box.height - but.height;
      but.addEventListener( MouseEvent.MOUSE_DOWN, mouseDownBut );
      but.addEventListener( MouseEvent.MOUSE_UP, mouseUpBut );
     
      box.addChild( but );
      Stage.addChild( box );
    }
   
    private function test( event : Event) : void
    {
      Alert.show( " hi " );
    }
   
    private function mouseDownBut( event : MouseEvent) : void
    {
      var but : HBox = HBox( event.target );
      var box : Canvas = Canvas ( event.target.parent );
      but.addEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBut );
      but.startDrag();
    }
   
    private function mouseUpBut( event : MouseEvent ) : void
    {
      var but : HBox = HBox( event.target );
      but.removeEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBut );
      but.stopDrag();
    }
   
    private function mouseMoveBut( event : MouseEvent ) : void
    {
      var but : HBox = HBox( event.target );
      var box : Canvas = Canvas ( event.target.parent );
      box.width = box.mouseX;
      box.height = box.mouseY;     
      event.updateAfterEvent();
    }
       
    private function mouseDownBox( event : MouseEvent ) : void
    {
      if ( event.target is Canvas )
      {
        var box : Canvas = Canvas ( event.target );
        box.parent.removeEventListener( MouseEvent.MOUSE_DOWN, createBox );
        box.addEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBox );
        box.startDrag();
      }
      else
      {
        var but : HBox = HBox( event.target );
        but.parent.parent.removeEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
    }
   
    private function mouseUpBox( event : MouseEvent ) : void
    {
      if ( event.target is Canvas )
      {
        var box : Canvas = Canvas ( event.target );
        box.removeEventListener( MouseEvent.MOUSE_MOVE, mouseMoveBox );
        box.stopDrag();
        box.parent.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
      else
      {
        var but : HBox = HBox( event.target );
        but.parent.parent.addEventListener( MouseEvent.MOUSE_DOWN, createBox );
      }
    }
   
    private function mouseMoveBox( event : MouseEvent ) : void
    {
      event.updateAfterEvent();
    }
     
    ]]>
  </mx:Script>  
  
  
  <mx:Canvas id="Stage"
    width="100%" height="100%"
    clipContent="false"
    backgroundColor="#ffffff">
    <mx:VBox>
      <mx:Label
        text="Click anywhere on this screen"
        fontSize="14" fontFamily="Aerial" fontWeight="bold" ></mx:Label>
      <mx:Label text="(1) drag the boxes around"
        fontSize="12" fontFamily="Aerial" ></mx:Label>
      <mx:Label text="(2) resize each of the boxes by dragging the red squares"
        fontSize="12" fontFamily="Aerial" ></mx:Label>
      <mx:Label text="(3) create as many boxes as you want"
        fontSize="12" fontFamily="Aerial" ></mx:Label>
    </mx:VBox>
   
  </mx:Canvas> 
 
</mx:Application>
```