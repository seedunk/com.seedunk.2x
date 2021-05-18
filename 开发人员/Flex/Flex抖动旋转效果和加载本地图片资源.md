# Flex 抖动旋转效果+加载本地图片资源
[2014-12-07 22:24:11](#data.create_time)
```xml
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"
         layout="vertical"
         verticalAlign="middle"
         backgroundColor="white"
         creationComplete="init();">
    <mx:Script>
         <![CDATA[
             import mx.effects.easing.*;
             private function init():void {
                 img.setStyle("showEffect", rotate);
                 img.setStyle("hideEffect", fade);
             }
         ]]>
     </mx:Script>
  
     <mx:Fade id="fade" />
     <mx:Rotate id="rotate"
             angleFrom="-180"
             angleTo="0"
             easingFunction="Elastic.easeInOut"
             duration="2000" />
  
     <mx:ApplicationControlBar dock="true">
         <mx:Form styleName="plain">
             <mx:FormItem label="visible:">
                 <mx:ToggleButtonBar id="toggleButtonBar"
                         itemClick="img.visible = event.item.data;">
                     <mx:dataProvider>
                         <mx:Array>
                             <mx:Object label="Show" data="true" />
                             <mx:Object label="Hide" data="false" />
                       </mx:Array>
                    </mx:dataProvider>
                </mx:ToggleButtonBar>
            </mx:FormItem>
       </mx:Form>
   </mx:ApplicationControlBar>
    <mx:Image id="img"
           source="{图片路径}"
          width="298"
          height="296" />
</mx:Application>  
```
