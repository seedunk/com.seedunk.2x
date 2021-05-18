# 使用Linux系统安装盘修改系统密码
如果你既没做系统启动软盘，同时多系统的引导LILO和GRUB又被删除，那么只能使用Linux系统安装盘来实现Linux密码恢复技术。<br>

用第一张Linux系统安装盘启动，出现boot提示符后输入：<br>
```
oot:Linuxrescue
```
此时系统进入救援模式，然后根据提示完成：<br>

1. 选择语言和键盘格式; 
2. 选择是否配置网卡，一般系统因网络不需要，所以可以选择否跳过网卡配置; 
3. 选择是否让系统查找硬盘上的RedhatLinux系统，选择继续; 
4. 系统显示硬盘上的系统已经被找到，并挂载在/mnt/sysimage下; 
5. 进入拯救状态，可重新设置root的密码：
    ```
    #chroot/mnt/sysimage(让系统成为根环境) 
    #cd/mnt/sysimage 
    #passwdroot
    ```