// 自动柯里化函数
function curring(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      // 根据传递给参数的个数判断是否执行传递来的函数
      // return fn(...args)
      return fn.apply(this, args);
    } else {
      // 不可以直接递归调用curried函数，需要返回一个函数接收剩下的参数，之后再这个函数中去调用currid
      // 这样做是为了能够通过闭包的形式获取到上次的参数然后跟下次获取到的参数进行一个拼接累加。否则无法接收到下次的参数。
      return function (...newArgs) {
        // return curried(...args.concat(newArgs))
        return curried.apply(this, args.concat(newArgs));
      };
    }
  }

  return curried;
}
