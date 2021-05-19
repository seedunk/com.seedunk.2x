# DataGrid分页显示
绘制扇形<br>
 
设计思想是参考ASP.NET中的 ASPNETPager分页控件的思想。<br>
参数:<br>
属性:<br>
RecordCount 总记录条数<br>
PageSize 每页大小<br>
PageCount 总页数<br>
PageIndex 当前页码<br>
StartIndex 开始记录数，用于分页查询<br>
事件:<br>
pageChanged 分页触发时的事件<br>
需要自己写两个查询方法<br>
1.GetRecordCount返回总条数<br>
2.GetDataByPage(StartIndex,PageSize) 从开始记录取PageSize条记录，就可以完成分页功能(具体使用方法可以参考ASPNET Pager控件)<<br>
源码如下:<br>
``` 
<?xml version="1.0" encoding="utf-8"?>
<mx:Module xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" width="678"
initialize="init();" 
height="20">
<mx:Metadata>
[Event(name="pageChanged",type="mx.rpc.events.ResultEvent")]
</mx:Metadata>
<mx:Script>
 <![CDATA[
  import mx.controls.LinkButton;
  import mx.events.ItemClickEvent;
  import mx.controls.Alert;
  import mx.rpc.events.ResultEvent;  
  public var PageCount:int=0;
  public var RecordCount:int=0;
  public var PageSize:int=10;
  public var PageIndex:int=0;
  public var StartIndex:int=0;
  private function init():void{
   lb.dataProvider= [{label:"|<",text:"首页"},{label:"<<",text:"上一页"},{label:">>",text:"下一页"},{label:">|",text:"末页"}];    

  }
  public function setRecordCount(count:int):void{
   this.RecordCount=count;
   if(count%PageSize==0)
      PageCount=count/PageSize;
   else
      PageCount=count/PageSize+1;
      pg(PageIndex);
      refUI();
  }
  public function refUI():void{
   info.text="共"+RecordCount+"条记录每页"+PageSize+"条 共"+PageCount+"页第"+(PageIndex+1)+"页";
   (lb.getChildAt(0) as LinkButton).enabled=(lb.getChildAt(1) as LinkButton).enabled=PageIndex>0;
   (lb.getChildAt(2) as LinkButton).enabled=(lb.getChildAt(3) as LinkButton).enabled=PageIndex<PageCount-1;
  } 
  private function click(e:ItemClickEvent):void{
   var n:int= e.index;
   var index:int=PageIndex;
   switch(n){
    case 0:
     index=0;   
     break;  
    case 1:
        index--;
        break;
     case 2:
       index++;
       break;
     default:
       index=PageCount-1;
       break;   
   }
   pg(index);
  }
  private function pg(index:int):void{
   if(index<0)    index=0;
   if(index>PageCount-1) index=PageCount-1;
   PageIndex=index;
   StartIndex=PageIndex*PageSize;
   var ev:ResultEvent=new ResultEvent("pageChanged",false,true,PageIndex);
   dispatchEvent(ev);
   setTimeout(refUI,200);
  }

  private function gopg():void{
   var n:int=new Number(txtpg.text);
   n--;
   pg(n);
  }
 ]]>
</mx:Script>
<mx:Box width="100%" direction="horizontal" paddingTop="2">
<mx:Label y="1" id="info" text="共100条记录每页20条 共90页第1页" height="18"></mx:Label>
<mx:LinkBar id="lb" labelField="label" toolTipField="text" separatorWidth="0" fontSize="8" paddingLeft="0" paddingRight="0" itemClick="click(event)">     
</mx:LinkBar>
<mx:TextInput height="16" y="2" width="30" id="txtpg" paddingBottom="0" paddingTop="0" paddingLeft="0" paddingRight="0" borderStyle="solid" fontSize="8"></mx:TextInput>
<mx:LinkButton label="GO" height="18" width="24"  paddingRight="0"paddingLeft="0" fontSize="8" click="gopg();"></mx:LinkButton>
</mx:Box>
</mx:Module>

``` 
 
 调用方法:<br>
1. 初始化中需要设置 <br>
``` 
pager.PageSize=Config.popPageSize;//设置页大小
getRecordCount();    //设置总记录条数
    private function getRecordCount():void{
    ProductBLL.GetRecordCount(function(e:ResultEvent):void{ //调用业务方法，获取记录条数
     pager.setRecordCount(e.result as int); //设置记录条数
     refData();    //获取数据
    });
   }
   private function refData():void{    
    var start:int=pager.StartIndex;  //记录开始值
    ProductBLL.GetPageByName(start,pager.PageSize,function(e:ResultEvent):void{ //调用业务分页查询
     dg1.dataProvider=e.result;   //绑定数据         
    });
   }
``` 
2. 编写pageChanged事件,调用refData方法即可,如可直接写在标记中，如下:<br>
``` 
<ns2:Pager x="10" y="324" width="504" id="pager" pageChanged="refData();"/>
``` 
 
  