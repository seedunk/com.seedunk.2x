# XML转换成ArrayCollection

## xml文件
```
var carInfoXml:XML=new XML(<VehicleList> 
            <vehicle id="209159" nummber="粤111111" /> 
            <vehicle id="35662" nummber="粤222222" /> 
            <vehicle id="40154" nummber="粤333333" /> 
            <vehicle id="35693" nummber="粤444444444" /> 
            <vehicle id="40258" nummber="粤555555555" />
            <vehicle id="40081" nummber="粤66666" /> 
            <vehicle id="40238" nummber="粤B77777" /> 
                           </VehicleList>);

```
 
## 方法
```
for each(var p:XML in carInfoXml.vehicle){ 
      var obj:Object=new Object(); 
     obj.id=p.@id; 
     obj.nummber=p.@nummber; 
      ac.addItem(obj); 
     } 
     carinfo.dataProvider=ac;//carinfo是<s:DropDownList width="115" id="carinfo"></s:DropDownList>
     carinfo.labelField="nummber";
```
## 示例
```
<?xml version="1.0" encoding="utf-8"?>  
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" fontSize="12"  creationComplete="init()">  
	    <mx:Style source="style/Smoke.css"/>  
	    <mx:Script>  
	        <![CDATA[ 
	         import mx.collections.ArrayCollection;      
	         [Bindable]private var shijxml:XML; 
	          
	          private function init():void{ 
	            shijxml = arrToXml(exams); 
	          } 
	          
	        [Bindable] 
	        public var exams:ArrayCollection = new ArrayCollection( 
	                [{sjtitle:"数据结构第一章", kemu:"数据结构",shijID:"sj000" ,num:"30"},  
	                 {sjtitle:"数据结构第二章", kemu:"数据结构",shijID:"sj001" ,num:"30"},  
	                {sjtitle:"组成原理第一章", kemu:"组成原理",shijID:"zc000" ,num:"50"},                     
	                {sjtitle:"组成原理第二章", kemu:"组成原理",shijID:"zc001" ,num:"30"} ]); 
	                   
	         private function arrToXml(arr:ArrayCollection):XML{ 
	                var root:XML = new XML("<root/>"); 
                for(var i:int = 0;i<arr.length;i++){ 
	                    var node:XML = new XML("<node/>"); 
	                    node.sjtitle = arr[i].sjtitle; 
	                    node.kemu= arr[i].kemu; 
	                    node.shijID= arr[i].shijID; 
	                    node.num= arr[i].num; 
	                    root.appendChild(node); 
	                } 
	                return root; 
	            } 
	            private function closeHandler(event:Event):void { 
	               show.text="试卷标题： "+ ComboBox(event.target).selectedItem; 
	               var  temp:String=String(ComboBox(event.target).selectedItem); 
	               for each(var xml:XML in shijxml.node){ 
	                if(xml.sjtitle==temp){ 
	                    show.text="考试科目： "+xml.kemu+"\n"+"试卷题数： "+xml.num+"\n"+ 
	                    "试卷编号： "+xml.shijID; 
	                } 
	              }    
	            }      
	        ]]>  
	    </mx:Script>  
	    <mx:Panel width="100%" height="100%" layout="absolute" >  
	        <mx:DataGrid height="100%" width="50%" dataProvider="{exams}">  
	        </mx:DataGrid>  
	        <mx:ComboBox y="79" close="closeHandler(event);" dataProvider="{shijxml.node.sjtitle}" right="88"></mx:ComboBox>  
 	        <mx:Text y="111" id="show"  width="185" height="126" right="50"/>  
 	    </mx:Panel>  
 	</mx:Application>  
```