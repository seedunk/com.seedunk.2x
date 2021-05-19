# Arraycollection

 arraycollection��datagridʹ�ã�arraycollection��Ҫ���object������array��������ʽҪlabel��3���ƣ����򲻺��ã�һ����webservice����������Ԥ��
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
          myqqcodeReport.text="����";
          }else if(QQInfo == "N"){
          myqqcodeReport.text = "������";
          }else if(QQInfo == "E"){
          myqqcodeReport.text ="qq�������";
          }
             myqqcodeReport.htmlText+=QQInfo+"\n"; 
        } 
          
    ]]> 
   </mx:Script>
<mx:WebService id="webService" wsdl="http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl" showBusyCursor="true" result="onLoad(event)" fault="faultHandler(event)" ></mx:WebService>
<mx:WebService id="qqOnlineService" wsdl="http://www.webxml.com.cn/webservices/qqOnlineWebService.asmx?wsdl" showBusyCursor="true" result="onQqLoad(event)" fault="faultHandler(event)" ></mx:WebService>
  
<mx:Panel title="����Ԥ��" height="463" width="344" layout="absolute">
<mx:TextInput id="cityname" text="����" x="0" y="0" width="183"></mx:TextInput>
    <mx:Button label="��ѯ" click="webService.getWeatherbyCityName(cityname.text)" x="205" y="0"></mx:Button>
    <mx:Text id="sf" height="25" width="214" x="87" y="33" ></mx:Text>
    <mx:Label x="0" y="33" text="ʡ�ݣ�"></mx:Label>
    <mx:Text id="cs" height="25" width="214" x="87" y="61" ></mx:Text>
    <mx:Label x="0" y="61" text="���У�"></mx:Label>
    <mx:Text id="csdm" height="25" width="214" x="87" y="89" ></mx:Text>
    <mx:Label x="0" y="89" text="����ͼƬ��"></mx:Label>
    <mx:Text id="cstp" height="25" width="214" x="87" y="122" ></mx:Text>
    <mx:Label x="0" y="122" text="����ʱ�䣺"></mx:Label>
    <mx:DataGrid x="0" y="253" width="324" height="106" dataProvider="{myWeatherReport}" >
    <mx:columns>
       <mx:DataGridColumn headerText="����" dataField="qw"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="�ſ�" dataField="gk"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="����/����" dataField="fl"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="����" dataField="bt"></mx:DataGridColumn>
       <mx:DataGridColumn headerText="ҹ��" dataField="yw"></mx:DataGridColumn>
    </mx:columns>
    </mx:DataGrid>
    <mx:Label x="0" y="156" text="��������״��:"></mx:Label>
    <mx:TextArea id="tqzk" x="82" y="155" width="219" height="38"></mx:TextArea>
    <mx:TextArea id="cyzs" x="82" y="201" width="219"></mx:TextArea>
    <mx:Label x="0" y="202" text="���մ���ָ����"></mx:Label>
    <mx:Label x="2" y="367" text="���н��ܣ�"></mx:Label>
    <mx:TextArea id="csjs" x="60" y="366" width="264" height="55"></mx:TextArea>
</mx:Panel>
<mx:Panel title="QQ���߲�ѯ" x="352" y="0" width="327" height="150">
<mx:TextInput id="qqcode" text="438562993" x="22" y="10" width="84"></mx:TextArea>
<mx:Button label="��ѯ" click="qqOnlineService.qqCheckOnline(qqcode.text)" ></mx:Button>
    <mx:TextArea id="myqqcodeReport" height="47" width="307" editable="false" x="0" y="53" ></mx:TextArea>
</mx:Panel>
</mx:Application>
``` 
