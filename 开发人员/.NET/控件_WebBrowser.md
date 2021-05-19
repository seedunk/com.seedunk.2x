# webBrowser控件显示相对路径内的本地网页

重点:获得程序运行的绝对路径<br>
```
  string path = Environment.CurrentDirectory + "/" + "本地网页完整名称" 
```
在webBrowser控件中显示<br> 
```
  this.webBrowser1.Url = new System.Uri (path ); 
  ```