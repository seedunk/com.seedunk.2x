# Ż����Ѫ!DataGrid��ȡĳ�е�ֵ
```
   //DataGrid: itemClick="itemClick(event)"
   
   function itemClick(e:ListEvent):void{
      var colindex:Number=e.columnIndex;
      var datagrid:DataGrid=e.target as DataGrid;
      var col:DataGridColumn=datagrid.colums[colindex];
      //cell val
      var fitlertext:String=datagrid.selectedItem[col.dataField];
    }


```


```
      for each(var obj:Object in dataGrid.dataProvider){
		 this.infoShow.text=this.infoShow.text+"_"+ obj.Value;
	 }
```
���DataGrid��ȡ��ǰֵ�Ĵ��� WS.GetData.lastResult[DataGrid.selectedIndex].Id;
```
        public function show(event:ListEvent):void{  
           
var testVO:TestVO = (DataGrid)(event.target).selectedItem as TestVO;
           var allSeries:Array = myChart.series;
            var series:Series = allSeries[0] as Series;
                series.dataTipItems = [];  
         
             for��var item:LineSeriesItem in series.items��{  
               var LCI:LineSeriesItem= item as LineSeriesItem;  
                if(testVo.date == LCI.xValue ){  
                   series.dataTipItems.push(item);  
                   linechart.showAllDataTips = true;  }  
              }  
            } 

           this.xx.dataProvider[index].Id   
           
}
```