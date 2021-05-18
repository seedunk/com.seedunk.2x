# 利用innerRadius样式创建环状得饼图
 ```xml
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"  layout="vertical"
verticalAlign="middle"
backgroundColor="white">
<mx:Script>
<![CDATA[
private function labelFunc(item:Object, field:String, index:Number, percentValue:Number):String {
return item.name + ": " + 'n' + "AVG: " + item.avg;
}
]]>
</mx:Script>
<mx:ArrayCollection id="arrColl">
<mx:source>
<mx:Array>
<mx:Object name="R Winn" obp=".353" slg=".445" avg=".300" ></mx:Object>
<mx:Object name="P Feliz" obp=".290" slg=".418" avg=".253" ></mx:Object>
<mx:Object name="O Vizquel" obp=".305" slg=".316" avg=".246" ></mx:Object>
<mx:Object name="B Molina" obp=".298" slg=".433" avg=".276" ></mx:Object>
<mx:Object name="R Durham" obp=".295" slg=".343" avg=".218"></mx:Object>
</mx:Array>
</mx:source>
</mx:ArrayCollection>
<mx:ApplicationControlBar dock="true">
<mx:Label text="innerRadius:" ></mx:Label>
<mx:HSlider id="slider"
minimum="0"
maximum="0.5"
liveDragging="true" ></mx:HSlider>
</mx:ApplicationControlBar>
<mx:PieChart id="chart"
height="100%"
width="100%"
innerRadius="{slider.value}"
showDataTips="true"
dataProvider="{arrColl}" >
<mx:series>
<mx:PieSeries labelPosition="callout"
field="avg"
labelFunction="labelFunc">
<mx:calloutStroke>
<mx:Stroke weight="0"
color="0×888888"
alpha="100"></mx:Stroke>
</mx:calloutStroke>
<mx:radialStroke>
<mx:Stroke weight="0"
color="#FFFFFF"
alpha="20"></mx:Stroke>
</mx:radialStroke>
<mx:stroke>
<mx:Stroke color="0"
alpha="20"
weight="2"></mx:Stroke>
</mx:stroke>
</mx:PieSeries>
</mx:series>
</mx:PieChart>
</mx:Application> 
```