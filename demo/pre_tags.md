文本样式
==

* __细体__ ：HTML样本元素（`$prettify(html):<samp>`）用于标识计算机程序输出，通常使用浏览器缺省的monotype字体（例如 Lucida Console）。  
在行内代码块使用`$origin:$samp:`前缀添加HTML样本元素，例如：  
`$origin:$samp:细体`文本渲染为：`$samp:细体`文本。
* __粗体__ ：HTML加重元素（`$prettify(html):<strong>`）表示文本十分重要，一般用粗体显示。  
在行内代码块使用`$origin:$b:`或者`$origin:$strong:`前缀添加加重元素，这等价于Markdown的`$prettify(markdown):__加重__`语法，例如：  
`$origin:$b:粗体`文本渲染为：`$b:粗体`文本。
* __斜体__ ：HTML着重元素（`$prettify(html):<em>`）标记出需要用户着重阅读的内容，一般用斜体显示。  
在行内代码块使用`$origin:$i:`或者`$origin:$em:`前缀添加HTML着重元素，这等价于Markdown的`$prettify(markdown):_强调_`语法，例如：  
`$origin:$i:斜体`文本渲染为：`$i:斜体`文本。
* __下划线__ ：HTML添加元素（`$prettify(html):<ins>`）定义已经被插入文档中的文本，一般用下划线表示。  
在行内代码块使用`$origin:$u:`或者`$origin:$ins:`前缀添加HTML添加元素，例如：  
`$origin:$u:下划线`文本渲染为：`$u:下划线`文本。
* __删节线__ ：HTML删除元素（`$prettify(html):<del>`）定义已经被插入文档中的文本，一般用删节线表示。  
在行内代码块使用`$origin:$s:`或者`$origin:$del:`前缀添加HTML删除元素，这等价于Markdown的`$prettify(markdown):~~删除~~`语法，例如：  
`$origin:$s:删节线`文本渲染为：`$s:删节线`文本。
* __高亮__ ：HTML标记元素（`$prettify(html):<mark>`）表示为引用或符号目的而标记或突出显示的文本，这是由于标记的段落在封闭上下文中的相关性或重要性造成的。  
在行内代码块使用`$origin:$mark:`前缀添加HTML标记元素，例如：  
`$origin:$mark:高亮`文本渲染为：`$mark:高亮`文本。
* __反色__ ：HTML键盘输入元素（`$prettify(html):<kbd>`）用于表示用户输入，它将产生一个行内元素，以浏览器的默认monospace字体显示。  
在行内代码块使用`$origin:$kbd:`前缀添加HTML键盘输入元素，例如：  
`$origin:$kbd:Ctrl` + `$origin:$kbd:S`渲染为：`$kbd:Ctrl` + `$kbd:S`。
* __小号__ ：HTML小号元素（`$prettify(html):<small>`）用于使文本的字体变小一号（例如从大变成中等，从中等变成小，从小变成超小）。  
在行内代码块使用`$origin:$small:`前缀添加HTML小号元素，例如：  
`$origin:$small:小号`文本渲染为：`$small:小号`文本。
* __上标__ ：HTML上标元素（`$prettify(html):<sup>`）用于定义文本区域，与主要的文本相比，应该展示得更高并且更小。  
在行内代码块使用`$origin:$sup:`前缀添加HTML小号上标元素，例如：  
`$origin:$sup:上标`文本渲染为：`$sup:上标`文本。
* __下标__ ：HTML下标元素（`$prettify(html):<sub>`）用于定义文本区域，与主要的文本相比，应该展示得更低并且更小。  
在行内代码块使用`$origin:$sub:`前缀添加HTML小号下标元素，例如：  
`$origin:$sub:下标`文本渲染为：`$sub:下标`文本。
* __颜色__ ：在行内代码块使用`$origin:$color(颜色):`前缀指示文本颜色，例如：  
`$origin:$color(green):绿色`文本渲染为：`$color(green):绿色`文本。
* __缩写__ ：HTML缩写元素（`$prettify(html):<abbr>`）用于代表缩写，并且可以通过可选的title属性提供完整的描述。  
在行内代码块使用`$origin:$abbr([描述，可选]):`前缀添加缩写元素，例如：  
`$origin:$abbr(World Health Organization):WHO`渲染为：`$abbr(World Health Organization):WHO`。
