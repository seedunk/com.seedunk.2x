# Flex 加载外部图片
[2014-12-07 22:24:11](#data.create_time)
```js 
  var  loader:Loader = new Loader();
       loader.contentLoaderInfo.addEventListener(Event.COMPLETE,
            function(e:Event):void{
                     img.source = e.currentTarget.content;
           });
       loader.load(
          new URLRequest(encodeURI("{图片URL}"))); 
```
