//通过调用匿名函数创建闭包
(function(root,factory,plug){
	factory.call(root,root.jQuery,plug);
})(this,function($,plug){
	//默认规则
	var __RULES__ = {
		"require" : function(){
			return this.val()!="";
		},
		"email" : function(){
			return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.val());
		},
		"mobile" : function(){
			return /^1\d{10}$/.test(this.val());
		},
		"phone" : function(){
			return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.val());
		},
		"regex" : function(){
			return new RegExp(this.data(__CONST__.ABBR+arguments[0])).test(this.val());
		},
		"equal" : function(){
			var eq = $(this.data(__CONST__.ABBR+arguments[0]));
			if(!eq.val())return true;
			if(eq.val()===this.val()){
				eq.parents(".form-group:first").removeClass("has-error").addClass("has-success").find(".help-block").remove();
				return true;
			}else{
				return false;
			}
		}
	};
	//缩写
	var __CONST__ = {
		ABBR : "bv-",
		MESSAGE : "-message"
	};
	//默认参数
	var __DEFS__ = {
		raise : "change",
		errMsg : "* 校验不合法",
		extendRules : function(rule){
			$.extend(__RULES__,rule);
		}
	};

	$.fn[plug] = function(opts){
		if(this.is("form")){
			var _this = this;
			$.extend(this,__DEFS__,opts);//扩展功能和参数
			var $fields = this.find("input,textarea,select,list").not(":button,:submit,:reset");
			$fields.on(this.raise,function(){
				var $field = $(this);
				//初始化状态
				var $group = $field.parents(".form-group:first").removeClass("has-error has-success");
				$group.find(".help-block").remove();
				var result = false;//校验规则
				var message = _this.errMsg;//错误信息
				$.each(__RULES__,function(rule,valid){
					if($field.data(__CONST__.ABBR+rule)){
						result = valid.call($field,rule);
						message = $field.data(__CONST__.ABBR+rule+__CONST__.MESSAGE)||_this.errMsg;
						$group.addClass(result?"has-success":"has-error");
						if(!result){
							$field.after("<span class=\"help-block\">"+message+"</span>");
							if($field.is(":hidden")){
								var index = $field.parents(".tab-pane").index()
								$field.parents(".tab-content").prev().find("a").eq(index).tab('show');
							}
						}
						return result;
					}
				});
			});
			this.on("submit",function(){
				$fields.trigger(_this.raise);//主动触发所有元素的校验
				if($fields.parents(".form-group.has-error").size()==0){
					this.submit();//提交
				}
				return false;
			});
			return this;
		}else{
			throw new Error("目标必须为表单元素")
		}
	}
},"bootstrapValidator");

/***
目前遗留问题：
	1.点击提交没有拦截校验 *
	2.表单元素分块提示
	3.规则无法扩展
	4.插件无法应用到国际上(I18N)
	5.如何解决异步校验的问题
	6.异步表单提交问题
***/