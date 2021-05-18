# IIS设置不当
故障描述：服务器应用程序不可用<br>
您试图在此 Web 服务器上访问的 Web 应用程序当前不可用。请点击 Web 浏览器中的“刷新”按钮重试您的请求。<br>
 
这个问题见了好几次,在.net下 Microsoft visual 2005->visual studio tools->visual studio 2005命令提示下输入aspnet_regiis -r,就可以只是重新注册一下而已这是因为你先装了.net而后装了iis用户的权限没加进运引起我的就是这种情况，先安装了.net环境，然后才安装 了IIS。 <br>