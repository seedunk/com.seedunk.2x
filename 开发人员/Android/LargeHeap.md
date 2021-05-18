# android:largeHeap
[2018-01-31 11:12:58](#data.create_time)<br>
一个应用如果使用了largeHeap，会请求系统为Dalvik虚拟机分配更大的内存空间。使用起来也很方便，只需在manifest文件application节点加入android:largeHeap=“true” 即可。<br>
```xml
<application android:icon="@drawable/icon"
  android:allowBackup="false"
  android:label="@string/app_name"
  android:debuggable="true"
  android:theme="@android:style/Theme.Black"
    android:largeHeap="true"
>
```