#  XMLSocket通讯的安全策略设置
 ```
        <?xml version="1.0" encoding="utf-8"?>
        <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">
        <mx:Script>
        <![CDATA[
        import mx.rpc.events.FaultEvent;
        import mx.rpc.events.ResultEvent;
        private var header:URLRequestHeader;
        import mx.controls.Alert;
        private function isend():void{
        var urltmp:String=this.dataurl.text+":8888/Data/"+
                            this.datafid.text+"/"+this.datadid.text+"/"+
                            this.datatime.text+"/"+this.datakord.text;
            if(this.datakey.text!=""){urltmp+="/"+this.datakey.text;}
            cons.text="请求:"+urltmp+"\n";                
        //header= new URLRequestHeader("fecloud-key","sadasd123");
        var loader:URLLoader = new URLLoader();
                configureListeners(loader);
            var resh:Date=new Date();
            var request:URLRequest= new URLRequest(urltmp);
            //    request.data = new URLVariables(dataConf);
            //  request.requestHeaders.push(header);
            request.method = URLRequestMethod.POST;
            try {
            loader.load(request);
            } catch (error:Error) { Alert.show("Unable to load requested document."); }
            

        }
        private function configureListeners(dispatcher:IEventDispatcher):void {
                dispatcher.addEventListener(Event.COMPLETE, completeHandler);
        }
        private function completeHandler(event:Event):void {
        var loader:URLLoader = URLLoader(event.target);
            cons.text+="返回:\n";
            cons.text+=loader.data;
        } 


        ]]>
        </mx:Script>
        <mx:Canvas x="0" y="0" width="100%" height="100%" fontSize="12">
        <mx:Button x="33" y="63" click="isend();" label="OK"><mx:Button>
        <mx:TextInput id="dataurl" text="http://www.fecloud.com" x="112" y="63" width="111"></mx:TextInput>
        <mx:TextInput id="datafid" text="46" x="307" y="63" width="43"></mx:TextInput>
        <mx:TextInput id="datadid" text="47" x="369" y="63" width="119"></mx:TextInput>
        <mx:TextInput id="datatime" text="1000000" x="506" y="63"  width="69"></mx:TextInput>
        <mx:TextInput id="keyid0" text="/" x="351" y="63"  width="17" enabled="false"></mx:TextInput>
        <mx:TextInput id="keyid1" text="/" x="489" y="63"  width="15" enabled="false"></mx:TextInput>
        <mx:TextInput id="keyid2" text="/" x="576" y="63"  width="15" enabled="false"></mx:TextInput>
        <mx:TextInput id="datakord" x="592" y="63"  width="91" text="54$e7gjrtfg$2$2.1.1.1.1."></mx:TextInput>
        <mx:TextInput id="keyid4" text="/" x="683" y="63"  width="15" enabled="false"></mx:TextInput>
        <mx:TextInput id="datakey" x="699" y="63"  width="91"></mx:TextInput>
        <mx:TextArea id="cons" x="0" y="250" width="820" height="281" backgroundColor="#000000" color="#ffffff"></mx:TextArea>
        <mx:TextInput id="keyid3" text=":8888/Data/" x="225" y="63"  width="81" enabled="false"></mx:TextInput>
        <mx:Label x="309" y="90" text="数据源ID,该版只支持单feed,多feed支持与下周三更新。" width="415"></mx:Label>
        <mx:Label x="371" y="107" text="Datastreams ID列表，已英文状态下逗号分割，如D~ID不属于Feed被过滤" width="449"></mx:Label>
        <mx:TextArea x="506" y="127" text="毫秒数，如为更新数据操作&#xa;则此处必须为'now',暂不支持插入到某时点" width="337" backgroundAlpha="0"></mx:TextArea>
        <mx:TextArea x="587" y="169" text="数据或key,为key时执行读取数据&#xa;操作，最后一个字段不用填,为数据时，&#xa;数量和分割方式和Datastreams对应，&#xa;最后一个文本框填key&#xa;" width="337" backgroundAlpha="0" height="78"></mx:TextArea>
        </mx:Canvas>
        </mx:Application>

```