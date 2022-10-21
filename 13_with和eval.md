# with语句(不推荐使用)

with用于扩展一个作用域。

缺点: 
+ 容易混淆错误
+ 兼容性差

```JavaScript 

var obj = {
  message: 'Hello Word'
}


with(obj) {
  console.log(message) // Hello Word
}

```

# eval函数(不推荐使用)
+ eval是一个特殊的函数，它可以将传入的字符串当做JavaScript代码来运行；
+ eval会将最后一句执行语句的结果，作为返回值；

缺点: 
+ eval代码的可读性非常的差（代码的可读性是高质量代码的重要原则）；
+ eval是一个字符串，那么有可能在执行的过程中被刻意篡改，那么可能会造成被攻击的风险；
+ eval的执行必须经过JavaScript解释器，不能被JavaScript引擎优化；