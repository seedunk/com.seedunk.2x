# Loader加载图片在BitmapImage上显示<
```
private var loader:Loader=new Loader();
    private var urlR:URLRequest=new URLRequest();

private function init():void{
      //显示图片
     var str:String="image/20100620104112_0f_08_02_0c.jpg";
     var str2:String="image/20100620104112_0f_08_02_0c.jpg";
     loaderImage(str);
     loaderImage(str2);
    }

private function loaderImage(str:String):void{
     urlR.url=str;
     loader.load(urlR);
     loader.contentLoaderInfo.addEventListener(Event.COMPLETE, imgLoaded);
    }
    //加载结束后调用函数
    private function imgLoaded(e:Event):void
    {
     //将加载的图片添加到Sprite容器中，
     peoplePic.source=loader.content;
    }

<s:BitmapImage width="250" horizontalCenter="0" verticalCenter="0" id="peoplePic" height="213"></s:BitmapImage>
```
