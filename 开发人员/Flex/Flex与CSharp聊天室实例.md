# Flex���C#������ʵ��

## �ͻ���
��Ҫ��һ�����õ�as class����package NetStar   ->  class MySocket<br>
MySocket.as<br>
``` 
 package NetStar  
{  
    import flash.net.Socket;  
    public class MySocket  
    {  
        public static var CurSocket : Socket = new Socket();  
        public function MySocket()  
        {  
        }  
  
    }  
}  
``` 
���ļ�.MXML<br>
``` 
<?xml version="1.0" encoding="gb2312"?>  
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"   
                layout="absolute"   
                initialize="connectToServer();">  
    <mx:Script>  
        <!--[CDATA[  
        import NetStar.MySocket;  
        import mx.controls.Alert;  
        import flash.net.Socket;  
        import flash.net.*;  
        import flash.system.Security;  
     
        private function connectToServer() : void  
        {  
            NetStar.MySocket.CurSocket.addEventListener(Event.CLOSE,close);  
            NetStar.MySocket.CurSocket.addEventListener(ProgressEvent.SOCKET_DATA,receiveData);  
            NetStar.MySocket.CurSocket.addEventListener(IOErrorEvent.IO_ERROR,ioErrorHandler);  
            NetStar.MySocket.CurSocket.addEventListener(SecurityErrorEvent.SECURITY_ERROR,securityHandler);  
                  
            NetStar.MySocket.CurSocket.connect("192.168.1.169",8888); // �������Բ�Ҫ��127.0.0.1�����������ϣ���֪ԭ��  
        }  
          
        private function close(event: Event) : void  
        {  
            Alert.show("ʧȥ������������ӣ�");  
        }  
      
        private function receiveData(event:ProgressEvent) : void  
        {  
            try  
            {  
                var buffer : ByteArray = new ByteArray();  
                NetStar.MySocket.CurSocket.readBytes(buffer,0,NetStar.MySocket.CurSocket.bytesAvailable);  
                var message : String = buffer.readUTF();  
                if(message != "")  
                {  
                    MessageBoard.text += message + "\n";  
                }  
            }catch(ex : Error){}  
        }  
      
        private function ioErrorHandler(event: IOErrorEvent) : void  
        {  
            Alert.show("IO_ERROR��");  
        }  
          
        private function securityHandler(event: SecurityErrorEvent) : void  
        {  
            Alert.show("SECURITY_ERROR��");  
            Alert.show(event.toString());  
        }  
      
        private function send() : void  
        {  
            if(NetStar.MySocket.CurSocket.connected == true)  
            {  
                if(Message.text == "")  
                {  
                    Alert.show(" ������Ҫ���͵���Ϣ��");  
                    return;  
                }  
                NetStar.MySocket.CurSocket.writeUTF(Message.text);  
                NetStar.MySocket.CurSocket.flush();  
                Message.text = "";  
            }  
            else  
            {  
                Alert.show(" ʧȥ������������ӣ�");  
            }  
        }  
          
        ]]-->  
    </mx:Script>  
      
    <mx:Button x="377.75" y="264" label="Send" click="send();"/>  
    <mx:TextInput id="Message" x="18.25" y="264" width="351"/>  
    <mx:TextArea id="MessageBoard" x="18.25" y="10" height="246" width="413.5"/>  
      
</mx:Application>  
``` 
## �����
``` 
 using System;  
using System.Collections.Generic;  
using System.Text;  
using System.Net;  
using System.Net.Sockets;  
using System.Threading;  
  
namespace ConsoleApplication2  
{  
    class Program  
    {  
        private static System.Collections.ObjectModel.Collection<Socket> Sockets = new System.Collections.ObjectModel.Collection<Socket>();  
  
        static void Main(string[] args)  
        {  
            Socket listenSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);  
  
            IPAddress hostIP = Dns.GetHostEntry(Dns.GetHostName()).AddressList[0];  
  
            int port = 8888; //�����˿�  
  
            IPEndPoint endPoint = new IPEndPoint(hostIP, port);  //���IP���磺192.168.1.169  
            listenSocket.Bind(endPoint);  
  
            listenSocket.Listen(100);  //��������  
  
            System.Console.WriteLine("��ʱ��Ϣ����[" + hostIP + "]��������");  
  
            while (true)  
            {  
                Socket acceptSocket = listenSocket.Accept();  
                Program.Sockets.Add(acceptSocket);  
  
                string policy = "<?xml version=\"1.0\"?><cross-domain-policy><allow-access-from domain=\"*\" to-ports=\"" + port + "\"/></cross-domain-policy>\0";  
                acceptSocket.Send(System.Text.ASCIIEncoding.UTF8.GetBytes(policy));  
  
                Thread thread = new Thread(new ParameterizedThreadStart(Program.Receive));  
                thread.Start(acceptSocket);  
            }  
        }  
  
        private static void Receive(object value)  
        {  
            Socket acceptSocket = (Socket)value;  
            while (true)  
            {  
                byte[] buffer = new byte[1024];  
                try  
                {  
                    acceptSocket.Receive(buffer);  
                    foreach (Socket item in Program.Sockets)  
                    {  
                        item.Send(buffer);  
                    }  
                }  
                catch  
                {  
                    break;  
                }  
            }  
            Program.Sockets.Remove(acceptSocket);  
        }  
    }  
}  
``` 