# Air����XML�ļ� 
``` 
public function createXML():void{
      var WA_NowURL: String=File.applicationDirectory.nativePath; 
      var SaveName : String=this.IN_SaveName.text;         
      var file:File = new File();
          file.nativePath=WA_NowURL+"/"+SaveName+".xml";
      var fileStream:FileStream = new FileStream(); // ����FileStream �������ڶ�д�ļ�
          fileStream.open(file,FileMode.WRITE);  //��WRITE��ʽ��file, ���file�ж�Ӧ���ļ������ڣ��������ļ�
      var content:XML = �µ�xml
          fileStream.writeUTFBytes(content.toXMLString()); //���ļ���д�����ݡ�
          fileStream.close(); //���д�룬��ʱ���Ǵ������test.txt���Կ������ݡ�
          }
``` 