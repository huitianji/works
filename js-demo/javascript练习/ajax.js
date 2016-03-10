function oAjax(url,fnSucc,fnFaild){
/*
		ajax封装
	*/
	//创建ajax
	var oAjax=null;
	if(window.XMLHttpRequest){
		oAjax=new XMLHttpRequest();
		//alert(oAjax);
	}else{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");//ie6专有的
		//alert(oAjax);
	}
	//2.链接服务器
	oAjax.open("GET",url,true);
	//3.发送请求
	oAjax.send();
	//4.接收返回
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				fnSucc(oAjax.responseText);
			}else{
				if(fnFaild){
					fnFaild();
				}
			}
		}
	}
	
}