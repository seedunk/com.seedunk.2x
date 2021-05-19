# DataGrid_自动滚动
## 创建XML文件
``` 
<?xml version="1.0" encoding="utf-8"?>
<mx:Application name="DataGrid_maxVerticalScrollPosition_text"
        xmlns:mx="http://www.adobe.com/2006/mxml"
        layout="vertical"
        verticalAlign="middle"
        backgroundColor="white"
        creationComplete="init();" >

    <mx:Script>
        <![CDATA[
            import mx.events.CollectionEvent;
            private var timer:Timer;

            private function init():void {
                timer = new Timer(500);
                timer.addEventListener(TimerEvent.TIMER, onTimer);
                timer.start();
            }

            private function onTimer(evt:TimerEvent):void {
                var now:String = new Date().toTimeString();
                arrColl.addItem({id:timer.currentCount, time:now});
            }

            private function arrColl_collectionChange(evt:CollectionEvent):void {
                callLater(autoScrollDataGrid);
            }

            private function autoScrollDataGrid():void {
                if (dataGrid) {
                    dataGrid.validateNow();
                    dataGrid.verticalScrollPosition = dataGrid.maxVerticalScrollPosition;
                }
            }
        ]]>
    </mx:Script>

    <mx:ArrayCollection id="arrColl"
            collectionChange="arrColl_collectionChange(event);" />
     <mx:DataGrid id="dataGrid"
            dataProvider="{arrColl}"
            verticalScrollPolicy="on"
            width="200"
            rowCount="8">
        <mx:columns>
            <mx:DataGridColumn dataField="id" width="50" ></mx:DataGridColumn>
            <mx:DataGridColumn dataField="time" ></mx:DataGridColumn>
        </mx:columns>
    </mx:DataGrid>

</mx:Application>
``` 
