# 可拖动的Panel
[2014-12-07 22:24:11](#data.create_time)<br>

```js
package myAS.UI
{   
    import flash.events.MouseEvent;
    import mx.containers.Panel;
    import mx.controls.Button;
	public class iPanel extends Panel{
	{    
	    private var resizeBtn:Button;
		public function iPanel(){
		   super();
		}
        private function onResize(event:MouseEvent):void{
            stage.addEventListener(MouseEvent.MOUSE_MOVE,onMove);
            stage.addEventListener(MouseEvent.MOUSE_UP,stopResize);
        }
        
        override protected function createChildren():void{
            super.createChildren();
            resizeBtn = new Button();
            resizeBtn.width = 10;
            resizeBtn.height = 10;
            resizeBtn.alpha = 0;
            resizeBtn.addEventListener(MouseEvent.MOUSE_DOWN,onResize);
            this.rawChildren.addChild(resizeBtn);
            
            //鼠标移入移出Panel时显示或隐藏resizeBtn,不能用visible
            this.addEventListener(MouseEvent.ROLL_OVER,function(event:MouseEvent){resizeBtn.alpha = 1;});
            this.addEventListener(MouseEvent.ROLL_OUT,function(event:MouseEvent){resizeBtn.alpha = 0;});
            
        }
        
        override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void{
            super.updateDisplayList(unscaledWidth,unscaledHeight);
            resizeBtn.x = this.width - resizeBtn.width;
            resizeBtn.y = this.height - resizeBtn.height;
        }
        
        private function onMove(event:MouseEvent):void{
            if(stage.mouseX- this.x > 0){
                this.width = stage.mouseX - this.x;
            }
            
            if(stage.mouseY - this.y > 0){
                this.height = stage.mouseY - this.y;
            }
        }
        
        private function stopResize(event:MouseEvent):void{
            stage.removeEventListener(MouseEvent.MOUSE_MOVE,onMove);
            stage.removeEventListener(MouseEvent.MOUSE_UP,stopResize);
        }
	}
   }
 }
 ```