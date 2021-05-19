# Array��ArrayCollection���÷�������

1. Flex Array��Ϊ�ؼ�ʹ�� 
   * FLEX3д��
	```
	<mx:Flex Arrayidmx:Flex Arrayid=��barname��> 
	<mx:String>Flash</mx:String> 
	<mx:String>Director</mx:String> 
	<mx:String>Dreamweaver</mx:String> 
	<mx:String>ColdFusion</mx:String> 
	</mx:FlexArray> 
	```
   * FLEX4д��
   ```
	<fx:Flex Arrayidfx:Flex Arrayid=��barname��> 
	<fx:String>Flex</fx:String> 
	<fx:String>Flash</fx:String> 
	<fx:String>Dreamweaver</fx:String> 
	</fx:FlexArray>
	```
   ����
   ```
	<mx:LinkBarid=��navigationBar��dataProvider=��{barname}��></mx:LinkBarid>
	<mx:LinkBarid=��navigationBar��dataProvider=��barname��></mx:LinkBarid>
	```
    ע��д{}����barname���ݵ�ֵ�޸ĺ�linkbar������ͬ������<br> 
2. Flex Array�ڳ�����ʹ��
	```
	[Bindable]  
	publicvarbarname:FlexArray=["Flex","Flash","Dreamweaver"];  
	<mx:LinkBaridmx:LinkBarid=��navigationBar��dataProvider=��{barname}��/> 
	varbarname:FlexArray=newFlexArray();  
	barname.push(��Flex��);  
	barname.push(��Flash��);  
	barname.push(��Dreamweaver��);  
	navigationBar.dataProvider=barname;  
	```
3. Flex Array������
	```
	private var temp:FlexArray=newFlexArray(1,4,3,45,4,6,7,77,9);  
	functionsortFlex Array(numbers:Flex Array):Flex Array{  
	numbers.sort(Flex Array.NUMERIC);  
	returnnumbers;  
	}  
	```
4. Flex ArrayCollection�ص�<br>
   Flex ArrayCollection��flex�е����鼯���࣬���Ǻܳ��õģ�����ʹ����ʱ��Ҫע�⼸���ط���<br>
   1. �¼�����<br>
      Flex ArrayCollection����Ϊ��ע��һ�����ϸı�ļ����¼�(CollectionEvent.COLLECTION_CHANGE)������һ�� Flex ArrayCollection����ı�ͻᴥ��Event��������������ĸı䶼�ᴥ���ı��¼���������ϵ��еĶ�������û�б��󶨣���ô��ı����Ķ� ��ֵҲ�ǲ��ᴥ���¼��ģ��������������Ҳ�������Ҫȥ����������Խ��а󶨻���ͨ��itemUpdated����ȥ�������ֵ�ı�,���Ǽ��ϵĳ��ȸı� ��,�¼��Żᱻ������<br>
   2. ����ɾ��<br>
      Flex ArrayCollection�Ķ���ɾ������removeAll()��������һ������������ڹ��˼������ݵ�ʱ����������ɾ���������ݣ�����ɾ��ȫ�����˵����ݣ������Ϲ������������ݾ�û��ɾ������Ȼ����source�С�<br>
   3. ���˺���<br>
      Flex ArrayCollection�и�filterFunction���˺��������ǿ��ܼ�������ֻ��Ҫ��ʾ����ĳ���������㽫����Ҫ���ݶ�������ɸѡ�� ����ô����ܻ��ù��˺��������˺����Ὣ�����������Ķ�����˳���������Flex ArrayCollection�и�source�����ǲ����ģ����Ǹ����飬����Դ����ȫ�����棬������ȥ���ˣ����ж��󶼻�һֱ�������С�<br>
   4. ����<br>
      Flex ArrayCollection����һ��sort��������������ģ������Ϊ��ָ�������ֶΡ�<br>
5. ArrayCollection�ڳ�����ʹ��<br> 
   1. �����ɾ��<br>
	```
	import mx.collections.Flex ArrayCollection;  
	privatevarcoll:Flex ArrayCollection;  
	coll=newFlex ArrayCollection(  
	[{name:"MartinFoo",age:25},  
	{name:"JoeBar",age:15},  
	{name:"JohnBaz",age:23}]);  
	}  
	```
	 Ҫ����Ԫ�أ���ʹ��addItemAt��addItem��
	```
	coll.addItemAt({name:��JamesFez��,age:40},0);
	coll.addItem({name:��JamesFez��,age:40});
	```
   2. ����<br>
      Sort�����ṩfindItem���������������Flex ArrayCollection�е�����Ԫ�ء�<br>
	  ����ԭ�����£�<br>	
	  ```
		public functionfindItem(items:Flex Array,values:Object,mode:String,
		returnInsertionIndex:Boolean=false,compareFunction:Function=null):int
	   ```
  Value���������ǰ������Ժ�����ֵ���κζ���<br> 
  Mode�ַ���������Sort.ANY_INDEX_MODE����ʾ�����κ�ƥ����������Sort.FIRST_INDEX_MODE��ʾ���ص�һ��ƥ����������Sort.LAST_INDEX_MODE��ʾ�������һ��ƥ����������<br> 
  returnInsertionIndex������ʾ����÷����Ҳ�����values������ʶ����Ŀ�����Ҵ˲���Ϊ
true����findItem()������������Щֵ�Ĳ���㣬Ҳ��������˳����Ӧ�������Ŀ�ġ�<br> 
  compareFunction�������ڲ��Ҹ���Ŀ�ıȽ����������.<br> 
  ����<br> 
 ```
private function checkExistence():int{  
varsort:Sort=newSort();  
returnsort.findItem(coll.source,{name:nameTI.text,age:Number(ageTI.text)},Sort.ANY_INDEX_MODE);  
}  
 ```
  3. ����<br> 
  filterFunction��������ListCollectionView�ඨ�壬����Flex ArrayCollection�ĸ��ࡣ
�����������������ݸ��̳���ListCollectionView���κ����������ΪFlex ArrayCollection����Ӧ�ù�������������refresh����
��ԭ��Ϊfunction(item:Object):Boolean�ĺ������ݸ�Flex ArrayCollection��filter���ԡ��������true��ʾֵ��������Flex ArrayCollection������false��ʾ��ֵ���Ƴ���<br> 
  4. ����<br> 
  ����Ҫ����һ��Sort������һ��SortField���������fields���ԡ���ЩSortField����������ַ�������ÿ��Flex ArrayCollectionԪ�ؽ�Ҫ������������ԡ���Ҫ��ÿ�������age���Խ������򣬴���Sort���󣬴���SortField��
���������ֶ�Ϊage��<br> 
	 ```
	private function getOldest():void{  
	varsort:Sort=newSort();  
	sort.fields=[newSortField("age")];  
	coll.sort=sort;  
	coll.refresh();  
	trace(coll.getItemAt(0).age+����+coll.getItemAt(0).name);  
	} 
	 ```
  �Ȱ�name���������ٰ�age��������<br> 
	 ```
	sort.fields=[newSortField("name"),newSortField("age",true,true)];
	 ```
	 API˵��:<br> 
	 ```
		public function SortField(
		name:String=null,
		caseInsensitive:Boolean=false,
		descending:Boolean=false,
		numeric:Object=null)
	 ```
  ����:<br> 
  name:String(default=null)�����ֶ��������бȽϵ����Ե����ơ�����ö���Ϊ�����ͣ��򴫵�null��<br> 
  caseInsensitive:Boolean(default=false)���ڶ��ַ�����������ʱ��ָʾ�Ƚ�������Ƿ����ֵ�Ĵ�Сд��<br> 
  descending:Boolean(default=false)��ָʾ�Ƚ�������Ƿ񰴽���������Ŀ��<br> 
  numeric:Object(default=null)��ָʾ�Ƚ�������Ƿ񰴱�Ŷ�������ĸ˳��Ƚ�������Ŀ��<br> 
 6. Flex Array��ArrayCollection�ıȽ�<br> 
   Flex Array���ŵ㣺<br>
   1. Flex Array����������Flex ArrayCollection���Ӳ��Խ��ƽ��������Flex ArrayCollection��Ч��������object����Ŀ�������½��ģ���Flex Array���������������Ч�ʣ���object���ӵ�����£�������û��̫��ı仯���������������Ҫ��������Ԫ�ص������(����˵�������棬3D���� ��)��Flex Array�ǲ����ѡ��
���������1.<br>
   2. ��̨JavaBeanҲ�õ�������[]<br>
   3. forѭ�������ƺ���foreachFlex ArrayConllection����������ɵ�ϻ���<br>
   4. ��Flex Array������չ���ȣ�Ҳ���Ա�ͨʵ�֣����Ҵ��۲�����<br>
<br>
   ArrayCollection���ŵ㣺<br>
   1. Flex ArrayCollectionʵ�ֽӿ�ICollectionView����Flex���ඨ��������[���ݼ�]�����ṩ��ǿ��ļ��������ˡ����򡢷��ࡢ���¼�صȹ��ܡ����Ƶ��໹��XMLListCollection<br>
   2. ��Flex Array����ΪdataProvider����control֮�ϣ����޷���ÿؼ��ĸ���(ʵ����Ч���ǿ��Եõ����µ�)�����ǿؼ������»��ƻ��� dataprovider������ָ������Collection���ǽ�Flex Array�ĸ����洢��Collection���ĳ������֮�У����ص���Collection�౾��;߱���ȷ������ͬ���ķ������������£�ȡ�� adobe�ڲ�����ʦtrainingʾ�������иı䣩<br>
   3. ��Flex ArrayCollection�еĶ����������ɾ�����²���ʱFlex ArrayCollection������¼�������ͨ��collectionchange�¼�������������ͼ�����ж���Flex ArrayCollection������Դ��һ���и��£��ͻᷴӳ��ͼ����<br>
  