# Flex读取外部带中文XML文件出现乱码解决方案 

```
    /***问题产生原因：
    外部文件的编码，Flex不能直接识别。
    解决思路：
    让Flex按指定编码读取外部文件
    详细内容
    ***/
    （1）外部文件位置
    private const xmlUrl:String = “http://localhost/Sourse/Life/Destiny/iData.xml”;
    iData为GB2312编码
    (2) 主调函数
    private function URLRequestData():void{ //使用URLRequest获取数据的函数
    var loader:URLLoader = new URLLoader();
    loader.dataFormat = URLLoaderDataFormat.BINARY;
    var urlRequest:URLRequest = new URLRequest(xmlUrl);
    loader.addEventListener(“complete”,completeHandler);
    loader.load(urlRequest);
    }
    （3） 功能函数
    private function completeHandler(evt:Event):void
    {
    var bytes:ByteArray = ByteArray(evt.currentTarget.data);
    var xmlStr:String = bytes.readMultiByte (bytes.length,”GB2312″);
    xmlStr为转义完成的格式;
}
```