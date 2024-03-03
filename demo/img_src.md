图片地址
==

* 在图片链接中使用相对路径时，路径应为图片路径相对于所属文档所在目录的路径，例如：
	所属文档所在目录为`$ref:{{options.basePath}}`

	```markdown
	![](../resource/demo/example_img.png)
	```

	解析为：

	```refcode
	<img src="{{options.basePath}}../resource/demo/example_img.png"/>
	```

	渲染为：

	![](../resource/demo/example_img.png)

* 在图片链接中使用`ref://`协议，后接mustache模板进行渲染，例如：

	```markdown
	![](ref://../resource/demo/{{demo.image}})
	```

	解析为：

	```refcode
	<img src="../resource/demo/{{demo.image}}"/>
	```

	渲染为：

	![](ref://../resource/demo/{{demo.image}})
