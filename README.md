## modaldialog.js ##
modaldialog.js基于jQuery开发的插件。

## Feature ##
- 支持多弹出层
- 兼容主流浏览器，包括IE6

## Demo ##
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
