$(function(){
	$("#btn").click(function(){
		var dialog = $.Dialog({
			content:"<p>Hello, world</p>"
		});
	});

	$("#logBtn").bind("click",function(){
		var loginDialog = $.Dialog({
			title:"登陆",
			templateUrl:"template/login.html"
		})
	});

	$("#mutiBtn").bind("click", function(){
		var fDialog = $.Dialog({
			title:"弹出框1",
			content:"<button id='subBtn'>Click</button>"
		});
	});

	$("#subBtn").live("click",function(){
		var sDialog = $.Dialog({
			title:"弹出框2",
			content:"嘿嘿"
		})
	});

	$("#loadingBtn").bind("click",function(){
		var lDialog = $.Dialog({
			title:"Loading效果",
			isLoading: true
		});
	});
		
})
