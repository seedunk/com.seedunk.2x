# tooltip 使用
设置winform tooltip的位置一直没有找到好的方法，还有箭头的方向，其实这些功能tooltip都可以实现的。
``` 
    ToolTip tt = new ToolTip();
 　　private void Form2_Load(object sender, EventArgs e)
        {
         //冒泡显示
          tt.IsBalloon = true;   
        //就是这个方法
        //msdn查过该方法定义：是当鼠标放到制定控件的时候来提示的，跟其他几个属性配合使用，可以网上搜索 到我就不说了。
　　　　//显示是箭头朝下的
　　　　// 如果不使用该方法，箭头朝向就是朝下的，而且tooltip的位置无法定位准确，如果使用该方法一切变得就是如此简单了 
　　      tt.SetToolTip(this.textBox1, "请输入用户名"); 
          }       

　　 private void button1_Click(object sender, EventArgs e){           
　　　　if (textBox1.Text.Length == 0){              
　　　　　　//下面该方法的默认提示箭头朝上
　　　　　　//位置在文本框中间，有重构方法可以制定它的位置，1000为提示显示时间1s.
　　　　  　tt.Show("请输入用户名", textBox1,1000);               
　　　　　　textBox1.Focus();          
　　　　 }      
　　 } 
```