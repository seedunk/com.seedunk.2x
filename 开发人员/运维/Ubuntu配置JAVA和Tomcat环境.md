# Ubuntu x64 上配置JAVA和Tomcat环境<br>
在Ubuntu上安装OpenJDK和Tomcat<br>
在我们的一个客户的项目上，我需要运行JSP。因此我在我的Ubuntu系统上安装了Apache Tomcat服务器。基本来说，Apache Tomcat是一个为Servlet和JSP运行的开源软件实现。我将向你展示手工安装OpenJDK。当然你也可以使用Sun的实现来运行tomcat。<br>
确保你的PC上安装了Java。如果你没有安装，没关系。我将向你展示如何来安装它。打开一个终端，然后输入如下命令：<br>
$ sudo apt-get install openjdk-6-jre<br>
现在你可以检查，Java是否已经安装。那么，输入如下命令：<br>
$ java -version<br>
它将展示类似于如下的信息：<br>
java version “1.6.0_20″<br>
OpenJDK Runtime Environment (IcedTea6 1.9.7) (6b20-1.9.7-0ubuntu1)<br>
OpenJDK 64-Bit Server VM (build 19.0-b09, mixed mode)<br>
Tomcat要求设定JAVA_HOME变量。那么，我编辑~/.bashrc文件<br>
$ sudo nano ~/.bashrc<br>
增加如下代码：<br>
export JAVA_HOME=/usr/lib/jvm/java-6-openjdk<br>
Tomcat服务器的环境就准备好了。现在就剩下安装它的部分了<br>
你需要从Apache网站下载Tomcat。你可以从如下地址下载它：http://tomcat.apache.org/download-60.cgi<br>
或者你也可以从命令行下载：<br>
$ wget http://apache.tradebit.com/pub/tomcat/tomcat-6/v6.0.32/bin/apache-tomcat-6.0.32.tar.gz<br>
然后将其解压到桌面上。输入：<br>
$ tar xvzf apache-tomcat-6.0.32.tar.gz<br>
将其移动至/usr/local/tomcat<br>
$ sudo mv apache-tomcat-6.0.32 /usr/local/tomcat<br>
现在你需要给tomcat所在的目录相应的权限<br>
$ sudo chmod -R 755 /usr/local/tomcat<br>
如果你希望在你的PC启动时自动启动tomcat，这时你就需要添加脚本到/etc/init.d.<br>
$ sudo nano /etc/init.d/tomcat<br>
仅需要复制和粘贴如下代码<br>
# Tomcat server auto-start script<br>
export JAVA_HOME=/usr/lib/jvm/java-6-openjdk<br>
case $1 in<br>
start)<br>
sh /usr/local/tomcat/bin/startup.sh<br>
;;<br>
stop)<br>
sh /usr/local/tomcat/bin/shutdown.sh<br>
;;<br>
restart)<br>
sh /usr/local/tomcat/bin/shutdown.sh<br>
sh /usr/local/tomcat/bin/startup.sh<br>
;;<br>
esac<br>
exit 0<br>
现在我们需要使该脚本可执行。因此，你需要给文件/etc/init.d/tomcat相应的权限<br>
$ sudo chmod 755 /etc/init.d/tomcat<br>
现在你需要通过符号连接将该脚本连接到启动目录里。那么，输入如下命令：<br>
$ sudo ln -s /etc/init.d/tomcat /etc/rc1.d/K99tomcat<br>
$ sudo ln -s /etc/init.d/tomcat /etc/rc2.d/K99tomcat<br>
输入如下命令来启动tomcat<br>
$ sh /usr/local/tomcat/bin/startup.sh<br>
它将输出如下信息<br>
Using CATALINA_BASE: /usr/local/tomcat<br>
Using CATALINA_HOME: /usr/local/tomcat<br>
Using CATALINA_TMPDIR: /usr/local/tomcat/temp<br>
Using JRE_HOME: /usr<br>
Using CLASSPATH: /usr/local/tomcat/bin/bootstrap.jar<br>
完成了。Tomcat正常。现在打开浏览器指向到http://localhost:8080<br>
要停止tomcat，输入如下命令<br>
$ sh /usr/local/tomcat/bin/shutdown.sh<br>
记住，你也可以使用sun的JDK 