# 动态调整DataGrid列的显示 
 当DataGrid需要呈现N多列的时候，要么列显示不全都挤在一起，要么就出现横向的滚动条。这些感觉都不和谐。<br>
那么实现的方案有几种<br>
1、给每列加个id，然后用别的控件（例如ComboBox）来控制每列显示，来开关列的显示和隐藏，类似js那样的做法，但那样代码量太大，写通用的方法也太麻烦了。<br>
2、基于上面的方法考虑，可以灵活运用flex中数据绑定功能来自动实现上述的效果。<br>
<br>
首先选择下需要实现效果的控件：DataGrid/Tile/Repeater/CheckBox<br>
DataGrid:不讲了谁都知道干嘛的。<br>
Tile：布局容器，容器内默认先横向布局，当宽度不够时自动换行。<br>
Repeater：主要的玩意，官方解释根据其 dataProvider 创建其子组件的多个实例。<br>
CheckBox：不知道的回家种地吧。<br>
实现思路：<br>
1、Tile中的Repeater绑定DataGrid中的columns。<br>
a.了解到DataGrid中的columns是什么？没错是Array。<br>
b.那也就是DataGrid中的columns可以直接给dataProvider提供数据绑定。也就是说Repeater.dataProvider和DataGrid.columns都是指向同一个Array，我喜欢叫共同使用同一数据源。哈哈<br>
c.绑定后可以直接生成DataGrid列数的CheckBox控件了。<br>
d.CheckBox中的可以通过Repeater的currentItem，来取到DataGrid的columns当前列的对象。<br>
mxml代码：<br>
 ``` 
 <mx:Tile width="98%" borderColor="#ffffff" paddingLeft="5" horizontalGap="2" verticalGap="2" borderStyle="solid" borderThickness="1" cornerRadius="5">
  <mx:Repeater id="rp" dataProvider="{servir_config_DataGrid.columns}" width="100%">
 	        <mx:CheckBox label="{rp.currentItem.headerText}" selected="{rp.currentItem.visible}" change="tileItemCheckBox(event)">               
 	        </mx:CheckBox>
 	    </mx:Repeater>
 	</mx:Tile>
 	<mx:DataGrid id="servir_config_DataGrid" alpha="0.3" height="100%" width="98%">
 	    <mx:columns>
 	        <mx:DataGridColumn headerText="ID"  visible="false" dataField="id"></mx:DataGridColumn>
 	        <mx:DataGridColumn headerText="姓名" dataField="name"></mx:DataGridColumn>
 	        <mx:DataGridColumn headerText="性别" dataField="sex" ></mx:DataGridColumn>
 	        <mx:DataGridColumn headerText="年龄" dataField="age" ></mx:DataGridColumn>
 	        <mx:DataGridColumn headerText="收入" dataField="income"></mx:DataGridColumn>
 	    </mx:columns>        
 	</mx:DataGrid>
```  
对CheckBox的change事件处理。<br>
a.判断是否选中。<br>
b.从事件中取到数据源中所需要操作的对象。event.currentTarget.getRepeaterItem()<br>
c.改变显示。<br>
as代码：<br>
``` 
  private function tileItemCheckBox(event:Event):void{
          if(event.target.selected){
 	        event.currentTarget.getRepeaterItem().visible=true;
 	    }else{
 	        event.currentTarget.getRepeaterItem().visible=false;
 	    }
 	}
``` 
 其实实现起来挺简单的，就是理解思路上有点绕，主要是共同使用同一数据源的概念，flex中这样能很方便的实现在一个控件中操作另一控件。<br>