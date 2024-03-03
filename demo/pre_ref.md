引用变量
==

* 使用[mustache.js](https://github.com/janl/mustache.js)模板引擎进行引用渲染，mustache模板语法参见[mustache 5](http://mustache.github.io/mustache.5.html)。
* 在行内代码块中使用`$origin:$ref:`指令，后接mustache模板进行渲染，例如：`$origin:$ref:Hello {{demo.who}}!`将被渲染为`$ref:Hello {{demo.who}}`。
* 在行间代码块中使用`ref`语言指示，后接mustache模板进行渲染，例如：

	```origin
	ref
	Hello {{demo.who}}!
	```

	将被渲染为：

	```ref
	Hello {{demo.who}}!
	```

* __危险！__ 这是一个很危险的操作，但是可以使用三对大括号对Markdown文档结构进行引用渲染。此功能可能对Markdown文档结构造成破坏，但有时候不得不使用它💩！例如：

{{{=<% %>=}}}
	```markdown
	|姓名|描述|
	|-|-|
	{{{#demo.names}}}
	|{{{.}}}|{{{.}}}是个好人|
	{{{/demo.names}}}{{{^demo.names}}}
	|未定义demo.names|请在`reference.js`中定义`demo.names`变量|
	{{{/demo.names}}}
	```
<%={{{ }}}=%>
	将被渲染为：
	|姓名|描述|
	|-|-|
	{{{#demo.names}}}
	|{{{.}}}|{{{.}}}是个好人|
	{{{/demo.names}}}{{{^demo.names}}}
	|未定义demo.names|请在`reference.js`中定义`demo.names`变量|
	{{{/demo.names}}}
