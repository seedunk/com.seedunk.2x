# FreeNas+php+MySql+phpMyAdmin 整合安装
可能很多朋友都想在FreeNas下安装Mysql,安装论坛或其它的需要mysql的Web程序，经过几天努力，参考论坛和官网论坛的部分资料，终于搞定了!论坛我没有测试，但phpMyAdmin工作正常。下面说一下安装过程，其实很简单。<br>
 
1. 安装要求
需要安装完全版本，安装至硬盘，用LiveCD,我用的版本是0.69b3，安装的时候要注意，系统要留足够的空间以安装Mysql及其它程序，如何安装，论坛里已有教程，这里就不说了。<br>
2. 安装Mysql
只能安装MySql4.0.27,MySql 5.0用pkg安装会有问题，可能是和FreeBSD 6.3有冲突，参照国外的部分说明，手动可以安装，但无法开机自动启动，朋友们可以自己研究一下。<br>
系统安装设定完成后，登录Shell,执行以下命令<br>
```
pkg_add -r ftp://ftp4.freebsd.org/pub/FreeBSD/ports/i386/packages-6-stable/All/mysql-server-4.0.27.tbz 安装mysql4.0.27
chmod 777 /ftmp
chmod 777 /tmp
/usr/local/bin/mysql_install_db --user=mysql
chown -R mysql /var/db/mysql
/usr/local/bin/mysqld_safe &
/usr/local/bin/mysqladmin -uroot password 123456 注：123456为mysql root的密码，自己改
```
登录WebGUI,系统->高级设置->rc.conf里加入<br>
名称：mysql_enable<br>
Value: YES<br>
至此，mysql安装完成<br>
3. 更改php以支持MySql<br>
上传附件中的mysql.so和mbstring.so 至/usr/local/lib/mysql/ (phpMyAdmin需要mbstring)<br>
```
ln -s /usr/local/lib/mysql/libmysqlclient.so.12 /usr/local/lib/mysql/libmysqlclient.so.15
mkdir -p /usr/local/etc/php
```
在 /usr/local/etc/php/下新建一文件extensions.ini<br>
内容为以下两行<br>
```
extension=mysql.so
extension=mbstring.so
```
编辑/usr/local/etc/php.ini<br>
加入以下内容<br>
```
extension=mysql.so
extension=mbstring.so
extension_dir=/usr/local/lib/mysql
```
4. 安装phpMyAdmin<br>
上传phpMyAdmin至/usr/local/www/下，并做好设置<br>

重启系统，mysql就可以自动运行了，php也可以正常支持mysql了,phpMyAdmin工作也正常了