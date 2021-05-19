# ����DataGrid�Զ����� 
����<br>
����ָ��DataGrid �Զ����У�����������ʾ��<br>
����취<br>
ʹ��DataGridColumn ��ǩָ���Զ���������<br>
����<br>
�����������DataGridColumn ��ǩ��DataGrid ��columns �����С�ʹ��homesforsale.xml��Ϊ�����ļ���DataGridColumn ��ǩָ���б�ͷ�����dataProvider �ڶ������Ե���ʾ˳��
DataGridColumn ��dataField ����ָ����ʾ���еĶ������ԡ���������У������range ����û�б���ʾ��DataGrid �ؼ��У���Ϊû��DataGridColumn ��dataField ��range �����������<br>

```
<mx:Application
xmlns:mx="http://www.adobe.com/2006/mxml"
layout="absolute"
creationComplete="initApp()">
<mx:HTTPService id="srv" url="assets/homesforsale.xml"
resultFormat="object"
result="onResult(event)"></mx:HTTPService>
<mx:DataGrid id="grid"
width="100%"
height="100%"
dataProvider="{homesForSale}">
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

DataGridColumn ͨ��ʹ��itemRenderers ��֧�ָ�����Զ�����ʾ������Ĵ����������һ���µ�DataGridColumn����ʹ���Զ�����Ⱦ����RangeRenderer���Ը��������� �ķ�ʽ����Ⱦrangge ���ԡ�Range ���԰�������ֵָʾ���ڼ۸�Χ���۵ķ��ݰٷֱȣ�range1����$350,000���µ����۱�, range2�Ǽ۸���$350,000 ��$600,000֮������۱ȣ�range3�����۸���$600,000֮�ϵķ������۱ȡ�<br>
```
<mx:Application
xmlns:mx="http://www.adobe.com/2006/mxml"
layout="absolute"
creationComplete="initApp()">
<mx:HTTPService id="srv" url="assets/homesforsale.xml"
resultFormat="object"
result="onResult(event)"></mx:HTTPService>
<mx:DataGrid id="grid"
width="100%"
height="100%"
dataProvider="{homesForSale}">
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
}p
private function onResult(evt:ResultEvent):void {
this.homesForSale = evt.result.data.region;
}
]]>
</mx:Script>
</mx:Application>
```
����Ĵ������RangeRenderer��ʹ�ðٷֱ���ֵ������ɫ������ʾ�ٷֱȡ�����ͨ����дupdateDisplayList ����������ɫ������.<br>

```
package
{
import mx.controls.treeClasses.*;
import mx.collections.*;
public class CustomTreeItemRenderer extends TreeItemRenderer
{
public function CustomTreeItemRenderer() {
super();
mouseEnabled = false;
}
override public function set data(value:Object):void
{
if
(value != null) {
super.data = value;
if(TreeListData(super.listData).hasChildren)
{
setStyle("color", 0��660099);
setStyle("fontWeight", ��bold��);
}
else
{
setStyle("color", 0��000000);
setStyle("fontWeight", ��normal��);
}
}
}
override protected function updateDisplayList(unscaledWidth:Number,unscaledHeight:Number):void
{
super.updateDisplayList(unscaledWidth, unscaledHeight);
if(super.data){
if(TreeListData(super.listData).hasChildren)
{
var tmp:XMLList = new XMLList(TreeListData(super.listData).item);
var myStr:int = tmp[0].children().length();
super.label.text =TreeListData(super.listData).label + "("+myStr + "objects)";
}
}
}
}
}
```