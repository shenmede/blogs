公式渲染
==

* 使用[KaTeX](https://katex.org/)引擎对LaTeX公式进行渲染，LaTeX语法参见[LaTeX](https://www.latex-project.org/help/documentation/)文档。
* 在行内代码块使用：`$origin:$latex:`指令，后接LaTeX公式进行渲染，例如：`$origin:$latex:c=\pm\sqrt{a^2 + b^2}`将被渲染为`$latex:c=\pm\sqrt{a^2 + b^2}`。
* 在行间代码块中使用`latex`语言指示，后接LaTeX公式进行渲染，例如：

	```origin
	latex
	c=\pm\sqrt{a^2 + b^2} \\
	d=\pm\sqrt{c^2 + b^2}
	```

	将被渲染为：

	```latex
	c=\pm\sqrt{a^2 + b^2} \\
	d=\pm\sqrt{c^2 + b^2}
	```
