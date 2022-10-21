




# script元素和页面解析的关系

## 浏览器解析页面时碰到javascript代码的处理

+ 事实上，浏览器再解析HTML的过程中，遇到`script元素是不能继续构建DOM树`的
+ 它会`停止继续构建，首先下载JavaScript代码，并执行JavaScript的脚本`
+ 只有`等到JavaScript脚本执行结束后，才会继续解析HTML，构建DOM树`

浏览器从上向下解析页面的时候，碰到script标签，浏览器会停止对html的解析，会先解析完script标签中的js代码并执行完成后才会继续解析script标签之后的html元素(如果是通过src属性引入js代码的话,浏览器会等待js的下载完成并执行完js代码后再解析之后的html元素)。

## 为什么要这样做？

+ 这是`因为JavaScript的作用之一就是操作DOM，并且可以修改DOM`
+ 如果我们`等到DOM树构建完成后并且渲染再执行JavaScript，会造成严重的回流和重绘，影响页面的性能`
+ 所以会在`遇到script元素时，优先下载和执行JavaScript代码，再继续构建DOM树`

## 带来的问题？
+ 在目前的开发模式中(比如Vue、React)，`脚本往往比HTML页面更"重"，处理时间需要更长`。因为在现代开发模式中，HTML元素中可能只有一个根元素，剩下的都是JavaScript代码，所以往往js代码比HTML页面更重。
+ 所以会`造成页面的解析阻塞，在脚本下载、执行完成之前，用户在界面上什么都看不到`

## 解决方法
为了解决这个问题，script元素给我们提供了两个属性(attribute): `defer和async`。



