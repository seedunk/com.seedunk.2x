# Asp_后台调用前台Javascript 
```js
ClientScript.RegisterStartupScript(
     ClientScript.GetType(), "bb", 
   "<scrip t'> test('"+后台变量+"');</script>");
```    