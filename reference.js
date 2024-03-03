(function(global, factory) {
	if (typeof exports === "object" && typeof module === "object")
		module.exports = factory();
	else if (typeof define === "function" && define.amd)
		define(factory);
	else {
		global = global || self;
		global.referenceConfig = factory();
	}
})(this, function() {
	return {
		// 主题
		theme : "simplex",
		// 主题亮度
		brightness : "light",
		// 引用
		references : {
			// 样例
			demo : {
				// 作者
				who : "Zwieback",
				// 成员
				names : [
					"Persimmon NGP 项目",
					"什么的已经够了啦"
				],
				// 图片
				image : "example_img.png"
			}
		}
	};
});