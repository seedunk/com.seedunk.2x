# navigateToURL()
[navigateToURL() 可以用来打开一个新的浏览器窗口，也可以用来flex和js之间的通信。](#data.description)
[2014-12-07 22:24:11](#data.create_time)


比如:打开一个新窗口：
```js 
   var url:URLRequest = new URLRequest(http://blog.csdn.net);
   navigateToURL(url, _blank);
```
这个函数也可以用来执行js，例如：
```js 
  var url:URLRequest = new URLRequest(“javascript:window.close()”); 
//或者
  var urlLURLRequest = new URLRequest(“javascript:myFun(para1…paran)”)
``` 
myFun()函数是html页面的script部分定义的，函数参数一定要有引号！<br>
navigateToURL(url, _self);<br>
也可以用来发送email<br>
```js 
var urlURLRequest = new URLRequest(mailto:seedunk@outlook.com);
navigateToURL(url, _blank); 
```
