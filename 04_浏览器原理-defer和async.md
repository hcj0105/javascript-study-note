# 浏览器本身对遇到javascript时的优化
浏览器从上向下解析HTML页面，会构建DOM树，在遇到JavaScript时就会停止构建DOM树，浏览器会等待JavaScript加载并执行完后继续构建DOM树，这时候浏览器会做出一些优化，他会把已经构建好的DOM树先渲染出来，等JavaScript执行完后，剩下构建完成的DOM树在继续渲染出来。

+ 下载需要很长的时间
+ 执行也需要很长的时间
+ js代码下面的HTML元素将不会继续构建DOM Tree
  
# defer
defer属性会告诉浏览器`不要等待脚本下载`,而`继续构建HTML、构建DOM Tree`
+ 脚本`会由浏览器来进行下载，但是不会阻塞DOM Tree`的构建过程
+ 如果脚本提前下载好了，它会`等待DOM Tree构建完成，在DOMContentLoaded事件之前先执行defer中的代码` 
  
提问?

为什么defer中的代码会在`DOMContentLoaded`事件之前执行？因为defer中的代码可能会存在dom操作，dom会更新就不算dom加载完成。


总结: 

+ 总结一: script元素加上defer之后，js文件的下载和执行，不会影响后面的`DOM Tree`的内容
+ 总结二: 在加了defer的script中的js代码，是可以操作dom元素的，因为defer是在DOM Tree构建完成后执行的
+ 总结三: defer代码是在DOMContentLoaded事件发出之前执行。
+ 总结四: 有多个defer属性的js脚本是可以保持正确的顺序执行的。

注: 
+ 从某种程度上，defer可以提高页面的性能，并且推荐把defer脚本放在hend元素中。
+ defer只适用于外部脚本，对于script默认内容会被忽略。


# async
async特性于defer有些类似，它也能够让脚本不阻塞页面。

async是让一个脚本完全独立的。
+ 浏览器`不会因为async脚本而阻塞`(与defer类似)
+ `async脚本不能保证顺序，它是独立下载、独立运行、不会等待其他脚本`(下载完就直接执行)
+ `async不能保证在DOMContentLoaded事件之前或者之后执行`


# defer与async区别
defer通常用于需要在文档解析后操作DOM的JavaScript代码，并且对多个script文件有顺序要求的。

async通常用于独立的脚本，对其他脚本，甚至DOM没有依赖