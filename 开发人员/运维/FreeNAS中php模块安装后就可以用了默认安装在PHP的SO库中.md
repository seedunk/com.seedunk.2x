# FreeNAS中php模块安装后就可以用了默认安装在PHP的SO库中
1. FreeNAS中php模块安装后就可以用了，默认安装在PHP的SO库中，也不用编辑PHP.ini。这个我喜欢。模块可以按照自己的需求添加，比如mysql和GD库
   ```
    pkg_add -r php5-mysql 
    pkg_add -r php5-gd
    ```js    
2. 在MySQL安装时系统会提示
```js    
freenas:~# pkg_add -r mysql50-server 
Fetching
ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages-7.3-release/Latest/mysql50-server.tbz..
Fetching
ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages-7.3-release/All/mysql-client-5.0.90.tbz
Added group “mysql”.
Added user “mysql”.
```  
虽然提示添加了用户和用户组，但是重启后就消失了。导致启动mysql时提示
```js    
Starting mysqld daemon with databases from /var/db/mysql 
STOPPING server from pid
file /var/db/mysql/freenas.local.pid
100630 18:05:21 mysqld ended
```   
不能正常启动。自己手动在WEB管理页面中的权限->用户/组中添加mysql的用户之后就可以了。当然有可能你还需要再次执行
```js    
chown -R mysql /var/db/mysql
``` 
3. 安装完Nginx后可以在rc.conf中添加nginx_enable=“YES”自动启动。但是CGI进程就不知道怎么能让他自动执行了。如果你知道请留言写下。谢谢了。<br>

FreeNAS功能还是非常强大的。现在我用NAS部署了自己的数据服务器。在办公室也可以随时找到和处理家中的数据。很方便。只是现在用的3322转发还是有点慢。同是北京的线路超时都比较频繁。在内蒙古的时候更是无法访问。呵呵，还有待进一步修改哦。 