# 利用Degrafa框架在FLEX中动态显示和操作SVG文档
 
Degrafa框架已经非常接近在FLEX中动态显示和操作SVG文档了，通过一些简单的转换, 基本上能够实现对SVG图形进行显示和操作。这样大量的SVG图形资源就可以直接在FLEX应用程序中使用了。
<br>
基本思路如下:
在MXML添加degrafa Surface对象, 读取SVG文档, 将其中的图形表示为degrafa图形对象, 动态添加到Surface中. 然后通过对象ID可以操作这些图形元素。
由于SVG文档为XML格式, 可以方便的读取这些图形元素.
<br>
首先在MXML中增加degrafa surface作为显示图形的画布
<br>
 然后在装载SVG图形文件后遍历其图形对象
<br>
```js
// A recursive function that reaches every element in an XML tree
private static function searchPath( node:XML ):void
{
// Loop over all of the child elements of the node
for each ( var element:XML in node.elements( ) )
{
if(element.name().toString() == (svgNameSpace + "::path"))
{
var newPath:SvgPath = new SvgPath(element, ct);
newPath.show();
}
 ```
<br>
注意到为每个SVG对象建立了一个相应的FLEX对象，其父类为一个图形类SvgGraphic， 然后派生出SvgRect, SvgPath等具体的子类。每个子类负责完成自己的属性设置和显示操作。
例如SvgPath在创建时读取了相应节点的属性， 包括fill, stroke等
```js
public function SvgPath(element:XML, container:Surface):void
{
surface = container;

for each ( var attr:XML in element.attributes() )
{
//Alert.show(attr.name().toString());
switch(attr.name().toString())
{
case "id":
id = attr.toString();
//Alert.show(id);
break;

case "d":
data = attr.toString();
break;

case "fill":
fillColor = attr.toString();
break;

case "fill-opacity":
fillAlpha = Number(attr.toString());
break;

case "stroke":
strokeColor = attr.toString();
break;

case "stroke-opacity":
strokeAlpha = Number(attr.toString());
break;

case "stroke-width":
strokeWidth = Number(attr.toString());
break;

case "transform":
transformStr = attr.toString();
break;

case "style":
style = attr.toString();
break;

default:
break;
}
}

if(id == null)
id = "Path_" + (Math.random()*1000000).toString();

if(style != null) //style on high priority
setByStyle();
}

然后在显示时创建相应的degrafa对象， 并应用这些属性
public function show():void
{
try
{
//Create new group for transform
group = new GeometryGroup();
group.target = surface;
group.id = "Group_" + id;
surface.graphicsCollection.addItem(group);

//Create new objects
dgfObject = new Path(null);
dgfObject.id = id;
dgfObject.data = data;

dgfObject.fill = getFillObject();
dgfObject.stroke = getStrokeObject();

//add to geometrygroup
group.geometryCollection.addItem(dgfObject);

//Transform
var matrix:Matrix = getTransformMatrix();

if(matrix != null)
group.transform.matrix = matrix;
}
catch(error:Error)
{
Alert.show(error.message);
}

//show update
//group.draw(null,null);
}
```
其它普通的图形对象也类似实现， 目前可以支持Rect, Line, Path, Circle, Ellipse, PolyLine, Polygon, Image, Text和Use。
对Stroke和Fill对象，在degrafa的实现必须添加到特殊的位置进行使用， 因此对每个SVG对象使用Fill和Stroke属性转换对象，添加到全局的笔画或填充组中，然后对图形进行设置。目前可以支持普通，线性，圆形和图形笔画和填充。
```js
protected function getStrokeObject():IGraphicsStroke
{
if(strokeColor == null)
return addNewSolidStroke();
else if(strokeColor.substr(0,3) == "url")
return getStrokeFromCollection();
else
return addNewSolidStroke();
}

protected function addNewSolidStroke():IGraphicsStroke
{
var newSolidStroke:SolidStroke = new SolidStroke();
newSolidStroke.id = "SolidStroke_" + id;
newSolidStroke.alpha = strokeAlpha;
newSolidStroke.weight = strokeWidth;

if(strokeColor == null)
newSolidStroke.color = null;
else
newSolidStroke.color = Number("0x" + strokeColor.substr(1));

surface.strokeCollection.addItem(newSolidStroke);

return newSolidStroke;
}
```
SVG中的变换种类很多， 包括平移，旋转，歪斜（SKEW)和矩阵， 所有的变换都可以用矩阵变换表示， 矩阵的变换可以转换为Degrafa矩阵对象，然后应用到图形上

```js
protected function getTransformMatrix():Matrix
{
if(transformStr == null)
return null;

if(transformStr.substr(0, 6)!="matrix")
return null;

var startIndex:int = transformStr.indexOf("(");
var endIndex:int = transformStr.indexOf(")");

var str:String = transformStr.substr(startIndex + 1, endIndex - startIndex - 1);

var matrixData:Array = str.split(",");
var matrix:Matrix = new Matrix();

matrix.a=matrixData[0];
matrix.b=matrixData[1];
matrix.c=matrixData[2];
matrix.d=matrixData[3];
matrix.tx=matrixData[4];
matrix.ty=matrixData[5];

return matrix;
}
```
通过这些转换， 可以将简单的SVG图形动态显示在FLEX中，与其它SVG显示程序（例如INKSCAPE或ASV,，FIREFOX）中的效果基本保持一致。但由于SVG标准本身比较复杂，需要相当大的工作量才能覆盖全部的SVG标准。其中包括：
1. SVG脚本
2. SVG Group
3. SVG动画
4. 复杂的多层次坐标变换等

另外由于degrafa在文本显示中的局限性（目前degrafa利用TEXTBOX显示文本），基本无法实现文本的高级操作，例如旋转等。<br>
http://blog.csdn.net/firefight/article/details/2588785 