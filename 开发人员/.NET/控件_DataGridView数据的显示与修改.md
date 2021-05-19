# C# DataGridView数据的显示与修改

//1：使用DataSet做中间变量进行交换数据。
//2：数据源为 .XML文件。

//xml中的属性对应于dataGridView的绑定字段。
//【代码】
DataSet iDataSet = new DataSet(); //设置数据交换变量
//读取xml到DataSet并在表格中显示
private void upDataGrid() {
string data =xml.read(xml文件位置)
iDataSet.ReadXml(new System.IO.MemoryStream (System.Text.Encoding.Default.GetBytes(data)));
iGridView.DataSource = iDataSet.Tables["对应于xml中的节点名"];
}
//将修改后的表格 写入到xml
private void iSave_Click(object sender, EventArgs e)
{
iDataSet.WriteXml(xml文件位置, XmlWriteMode.IgnoreSchema);
}
/*****
【资料】 将DataSet写入XML（1）
1．将架构写入文件、读取器或流数据
应用程序可能会从几个不同数据源中创建并填充DataSet，因此DataSet
的结构可能会十分复杂。如果将来需要使用DataSet来运行应用程序，或者
允许其他应用程序和服务与XML数据集成，那么可能需要将包含在DataSet中
的结构和数据保存到一个或多个文件中。使用该策略，可以很容易地重建
DataSet结构或者从XSD文件中构造新的类型化DataSet，然后在需要时加载
数据。可以使用DataSet对象的两种不同的方法来生成XSD文件：
WriteXmlSchema
GetXmlSchema
下面介绍如何使用DataSet对象的WriteXmlSchema方法。
可以使用DataSet对象的WriteXmlSchema方法将DataSet架构保存到XSD文件、
流或读取器对象中。该方法使用了一个参数，这个参数指定了架构信息的目标。
使用DataSet对象的WriteXmlSchema方法的语法如下：
1.WriteXmlSchema(string filename | Stream stream|
TextWriter writer|XmlWriter writer)
e.g.1:将架构写入文件。
下面使用XML文件中的内联架构和数据加载DataSet，然后使用DataSet
对象的WriteXmlSchema方法将架构保存到XSD文件中。
private void saveXSDSchema()
{
DataSet myds = new DataSet();
//从XML文件加载内联架构和数据
Myds.ReadXml(@’C:\sampledata\PurchaseOrder.xml’,XmlReadMode.ReadSchema);
//保存架构到XSD文件
Myds.WriteXmlSchema(@’C:\ sampledata\POSchema.xsd’);
}
e.g.2 使用DataSet对象的GetXmlSchema方法。
要从DataSet中提取架构信息并将其作为字符串进行存储，可以使用
DataSet对象的GetXmlSchema方法。下列代码片段中便使用了DataSet对象的
GetXmlSchema方法。
private void XSDSchemaToString(){
string StrPurchaseSchema;
DataSet myds = new DataSet(); //从XML文件加载内联架构和数据
myds.ReadXml(@’C:/sampledata\PurchaseOrder.xml’,XmlReadMode.ReadSchema);
}
2．将DataSet信息写入文件或流
在DataSet中，可以使用DataSet对象的WriteXml方法将数据和架构信息写入文
件或流。使用DataSet对象的WriteXml方法的部分语法如下：
1.WriteXml(string filename | Stream stream | TextWriter write |
XmlWriter Writer, {XmlWriteMode mode})
将XML数据写入文件。
将存储在DataSet中的数据作为XML文件进行保存，但是不写入任何架构信息。
****/
private void SaveXMLDataOnly(){
string StrPurchaseSchema;
DataSet myds = new DataSet(); //从XML文件中加载内联架构和数据
myds.ReadXml(@’C:\sampledata\PurchaseOrder.xml’,XmlReadMode.ReadSchema);
//忽略架构，只保存DataSet数据到文件
myds.WriteXml(@’C:\sampledata\CurrentOrders.xml’,XmlWriteMode.IgnoreSchema);
}
