# ��C#WebServiceͨ�ŵĶ�̬����ͳ��
## ����ͳ��ͼ
``` 
<?xml version="1.0" encoding="utf-8"?>  
<!-- charts/BasicLine.mxml -->  
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute"  creationComplete="WS.GetData.send();init();" >  
  <mx:Script><![CDATA[
  	 import mx.charts.events.ChartItemEvent;
  	
  	import mx.charts.Legend;    	
    import mx.charts.chartClasses.Series; 
    import mx.charts.ColumnChart;
    import mx.charts.LineChart;
      
       
      import mx.collections.ArrayCollection; 
      import mx.controls.Alert;   
      import mx.controls.dataGridClasses.DataGridColumn;
    
     
     
      import mx.core.UIComponent;
      import flash.utils.getDefinitionByName;
      import mx.controls.*;
     
      import flash.utils.Timer;  
      import flash.events.TimerEvent;
      
      import mx.graphics.Stroke;
      
      import mx.graphics.SolidColor;
          
           private var wdata:ArrayCollection = new ArrayCollection(); 
           private function addItem():void {
           	 this.wdata.removeAll();
           	 var k:int=this.chuancan-5;
           	 var kk:int=this.chuancan+5;
           	for(var i:int=k; i<kk; i++){      
             var a:String=this.WS.GetData.lastResult[i].Id;
             var b:String=this.WS.GetData.lastResult[i].Data1;
             wdata.addItem({Id:a, Data1:b});
             
      
            }

         }
          
                
           private var dummyArr:Array = [TextArea];
           private var Counts:int=0;
           private var tm:Timer;
           private function init():void{
               tm=new Timer(100);                      
               tm.addEventListener(TimerEvent.TIMER , reSend );}
           public function reSend(evt:TimerEvent):void{WS.GetData.send();}
           public function start():void{tm.start();}
           
           public var chuancan:int;
           
         
             
           private function CreateDataGrid():void{
                 var   dgSwitch:DataGrid =new DataGrid();
                 var   dgNEW:DataGrid =new DataGrid();   
                       dgNEW.dataProvider=WS.GetData.lastResult;    
                       dgNEW.width=400;                                              
                 var   Column1:DataGridColumn=new DataGridColumn(); 
                         Column1.headerText="Id"; 
                         Column1.dataField="Id";             
                 var   Column2:DataGridColumn=new DataGridColumn();  
                         Column2.headerText="����2";
                         Column2.dataField="Data1";
                 dgNEW.columns=dgSwitch.columns.concat(Column1,Column2);
                         box.addChild(dgNEW);    
              }
           
           
            private function show(event:ChartItemEvent):void{
               var index:Number=event.hitData.chartItem.index;
               var lineSeries:LineSeries   =   LineSeries(event.hitData.chartItem.element) 
               var linename:Object = event.currentTarget;                  
               var tshow:TextArea=new TextArea();          
                tshow.text=     "--------��ϸ����----------\n"+
                                "��ǰ|   Id:"+ linename.dataProvider[index].Id+"       "+"Data1:"+linename.dataProvider[index].Data1+"\n"+
                                "֮ǰ|   Id:"+ linename.dataProvider[index-1].Id+"       "+"Data1:"+linename.dataProvider[index-2].Data1+"\n"+
                                "֮��|   Id:"+ linename.dataProvider[index+1].Id+"       "+"Data1:"+linename.dataProvider[index+1].Data1+"\n";
                                
                tshow.width=300;
                tshow.height=110;
                box2.removeAllChildren(); 
                box2.addChild(tshow);
                this.chuancan=index;
               
                 
            
           
           }
           
           
      private function CreateLineChart():void{       
            var lcNEW:LineChart=new LineChart();           
               lcNEW.dataProvider=this.wdata;              
               lcNEW.width=450;
               lcNEW.height=400;
                                                    
           var lcX:CategoryAxis=new CategoryAxis();
                  lcX.dataProvider=this.wdata;
                  lcX.categoryField="Id";
                  
           var lcY:LineSeries=new LineSeries();
               lcY.name="data1";
               lcY.yField="Data1";
              
              lcNEW.horizontalAxis=lcX;
              lcNEW.series=[lcY];
                      
              box.removeAllChildren();
              box.addChild(lcNEW);
            
             }
             
                
                    
               

  ]]></mx:Script>  
 
 
  <mx:WebService id="WS" wsdl="http://10.10.10.9/webService.asmx?WSDL"
        fault="Alert.show(event.fault.faultString, 'Error')">  
<mx:operation name="GetData" resultFormat="object" />
</mx:WebService>
<mx:Panel title="��ϸ���" x="845" y="10" width="500" height="600" fontSize="12"/>
  <mx:VBox id="box" styleName="gradient" verticalAlign="middle" horizontalAlign="center" x="860" y="50" fontSize="12"  />
  <mx:VBox id="box2" styleName="gradient" verticalAlign="middle" horizontalAlign="center" x="870" y="480" fontSize="15"  />
<mx:Panel title="ϵͳ�ſ�"  width="800" height="600" fontSize="12" x="10" y="10">  
  
     
 <mx:LineChart id="myChart" itemClick="CreateLineChart();show(event);addItem();" x="10" width="750"
        dataProvider="{WS.GetData.lastResult}"    
        showDataTips="true"  
     >  
        <mx:horizontalAxis>  
           <mx:CategoryAxis    
                dataProvider="{WS.GetData.lastResult}"    
              categoryField=" "  
            />  
          
        </mx:horizontalAxis>  
        
        <mx:series>  
       <mx:LineSeries  
           	    id="xx"
           	    styleName="customTicks"
                 yField="Data1"    
                displayName="Data1"  
                 form="curve"     
                
                
           >
           <mx:itemRenderer>
              <mx:Component>
                    <mx:CrossItemRenderer 
                       scaleX="1" 
                       scaleY="1"/>
                </mx:Component>
                
                </mx:itemRenderer>
            <mx:lineStroke>
                <mx:Stroke color="0x33CCC"
               	 weight="2"/>
              </mx:lineStroke>
              
              <mx:fill>
                <mx:SolidColor color="0xCCCCC"/>
                </mx:fill>
                <mx:stroke>
               
                <mx:Stroke 
                   color="0xAAAAA" 
                   alpha="3"/>
                 </mx:stroke>
              
             
           </mx:LineSeries>  
           
        </mx:series>  
     </mx:LineChart>     
 
     
    
    
    
     <mx:Legend dataProvider="{myChart}"/>  
     
     <mx:Button label="����ˢ��" click="start();"/>
    
  
  </mx:Panel>  
</mx:Application>

``` 
## ��������
``` 
    using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using System.Web.Services;
using System.Web.Services.Protocols;



[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {


    }
    public class webData                     //������һ�����ڴ�����ݵ���                  

    {

        public string Id;

        public string Data1;

        public string Datan;

    }

     [WebMethod]

     [System.Xml.Serialization.XmlInclude(typeof(webData))]     // ��������������д��xml

    public ArrayList GetData()                                  //�Զ���"����"             

    {
       //�������ݿⲿ��
        SqlConnection conn = new SqlConnection();  
          conn.ConnectionString = "Data Source =DU\\SQLEXPRESS;Initial Catalog=webData;Integrated Security=True;User ID=sa;Password=123456";
          conn.Open();
        SqlCommand command = new SqlCommand( "select * from webl",conn);
        SqlDataAdapter da = new SqlDataAdapter();   
          da.SelectCommand = command;
        DataSet ds = new DataSet();                 
        da.Fill(ds, "tables");
        //�����ݿ��еĲ������浽��������������
��        ArrayList container = new ArrayList();          //������һ���������� ���ڽ����ݷ��ظ�����GetData������λ��    

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)   {
            webData wd = new webData();             //Ϊ�ഴ��һ��ʵ�� 
            wd.Id = ds.Tables[0].Rows[i]["id"].ToString().Trim();
            wd.Data1 = ds.Tables[0].Rows[i]["firstName"].ToString().Trim();
            wd.Datan=ds.Tables[0].Rows[i]["lastName"].ToString().Trim();

            container.Add(wd);  //��ʵ����õ�ֵ���浽 �������� ��
        }

        conn.Close();

        return container;   //���������е�ֵ��Ϊ����GetData ������ķ���ֵ

    }

}
    
       
      
    
``` 
