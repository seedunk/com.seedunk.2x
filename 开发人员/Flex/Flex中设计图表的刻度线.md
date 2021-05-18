# Flex中设计图表的刻度线
``` 
 <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"  layout="horizontal" backgroundColor="0xFFFFFF">  
<mx:Script>  
    <![CDATA[  
    [Bindable] public var chartDP:Array = [  
    {day:'Monday',rainfall:10,elevation:100,temperature:78},  
    {day:'Tuesday',rainfall:7,elevation:220,temperature:66},  
    {day:'Wednesday',rainfall:5,elevation:540,temperature:55},  
    {day:'Thursday',rainfall:8,elevation:60,temperature:84},  
    {day:'Friday',rainfall:11,elevation:390,temperature:52},  
    {day:'Saturday',rainfall:12,elevation:790,temperature:45},  
    {day:'Sunday',rainfall:14,elevation:1220,temperature:24}  
    ];  
    ]]>  
</mx:Script>  
<mx:Style>  
    .customTicks {  
    tickPlacement:cross;  
    minorTickPlacement:cross;  
    tickLength:5;  
    minorTickLength:10;  
    }  
</mx:Style>  
<mx:Canvas label="Area">  
    <mx:AreaChart dataProvider="{chartDP}" >  
        <mx:horizontalAxis>  
            <mx:CategoryAxis dataProvider="{chartDP}" categoryField="day" />  
        </mx:horizontalAxis>  
        <mx:verticalAxis>  
            <mx:LinearAxis id="vertAxis"/>  
        </mx:verticalAxis>  
        <mx:verticalAxisRenderers>  
            <mx:AxisRenderer axis="{vertAxis}" styleName="customTicks" />  
        </mx:verticalAxisRenderers>  
        <mx:series>  
            <mx:AreaSeries yField="rainfall" displayName="rainfall" />  
        </mx:series>  
    </mx:AreaChart>  
</mx:Canvas>  
</mx:Application>  
```

```
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"  
layout="horizontal" backgroundColor="0xFFFFFF">  
<mx:Script>  
    <![CDATA[  
    [Bindable] public var chartDP:Array = [  
    {day:'Monday',rainfall:10,elevation:100,temperature:78},  
    {day:'Tuesday',rainfall:7,elevation:220,temperature:66},  
    {day:'Wednesday',rainfall:5,elevation:540,temperature:55},  
    {day:'Thursday',rainfall:8,elevation:60,temperature:84},  
    {day:'Friday',rainfall:11,elevation:390,temperature:52},  
    {day:'Saturday',rainfall:12,elevation:790,temperature:45},  
    {day:'Sunday',rainfall:14,elevation:1220,temperature:24}  
    ];  
    ]]>  
</mx:Script>  
<mx:Style>  
    .customTicks {  
    tickPlacement:cross;  
    minorTickPlacement:cross;  
    tickLength:5;  
    minorTickLength:10;  
    }  
</mx:Style>  
<mx:Canvas label="Area">  
    <mx:AreaChart dataProvider="{chartDP}" >  
        <mx:horizontalAxis>  
            <mx:CategoryAxis dataProvider="{chartDP}" categoryField="day" />  
        </mx:horizontalAxis>  
        <mx:verticalAxis>  
            <mx:LinearAxis id="vertAxis"/>  
        </mx:verticalAxis>  
        <mx:verticalAxisRenderers>  
            <mx:AxisRenderer axis="{vertAxis}" styleName="customTicks" />  
        </mx:verticalAxisRenderers>  
        <mx:series>  
            <mx:AreaSeries yField="rainfall" displayName="rainfall" />  
        </mx:series>  
    </mx:AreaChart>  
</mx:Canvas>  
</mx:Application>  
```