p1="body";
$.browser={ msie:/msie/.test(navigator.userAgent.toLowerCase())};

BODY="<body>";
BODY_END="</body>";
Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
	} 
Date.prototype.diff=function(startDate){
	    if(startDate==null)startDate=new Date(); 
	    var date3=this.getTime()-startDate.getTime(); 
	    var days=Math.floor(date3/(24*3600*1000));  
	   // var leave1=date3%(24*3600*1000);
	    var leave1=date3%(3600*1000);
	    var hours=Math.floor(date3/(3600*1000));  
	    var leave2=leave1%(3600*1000);
	    var minutes=Math.floor(leave2/(60*1000));  
	    var leave3=leave2%(60*1000) ; 
	    var seconds=Math.round(leave3/1000);  
	    // if(days<=0)days="";else days+="天";
	    if(hours<=0)hours="0"; 
	     if(minutes<=0)minutes="0";
	     if(seconds<=0)seconds="0";
	     if(hours<10)hours="0"+hours; 
	     if(minutes<10)minutes="0"+minutes; 
	     if(seconds<10)seconds="0"+seconds; 
	    
	    
	    var lab= hours+":"+minutes+":"+seconds+"";  
	     return lab;
};

 
CHILDREN=-1;
PARENT=1;

/**POST*/
$.handleLoading=false;
$.showLoading=function(retime){
	var htm=$("<div id='loading'></div>");
	    htm.append("<label style='color:#fff'>正在加载...</label>");
	    htm.css("position","fixed");
	    htm.css("top","0");
	     htm.css("width","100%");
	     htm.css("height","100%");
	     htm.css("z-index","999999"); 
	   $("body").append(htm);
	    if(retime==null)
	      	  retime=15000;
	    var timeout=function(){
	        $.hideLoading();
	     };
	     $.handleLoading=setTimeout(timeout,retime);
};
$.hideLoading=function(){
	 clearTimeout($.handleLoading);
	 $("#loading").remove();	
};
(function($) {
	 $.fn.hasAttr=function(attrName){
		  return typeof(this.attr(attrName))!="undefined";
	  };
	
	
})(jQuery); 
 
(function($) { 
	    
	    $.fn.myJS=function(set){
	       if(set==null){
	    	   return $("body").attr("data-myJS");
	       }else{
	    	   $("body").attr("data-myJS",set);
	       }
       };
        $.fn.root=function(set){
	       if(set==null){
	    	   return $("body").attr("data-root");
	       }else{
	    	    $("body").attr("data-root",set);
	       }
       };
       $.fn.lang=function(set){
	        if(set==null){
	    	   return $("body").attr("data-lang");
	        }else{
	    	   $("body").attr("data-lang",set);
	        }
       };
       $.fn.valByName=function(val){
    	  var targ= $('[name="'+this.selector+'"]');
    	       if(val==null){
    	    	   return targ.val();
    	       }else{
    	    	    targ.val(val);
    	       }
       };
       $.fn.setParam = function(name,val) { 
    		   var clz=$(this).selector;
    		       clz=clz.replace(/\./g, "");
    		   var id=clz.replace(/\-/g, "_")+name;
    		   $("#"+id).remove();
    		   var inp=$("<input type='hidden'>").addClass(clz)
    		        .attr("id",id)
    		        .attr("name",name).val(val);
    		 
    		   $("body").append(inp);
    		   return this;
       };
	    $.fn.post = function(url,classBack,paramsEx,timeout) { 
	     	//timeout==null?
	    	//$.showLoading():$.showLoading(timeout);
	        var params; 
		    paramsEx==null?params={}:params=paramsEx;
		    if(classBack==null){
		          classBack=function(da){
		        	  alert(da);
		    		};
		    }
		    
		    var MSG_MUST="不能为空";
		    var doit=true;
		    $(this).each(function(){
			      var t=$(this);
			     
			      if(t.attr("data-msg")=="msg"){
			    	  doit=false;
			      }else if(t.attr("data-role")=="must"&&t.val()==""){
			    	 
			    	 t.attr("data-msg","msg");
			    	 t.attr("data-msg-tmp",t.attr("type"));
			    	 t.attr("type","text");
			    	 t.val(MSG_MUST);
			    	 t.click(function(){
			    		 if(t.attr("data-msg")=="msg"){
			    			  t.attr("data-msg","");
			    			  t.attr("type",t.attr("data-msg-tmp"));
			    			  t.val("");
			    		 }
			    		 
			    	 });
			    	  doit=false;
			      }
			      params[t.attr("name")]= t.val();
		    });
		    var call=function(da){
		    	  // $.hideLoading();
		    	   classBack(da);
		    	   };
		     if(doit){
				  $.post(url,params,call);
				 /**
				  $.ajax({ url: url,
                  contentType: 'application/json', 
				     dataType: "json",
				  type: "POST",
                  data:params,
                   username:'test',
                   password:'test',
                    }).done(function( data ) {
                           call(data);
                             })
				  */
			   }
		     
	       };
	      /***/
	        $.fn.setJson=function(obj,removeFormat){
	    	   var json = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
	    	   if(!json) 
	    		     obj=eval(obj);
	    	   $(this).each(function(){
	    	     	  var t=$(this);
	    	     	  var na=t.attr("name").replace(removeFormat,"");
	    	    	  t.val(obj[na]);
			    });
	       /**var json=eval(d);  $.each(json, function(k) { console.log(k+":"+json[k]);  });**/
	         }; 
})(jQuery); 
(function($) { 
	
	   $.fn.point=function(){
		  var b={x:0,y:0}; 
		  var t=$(this).context.id;
		   var _t=document.getElementById(t);
	      while(_t.offsetParent){
	        b.x+=_t.offsetLeft;
	        b.y+=_t.offsetTop;
	          _t=_t.offsetParent;
	        }  
	    return b;        
		};
	
	  $.fn.refresh=function(t){
		      if(t==null){
		    	   $(this).attr("src",$(this).attr("src"));
		      }else{
		    	   t==0?location.href=location.href:location.href=t;
	    	  }
	       };
	       $.fn.param=function(t){
	    	   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    	    var r = window.location.search.substr(1).match(reg);
	    	    if (r!=null) return unescape(r[2]);
	    	       return null;
	    	   };    
	       $.fn.type=function(){
	    	    var fram="";
	    	     $(this).each(function(){ 
	    	    	 fram=this.localName;
				     
			      }); 
	    	     return fram;
		        };
	 /**
	 * @params param  
	 *    CHILDREN  
	 *    PARENT  
	 * */
	$.fn.resize = function(param) {  
		  var ui=$(this).selector;
		  if(ui=="iframe"||$(ui).type()=="iframe"){
			       if(param==null||param==CHILDREN){
			    	   $(this).attr("frameborder",0).css("border",0).load(function(){
			    	      if($(this).attr("data-enable")=="false"
				    	   ||$(this).attr("data-resize")=="false"){
				    	      return;
				           }
					   var he=this.contentWindow.document.documentElement.scrollHeight;
			           $(this).css("height",he);   
			        });
			  }
		  }
	}
	 $.fn.enter=function(fn){
		 $(this).bind('keydown',function(event){var e = event || window.event;if(!e.ctrlKey && e.keyCode ==13){if(typeof(fn)!='undefined')fn.call(this)}});
		  return this;
	 }
	 
	    })(jQuery);
 
$(function(){
	iframes=$("iframe");
	if(iframes!=null)
		iframes.resize();
});

/**Ex */
myclass={ init: function() {
                 return function() {
                 this.load.apply(this, arguments); 
             	  };
            } };

ClassInstance={ init: function() {
      return function() {
        this.load.apply(this, arguments); 
    	  };
     } };
/**help class*/
help={ init: function() {
        return function() {
        this.load.apply(this, arguments); 
	  };
} ,
test:function(){
	
}};

String.prototype.change=function(oldStr,newStr) {   
	 var r=new RegExp(oldStr,"g"); 
	     return this.replace(r,newStr);
   };
help.pager=help.init();
help.pager.prototype={
		 content:"",
		 load:function(str){
			 if(str!=null)
			   this.content=str;
		 },
		 setParam:function(k,v){ 
			  
			 this.content=(this.content+"").change(k,v);
		 },
		 getContent:function(){
			 return this.content;
		 }
		 
}; 
/***
PageHelper=myclass.init();
PageHelper.prototype={
		 content:"",
		 load:function(str){
			 this.content=str;
		 },
		 setParam:function(k,v){ 
			 this.content=this.content.replace(new RegExp(k,"g"),v);
		 },
		 getContent:function(){
			 return this.content;
		 }
		 
};
*/
FormHelper=myclass.init();
FormHelper.prototype={
		         params:[],
			     setParam:function(k,v){
			    	 for(var i=0;i<this.params.length;i++){
			    		 if(this.params[i].key==k){this.params[i].key="remove";}
			    	 }
			    	 var a=[];
			    	   a.key=k;a.value=v;
			    	   this.params.push(a);
			     },
	             getForm:function(action){
			         var fo=$("<form id='nextform' method='post' action='"+this.action+"'></form>");
			             fo.css("display","none");
			         for(var i=0;i<this.params.length;i++){
			              var  inp=$("<textarea/>");
			                   inp.attr("name",this.params[i].key);
			                   inp.html(this.params[i].value);
			            fo.append(inp);
			         }
			         return fo;
			    }, 
			    action:false,
	            load:function(t){ this.action=t;  },
		    	submit:function(){
		    	    	  var r=this.getForm(); 
		    	    	   $("body").append(r);
		    	    	     r.submit();
		    	    	   } 
 };
		 
(function($) { 
$.fn.pager=function(pid,sum){
	     pid=Number(pid);
	     sum=Number(sum);
	   var p=$(this);
	     p.attr("data-pageid",pid);
	     p.attr("data-pagesum",sum);
	     p.find("a").add(p.find("li")).attr("href","javascript:;").click(function(){ 
	    	   if($(this).attr("pid")=="-1"||$(this).attr("pid")==null)return;
		    	   var form=new FormHelper(location.href);
	    	       form.setParam("pageid",$(this).attr("pid"))
	    	       form.submit(); 
	       });
	     if(pid<sum){
	          p.find(".next").attr("pid",pid+1);
	      }else{
	    	  p.find(".next").attr("pid",-1);
	      }
	      if(pid>1){
	          p.find(".back").attr("pid",pid-1);
		   }else{
			   p.find(".back").attr("pid",-1);
		   }
	       p.find(".first").attr("pid",1);
		   p.find(".last").attr("pid",sum);
		   p.find(".info").html(pid+"/"+sum);
    };
   $.fn.flatpager=function(pid,sum){
		 var p=$(this);
		   if(p.html()=="")
			  p.html('<a class="first">首页</a><div class="content"></div><a class="last">尾页</a>');
		   if(p.attr("intance")=="1")return;
		     p.attr("intance","1");
		     pid=Number(pid);
		     sum=Number(sum);
		  
		     p.attr("data-pageid",pid);
		     p.attr("data-pagesum",sum);
		     var cf=function(){ 
		    	   if($(this).attr("pid")=="-1"||$(this).attr("pid")==null)return;
		    	   var form=new FormHelper(location.href);
	    	       form.setParam("pageid",$(this).attr("pid"));
	    	       form.submit(); 
	         };
		     p.find("a").add(p.find("li")).attr("href","javascript:;").click(cf);
		     p.find(".first").attr("pid",1);
		     p.find(".last").attr("pid",sum);
		     if(pid<sum){
		           p.find(".next").attr("pid",pid+1);
		      }else{
		    	   p.find(".next").attr("pid",-1);
		      }
		      if(pid>1){
		          p.find(".back").attr("pid",pid-1);
			   }else{
				   p.find(".back").attr("pid",-1);
			   }  
		      var buildIt=function(pid){
		    	  var a=$("<a></a>");
		    	      a.attr("pid",pid);
		    	      a.addClass("flat-pj");
		    	      a.html(pid);
		    	      a.attr("href","javascript:;").click(cf);
		    	      return a;
		      };
		      var startp=pid-2;
		      if(startp>sum-5)startp=sum-5;
		      if(startp<1)startp=1;
		      
		      for(var i=startp;i<(startp+5);i++){
		    	     if(i<=sum){
		    	       var a=buildIt(i);
		    		   if(i==pid){
		    			    a.addClass("flat-pjactive");
		    			    a.addClass("active");
		    		    }
		    		    p.find(".content").append(a);}
		      };
	    }; 
})(jQuery);
 

/***文本操作**/
(function($) { 
	$.fn.json=function(replist,dev){
		if(dev==null){
		      $(this).hide();
		}
		 var str=$(this).html();
		 if(replist!=null){
			  for(var key in replist){  
				 var rep=replist[key]; 
				  console.log(key+":"+rep);
				 str=str.replace( new RegExp(key,"g"),rep);
	          }  
		    
		 }
		 
		 return eval(str);
		  
	 }
	function isString(str)     
	{     var str=$(this).val();
	       var   reg=/^[a-zA-Z0-9_]+$/;     
	        return reg.test(str);
	};
	 function isChinese()     
	{       
		   var str=$(this).val();
	       var reg=/^[\u0391-\uFFE5]+$/;    
	        return reg.test(str);
	} ; 
})(jQuery);

 
/***动态加载资源*/
(function($) { 
	      $.fn.asset=function(src,loadback){
	    	   
	    	   var sel=$(this).selector;
	    	  if(sel=="css"||sel=="link"){
//	    		   $("<link>")
//		    	    .attr({ rel: "stylesheet",
//		    	     type: "text/css",
//		    	     href: src
//		    	     }).appendTo("head");
	    		   $.ajax({ 
	    			   url: src, 
	    			   success: function(data) { 
	    			       $('<style type="text/css">' + data.replace(/url\(images/g, 'url(/css/images') + '</style>').appendTo('head'); 
	    			       loadback();    
	    			   } 
	    			   });  
	    		  }
	    	   if(sel=="js"||sel=="javascript"){
	    		    $.getScript(src, function(data, textStatus, jqxhr) {
	    		    	 loadback();
	    	             });     
	    	     }
	    	  };
	     })(jQuery);


/***ROOT**/
$.getRoot=function(api){
	var t=$(document.body).attr("data-root");
	if(api!=null)
		 t=t+api;
	return t;
}; 
$.getMyJS=function(){
     return  $(document.body).attr("data-myJS");
}; 




Loader=myclass.init(); 
Loader.prototype={
		funs:[],
		params:[],
	    load:function(str){
		  
	    },
	    append:function(fun,param){
	    	this.funs.push(fun);
	    	 param==null?this.params.push("-723s023"):this.params.push(param);
	    },
	    run:function(){
	    	  for(var i=0;i<this.funs.length;i++){
	    		 this.params[i]=="-723s023"?
	    		 this.funs[i]():this.funs[i](this.params[i]);
	    	  }
	    }    
};
 
jq190lib1={};
jq190lib1.os={
		    versions:function(){
		            var u = navigator.userAgent, app = navigator.appVersion;
		            return {         //移动终端浏览器版本信息
		                 trident: u.indexOf('Trident') > -1, //IE内核
		                 presto: u.indexOf('Presto') > -1, //opera内核
		                 webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		                 gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
		                iPad: u.indexOf('iPad') > -1, //是否iPad
		                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		            };
		         }(),
		         language:(navigator.browserLanguage || navigator.language).toLowerCase()
		};
  
OS_LANG="jq190lib1.os.lang";
OS_ANDROID="android";
OS_MOBILE="mobile";

 
(function($) { 
          $.fn.os=function(type,afterfun){
        	  if(afterfun==null){
        	  if(type==OS_LANG){
        		  return jq190lib1.os.language;
        	  }else{
   	              return jq190lib1.os.versions[type];
        	  }
        	  }else{
        		    var bol=jq190lib1.os.versions[type];
        		    if(afterfun!=null)
        		    afterfun(bol);
        		    else 
        		    	return bol;
        	  }
   	       };
          })(jQuery);




aq={};
aq.util={};
aq.util.params=function(cls){
	  return {
			  clazz:cls,
			  append:function(name,val){
				  var id="#"+this.clazz+"_"+name;
					 if($(id).length > 0)$(id).remove();
				     var inp=$("<input id='"+id+"' name='"+name+"' type='hidden' >")
				              .addClass(this.clazz)
				              .val(val);
					 $("body").append(inp);
					 return this;
			  },
			  post:function(url,back){
				  $("."+this.clazz).post(url,back);
			  }
	     }
	 
     }

/**form表单异步提交*/
aq.util.poster=function(jqSelector,success){
	   var target=$(jqSelector);
	   var options = {
		        dataType:'json',
		        timeout:30000,
		        url:target.attr("action"),
		        beforeSubmit: function(){
		    	   aq.util.poster.show();
		    	     },
		        success:function(data){
		    	     aq.util.poster.hide();
		    	     success(data);
		        },
		        error:function(e){
		    	   aq.util.poster.hide();
		    	   aq.util.poster.error(e);
		        }
		      };
	  try{
		   target.ajaxSubmit(options);
	  }catch(e){
		   alert("import:com.jquery.util.jquery_form.js");
	  }
 }; 
aq.util.poster.show=function(){};
aq.util.poster.hide=function(){};
aq.util.poster.error=function(e){};


/**20161208 p1ui*/
Layouts={};
Layout=function(target){

	           if(Layouts[target]==null){
	        	    Layouts[target]=$(target).prop("outerHTML")+"";
	        	    $(target).remove();
	        	 }
	          
		      return {
		    	  
	        	  layout:Layouts[target],
	        	  adapter:false, 
	        	  rjs:function(){
	        		  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                      this.layout=(this.layout+"").replace(SCRIPT_REGEX, '');  
                      return this;
		        	  },
	        	  setAdapter:function(iAdapter){
                   this.adapter=iAdapter;
                   return this;
		        	  },
	              bind:function(json){
	            	       for(var key in json){ 
		            	      this.layout=this.layout.change("@"+key+"@",json[key]);
	                	      if(this.adapter!=false){
	                	    	   this.layout=this.adapter(this.layout,key,json);
                              }
	                        }
	                       
	                       return this;
	                      },
	               _display:"block",
	               display:function(value){
	            	   this._display=value;
	            	   return this;
	            	   },
	               appendTo:function(parent){
	                          var view=$(this.layout).removeClass("layout");
	                              view.addClass("layout-item");
	                          $(parent).append(view.css("display",this._display)); 
	                    },
	               prependTo:function(parent){
	                         var view=$(this.layout).removeClass("layout");
                                view.addClass("layout-item");
                              $(parent).prepend(view.css("display",this._display)); 
                }
	              };
		  };
/***网络提交*/
Params=function(cls){
		  	   return {
		  			  clazz:cls,
		  			  auth:function(){
		  				  this.append("rid",   $("body").attr("data-rid"));
		  				  this.append("token", $("body").attr("data-token"));
		  				  return this;
		  			  },
		  			  append:function(name,val){
		  				  var id="#"+this.clazz+"_"+name;
		  					 if($(id).length > 0)$(id).remove();
		  				     var inp=$("<input id='"+id+"' name='"+name+"' type='hidden' >")
		  				              .addClass(this.clazz)
		  				              .val(val);
		  					 $("body").append(inp);
		  					 return this;
		  			  },
		  			  post:function(url,back){
		  				  $("."+this.clazz).post(url,back);
		  			  }
		  	     }
		  	 
		       };
 