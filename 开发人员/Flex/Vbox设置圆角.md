# Vbox设置圆角
## 主文件
``` 
   <?xml version="1.0″ encoding="utf-8″?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="vertical"  backgroundColor="white" width="417" height="277">
<mx:Style>     
      .gradient{
                          border-style: solid;   
                         border-thickness: 0;  
                         fill-colors: #0099FF, #000099;   
border-skin: ClassReference("com.ButtonStyle.utils.GradientBorder");
                         corner-radius: 5;   //设置圆角的值
                         drop-shadow-enabled: true;   
}
</mx:Style>        
<mx:Script>
<![CDATA[
private function changeStyle():void{
box.setStyle("fillColors", [col1.value, col2.value]);
box.setStyle("cornerRadius", corner.value);
}
]]>
</mx:Script>    
<mx:VBox id="box" styleName="gradient" width="310" height="229" verticalAlign="middle" horizontalAlign="center" backgroundColor="#7475A1">
<mx:FormItem label="Color 1:">
<mx:ColorPicker id="col1" change="changeStyle()" selectedColor="0x0099FF"></mx:ColorPicker>
</mx:FormItem>
<mx:FormItem label="Color 2:">
<mx:ColorPicker id="col2" change="changeStyle()" selectedColor="0×000099"></mx:ColorPicker>
</mx:FormItem>
<mx:FormItem label="Corner radius:">
<mx:HSlider id="corner" value="10" minimum="0" maximum="100" change="changeStyle()"></mx:HSlider>
</mx:FormItem> 
</mx:VBox>     
</mx:Application>
</pre>
<p>AS类文件</p>
 <pre class="brush:actionscript3"> 
      package com.ButtonStyle.utils{
import flash.display.*;
import flash.geom.*;
import flash.utils.*;
import mx.core.EdgeMetrics;
import mx.skins.halo.HaloBorder;
import mx.utils.ColorUtil;
import mx.utils.GraphicsUtil;
public class GradientBorder extends HaloBorder{
public function GradientBorder()
{
}
private var topCornerRadius:Number;        // top corner radius
private var bottomCornerRadius:Number;    // bottom corner radius
private var fillColors:Array;            // fill colors (two)
private var setup:Boolean;
private function setupStyles():void{
fillColors = getStyle("fillColors") as Array;
if (!fillColors) fillColors = [0xFFFFFF, 0xFFFFFF];
topCornerRadius = getStyle("cornerRadius") as Number;
if (!topCornerRadius) topCornerRadius = 0;
bottomCornerRadius = getStyle("bottomCornerRadius") as Number;
if (!bottomCornerRadius) bottomCornerRadius = topCornerRadius;
}
override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void{
super.updateDisplayList(unscaledWidth, unscaledHeight);
setupStyles();
var g:Graphics = graphics;
var b:EdgeMetrics = borderMetrics;
var w:Number = unscaledWidth – b.left – b.right;
var h:Number = unscaledHeight – b.top – b.bottom;
var m:Matrix = verticalGradientMatrix(0, 0, w, h);
g.beginGradientFill("linear", fillColors, [1, 1], [0, 255], m);
var tr:Number = Math.max(topCornerRadius-2, 0);
var br:Number = Math.max(bottomCornerRadius-2, 0);
GraphicsUtil.drawRoundRectComplex(g, b.left, b.top, w, h, tr, tr, br, br);
g.endFill();
}
}
} 
``` 