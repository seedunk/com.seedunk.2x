# Ubuntu 和Window共享mysql数据库
mysql数据文件位于双系统同时能访问区域：<br>
开辟双系统共享分区 e.g. /dev/sda7<br>
在windows下是直接识别的ntfs分区<br>
在linux下需要开机被挂载：<br>
编辑/etc/fstab文件 使用vi命令<br>
加入内容：/dev/sda7 /mnt/Base ntfs utf8,umask=0     0     0<br>
其中/dev/sda7为分区标，可使用分区工具查看得到， /mnt/Base为挂载位置，可使用mkdir新建，<br>
如挂在/media/xxx下，则/dev/sda7会作为分区显示。<br>
umask为权限设置，0为所有用户可读可写。<br>

在ubuntu下安装mysql并使用/dev/sda7下的数据文件<br>
ubuntu修改mysql数据库存放位置<br>
cat /*/mysql/my.cnf----MySQL数据库配置文件，包括数据库存放位置，<br>
```
默认存放位置：
user            = mysql
socket          = /var/run/mysqld/mysqld.sock
port            = 3306
basedir         = /usr
datadir         = /var/lib/mysql-----其中包括mysql数据库文件
tmpdir          = /tmp
 ```
1. 关掉数据库：sudo /etc/init.d/mysql stop
2. 数据库文件目录相关调整：
  1. 修改其拥有者及所属群组为mysql:mysql：sudo chown mysql:mysql /media/ubuntu/develop/mysqldb
  2. 修改mysql配置文件： sudo gedit /etc/mysql/my.cnf：
                       将datadir=/var/lib/mysql 改为 datadir=/media/ubuntu/develop/mysqldb
  3. 修改ubuntu中的安全设置：sudo gedit /etc/apparmor.d/usr.sbin.mysqld
        将原来的
        ```
        /var/lib/mysql/ r,
        /var/lib/mysql/** rwk,
        ```
        更换成
        ```
        /media/ubuntu/develop/mysqldb/ r,
        /media/ubuntu/develop/mysqldb/** rwk,
        ```
  4. 重启 AppArmor服务使生效，执行：sudo /etc/init.d/apparmor restart
(AppArmor是一个linux底层程序，负责监控linux上的应用程序，只要跟注册的资料权限不符，路径不对，就不能执行。修改完成后，要重启 AppArmor服务才能生效。)

3. 重新初始化数据文件，执行： sudo mysql_install_db

4. 启动MySQL数据库服务：sudo /etc/init.d/mysql start
 实际上不是'/***.frm'这个文件不见了，而是这些文件的权限(应当假如mysql)不知道为甚么变成了root。<br>

处理：cd到***.frm所在目录下，更改所有权：chown mysql:mysql ***.frm 文件的权限都改过来即可！
PS：<br>
1. 按以上步骤执行，执行到初始化数据文件这一步，失败。估计是一些目录权限方面引起的，暂不去解决，还原设置，OK。
2. 修改DB设置的目的是想恢复原Windows下的MySQL数据库，于是试着将原数据库copy到var/lib/mysql/下，然后修改其拥有者及所属群组，重启MySQL；登录进去发现原数据库能访问了，OK，问题解决。
3. 在遇到是系统或软件故障时，解决方法：
首先修复软件，设置的问题一般修改一下就看了，但对于软件本身问题：bug,文件缺失或损坏只能重装。
其次，系统问题更换系统。此时要对数据库，重要文件首先进行保存。
数据库备份技巧：
1. 通过直接复制要备份数据库文件方法----该方法最简单
2. 当直接复制时提示有数据不能复制时，估计是数据库损坏了，要数据库管理工具进行修复。
3. 单单是系统问题的，有备份直接恢复，
没有备份另取一块硬盘重装系统要保证系统设置和以前都一样，然后把该系统做个ghost镜像，传到在用的硬盘非系统分区中，然后用ghost32覆盖到系统分区，这样在下次机器重启时系统就已经修复好了。（该方法是在保证当前系统可用的情况下，快速更换系统的方法）

下面安装php环境：
ubuntu 搭建 php 环境

所谓LAMP：Linux，Apache，Mysql，PHP
```
安装 Apache2：
sudo apt-get install apache2
安装PHP模块：
sudo apt-get install php5
安装Mysql
sudo apt-get install mysql-server
  ```
其他模块安装：
  ```
sudo apt-get install libapache2-mod-php5
sudo apt-get install libapache2-mod-auth-mysql
sudo apt-get install php5-mysql
sudo apt-get install php5-gd
  ```
前两个很容易明白，要想apache能够解析PHP，就需要借助这两个模块来找到php engine。
第三个在php操作mysql数据库时用到，大多数人都有数据库编程经验，所以这就不用多解释了。


改变apache2的默认目录到当前的开发目录

apache2的默认目录配置在/etc/apache2/sites-enabled/00default文件中。
找到该文件中的DocumentRoot项， 将/var/www改为你的开发目录就OK了。

当然，还有一种方法就是不该边默认目录，只是在var/www下建立一个到你的目录的链接。
比如你的目录在/home/username/phptest，那么你只要
sudo ln -s /home/username/phptest /var/www/phptest
这样你就可以通过http://localhost/phptest访问你的工作目录了。
第四个GD库。

apache2相关配置

安装完上述的各个模块后，实际上基本配都OK了，只是一些小的细节问题

基本上多有的配置都在/etc/apache2目录及其子目录下完成，故一定要搞清楚这个目录结构。

1.apache根目录
安装完apache2，根目录在/var/www下，可以通过http://localhost/测试一下是否好用。
当然也可以在该目录下新建一个文件test.html来试一试http://localhost/test.html。

2.PHP解析问题
安装完貌似php的解析都有点问题，浏览php网页会保存，apache没有将其解析为网页。
网上一般说的是需要在httpd.conf中添加XXXX，对其他的linux系统可能确实如此，但是ubuntu有点特殊。

ubuntu的apache2配置在/etc/apache2目录下。
这个目录下有个apache2.conf文件，这个文件通过包含其他配置文件涵盖了所有的apache2系统配置信息。

php解析部分在的配置在/etc/apache2/mods-available下的php5.conf和php5.load中，apache2.conf文件中并没有将这两个文件包含进来，只要包含进去就OK了。
*************************************************
在apache2.conf中找到
    # Include module configuration:
    Include /etc/apache2/mods-enabled/*.load
    Include /etc/apache2/mods-enabled/*.conf
在其后面添加
    Include /etc/apache2/mods-available/php5.load
    Include /etc/apache2/mods-available/php5.conf
*************************************************
另外一种方法就是将这两个文件链接到mods-enabled目录下：
    sudo ln -s /etc/apache2/mods-available/php5.load /etc/apache2/mods-enabled/php5.load
    sudo ln -s /etc/apache2/mods-available/php5.conf /etc/apache2/mods-enabled/php5.conf
这一种方式更好一点，没有破坏apache2本身的配置结构。
*************************************************

3.改变apache2的默认目录到当前的开发目录

apache2的默认目录配置在/etc/apache2/sites-enabled/00default文件中。
找到该文件中的DocumentRoot项， 将/var/www改为你的开发目录就OK了。

当然，还有一种方法就是不该边默认目录，只是在var/www下建立一个到你的目录的链接。
比如你的目录在/home/username/phptest，那么你只要
sudo ln -s /home/username/phptest /var/www/phptest
这样你就可以通过http://localhost/phptest访问你的工作目录了。
［注意］链接文件名中不能含有“.”，否则apache2会将其当作为一个文件试图解析而无法达到链接目录的效果。

个人推荐用后一种方式，这样可以多个工作目录并行开发。


配置中常用命令
重启apache
sudo /etc/init.d/apache2 restart
建立系统链接
sudo ln -s a b


apache php出错后的重装
删除配置文件 rm -rf /etc/apache2
卸载和重装apache
sudo apt-get remove --purge apache2 apache2-utils  
sudo apt-get install apache2


PS:ubuntu系统和windows系统双系统共用是用户喜欢使用的方式之一，而MySQL是一个小型关系型数据库管理系统，在Windows平台中 常以WAMP方式搭配使用，在Linux平台中常以LAMP组合形式出现，下面的方法可以使得Ubuntu平台共用Windows平台中的MySQL数据 库。
　　双系统配置及MySQL数据库存储情境：Windows XP下d:\mysql\data中存有MySQL数据库，Linux系统为Ubuntu Server 9.10。
　　双系统安装完毕，利用GURB启动到Ubuntu Server 9.10，以管理员身份登录。
　　1)并读写方式(RW)认方式挂载Windows中D分区至/media/wind。
　　2)更改/media/wind/mysql/data权限
　　sudo chow mysql:mysql /media/wind/mysql/data (其中两个mysql分别表示用户名及所在用户组)
　　3)更改/etc/mysql/my.cnf文件，更改其datadir
　　sudo nano /etc/mysql/my.cnf
　　将其中的 datadir = /var/lib/mysql
　　更改为
　　datadir=/media/wind/mysql/data
　　存盘
　　4)更改/etc/apparmor.d/usr_sbin_mysqld内容中，把其中的/var/lib/mysql都对应替换成实际存储位置
　　如上面的 /media/wind/mysql/data/
　　5)重启apparmor和mysql服务
sudo /etc/init.d/apparmor restart 
sudo /etc/init.d/mysql restart
　　我重启过程中我遇到一个拒绝访问的错误，重新执行第3)步中的更改配置文件操作，将文件中的user由mysql更改为root后成功，其原因是我的Windows下MySQL数据库的未对mysql用户授予访问权限。<script>POST_IMPORTS='';POST_COVER='';</script>