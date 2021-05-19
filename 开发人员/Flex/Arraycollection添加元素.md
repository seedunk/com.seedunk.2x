# Arraycollection

 arraycollection与datagrid使用，arraycollection需要添加object变量或array变量，格式要label：3类似，否则不好用，一个简单webservice服务获得天气预报
 ``` 
 <?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" fontSize="12">
<mx:Script> 
    <![CDATA[
    import mx.collections.ArrayCollection; 
         import mx.controls.Alert; 
         import mx.rpc.events.ResultEvent; 
         import mx.rpc.events.FaultEvent; 
         [Bindable]
         private var myWeatherReport:ArrayCollection;
        private function onLoad(event:ResultEvent):void{ 
        var weatherInfo:ArrayCollection = (event.result) as ArrayCollection;
        myWeatherReport = new ArrayCollection();
        var o:Object = new Object();
        o["qw"] = weatherInfo[5];
        o["gk"] = weatherInfo[6];
        o["fl"] = weatherInfo[7];
        o["bt"] = weatherInfo[8];
        o["yw"] = weatherInfo[9];
        myWeatherReport.addItem(o);
        var o1:Object = new Object();
        o1["qw"] = weatherInfo[12];
        o1["gk"] = weatherInfo[13];
        o1["fl"] = weatherInfo[14];
        o1["bt"] = weatherInfo[15];
        o1["yw"] = weatherInfo[16];
        myWeatherReport.addItem(o1);
        var o2:Object = new Object();
        o2["qw"] = weatherInfo[17];
        o2["gk"] = weatherInfo[18];
        o2["fl"] = weatherInfo[19];
        o2["bt"] = weatherInfo[20];
        o2["yw"] = weatherInfo[21];
        myWeatherReport.addItem(o2);
         sf.text = weatherInfo[0];
         cs.text = weatherInfo[1];
         csdm.text = weatherInfo[3];
         cstp.text = weatherInfo[4];
         tqzk.text = weatherInfo[10];
         cyzs.text = weatherInfo[11];
         csjs.text = weatherInfo[22];

         } 
         private function faultHandler(event:FaultEvent):void{ 
        Alert.show(event.fault.toString(),"WebService Error"); 
         }
         
        private function onQqLoad(event:ResultEvent):void{ 
        var QQInfo:String = (event.result) as String; 
          if(QQInfo == "Y"){
          myqqcodeReport.text="在线";
          }else if(QQInfo == "N"){
          myqqcodeReport.text = "不在线";
          }else if(QQInfo == "E"){
          myqqcodeReport.text ="qq号码错误";
          }
             myqqcodeReport.htmlText+=QQInfo+"\n"; 
        } 
          
    ]]> 
   </mx:Script>
<mx:WebService id="webService" wsdl="http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl" showBusyCursor="true" result="onLoad(event)" fault="faultHandler(event)" ></mx:WebService>
<mx:WebService id="qqOnlineService" wsdl="http://www.webxml.com.cn/webservices/qqOnlineWebService.asmx?wsdl" showBusyCursor="true" result="onQqLoad(event)" fault="faultHandler(event)" ></mx:WebService>
  
<mx:Panel title="天气预报" height="463" width="344" layout="absolute">
<mx:TextInput id="cityname" text="北京" x="0" y="0" width="183"></mx:TextInput>
    <mx:Button label="查询" click="webService.getWeatherbyCityName(cityname.text)" x="205" y="0"></mx:Button>
    <mx:Text id="sf" height="25" width="214" x="87" y="33" ></mx:Text>
    <mx:Label x="0" y="33" text="省份："></mx:Label>
    <mx:Text id="cs" height="25" width="214" x="87" y="61" ></mx:Text>
    <mx:Label x="0" y="61" text="城市："></mx:Label>
    <mx:Text id="csdm" height="25" width="214" x="87" y="89" ></mx:Text>
    <mx:Label x="0" y="89" text="城市图片："></mx:Label>
    <mx:Text id="cstp" height="25" width="214" x="87" y="122" ></mx:Text>
    <mx:Label x="0" y="122" text="更新时间："></mx:Label>
    <mx:DataGrid x="0" y="253" width="324" height="106" dataProvider="{myWeatherReport}" >
    <mx:columns>
       <mx:DataGridColumn headerText="气温" dataField="qw"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="概况" dataField="gk"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="风力/风向" dataField="fl"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="白天" dataField="bt"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="夜晚" dataField="yw"></mx:DataGridColumn>
    </mx:columns>
    </mx:DataGrid>
    <mx:Label x="0" y="156" text="今日天气状况:"></mx:Label>
    <mx:TextArea id="tqzk" x="82" y="155" width="219" height="38"></mx:TextArea>
    <mx:TextArea id="cyzs" x="82" y="201" width="219"></mx:TextArea>
    <mx:Label x="0" y="202" text="今日穿衣指数："></mx:Label>
    <mx:Label x="2" y="367" text="城市介绍："></mx:Label>
    <mx:TextArea id="csjs" x="60" y="366" width="264" height="55"></mx:TextArea>
</mx:Panel>
<mx:Panel title="QQ在线查询" x="352" y="0" width="327" height="150">
<mx:TextInput id="qqcode" text="438562993" x="22" y="10" width="84"></mx:TextArea>
<mx:Button label="查询" click="qqOnlineService.qqCheckOnline(qqcode.text)" ></mx:Button>
    <mx:TextArea id="myqqcodeReport" height="47" width="307" editable="false" x="0" y="53" ></mx:TextArea>
</mx:Panel>
</mx:Application>
``` 
