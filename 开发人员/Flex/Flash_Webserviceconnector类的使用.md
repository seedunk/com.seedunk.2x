# Flash_Webserviceconnector类的使用（结合c#.net) 

FLASH文件里写入代码<br>
``` 
import mx.data.components.WebServiceConnector;
var propUrlBase = "http://localhost";
var RootPath = "/list/";
var UID = "bit-4";
function wsvc_funcGetCalArtiDay(aYear:String, aMonth:String) {
 var res:Function = function (evt:Object) {
  trace(evt.target.results);
 };
 var wsConn:WebServiceConnector = new WebServiceConnector();
 wsConn.addEventListener("result", res);
 wsConn.WSDLURL = propUrlBase+RootPath+"wsvc.asmx?wsdl";
 wsConn.operation = "funcGetCalArtiDay";
 wsConn.params = [UID, aYear, aMonth];
 wsConn.trigger();
}
//
wsvc_funcGetCalArtiDay("2006", "10");
</pre>
<hr />
<font color=0259ab size=2>C#.NET文件wsvc.asmx</font>
<pre class="brush:csharp"> 
<%@ WebService Language="C#" Class="Wsvc" %>
using System;
using System.Web;
using System.Data;
using System.Web.Services;
using System.Web.Services.Protocols;

 

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class Wsvc : System.Web.Services.WebService
{

    [WebMethod]
    public string funcGetCalArtiDay(string aUID, string aYear, string aMonth)
    {
        return aUID + "-" + aYear + "-" + aMonth；
    }

}
``` 