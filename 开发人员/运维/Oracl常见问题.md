# Oracl常见问题
1. 导入数据时找不到表空间
   CREATE TABLESPACE ESOFT DATAFILE ‘ESOFT’ SIZE 400M
2. oracle9 startup时 报错ORA-00600:
   oracle9 startup时 报错ORA-00600: 内部错误代码，参数: [kcratr1_lostwrt], [], [], [], [], [], [], []

    原因可能是非法关机或掉电造成,以下是出现的问题及解决方法:<br>
        ```
        C:\Documents and Settings\Administrator>sqlplus

        SQL*Plus: Release 9.2.0.1.0 - Production on 星期日 5月 13 09:23:23 2007

        Copyright (c) 1982, 2002, Oracle Corporation.  All rights reserved.

            请输入用户名:  /as sysdba

            连接到:
        Oracle9i Enterprise Edition Release 9.2.0.1.0 - Production
        With the Partitioning, OLAP and Oracle Data Mining options
        JServer Release 9.2.0.1.0 - Production

        SQL> startup
        ORA-01081: 无法启动已在运行的 ORACLE --- 请首先关闭
        SQL> shutdown abort
        ORACLE 例程已经关闭。
        SQL> startup
        ORACLE 例程已经启动。

        Total System Global Area  135338868 bytes
        Fixed Size                   453492 bytes
        Variable Size             109051904 bytes
        Database Buffers           25165824 bytes
        Redo Buffers                 667648 bytes
        数据库装载完毕。
        ORA-00600: 内部错误代码，参数: [kcratr1_lostwrt], [], [], [], [], [], [], []


        SQL> shutdown immediate
        ORA-01109: 数据库未打开


        已经卸载数据库。
        ORACLE 例程已经关闭。
        SQL> startup mount
        ORACLE 例程已经启动。

        Total System Global Area  135338868 bytes
        Fixed Size                   453492 bytes
        Variable Size             109051904 bytes
        Database Buffers           25165824 bytes
        Redo Buffers                 667648 bytes
        数据库装载完毕。
        SQL> recover database;
        完成介质恢复。
        SQL> alter database open;

        数据库已更改。

        SQL>exit;  
        ```