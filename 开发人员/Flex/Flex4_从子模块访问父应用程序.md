# Flex4_从子模块访问父应用程序
子模块可以通过使用parentApplication属性的引用来访问父应用程序的属性和方法。<br>
下面的示例在模块第一次加载时访问父应用程序的价钱属性，然后该模块使用这个属性–ArrayCollection作为图表的数据源。当用户点击按钮，子模块调用父应用程序的getNewData()方法为图表返回一个新的ArrayCollection：<br>
``` 
 <?xml version="1.0"?>
<!-- modules/ChartChildModule.mxml -->
<mx:Module
    xmlns:fx="http://ns.adobe.com/mxml/2009"
    xmlns:s="library://ns.adobe.com/flex/spark"
    xmlns:mx="library://ns.adobe.com/flex/mx"
    width="100%" height="100%"
    creationComplete="getDataFromParent()">
   <fx:Script>
        <![CDATA[
            import mx.collections.ArrayCollection;
            [Bindable]
            private var expenses:ArrayCollection;
 
            // 访问父应用程序的属性
            private function getDataFromParent():void {
                expenses = parentApplication.expenses;
            }
        ]]>
    </fx:Script>
 
    <mx:ColumnChart id="myChart" dataProvider="{expenses}">
        <mx:horizontalAxis>
           <mx:CategoryAxis dataProvider="{expenses}" categoryField="Month"/>
        </mx:horizontalAxis>
        <mx:series>
           <mx:ColumnSeries xField="Month" yField="Profit"
                displayName="Profit"></mx:ColumnSeries>
           <mx:ColumnSeries xField="Month" yField="Expenses"
                displayName="Expenses"></mx:ColumnSeries>
        </mx:series>
     </mx:ColumnChart>
     <mx:Legend dataProvider="{myChart}"></mx:Legend>
     <s:Button id="b1"
        click="expenses = parentApplication.getNewData();"
        label="Get New Data"></s:Button>
</mx:Module>
``` 

下面的例子展示了在前面例子中模块中使用的父应用程序：<br>
``` 
 <?xml version="1.0"?>
<!-- modules/ChartChildModuleLoader.mxml -->
<s:Application
    xmlns:fx="http://ns.adobe.com/mxml/2009"
    xmlns:s="library://ns.adobe.com/flex/spark"
    xmlns:mx="library://ns.adobe.com/flex/mx">
 
    <fx:Script>
        <![CDATA[
            import mx.collections.ArrayCollection;
 
            [Bindable]
            public var expenses:ArrayCollection = new ArrayCollection([
                {Month:"Jan", Profit:2000, Expenses:1500},
                {Month:"Feb", Profit:1000, Expenses:200},
                {Month:"Mar", Profit:1500, Expenses:500}
            ]);
 
            public function getNewData():ArrayCollection {
                return new ArrayCollection([
                    {Month:"Apr", Profit:1000, Expenses:1100},
                    {Month:"May", Profit:1300, Expenses:500},
                    {Month:"Jun", Profit:1200, Expenses:600}
                ]);
            }
        ]]>
    </fx:Script>
    <mx:ModuleLoader url="movies/ChartChildModule.swf" id="m1"></mx:ModuleLoader>
</s:Application>
``` 

你也可以访问和调用其它模块上的属性和方法。更多内容请看从其它模块访问本模块。<br>
这种方法的缺点是，它在模块内的创建了和父应用程序的依赖关系。另外，这些模块不再便于多个应用程序移植，除非你确保复制了应用程序的行为。为了避免上述缺点，您应该使用在父应用程序和它的子模块之间的安全接口，它定了你可以访问的属性和方法。有这么个接口可以让你重复使用的应用程序和模块，只要你不断更新的接口。欲了解更多信息，请看通过接口进行模块通信。<br>
