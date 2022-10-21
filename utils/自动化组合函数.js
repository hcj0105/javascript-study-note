// 自动化组合函数
function compose(...fns) {
  // edge case
  var length = fns.length;
  // 判断如果没有参数直接返回
  if (length <= 0) return;
  // 循环判断传进来的参数是否是一个函数
  for (var i = 0; i < length; i++) {
    var fn = fns[i];
    if (typeof fn !== "function") {
      throw new Error(`index position ${i} is not a function`);
    }
  }

  return function (...args) {
    // 因为第一个调用的方法参数不太确定所以需要先执行，之后执行的方法都是一个参数。
    var result = fns[0].apply(this, args); // 获取到返回值
    // 循环调用传递进来的方法。
    for (var i = 1; i < length; i++) {
      result = fns[i].apply(this, [result]);
    }
    return result;
  };
}
