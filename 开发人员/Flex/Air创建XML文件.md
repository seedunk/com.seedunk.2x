# Air创建XML文件 
``` 
public function createXML():void{
      var WA_NowURL: String=File.applicationDirectory.nativePath; 
      var SaveName : String=this.IN_SaveName.text;         
      var file:File = new File();
          file.nativePath=WA_NowURL+"/"+SaveName+".xml";
      var fileStream:FileStream = new FileStream(); // 创建FileStream 对象，用于读写文件
          fileStream.open(file,FileMode.WRITE);  //以WRITE方式打开file, 如果file中对应的文件不存在，创建新文件
      var content:XML = 新的xml
          fileStream.writeUTFBytes(content.toXMLString()); //像文件中写入内容。
          fileStream.close(); //完成写入，这时我们打开桌面的test.txt可以看到内容。
          }
``` 