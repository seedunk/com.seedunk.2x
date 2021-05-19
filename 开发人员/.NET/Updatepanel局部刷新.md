# Updatepanel 局部刷新

由于需要有textbox控件推动焦点时调用服务器程序的功能.在网上搜到此问题的解决办法.<br>
主要在是加载页面时设置textbox的属性<br>
tbxUserName.Attributes["onblur"] = ClientScript.GetPostBackEventReference(Button1, null);<br>
并把textboxt和button放入一个updatepanel中,为了实现局部刷新.<br>
他是调用Button默认的Click事件,这个控件除了这个用途没别的,所以不想在页面上显示,设置 button.visible=false,但这会导致页面全部刷新,好像updatepanel失效了.在高度的时候,我发现当每次 tbxusername失去焦点时,button1也会出现焦点,这说明程序默认点击了它.估计是把它visible,程序就找不到了.呵呵.<br>
为了不显示它我把它的长和宽都设置成了零.这样就可以了,但还不知道这是为什么.<br>
## .aspx

``` 
      <%@ Page Language="C#" AutoEventWireup="true" CodeFile="freetrial.aspx.cs" Inherits="freetrial" EnableEventValidation="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>无标题页</title>
    <link href="mycss.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        &nbsp;&nbsp;
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
      
        <asp:UpdatePanel ID="UpdatePanel2" runat="server">
            <ContentTemplate>
        <table>
      
            <tr>
                <td style="width: 74px">
                    用户名</td>
                <td style="width: 107px">
                    <asp:TextBox ID="tbxUserName" runat="server" Columns="20"></asp:TextBox></td>
                <td style="width: 214px"> <asp:Label ID="Label1" runat="server" Text="4-6个字符,下画线"></asp:Label>
                </td>
            </tr>
             <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" Width="0" Height="0" /><tr>
                <td style="width: 74px">
                    姓 &nbsp;&nbsp; 名</td>
                <td style="width: 107px">
                    <asp:TextBox ID="tbxname" runat="server"></asp:TextBox></td>
                <td style="width: 214px">
                   </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    本地区号</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    联系电话</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    移动电话</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    传真号码</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    电子邮件</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
            <tr>
                <td style="width: 74px">
                    验证码</td>
                <td style="width: 107px">
                </td>
                <td style="width: 214px">
                </td>
            </tr>
        </table>
            </ContentTemplate>
        </asp:UpdatePanel>
        <br />
        <br />
    
    </div> 
        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>
                <asp:Label ID="Label2" runat="server" Text="Label"></asp:Label></ContentTemplate>
        </asp:UpdatePanel>
       
    </form>
</body>
</html>
```

## .cs
```
public partial class freetrial : System.Web.UI.Page
{
   
    protected void Page_Load(object sender, EventArgs e)
    {
        

        tbxUserName.Attributes["onblur"] = ClientScript.GetPostBackEventReference(Button1, null);
    }
    /// <summary>
    /// 这个事件可以处理用户名文本框推动焦点所触发的事件
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Button1_Click(object sender, EventArgs e)
    {
        string _usrname = tbxUserName.Text;

        if (Regex.IsMatch(_usrname, @"^((\S){4,16})|([^\x00-\x80]{2,8})$") == false)
        {
            Label1.Text = "格式错误";
            Label1.ForeColor = Color.Red;
            
            return;
        }
        oracledata oradata = new oracledata();
        try
        {
            oradata.open();
            if (oradata.ishaveuser(_usrname) == false)
                Label1.Text = "已经存在此用户名";
            else
                Label1.Text = "您可以使用此用户名";

        }

        catch (Exception Exp)
        {
            Response.Write(Exp.Message.ToString());
        }


    }
``` 
      
