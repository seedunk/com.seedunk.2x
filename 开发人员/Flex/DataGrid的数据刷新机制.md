# DataGrid的数据刷新机制
Flex中的DataGrid的数据列表并非是根据数据源数据的多少动态生成了N行，如果去看DataGridBase的源码会发现，他里面是有一个makeRow方法和一个clearRow的方法并行实现。这样的话我们可以看出，其实你在进行滚动条拉伸的时候DataGrid进行的就是这两个方法的重复操作，那么这两个方法里又是如何做的，首先看下makeRow方法的实现<br>
``` 
    protected function makeRow(
       contentHolder:ListBaseContentHolder, rowNum:int, left:Number, right:Number, yy:Number, data:Object, uid:String):Number
  {
	        var listItems:Array = contentHolder.listItems;
	        var columnContent:ListBaseContentHolder;
	        var item:IListItemRenderer;
	        var extraItem:IListItemRenderer;
	        var c:DataGridColumn;
	        var itemSize:Point;
	 
	        if (lockedColumnCount > 0)
	        {
	            if (contentHolder == lockedRowContent)
	                columnContent = lockedColumnAndRowContent;
	            else
	                columnContent = lockedColumnContent;
	        }
	        else
	            columnContent = null;
	 
	        var colNum:int = 0;
	        var xx:Number = left;
	        var hh:Number = 0;
	 
	        while (colNum < visibleLockedColumns.length)
	        {
	            c = visibleLockedColumns[colNum];
	            item = setupColumnItemRenderer(c, columnContent, rowNum, colNum, data, uid);
	            itemSize = layoutColumnItemRenderer(c, item, xx, yy);
	            xx += itemSize.x;
	            colNum++;
	        hh = Math.ceil(Math.max(hh, variableRowHeight ? itemSize.y + cachedPaddingTop + cachedPaddingBottom : rowHeight));
	        }
	        if (visibleLockedColumns.length)
	        {
	            while (columnContent.listItems[rowNum].length > colNum)
	            {
	                // remove extra columns
	                extraItem = columnContent.listItems[rowNum].pop();
	                addToFreeItemRenderers(extraItem);
	            }
	        }
	        colNum = 0;
	        xx = left;
	        while (xx < right && colNum < visibleColumns.length)
	        {
	            c = visibleColumns[colNum];
	            item = setupColumnItemRenderer(c, contentHolder, rowNum, colNum, data, uid);
	            itemSize = layoutColumnItemRenderer(c, item, xx, yy);
	            xx += itemSize.x;
	            colNum++;
	            hh = Math.ceil(Math.max(hh, variableRowHeight ? itemSize.y + cachedPaddingTop + cachedPaddingBottom : rowHeight));
	        }
	       <span style="color: rgb(255, 0, 0);"> while (listItems[rowNum].length > colNum)
	        {
	            // remove extra columns
	            extraItem = listItems[rowNum].pop();
	            addToFreeItemRenderers(extraItem);
	        }
	</span>
	        return hh;
	    }

``` 

稍微看下代码你就会发现他是重复的去设置数据源的item来实现滚动效果。那么这个时候就会经常的出现拉动之后页面的数据总是重复的，或者是原来的数据还在但是新的数据却不显示。简单的方法就是去强制调用DataGrid的InvalidateList和validateNow两个方法来实现动态的刷新视图。如果你使用了数据源绑定操作的话一般来说DataGrid会自动的帮你去更新视图，具体的应该也会去调用这两个方法。所以遇到DataGrid视图方面的问题可以通过这两个方法来试试。<br>
  ``` 

  $$('#main .blog_content pre[name=code]').each(function(pre, index){ // blog content
    var post_id = 399239;
    var location = window.location;
    source_url = location.protocol + "//" + location.host + location.pathname + location.search;
    pre.writeAttribute('codeable_id', post_id);
    pre.writeAttribute('codeable_type', "Blog");
    pre.writeAttribute('source_url', source_url);
    pre.writeAttribute('pre_index', index);
    pre.writeAttribute('title', 'Flex多样化饼图样式（颜色渐变，点击分离，环形）');
  });
  $$('#main .blog_comment > div').each(function(comment){// comment
    var post_id = comment.id.substr(2);
    $$("#"+comment.id+" pre[name=code]").each(function(pre, index){
      var location = window.location;
      source_url = location.protocol + "//" + location.host + location.pathname + location.search;
      source_url += "#" + comment.id;
      pre.writeAttribute('codeable_id', post_id);
      pre.writeAttribute('codeable_type', "Post");
      pre.writeAttribute('source_url', source_url);
      pre.writeAttribute('pre_index', index);
      pre.writeAttribute('title', 'Flex多样化饼图样式（颜色渐变，点击分离，环形）');
    });
  });
  code_favorites_init();

  fix_image_size($$('div.blog_content img'), 700);
  function quote_comment(id) {
    new Ajax.Request('/editor/quote', {
      parameters: {'id':id, 'type':'BlogComment'},
      onSuccess:function(response){editor.bbcode_editor.textarea.insertAfterSelection(response.responseText);
        Element.scrollTo(editor.bbcode_editor.textarea.element);}
    });
  }

  new WeiboShare({share_buttons: $('share_weibo'), img_scope: $('blog_content')});
``` 
