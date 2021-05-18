# Point 获取全局坐标
[使用到Point对象。Point 对象表示二维坐标系统中的某个位置，其中 x 表 示水平轴，y 表示垂直轴。](#data.description)<br>
[2014-12-07 22:24:11](#data.create_time)<br>
有时候我们需要获取组件的全局坐标(Global)。<br>
要获取绝对坐标，我们需要使用到Point对象。Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。<br>
下面的代码在 (0,0) 处创建一个点：
```js
var myPoint:Point = new Point();
``` 
测试代码:
```xml
 <![CDATA[
	 protected function test():void
			{
				var p:Point = new Point(image.x,image.y);
				p = image.localToGlobal(p);
			     // "(Global image)x:"+p.x+",y:"+p.y;
			}
		]]>
```
