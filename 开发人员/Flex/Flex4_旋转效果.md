# Flex4 旋转技巧
在flex中有这样一个属性：<br>
“rotationZ” 指示元素从转换点的旋转（以度为单位）。<br>
lineAB: A--------------------B<br>
通过设置元素lineAB的"rotationZ"值，可以让他以中点做顺时针旋转*度。<br>
本例源码：
```
   <s:HSlider id="slider"
     horizontalCenter="0" top="10"
     minimum="0" maximum="360" stepSize="1"/>
<!--中心点-->
<s:Rect width="2" height="2" 
   horizontalCenter="0" verticalCenter="0">
<s:fill> <s:SolidColor color="#000000"/> </s:fill>
</s:Rect>
<!--半径为（100/2px）-->
<s:Group id="radiusGroup" width="100"
horizontalCenter="0" verticalCenter="0"
rotationZ="{slider.value}">
                     <!--端点-->
<s:Rect width="5" height="5" right="0" rotationZ="{-slider.value}">
<s:fill> <s:SolidColor color="#FF0000"/> </s:fill>
</s:Rect>
</s:Group>

```

 
  