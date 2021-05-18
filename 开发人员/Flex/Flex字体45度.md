# Flex 字体45°
[2014-12-07 22:24:11](#data.create_time)
```xml
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="addData();">
	<mx:Script>
	
	<![CDATA[
	   import mx.charts.HitData;
            import mx.charts.chartClasses.IAxis;
            import mx.charts.LineChart;
            import mx.charts.series.items.PieSeriesItem;

	       import mx.collections.ArrayCollection; 
           private var thisData:ArrayCollection= new ArrayCollection();
                 
       
         
           [Bindable]
          private function addData():void{
         	var thisId:int=0;
           for(var i=0;i<9;i++)
           {   thisId++;
               var rN:int =Math.floor(Math.random()*101);              
               var name : String ="11/1 15:0"+thisId.toString();
               var Data1: String =rN.toString();              
               thisData.addItem({TimeK:name,DataK:Data1});
          }
         } 
         
        

   
         ]]>
	</mx:Script>
	  <mx:Style>

       
       @font-face {
    src:url("simhei.ttf");
    fontFamily: "qiyy";
    embedAsCFF: false;
   }
   .lineChart{
    font-family:qiyy;
    font-size:18;
   }
   </mx:Style>
	<mx:Panel x="83" y="76" width="453" height="472" layout="absolute">
		<mx:LineChart x="10" y="10" id="linechart1" dataProvider="{thisData}" styleName="lineChart">
		 <mx:horizontalAxis>  
           <mx:CategoryAxis id="ca"    
                dataProvider="{thisData}"    
              categoryField="TimeK"  
            />  
       </mx:horizontalAxis>  
      <mx:horizontalAxisRenderers>
           <mx:AxisRenderer labelRotation="45" axis="{ca}" />
      </mx:horizontalAxisRenderers>
       
			<mx:series>
				<mx:LineSeries displayName="Series 1" yField="TimeK"/>
			</mx:series>
		</mx:LineChart>
		<mx:Legend dataProvider="{linechart1}"/>
	</mx:Panel>
	
	
</mx:Application>
 
```
