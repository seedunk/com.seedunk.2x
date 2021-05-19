# 使用BindingUtils动态绑定<
关于Flex2绑定的例子，大都是使用[Bindable]注释，或在mx视图组件中使用大括号{}来实现的。<br>
基本都是象下面的代码<br>
```
 <?xml version="1.0" encoding="utf-8"?>  
  <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute">  
  <mx:Script>  
           [CDATA[                      
                [Bindable]   
                private var myText : String;   
           ]]   
       </mx:Script>            
       <mx:TextInput id="textInput" x="10" y="10" change="myText = textInput.text + '!'"></mx:TextInput>  
       <mx:Label id="textLabel" x="10" y="40" text="{textInput.text}" width="160" height="20" fontWeight="bold" fontSize="12"></mx:Label>  
       <mx:Text x="10" y="68" text="{myText}" fontSize="12" fontWeight="bold" width="260"></mx:Text>
</mx:Application>  
```

但实际项目中，并非都是这种理想的情况，有时你的视图组件是动态生成的，有时你需要动态的改变绑定，有时你使用Sprite动态生成的图形也需要绑定数据，或者你就是喜欢完全使用AS来写。这时就可以使用mx.binding.utils.BindingUtils类，改写上面的例子<br>
```
<?xml version="1.0" encoding="utf-8"?>  
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="init()">  
  <mx:Script>  
            [CDATA[   
                import mx.controls.Label;   
                import mx.controls.TextInput;   
                import mx.binding.utils.BindingUtils;   
                   
               private function init():void {   
                   var textInput : TextInput = new TextInput();   
                   var textLabel : Label = new Label();   
                      
                   myBox.addChild(textInput);   
                   myBox.addChild(textLabel);   
                      
                   BindingUtils.bindProperty(textLabel, "text", textInput, "text");   
               }   
            ]]   
       </mx:Script>  
       <mx:VBox id="myBox" x="10" y="10"></mx:VBox>  
    </mx:Application>  
```

这个例子将textInput.text与textLabel.text进行了绑定，而且没有使用[Bindable]，也没有使用{}。使用这种方法，可以将多个视图组件与一个Value Object对象(或叫DTO、Bean等)进行绑定，当VO对象改变时，所有绑定的视图都会改变。也可以在纯as文件中实现动态绑定了。<br>
xml 代码<br>
```
<?xml version="1.0" encoding="utf-8"?>  
    <mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="absolute" creationComplete="init()">  
           
        <mx:Script>  
          [CDATA[   
               import model.UserVO;   
                import mx.controls.Label;   
                import mx.controls.TextInput;   
               import mx.binding.utils.BindingUtils;   
                  
               private var userVO : UserVO = new UserVO();   
                 
               private function init():void {   
                      
                   for (var i : int = 0; i < 3; i++) {   
                       var nameLabel : Label = new Label();   
                       var emailLabel : Label = new Label();   
                       myBox.addChild(nameLabel);   
                       myBox.addChild(emailLabel);   
                          
                       BindingUtils.bindProperty(nameLabel, "text", userVO, "name");   
                       BindingUtils.bindProperty(emailLabel, "text", userVO, "email");   
                   }   
               }   
                  
           ]]   
       </mx:Script>  
       <mx:HBox x="10" y="10" width="234">  
           <mx:TextInput id="nameInput" width="113" change="userVO.name = nameInput.text"></mx:TextInput>    
           <mx:TextInput id="emailInput" width="107" change="userVO.email = emailInput.text"></mx:TextInput>  
       </mx:HBox>  
      <mx:VBox id="myBox" x="10" y="38" width="234" height="175"></mx:VBox>  
   </mx:Application>  

    package model   
    {   
        [Bindable]   
        public class UserVO   
        {   
            public var name: String;   
            public var email: String;   
           public var online: Boolean = false;   
       }   
   }  

```