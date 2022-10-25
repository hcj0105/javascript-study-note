# 异步函数的返回值和异常
返回值: 
+ 异步函数的返回值会被`Promise.resolve包裹后，再返回`。返回值的类型也有三种，跟Promise的返回值是一样的。

异常： 
+ 异步函数再执行代码的过程中如果出现了异常，那么异步函数会将异常使用`Promise.reject`包裹后，再返回。


# await
await关键字只能在异步函数中使用。

## await关键字特点
+ 使用await通常后面会`跟一个表达式`，这个`表达式会返回一个Promise`
+ await会等到`Promise的状态变成fulfilled状态的时候才会继续执行后续的代码`。

注: 在等待Promise的结果的时候，如果是reject状态的话，那么异步函数就会把错误抛出。