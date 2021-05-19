# 创建DataGrid自定义列

本例添加三个DataGridColumn 标签到DataGrid 的columns 属性中。使用homesforsale.xml作为数据文件。DataGridColumn 标签指定列表头标题和dataProvider 内对象属性的显示顺序。<br>
DataGridColumn 的dataField 属性指定显示该列的对象属性。这个例子中，对象的range 属性没有被显示在DataGrid 控件中，因为没有DataGridColumn 的dataField 与range 属性相关联：<br>
```
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="initApp()">
<mx:HTTPService id="srv" url="assets/homesforsale.xml" resultFormat="object" result="onResult(event)"></mx:HTTPService>
<mx:DataGrid id="grid" width="100%" height="100%" dataProvider="{homesForSale}">
<mx:columns>
<mx:DataGridColumn headerText="Total No."dataField="total"></mx:DataGridColumn>
<mx:DataGridColumn headerText="City"dataField="city"></mx:DataGridColumn>
<mx:DataGridColumn headerText="State"dataField="state"></mx:DataGridColumn>
</mx:columns>
</mx:DataGrid>
<mx:Script>
<![CDATA[
import mx.collections.ArrayCollection;
import mx.rpc.events.ResultEvent;
[Bindable]
private var homesForSale:ArrayCollection;
private function initApp():void {
this.srv.send();
}
private function onResult(evt:ResultEvent):void {
this.homesForSale = evt.result.data.region;
}
]]>
</mx:Script>
</mx:Application>
```
DataGridColumn 通过使用itemRenderers 可支持更多的自定义显示。下面的代码例子添加一个新的DataGridColumn，它使用自定义渲染器---RangeRenderer，以更加有意义 的方式来渲染rangge 属性。Range 属性包含三个值指示基于价格范围销售的房屋百分比：range1包含$350,000以下的销售比, range2是价格在$350,000 和$600,000之间的销售比，range3包含价格在$600,000之上的房屋销售比。 <br>
```
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="initApp()">
<mx:HTTPService id="srv" url="assets/homesforsale.xml" resultFormat="object" result="onResult(event)"></mx:HTTPService>
<mx:DataGrid id="grid" width="100%" height="100%" dataProvider="{homesForSale}">
<mx:columns>
<mx:DataGridColumn headerText="Total No."dataField="total"></mx:DataGridColumn>
<mx:DataGridColumn headerText="City"dataField="city"></mx:DataGridColumn>
<mx:DataGridColumn headerText="State"dataField="state"></mx:DataGridColumn>
<mx:DataGridColumn headerText="Price Ranges" dataField="range" itemRenderer="RangeRenderer"></mx:DataGridColumn>
</mx:columns>
</mx:DataGrid>
<mx:Script>
<![CDATA[
import mx.collections.ArrayCollection;
import mx.rpc.events.ResultEvent;
[Bindable]
private var homesForSale:ArrayCollection;
private function initApp():void {
this.srv.send();
}
private function onResult(evt:ResultEvent):void {
this.homesForSale = evt.result.data.region;
}
]]>
</mx:Script>
</mx:Application>
```
下面的代码就是RangeRenderer，使用百分比数值画出颜色条，表示百分比。这是通过重写updateDisplayList 方法来画出色彩条的.<br>
```
package{
import mx.controls.treeClasses.*;
import mx.collections.*;
public class CustomTreeItemRenderer extends TreeItemRenderer{
public function CustomTreeItemRenderer() {
super();
mouseEnabled = false;
}
override public function set data(value:Object):void{
if(value != null) {
super.data = value;
if(TreeListData(super.listData).hasChildren){
setStyle("color", 0x660099);
setStyle("fontWeight", 'bold');
}
 else{
setStyle("color", 0x000000);
setStyle("fontWeight", 'normal');
}
}
}
override protected function updateDisplayList(unscaledWidth:Number,unscaledHeight:Number):void{
super.updateDisplayList(unscaledWidth, unscaledHeight);
if(super.data){
if(TreeListData(super.listData).hasChildren){
var tmp:XMLList = new XMLList(TreeListData(super.listData).item);
var myStr:int = tmp[0].children().length();
super.label.text =TreeListData(super.listData).label + "("+myStr + "objects)";
}
}
}
}
}
```