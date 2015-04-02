$(function(){
	$("#btn").click(function(){
		var dialog = new Dialog({
			content:"<p>Hello, world</p>"
		});
	});

	$("#logBtn").bind("click",function(){
		var loginDialog = new Dialog({
			title:"登陆",
			templateUrl:"template/login.html"
		})
	});

	$("#mutiBtn").bind("click", function(){
		var fDialog = new Dialog({
			title:"弹出框1",
			content:"<p>Hello, boy</p><p>Hello, girl</p><button id='subBtn'>Click</button>"
		});
	});

	$("#subBtn").live("click",function(){
		var sDialog = new Dialog({
			title:"弹出框2",
			content:"<p>嘿嘿</p><p>哈哈</p>",
			cssStyle:"w200"
		})
	});

	$("#loadingBtn").bind("click",function(){
		var lDialog = new Dialog({
			title:"Loading效果",
			isLoading: true
		});
	});
		
})
