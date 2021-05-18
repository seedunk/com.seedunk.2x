
##  Temporary ASP.NET Files没有写访问权限
架设好IIS后，发布网站，提示找不到页面。几经波折后发现要开启添加framework 2.0,在IIS的"Web服务扩展"里添加扩展，文件在：C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\aspnet_isapi.dll。
但是添加扩展后又出现了错误页面：
```html
 <style>
         #ibody {font-family:"Verdana";font-weight:normal;font-size: .7em;color:black;} 
         #ibody p {font-family:"Verdana";font-weight:normal;color:black;margin-top: -5px}
          #ibody b {font-family:"Verdana";font-weight:bold;color:black;margin-top: -5px}
         #ibody H1 { font-family:"Verdana";font-weight:normal;font-size:18pt;color:red }
         #ibody  H2 { font-family:"Verdana";font-weight:normal;font-size:14pt;color:maroon }
          #ibody pre {font-family:"Lucida Console";font-size: .9em}
        #ibody  .marker {font-weight: bold; color: black;text-decoration: none;}
         #ibody .version {color: gray;}
        #ibody  .error {margin-bottom: 10px;}
        #ibody  .expandable { text-decoration:underline; font-weight:bold; color:navy; cursor:hand; }
 #ibody table {
width：auto;
background-color:#ffffff;
-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0) inset, 0 0 2px rgba(0, 0, 0, 0) inset, 0 0 10px rgba(0, 0, 0, 0) inset, 0 1px 2px rgba(0, 0, 0, 0) !important;
-moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0) inset, 0 0 2px rgba(0, 0, 0, 0) inset, 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(0, 0, 0, 0) !important;
-box-shadow: 0 1px 0 rgba(0, 0, 0, 0) inset, 0 0 2px rgba(0, 0, 0, 0) inset, 0 0 10px rgba(0, 0, 0, 0) inset, 0 1px 2px rgba(0, 0, 0, 0) !important;
box-shadow: 0 1px 0 rgba(0, 0, 0, 0) inset, 0 0 2px rgba(0, 0, 0, 0) inset, 0 0 10px rgba(0, 0, 0, 0) inset, 0 1px 2px rgba(0, 0, 0, 0) !important;
border: 0px;
 
border-spacing: 0;
line-height: 18px;

}
#ibody pre {
width:auto;
white-space: pre;
border: 0px;
padding: 10px;
background-color:#E6DB55;
clear: both;
}
#ibody td{border: 0px;}
 </style>
 <div id="ibody" bgcolor="white">
 <span><H1>“/”应用程序中的服务器错误。<hr width=100% size=1 color=silver></H1>
 <h2> <i>当前标识(NT AUTHORITY\NETWORK SERVICE)没有对“c:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\Temporary 
ASP.NET Files”的写访问权限。</i> </h2></span>
 <font face="Arial, Helvetica, Geneva, SunSans-Regular, sans-serif "><b> 说明: </b>执行当前 Web 请求期间，出现未处理的异常。请检查堆栈跟踪信息，以了解有关该错误以及代码中导致错误的出处的详细信息。<br><br>
 <b> 异常详细信息: </b>System.Web.HttpException: 当前标识(NT AUTHORITY\NETWORK SERVICE)没有对“c:\WINDOWS
\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files”的写访问权限。<br><br>
  <b>源错误:</b> <br><br>
<table width=100% bgcolor="#ffffcc">
<tr><td><pre>执行当前 Web 请求期间生成了未处理的异常。可以使用下面的异常堆栈跟踪信息确定有关异常原因和发生位置的信息。</pre></td></tr> </table> <br><b>堆栈跟踪:</b> <br><br>
<table width=100% bgcolor="#ffffcc"><tr><td><pre>
[HttpException (0x80004005): 当前标识(NT AUTHORITY\NETWORK SERVICE)没有对“c:\WINDOWS\Microsoft.NET
\Framework\v2.0.50727\Temporary ASP.NET Files”的写访问权限。]
   System.Web.HttpRuntime.SetUpCodegenDirectory(CompilationSection compilationSection) +3609355
   System.Web.HttpRuntime.HostingInit(HostingEnvironmentFlags hostingFlags) +218
[HttpException (0x80004005): 当前标识(NT AUTHORITY\NETWORK SERVICE)没有对“c:\WINDOWS\Microsoft.NET
\Framework\v2.0.50727\Temporary ASP.NET Files”的写访问权限。]
   System.Web.HttpRuntime.FirstRequestInit(HttpContext context) +3559279
   System.Web.HttpRuntime.EnsureFirstRequestInit(HttpContext context) +69
   System.Web.HttpRuntime.ProcessRequestInternal(HttpWorkerRequest wr) +279</pre>
 </td></tr></table><br>
<hr width=100% size=1 color=silver>
<b>版本信息:</b>&nbsp;Microsoft .NET Framework 版本:2.0.50727.1891; ASP.NET 版本:2.0.50727.1879</font>
</div>
```
解决方案:<br>
1. 更改文件夹C:\WINDOWS\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files的权限
2. 添加用户：NETWORK SERVICE 用户，赋予完全控制权限问题解决。 