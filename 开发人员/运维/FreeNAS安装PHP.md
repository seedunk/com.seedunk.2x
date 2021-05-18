# FreeNAS安装PHP
如果你是在FreeNAS上安装PHP，请特别注意下面的几步，若是在FreeBSD上安装，可以忽略cp，mv的步骤，直接通过pkg_add安装PHP。
因为安装FreeNAS的WebGUI是基于Lighttpd+PHP，重新安装PHP会引起系统崩溃，不仅WebGUI无法启动，连系统都无法引导，因此将PHP的安装放在第一步，如果这一步没有问题，后面的就都简单了。当时我也是经过N次失败才找到这个问题，分享出来，希望大家不要走弯路。
首先，需要备份一个重要的文件，因为在PHP的安装后，会覆盖掉这个文件，而正是这个文件引起系统无法启动和WebGUI不能访问。
```
cp /usr/local/lib/libxml2.so.5 /tmp/libxml2.so.5
```
然后开始安装PHP
```
pkg_add -r php5
pkg_add -r php5-extensions
pkg_add -r php5-xmlrpc
pkg_add -r php5-gettext
pkg_add -r php5-mcrypt
pkg_add -r php5-mbstring
```
注意安装完后切忌不要重启，再继续输入下面的命令

```
mv /usr/local/bin/php /usr/local/bin/php-cli
cp /usr/local/bin/php-cgi /usr/local/bin/php
rm /usr/local/lib/libxml2.so.5
cp /tmp/libxml2.so.5 /usr/local/lib/libxml2.so.5
```
至此PHP安装完成，请重启你的FreeNAS，如果能够正常访问WebGUI，恭喜你，接下去的步骤就简单多了。
安装MySQL
```
pkg_add -r mysql50-server
/usr/local/bin/mysql_install_db
chown -R mysql /var/db/mysql
```
启动Mysql
``` 
/usr/local/bin/mysqld_safe &
```
修改root密码为123456
```
/usr/local/bin/mysqladmin -u root password ’123456′
```
修改/etc/rc.conf加入mysql_enable=”YES”，至此MySQL安装完成。
安装Nginx+FastCGI
由于FreeNAS的WebGUI已占用了80端口，因此建议先通过WebGUI>System>General>WebGUI>Port将WebGUI的端口改为其他，例如88。
参阅了大量网上的Nginx+PHP的配置方案，无一例外都是通过lighttpd的spawn-fcgi来实现，这个脚本找了很久也没找到，虽然FreeNAS自带Lighttpd，我也没在系统内找到……，于是我只好重新安装了一遍Lighttpd。
```
pkg_add -r nginx
pkg_add -r -v lighttpd
chmod 0777 /usr/local/etc/nginx/nginx.conf
```
编辑/usr/local/etc/nginx/nginx.conf，找到以下配置
```
location / {
root /usr/local/www/nginx;
index index.html index.htm;
}
```
在index最后增加index.php
找到以下配置

```
#location ~ \.php$ {
# root html;
# fastcgi_pass 127.0.0.1:9000;
# fastcgi_index index.php;
# fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
# include fastcgi_params;
#}
```
去掉行首的注释符#，并改为以下内容。
```
location ~ \.php$ {
root html;
fastcgi_pass 127.0.0.1:9000;
fastcgi_index index.php;
fastcgi_param SCRIPT_FILENAME /usr/local/www/nginx$fastcgi_script_name;
include fastcgi_params;
}
```
至此Nginx安装完成，然后通过下面的脚本分别启动FastCGI和Nginx。此脚本建议加入/etc/rc.local随机启动
```
/usr/local/bin/spawn-fcgi -a 127.0.0.1 -p 9000 -u www -g www -C 64 -f /usr/local/bin/php-cgi
/usr/local/sbin/nginx
```
然后在/usr/local/www/nginx目录下新建index.php。<script>POST_IMPORTS='com;';POST_COVER='';</script>