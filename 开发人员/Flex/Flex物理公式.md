# Foundation Actionscript 3.0 Animation Making Things Move（
     
``` 
   向鼠标（或者任何一个点）旋转：
// 用要旋转到的 x, y 坐标替换 mouseX, mouseY
dx = mouseX – sprite.x;
dy = mouseY – sprite.y;
sprite.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
创建波形：
// 将 x, y 或其它属性赋值给 Sprite 影片或影片剪辑，
// 作为绘图坐标，等等。
public function onEnterFrame(event:Event){
value = center + Math.sin(angle) * range;
angle += speed;
}
创建圆形：
// 将 x, y 或其它属性赋值给 Sprite 影片或影片剪辑，
// 作为绘图坐标，等等。
public function onEnterFrame(event:Event){
xposition = centerX + Math.cos(angle) * radius;
yposition = centerY + Math.sin(angle) * radius;
angle += speed;
}
创建椭圆：
// 将 x, y 或其它属性赋值给 Sprite 影片或影片剪辑，
// 作为绘图坐标，等等。
public function onEnterFrame(event:Event){
xposition = centerX + Math.cos(angle) * radiusX;
yposition = centerY + Math.sin(angle) * radiusY;
angle += speed;
}
获得两点间的距离：
// x1, y1 和 x2, y2 是两个点
// 也可以是 Sprite / MovieClip 坐标，鼠标坐标，等等。
dx = x2 – x1;
dy = y2 – y1;
dist = Math.sqrt(dx*dx + dy*dy);
颜色组合：
1.color24 = red < < 16 | green << 8 | blue;
2.color32 = alpha << 24 | red << 16 | green << 8 | blue;
颜色提取：
1.red = color24 >> 16;
2.green = color24 >> 8 & 0xFF;
3.blue = color24 & 0xFF;
4.alpha = color32 >> 24;
5.red = color32 >> 16 & 0xFF;
6.green = color32 >> 8 & 0xFF;
7.blue = color232 & 0xFF;
穿过某点绘制曲线：
// xt, yt 是我们想要穿过的一点
// x0, y0 以及 x2, y2 是曲线的两端
x1 = xt * 2 – (x0 + x2) / 2;
y1 = yt * 2 – (y0 + y2) / 2;
moveTo(x0, y0);
curveTo(x1, y1, x2, y2);
角速度转换为 x, y 速度：
vx = speed * Math.cos(angle);
vy = speed * Math.sin(angle);
角加速度（作用于物体上的 force）转换为 x, y 加速度：
ax = force * Math.cos(angle);
ay = force * Math.sin(angle);
将加速度加入速度：
vx += ax;
vy += ay;
移除出界对象：
if(sprite.x – sprite.width / 2 > right ||
sprite.x + sprite.width / 2 < left ||
sprite.y – sprite.height / 2 > bottom ||
sprite.y + sprite.height / 2 < top){
// 删除影片的代码
}
重置出界对象：
if(sprite.x - sprite.width / 2 > right ||
sprite.x + sprite.width / 2 < left ||
sprite.y – sprite.height / 2 > bottom ||
sprite.y + sprite.height / 2 < top){
// 重置影片的位置和速度
}
屏幕环绕出界对象：
if(sprite.x - sprite.width / 2 > right){
sprite.x = left – sprite.width / 2;
}
elseif(sprite.x + sprite.width / 2 < left){
sprite.x = right + sprite.width / 2;
}
if(sprite.y – sprite.height / 2 > bottom){
sprite.y = top – sprite.height / 2;
}
elseif(sprite.y + sprite.height / 2 < top){
sprite.y = bottom + sprite.height / 2;
}
摩擦力应用(正确方法)：
speed = Math.sqrt(vx * vx + vy * vy);
angle = Math.atan2(vy, vx);
if(speed > friction){
speed -= friction;
}
else{
speed = 0;
}
vx = Math.cos(angle) * speed;
vy = Math.sin(angle) * speed;
摩擦力应用(简便方法)：
vx *= friction;
vy *= friction;
简单缓动运动：
//长形
var dx:Number = targetX – sprite.x;
var dy:Number = targetY – sprite.y;
vx = dx * easing;
vy = dy * easing;
sprite.x += vx;
sprite.y += vy;
//中形：
vx = (targetX – sprite.x) * easing;
vy = (targetY – sprite.y) * easing;
sprite.x += vx;
sprite.y += vy;
//短形：
sprite.x += (targetX – sprite.x) * easing;
sprite.y += (targetY – sprite.y) * easing;
简单弹性运动：
//长形
var ax:Number = (targetX – sprite.x) * spring;
var ay:Number = (targetY – sprite.y) * spring;
vx += ax;
vy += ay;
vx *= friction;
vy *= friction;
sprite.x += vx;
sprite.y += vy;
//中形：
vx += (targetX – sprite.x) * spring;
vy += (targetY – sprite.y) * spring;
vx *= friction;
vy *= friction;
sprite.x += vx;
sprite.y += vy;
//短形：
vx += (targetX – sprite.x) * spring;
vy += (targetY – sprite.y) * spring;
sprite.x += (vx *= friction);
sprite.y += (vy *= friction);
偏移弹性运动：
var dx:Number = sprite.x – fixedX;
var dy:Number = sprite.y – fixedY;
var angle:Number = Math.atan2(dy, dx);
var targetX:Number = fixedX + Math.cos(angle) * springLength;
var targetY:Number = fixedX + Math.sin(angle) * springLength;
// 如前例弹性运动到 targetX, targetY
距离碰撞检测：
// 从影片 spriteA 和 spriteB 开始
// 如果使用一个空白影片，或影片没有半径（radius）属性
// 可以用宽度或高度除以 2。
var dx:Number = spriteB.x – spriteA.x;
var dy:Number = spriteB.y – spriteA.y;
var dist:Number = Math.sqrt(dx * dx + dy * dy);
if(dist < spriteA.radius + spriteB.radius){
// 处理碰撞
}
多物体碰撞检测：
var numObjects:uint = 10;
for(var i:uint = 0; i < numObjects – 1; i++){
// 使用变量 i 提取引用
var objectA = objects[i];
for(var j:uint = i+1; j{
// 使用变量 j 提取引用
var objectB = objects[j];
// perform collision detection
// between objectA and objectB
}
}
坐标旋转：
x1 = Math.cos(angle) * x – Math.sin(angle) * y;
y1 = Math.cos(angle) * y + Math.sin(angle) * x;
反坐标旋转：
x1 = Math.cos(angle) * x + Math.sin(angle) * y;
y1 = Math.cos(angle) * y – Math.sin(angle) * x;
动量守恒的 ActionScript 表达式，短形:
var vxTotal:Number = vx0 – vx1;
vx0 = ((ball0.mass – ball1.mass) * vx0 + 2 * ball1.mass * vx1)/(ball0.mass + ball1.mass);
vx1 = vxTotal + vx0;
万有引力：
function gravitate(partA:Ball, partB:Ball):void{
var dx:Number = partB.x – partA.x;
var dy:Number = partB.y – partA.y;
var distSQ:Number = dx * dx + dy * dy;
var dist:Number = Math.sqrt(distSQ);
var force:Number = partA.mass * partB.mass / distSQ;
var ax:Number = force * dx / dist;
var ay:Number = force * dy / dist;
partA.vx += ax / partA.mass;
partA.vy += ay / partA.mass;
partB.vx -= ax / partB.mass;
partB.vy -= ay / partB.mass;
}
余弦定理：
A=Math.acos((b * b + c * c – a * a) / (2 * b * c));
B=Math.acos((a * a + c * c – b * b) / (2 * a * c));
C=Math.acos((a * a + b * b – c * c) / (2 * a * b));
基本透视法：
scale = fl / (fl + zpos);
sprite.scaleX = sprite.scaleY = scale;
sprite.alpha = scale; // 可选
sprite.x = vanishingPointX + xpos * scale;
sprite.y = vanishingPointY + ypos * scale;
Z 排序：
// 假设有一个带有 zpos 属性的 3D 物体的数组
objectArray.sortOn(“zpos”, Array.DESCENDING | Array.NUMERIC);
for(vari:uint = 0; i < numObjects; i++){
setChildIndex(objectArray[i], i);
}
坐标旋转：
x1 = cos(angleZ) * xpos – sin(angleZ) * ypos;
y1 = cos(angleZ) * ypos + sin(angleZ) * xpos;
x1 = cos(angleY) * xpos – sin(angleY) * zpos;
z1 = cos(angleY) * zpos + sin(angleY) * xpos;
y1 = cos(angleX) * ypos – sin(angleX) * zpos;
z1 = cos(angleX) * zpos + sin(angleX) * ypos;
3D 距离：
dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
``` 
