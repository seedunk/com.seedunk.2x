# 基于.net webservices和Flex LineChart组件的动态数据监控
主要就两个部分：.net的webservices的内容，以及Flex的mxml的内容。<br>
下面是WebService1.asmx.cs（这里为方便演示起见，用了随机数）<br>
```
using System;  
using System.Collections.Generic;  
using System.Web;  
using System.Web.Services;  
using System.Data.OleDb;  
using System.Collections;  
  
  
namespace WebApplication1  
{  
    /// <summary>  
    /// Summary description for WebService1  
    /// </summary>  
    [WebService(Namespace = "http://tempuri.org/")]  
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]  
    [System.ComponentModel.ToolboxItem(false)]  
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.   
     [System.Web.Script.Services.ScriptService]  
    public class WebService1 : System.Web.Services.WebService  
    {  
  
        [WebMethod]  
        public string HelloWorld()  
        {  
            return "Hello World";  
        }  
  
        [WebMethod]  
        public List<MonitorData> monitorPoint()  
        {  
            Random rnd = new Random();  
            var datalist = new List<MonitorData>();  
            MonitorData item;  
            for (int i = 0; i < 100; i++)  
            {  
                item = new MonitorData  
                {  
                    theData = Convert.ToDouble(rnd.Next(10)),  
                    timesStamp = i.ToString()  
                };  
                datalist.Add(item);  
            }  
            return datalist;  
        }  
  
        public class MonitorData  
        {  
            public double theData = 0;  
            public string timesStamp = string.Empty;  
        }  
  
    }  
}  
```

另一部分是flextest.mxml（其中wsdl="http://localhost:1264/WebService1.asmx?WSDL"）的地址可根据上面C#代码生成结果替换。）<br>
```
<?xml version="1.0"?>  
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml">  
      
    <mx:Script>  
        <!--[CDATA[  
        import mx.collections.ArrayCollection;  
        import mx.rpc.events.ResultEvent;    
              
        private function init():void {   
            // Get Data from WebService and fill chart when you click the canvas   
            webse.monitorPoint();   
            var timer1:Timer = new Timer(1000); //Trigger, 3s   
            timer1.addEventListener(TimerEvent.TIMER, SaveEnergy);  
  
            timer1.start();   
        }  
          
        private function GetMonitorPoint(event:ResultEvent):void {   
            // data source   
            linechart1.dataProvider=event.result;   
        }  
          
        private function SaveEnergy(event:TimerEvent):void {   
            // To Refresh   
            webse.monitorPoint();   
        }  
          
        ]]-->  
    </mx:Script>  
      
    <mx:WebService id="webse" wsdl="http://localhost:1264/WebService1.asmx?WSDL">  
        <mx:operation name="monitorPoint" resultFormat="object" result="GetMonitorPoint(event)"></mx:operation>  
    </mx:WebService>    
  
          
    <mx:Stroke id="sample" color="blue" weight="2"></mx:Strole>   
    <mx:Panel title="DateTimeAxis Example" height="100%" width="100%" click="init()" layout="vertical">    
          
        <mx:LineChart id="linechart1" height="100%" width="100%"  
                      paddingLeft="5" paddingRight="100"  
                      showDataTips="true">  
            <mx:horizontalAxis>  
                <mx:CategoryAxis categoryField="time"></mx:CategoryAxis>  
            </mx:horizontalAxis>  
            <mx:series>  
                <mx:LineSeries yField="theData" form="curve" displayName="Energy" lineStroke="{sample}"></mx:LineSeries>  
            </mx:series>  
        </mx:LineChart>  
          
    </mx:Panel>  
          
  
</mx:Application>   
```