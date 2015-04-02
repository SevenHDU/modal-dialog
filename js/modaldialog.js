(function ($,window,undefined) {
	
	var defaults = {
		title : '消息提示',//弹出框标题
		content : '',	//弹出框内容
		cssStyle: '',   //样式类
		openFun : null, //窗口弹出调用
		closeFun: null, //窗口关闭调用
		dragAble: true,
		dialogType : 'Popup',
		isLoading : false, //是否带Load效果
		staticLoadingSrc : 'images/loading.gif',
		templateUrl:'',//模板地址
		mask : '<div style="display:none;top:0px;left:0px;background-color:#000;position:absolute;z-index:1000;opacity:0.3;filter:alpha(opacity=30);"><!--[if IE 6]><iframe src="javascript:false;" frameborder="0" style="width:100%;height:100%;display:block;position:absolute;left:0;top:0;z-index:-1;filter:mask();"></iframe><![endif]--></div>' 
	};
		
	var globalParameters = {
		isIE6 : $.browser.msie && parseInt($.browser.version, 10) < 7,
		globalzIndex : 1000,
		cache : []
	};
	
	var Dialog = function (options){
		//扩展参数
		var opts = $.extend({},defaults, options);

		for (var p in opts) { 
			this[p] = opts[p];
		}
		this.dom = $.support.boxModel ? document.documentElement : document.body;
		this.isAbsolute = globalParameters.isIE6 || $.browser.SafariMobile;
		this.dialogBox ={};
		this.init();
	};
	
 	Dialog.prototype = {
		//初始化
		init : function () {
			var that = this;
			//显示遮罩层
			that.showMask();
			that.selectDialogBox();
			//显示弹出层
			that.showDialogBox(); 
			if(that.isLoading){
				that.showLoading();
			}
			if(that.templateUrl){
				$.ajax({
					url:that.templateUrl,
					type:"GET",
					success:function(data){
						that.setContent(data);
						that.setCenter();
					}
				})
			}else {
				that.setContent(that.content);
				that.setCenter();
			}

		},
		//显示遮罩层
		showMask : function (){
			var that = this;
			var $mask = $(that.mask);
			$mask.appendTo('body');
			that.mask = $mask;
			//$mask.bgiframe();
			//遮罩层显示
			$mask.fadeIn().css({
				width: Math.max(978, $(window).width()),
				height: Math.max($(document).height(), $(window).height()),
				top:0,
				left:0,
				zIndex: ++globalParameters.globalzIndex 
			});	
			
			globalParameters.cache.push(that.mask);
		},
		//选择消息框
		selectDialogBox : function (){
			var that = this;
			//弹出层对象
			var $dialogBox = $('.dialog').clone();
			$dialogBox.appendTo('body');
			if(that.cssStyle){
				$dialogBox.addClass(that.cssStyle);
			}
			//$messageBox.uniqueId();
			that.dialogBox = $dialogBox;
			console.log("selectDialogBox:" + that.dialogBox.outerWidth());
		},
		//填充内容
		setContent : function (content){
			var that = this;
			if(content){
				that.dialogBox.find(".dialog-content").html(content);
			}
			else if(that.content){
				that.dialogBox.find(".dialog-content").html(that.content);
			}
			console.log("setContent:" + that.dialogBox.outerWidth());
		},
		//显示消息框
		showDialogBox : function (){
			var that = this;
			var $dialogBox = that.dialogBox;
			$dialogBox.find(".dialog-title").html(that.title);
			//that.setContent();

			//绑定close事件
			$dialogBox.find(".dialog-close").bind('click',function(){
				that.close();
			});
	
			//弹出层显示定位
			$dialogBox.css({
				position: that.isAbsolute ? 'absolute' : 'fixed',//IE6不支持fiexed属性
				left: (that.dom.clientWidth - $dialogBox.outerWidth()) / 2 + (that.isAbsolute ? $(window).scrollLeft() : 0),
				top: (that.dom.clientHeight - $dialogBox.outerHeight()) / 2 + (that.isAbsolute ? $(window).scrollTop() : 0),
				zIndex: ++ globalParameters.globalzIndex 
			}).fadeIn();
			//显示，并调用openFun
			if(typeof that.openFun === 'function'){
				that.openFun();
			}

			console.log("showDialogBox:" + $dialogBox.outerWidth());
			
		},
		//显示loding效果
		showLoading : function(){
			var that = this;
			var title = '正在加载';
			var $dialogContent = that.dialogBox.find(".dialog-content");
			$dialogContent.html($dialogContent.html() + "<input type='hidden' />");
			var htmlString = $dialogContent.html();
			setTimeout(function () {
				if (htmlString == $dialogContent.html()) {
					$dialogContent.show();
					$dialogContent.html("<div style='display:none;'>" + htmlString + "</div><img alt='" + title + "' title='" + title + "' src='" + that.staticLoadingSrc + "' />" + title + "");
				}
			}, 0);
			console.log("showLoading:" + that.dialogBox.outerWidth());
		},
		//关闭消息框和遮罩层
		close : function (){
			var that = this;
			that.dialogBox.fadeOut('slow', function() {
				that.dialogBox.add(that.mask).remove();
			});
			
			//调用clsoeFun函数
			if(typeof that.closeFun === 'function'){
				that.closeFun();
			}
			
			//遮罩层重定位需要用到
			globalParameters.cache.pop();
		},

		//消息框居中
		setCenter : function() {
			var that = this;
			var $dialogBox = that.dialogBox;
			var left= (that.dom.clientWidth - $dialogBox.outerWidth()) / 2 + (that.isAbsolute ? $(window).scrollLeft() : 0);
			var top = (that.dom.clientHeight - $dialogBox.outerHeight()) / 2 + (that.isAbsolute ? $(window).scrollTop() : 0);
			$dialogBox.css({
				position: that.isAbsolute ? 'absolute' : 'fixed',
				left: left,
				top: top
			});
			console.log("setCenter:" + that.dialogBox.outerWidth());
		}
	};
	//遮罩层重定位
	function setMask(){
		var length = globalParameters.cache.length;
		for(var i = 0; i < length; i++){
			var item = globalParameters.cache[i];
			item.css({
				width: Math.max(978, $(window).width()),
				height: Math.max($(document).height(), $(window).height()),
				top:0,
				left:0
			});
		}
	}
	//重置窗口大小时，遮罩层重定位
	$(window).resize(function () {
		
		setTimeout(function () {
			setMask();
		}, 500);
	});
	
	window.Dialog = Dialog;
})(jQuery,window);