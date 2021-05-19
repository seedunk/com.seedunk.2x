# 使用FileReference+HttpHandler实现文件上传下载

在Flex的应用开发中，同ASP.NET,JSP,PHP等应用一样，都会有上传/下载文件的应用需求，Flex的SDK也为我们提供了专门的类FileRefUdderence实现文件上传/下载。Flex只是作为一个客户端，要实现上传或下载必须得为其提供一个服务端来接受上传或下载的请求，本文以ASP.NET中的HttpHandler作为 文件上传的服务端来完成上传功能。<br>
OK，我们从Flex客户端开始，看看客户端是通过什么方式想服务端发起请求。Flex客户端要完成文件上传下载都是通过FileRefUdderence来实现，首先得定义一个该类型对象实例：<br>
```
 [Bindable]
  private var stateText:String = "请选择一个文件上传";
 //通过调用file对象的方法来完成上传和下载功能
 private var file:FileReference = new FileReference();
```

上传文件通常涉及到的有选择文件、上传文件以及上传完成这些最基本的处理过程。OK，下面我们就以这三个过程为例来看看Flex是怎么来完成文件的上传功能。首先为这三个功能点分别添加监听事件处理函数，在程序加载时调用：<br>
```
 internal function initApp():void{
     file.addEventListener(Event.SELECT,onSelected);
    file.addEventListener(Event.COMPLETE,onCompleted);
   file.addEventListener(ProgressEvent.PROGRESS,onProgress);
 }
```

另外我们也可以不用上面这中定义一个函数在程序加载时调用进行初始化操作，应用程序(mxml)的初始化操作又 creationComplete方法完成，另外还有一个比它先执行的方法createChildren(),我们可以直接在mxml下重写该方法来实现 应用程序的初始化，如下：<br>
```
 /**
  * createChildren 比 creationComplete 事件更早发生
  * */
  protected override function createChildren():void
{
     file.addEventListener(Event.SELECT,onSelected);
     file.addEventListener(Event.COMPLETE,onCompleted);
     file.addEventListener(ProgressEvent.PROGRESS,onProgress);
 }
```
这三个事件处理函数的详细定义如下（其中的stateText为String的变量，用于显示文件上传状态提示）：<br>
```
 internal function onSelected(evt:Event):void
 {
     stateText = "选择了文件" + file.name;
  }
  
  internal function onCompleted(evt:Event):void
  {
      stateText = "上传完毕！";
  }
 
 internal function onProgress(evt:ProgressEvent):void
 {
     stateText = "已上传 " + Math.round(100 * evt.bytesLoaded / evt.bytesTotal) + "%";
 }
```

到这里客户端就只差一步了，那就是完成发起上传请求的方法，实际上就是通过URLRequest对象创建一个与服务端的连接，然后直接调用FielReference类的upload()方法就可完成该功能，详细如下代码定义：<br>
```
 /**
 * 调用FileReference的实例方法upload()实现文件上传
 * */
 internal function onUpLoad():void
 {
     if(file.size > 0)
     {
          stateText = "正在上传文件：" + file.name;
      }
      var request:URLRequest = new URLRequest();
     request.url="[url]http://localhost/Web/UpLoadHandler.ashx[/url]";
      file.upload(request);
  }
```

写好了upload方法，现在就是调用他了，通过按扭的click事件直接调用就可以，另外调用file.browse()方法则实现选择文件的功能，如下mxml代码描述：<br>
```
 <mx:TextInput x="10" y="57" id="txtFile" text="{stateText}" width="229"/>
 <mx:Button x="247" y="57" label="选择" fontWeight="normal" click="{file.browse()}"/>
 <mx:Button x="29" y="111" label="上传文件" width="111" fontWeight="normal" click="onUpLoad()"/>
```

如上便完成了上传文件的Flex客户端开发，通过file.upload()方法，将把选择的文件通过二进制的形式发送到指定的服务端，并自动传递一个叫“fileName”的参数，服务端通过fileName便可以接收到客户端请求上传的文件。最后我们来看看服务端的 UpLoadHandler.ashx的详细定义：<br>
```
 public class UpLoadHandler : IHttpHandler{
      //文件上传目录
      private string uploadFolder = "UpLoad";
  
      public void ProcessRequest(HttpContext context)
     {
        context.Response.ContentType = "text/plain";
 
         HttpFileCollection files = context.Request.Files;
         if (files.Count > 0)
         {
             string path = context.Server.MapPath(uploadFolder);
             HttpPostedFile file = files[0];
 
             if (file != null && file.ContentLength > 0)
             {
                 string savePath = path + "/" + context.Request.Form["fileName"];
                 file.SaveAs(savePath);
             }
         }
         else
         {
             context.Response.Write("参数错误");
             context.Response.End();
         }
     }
 
     public bool IsReusable
     {
         get
         {
             return false;
         }
     }
 }
```

如上一系列的步骤便可完成上传文件的功能。<br>

实现了文件上传下面来看看怎么实现文件下载， 以上面上传示例中上传的mp3为例，下面我们来看看怎么从服务器（[url]http://localhost/Web/[/url]UpLoad/做你的爱人.mp3）上完成文件（做你的爱人.mp3）的下载。<br>
要实现文件下载对服务器端只要保证被下载文件存在就OK，同上传文件一样需要实例化一个FielReference对象的实例，并为其添加相应的事件处理函数：<br>
```
private var fileDown:FileReference = new FileReference();
  /**
  * createChildren 比 creationComplete 事件更早发生
    * */
  protected override function createChildren():void
  {
      super.createChildren();
      file.addEventListener(Event.SELECT,onSelected);
      file.addEventListener(Event.COMPLETE,onCompleted);
      file.addEventListener(ProgressEvent.PROGRESS,onProgress);
     //实现文件下载
     fileDown.addEventListener(Event.COMPLETE,onDownCompleted);
     fileDown.addEventListener(ProgressEvent.PROGRESS,onDownProgress);
 }
```

如上为实现下载文件的实例fileDown注册了成功下载文件后事件处理函数和下载过程处理函数，下面是两个方法的详细定义：<br>
```
  internal function onDownCompleted(evt:Event):void
 {
     var fileRef:FileReference = evt.currentTarget as FileReference;
     resultLabel.text = "文件名：" + fileRef.name + "下载完毕！";
 }
 
  internal function onDownProgress(evt:ProgressEvent):void
 {
    downState.text = "已下载： " + Math.round(100 * evt.bytesLoaded / evt.bytesTotal) + "%";
  }
</PRE>
 <br><font color=565758 size=2>完成了对象事件的开发，最后便上惩罚下载请求了，直接调用FileReference类所提供的download()方法既可：<br>
<PRE class=xml name="code">
 **
  * 调用FileReference类的实例方法download()实现文件下载
 * */
 internal function onDownLoad():void
 {
     var request:URLRequest = new URLRequest();
     request.url="[url]http://localhost:1146/UpLoad/[/url]做你的爱人.mp3";
     fileDown.download(request);
 }
```

程序执行到download（）;方法的时候会自动弹出选择保存文件对话框，根据实际情况选择好保存路径就OK。下面是实现上传和下载的完整代码。<br>

```
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="[url]http://www.adobe.com/2006/mxml[/url]" layout="absolute">
       <mx:Panel x="49" y="66" width="551" height="164" layout="absolute" 
           title="使用FileReference上传/下载文件" fontSize="12">
           <mx:HDividedBox x="10" y="10" width="511" height="102">
               <mx:Canvas  id="left" backgroundColor="#D7F4FF" height="100%" width="209">
              <mx:TextInput x="4" y="20" id="txtFile" text="{stateText}" width="135"></mx:TextInput >
               <mx:Button x="147" y="20" label="选择" fontWeight="normal" click="{file.browse()}"></mx:Button>
  
           <mx:Button x="31" y="68" label="上传文件" width="111" fontWeight="normal" click="onUpLoad()"></mx:Button>
             </mx:Canvas>
              <mx:Canvas id="right" backgroundColor="#D7F4FF" height="100%" width="282">
                  <mx:Label x="6" y="9" text="[url]http://localhost/Web/UpLoad/[/url]做你的爱人.mp3"></mx:Label >
                  <mx:Button x="10" y="37" label="下载文件" fontWeight="normal" click="onDownLoad()"></mx:Button>
                  <mx:Label x="10" y="74" width="272" id="resultLabel"></mx:Label >
                  <mx:TextInput x="122" y="37" id="downState"></mx:TextInput >
             </mx:Canvas>
         </mx:HDividedBox>
          
    </mx:Panel>
        <mx:Script>
          <![CDATA[
             [Bindable]
             private var stateText:String = "请选择一个文件上传";
             
             private var file:FileReference = new FileReference();
             private var fileDown:FileReference = new FileReference();
             
             /**
             * createChildren 比 creationComplete 事件更早发生
              * */
             protected override function createChildren():void
           {
                super.createChildren();
                file.addEventListener(Event.SELECT,onSelected);
                 file.addEventListener(Event.COMPLETE,onCompleted);
                  file.addEventListener(ProgressEvent.PROGRESS,onProgress);
                 
                 fileDown.addEventListener(Event.COMPLETE,onDownCompleted);
                  fileDown.addEventListener(ProgressEvent.PROGRESS,onDownProgress);
              }
              
  //            internal function initApp():void
  //            {
  //                file.addEventListener(Event.SELECT,onSelected);
  //                file.addEventListener(Event.COMPLETE,onCompleted);
  //                file.addEventListener(ProgressEvent.PROGRESS,onProgress);
  //            }
              
              internal function onSelected(evt:Event):void
              {
                  stateText = "选择了文件:" + file.name;
              }
              
             internal function onCompleted(evt:Event):void
             {
               stateText = "上传完毕！";
              }
             
              
             internal function onDownCompleted(evt:Event):void
             {
                  var fileRef:FileReference = evt.currentTarget as FileReference;
                  resultLabel.text = "文件名：" + fileRef.name + "下载完毕！";
              }
             
              internal function onProgress(evt:ProgressEvent):void
              {
                  stateText = "已上传： " + Math.round(100 * evt.bytesLoaded / evt.bytesTotal) + "%";
                 
              }
              
             internal function onDownProgress(evt:ProgressEvent):void
             {
                downState.text = "已下载： " + Math.round(100 * evt.bytesLoaded / evt.bytesTotal) + "%";
           }
            
         /**
            * 调用FileReference的实例方法upload()实现文件上传
             * */
           internal function onUpLoad():void
           {
                if(file.size > 0)
               {
                    stateText = "正在上传文件：" + file.name;
                 }
                 var request:URLRequest = new URLRequest();
                request.url=[url]http://localhost/Web/UpLoadHandler.ashx[/url];
                file.upload(request);
           }
            
           /**
              * 调用FileReference类的实例方法download()实现文件下载
              * */
             internal function onDownLoad():void
              {
                 var request:URLRequest = new URLRequest();
                request.url="[url]http://localhost/Web/UpLoad/[/url]做你的爱人.mp3";
                 fileDown.download(request);
           }
       ]]>
   </mx:Script>
</mx:Application>

```