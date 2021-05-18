# Ruby 连接MySQL
 
##### Windows安装Ruby
1. 下载ruby安装包 https://rubyforge. org/frs/?group_id=167 下载RubyInstaller下exe格式的安装包 我选择的是ruby 1. 9. 2；双击直接安装即可。
2. 下载Instant Rails一键安装包 http://rubyforge.org/frs/?group_id=904 。
3. 在开始菜单中点击打开cmd命令提示符；输入ruby -v，如果显示Ruby的版本号则安装成功了。
4. 然后安装rails，这个操作需在联网的情况下进行，首先输入gem install rails，输入后需等待一段时间，等它自动下载安装。
5. 上述完毕后，输入rails -v，如果显示rails的版本号则安装成功。
6. 安装MySQL gem，输入gem install mysql。
7. 把Instant Rails解压到任意文件夹，打开InstantRails.exe，直接按确定。
8. 把MySQL\bin文件夹的libmySQL.dll复制到独立安装的Ruby\bin文件夹里面，整个过程就完成了。


##### 建立数据库：
1. 建立数据库 chat；进入Mysql 输入如下：
```
create databases chat character set utf8;
use chat;
create table mytest_user (usrID int Auto_increment,
          Primary Key (usrID),
          usrName varchar(20),
          usrPassword varchar(20),
          usrFullname varchar(20),
          usrType int)
      engine=INNODB;
create table mytest_talk(tlkID int Auto_increment Primary Key,
          usrID int,
          index i_usrID(usrID),
          foreign key(usrID) references mytest_user(usrID),
          tlkTopic varchar(200),
          tlkDate datetime)
engine=INNODB;
```
2. 插入一些简单的数据：
```
Insert into mytest_user(usrName,usrPassword,usrFullname,usrType) values('admin', '321', 'HuangNG',1);
insert into mytest_user(usrName,usrPassword,usrFullname) values('3323','123','ChenZH');
```   
##### 用Ruby实现读取mysql信息（无IDE情况下）：
1. 新建txt，打开txt输入如下代码：
    ```
    require "mysql"
    begin
        dbh = Mysql. real_connect("localhost", "root", "sa", "chat")
        res = dbh. query("SELECT  * FROM mytest_user")
        while row = res. fetch_row do
        printf "%s, %s\n", row[0], row[1]
        end
        ```
2. 把txt文件改名为Mysql.rb,把Mysql.rb放在ruby目录下。
3. 在开始菜单中打开命令提示符，进入Mysql.rb所在目录，输入ruby  Mysql.rb即可显示查询信息。
 