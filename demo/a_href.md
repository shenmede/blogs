链接地址
==

* 在链接中使用相对路径时，路径应为链接路径相对于所属文档所在目录的路径，例如：  
所属文档所在目录为`$ref:{{options.basePath}}`

	```markdown
	[链接](demo/a_href.md)
	```

	解析为：

	```refcode
	<a href="{{options.basePath}}demo/a_href.md">链接</a>
	```

	渲染为：[链接](../demo/a_href.md)

* 在链接地址中使用`ref://`协议，后接mustache模板进行渲染，例如：

	```markdown
	[`$ref:什么是{{demo.who}}？`](ref://http://baidu.apphb.com/?q={{demo.who}})
	```

	解析为：

	```refcode
	<a href="http://baidu.apphb.com/?q={{demo.who}}"><span>什么是{{demo.who}}？</span></a>
	```

	渲染为：[`$ref:什么是{{demo.who}}？`](ref://http://baidu.apphb.com/?q={{demo.who}})
