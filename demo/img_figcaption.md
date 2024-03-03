图片标题
==

* 在图片替代文本中使用`$figcaption([图题，可选]):`前缀定义图片的标题（默认为替代文本），例如：

	```markdown
	![$figcaption:綾波レイ](../resource/demo/example_img.png)
	```

	渲染为：

	![$figcaption:綾波レイ](../resource/demo/example_img.png)

* 在图片标题中亦可使用mustache模板进行渲染，例如：

	```markdown
	![$figcaption:綾波レイ & {{demo.who}}](../resource/demo/example_img.png)
	```

	渲染为：
	![$figcaption:綾波レイ & {{demo.who}}](../resource/demo/example_img.png)
