# Array和ArrayCollection的用法和区别

1. Flex Array作为控件使用 
   * FLEX3写法
	```
	<mx:Flex Arrayidmx:Flex Arrayid=”barname”> 
	<mx:String>Flash</mx:String> 
	<mx:String>Director</mx:String> 
	<mx:String>Dreamweaver</mx:String> 
	<mx:String>ColdFusion</mx:String> 
	</mx:FlexArray> 
	```
   * FLEX4写法
   ```
	<fx:Flex Arrayidfx:Flex Arrayid=”barname”> 
	<fx:String>Flex</fx:String> 
	<fx:String>Flash</fx:String> 
	<fx:String>Dreamweaver</fx:String> 
	</fx:FlexArray>
	```
   举例
   ```
	<mx:LinkBarid=”navigationBar”dataProvider=”{barname}”></mx:LinkBarid>
	<mx:LinkBarid=”navigationBar”dataProvider=”barname”></mx:LinkBarid>
	```
    注：写{}，则当barname数据的值修改后，linkbar的数据同步更新<br> 
2. Flex Array在程序中使用
	```
	[Bindable]  
	publicvarbarname:FlexArray=["Flex","Flash","Dreamweaver"];  
	<mx:LinkBaridmx:LinkBarid=”navigationBar”dataProvider=”{barname}”/> 
	varbarname:FlexArray=newFlexArray();  
	barname.push(“Flex”);  
	barname.push(“Flash”);  
	barname.push(“Dreamweaver”);  
	navigationBar.dataProvider=barname;  
	```
3. Flex Array的排序
	```
	private var temp:FlexArray=newFlexArray(1,4,3,45,4,6,7,77,9);  
	functionsortFlex Array(numbers:Flex Array):Flex Array{  
	numbers.sort(Flex Array.NUMERIC);  
	returnnumbers;  
	}  
	```
4. Flex ArrayCollection特点<br>
   Flex ArrayCollection是flex中的数组集合类，它是很常用的，我们使用它时需要注意几个地方。<br>
   1. 事件监听<br>
      Flex ArrayCollection可以为它注册一个集合改变的监听事件(CollectionEvent.COLLECTION_CHANGE)，就是一旦 Flex ArrayCollection数组改变就会触发Event，不是所有情况的改变都会触发改变事件，如果集合当中的对象属性没有被绑定，那么你改变它的对 象值也是不会触发事件的，在这种情况下你也许可能需要去将对象的属性进行绑定或者通过itemUpdated方法去管理对象值改变,除非集合的长度改变 了,事件才会被触发。<br>
   2. 对象删除<br>
      Flex ArrayCollection的对象删除方法removeAll()，有这样一种情况，当你在过滤集合数据的时候，它并不会删除所有数据，而是删除全部过滤的数据，不符合过滤条件的数据就没被删除，依然还在source中。<br>
   3. 过滤函数<br>
      Flex ArrayCollection有个filterFunction过滤函数，就是可能集合中你只需要显示其中某几个对象，你将会需要根据对象条件筛选对 象，那么你可能会用过滤函数，过滤函数会将不符合条件的对象过滤出来，但是Flex ArrayCollection有个source属性是不会变的，它是个数组，所有源数据全在里面，尽管你去过滤，所有对象都会一直存在其中。<br>
   4. 排序<br>
      Flex ArrayCollection还有一个sort属性是用来排序的，你可以为其指定排序字段。<br>
5. ArrayCollection在程序中使用<br> 
   1. 插入或删除<br>
	```
	import mx.collections.Flex ArrayCollection;  
	privatevarcoll:Flex ArrayCollection;  
	coll=newFlex ArrayCollection(  
	[{name:"MartinFoo",age:25},  
	{name:"JoeBar",age:15},  
	{name:"JohnBaz",age:23}]);  
	}  
	```
	 要插入元素，可使用addItemAt和addItem：
	```
	coll.addItemAt({name:”JamesFez”,age:40},0);
	coll.addItem({name:”JamesFez”,age:40});
	```
   2. 搜索<br>
      Sort对象提供findItem方法用于搜索这个Flex ArrayCollection中的所有元素。<br>
	  方法原型如下：<br>	
	  ```
		public functionfindItem(items:Flex Array,values:Object,mode:String,
		returnInsertionIndex:Boolean=false,compareFunction:Function=null):int
	   ```
  Value参数可以是包含属性和所需值的任何对象。<br> 
  Mode字符串可以是Sort.ANY_INDEX_MODE，表示返回任何匹配项索引，Sort.FIRST_INDEX_MODE表示返回第一个匹配项索引，Sort.LAST_INDEX_MODE表示返回最后一个匹配项索引。<br> 
  returnInsertionIndex参数表示如果该方法找不到由values参数标识的项目，并且此参数为
true，则findItem()方法将返回这些值的插入点，也就是排序顺序中应插入此项目的。<br> 
  compareFunction设置用于查找该项目的比较运算符函数.<br> 
  举例<br> 
 ```
private function checkExistence():int{  
varsort:Sort=newSort();  
returnsort.findItem(coll.source,{name:nameTI.text,age:Number(ageTI.text)},Sort.ANY_INDEX_MODE);  
}  
 ```
  3. 过滤<br> 
  filterFunction属性是由ListCollectionView类定义，它是Flex ArrayCollection的父类。
当过滤器函数被传递给继承自ListCollectionView的任何子类后，这里为Flex ArrayCollection对象，应用过滤器后必须调用refresh方法
将原型为function(item:Object):Boolean的函数传递给Flex ArrayCollection的filter属性。如果返回true表示值继续留在Flex ArrayCollection，返回false表示其值被移除。<br> 
  4. 排序<br> 
  首先要创建一个Sort，传递一个SortField对象数组给fields属性。这些SortField对象包含的字符串正是每个Flex ArrayCollection元素将要用来排序的属性。如要对每个对象的age属性进行排序，创建Sort对象，传递SortField。
设置排序字段为age：<br> 
	 ```
	private function getOldest():void{  
	varsort:Sort=newSort();  
	sort.fields=[newSortField("age")];  
	coll.sort=sort;  
	coll.refresh();  
	trace(coll.getItemAt(0).age+”“+coll.getItemAt(0).name);  
	} 
	 ```
  先按name升序排序，再按age降序排序<br> 
	 ```
	sort.fields=[newSortField("name"),newSortField("age",true,true)];
	 ```
	 API说明:<br> 
	 ```
		public function SortField(
		name:String=null,
		caseInsensitive:Boolean=false,
		descending:Boolean=false,
		numeric:Object=null)
	 ```
  参数:<br> 
  name:String(default=null)—此字段用来进行比较的属性的名称。如果该对象为简单类型，则传递null。<br> 
  caseInsensitive:Boolean(default=false)—在对字符串进行排序时，指示比较运算符是否忽略值的大小写。<br> 
  descending:Boolean(default=false)—指示比较运算符是否按降序排列项目。<br> 
  numeric:Object(default=null)—指示比较运算符是否按编号而不按字母顺序比较排序项目。<br> 
 6. Flex Array和ArrayCollection的比较<br> 
   Flex Array的优点：<br>
   1. Flex Array的性能优于Flex ArrayCollection，从测试结果平均看来，Flex ArrayCollection的效率是随着object的数目呈线性下降的，而Flex Array则是体现了优异的效率，在object增加的情况下，基本上没有太大的变化。所以如果在你需要遍历所有元素的情况下(比如说物理引擎，3D引擎 等)，Flex Array是不错的选择
程序见附件1.<br>
   2. 后台JavaBean也用的是数组[]<br>
   3. for循环数组似乎比foreachFlex ArrayConllection看起来更“傻瓜化”<br>
   4. 给Flex Array数组扩展长度，也可以变通实现，而且代价并不大<br>
<br>
   ArrayCollection的优点：<br>
   1. Flex ArrayCollection实现接口ICollectionView，在Flex的类定义内属于[数据集]，他提供更强大的检索、过滤、排序、分类、更新监控等功能。类似的类还有XMLListCollection<br>
   2. 用Flex Array在作为dataProvider绑定于control之上，就无法获得控件的更新(实际上效果是可以得到更新的)，除非控件被重新绘制或者 dataprovider被重新指定，而Collection则是将Flex Array的副本存储于Collection类的某个对象之中，其特点是Collection类本身就具备了确保数据同步的方法，例子如下（取自 adobe内部工程师training示例，稍有改变）<br>
   3. 对Flex ArrayCollection中的对象进行增加删除更新操作时Flex ArrayCollection会产生事件，可以通过collectionchange事件监听，所以在图表开发中都用Flex ArrayCollection做数据源，一旦有更新，就会反映在图标上<br>
  