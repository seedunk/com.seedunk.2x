
myclass={
         init: function() {
            return function() {
              this.load.apply(this, arguments); 
          	  };
        }
        };
mysly=myclass.init();
mysly.TEST_OPTIONS={ "horizontal": 1, "itemNav": "basic", "dragContent": 1, "startAt":1, "scrollBy": 1 };
 
mysly.log=function(str){
	 if(console!=null){
		 console.log(str);
	 }
};
mysly.prototype={
	 target:false, 
	 frame:false,
	 options:false,
	 first:true,
	 load:function(classname,option){
		 this.target=$(classname);
		 this.frame=$(classname).find(".sly");
		 if(option==null){
			 this.options=mysly.TEST_OPTIONS;
		 }	
	 },
	 init:function(){
		 var tar=this.target; 
		 this.options =$.extend({},this.options,{
		     	scrollBar: tar.find(".scrollbar"),
			    pagesBar: tar.find(".pages"), 
			    prevPage: tar.find(".slyprev"),
			    nextPage: tar.find(".slynext"),
			    disabledClass: 'btn-disabled'
		       });
          this.target=tar;
          this.frame.sly(this.options); 
          this.frame.on('sly:move',this.moveFunction);
          },
	 moveFunction:function(e,pos){/**mysly.log("x轴:"+pos.cur);**/},
	 toEnd:function(){ this.frame.sly("toEnd"); },
     refresh:function(){
    	 if(this.first){
    		 this.init();this.first=false;return true;
    	 }else{
    	     this.frame.sly('reload');return false;}
      	  
    	 }
	 
};

try{View;}catch(e){View={};}
try{Dct;}catch(e){Dct={};}
   View.Sly=false;
   View.ResetSly=function(){
	   View.Sly=function(page,param){return page;};
   };
   View.ResetSly();
   Dct.Sly=function(d){
	     if(d==null)
		  { 
	    	 d.title="标题";d.more="表述";
		  }
    	  return {
   		   title:d.title,
   		   more:d.more,
   		   link:d.link,
   		   src:d.src,
   		  };
   }; 
   (function($) { 
   	  $.fn.mysly=function(data,pageid,movfun){
   		  if(data!=null){
   		     var htm=$(this).find("ul").html();
                   $(this).find("ul").html("");
	         for(var i=0;i<data.length;i++){
	    	  var param=Dct.Sly(data[i]);
	          var p=htm.replace(new RegExp("@title","g"),param.title);
	              p=p.replace(new RegExp("@more","g"),param.more);
	              p=p.replace(new RegExp("@src","g"),param.src);
                      p=p.replace(new RegExp("@link","g"),param.link);
                      p=View.Sly(p,param);
	           $(this).find("ul").append(p);
	         }
   		  }
	        var f2 = new mysly($(this).selector);
	           pageid==null?f2.pageId = 1:f2.pageId=pageid;
	           movfun==null?f2.moveFunction = function(e, pos) {}:f2.moveFunction=movfun;
	           f2.refresh(); 
   		 };
    })(jQuery);
  