function hExec(thisArg, args) {
  // this -> 当前函数（隐式调用）-> 直接this()可以调用当前的方法
  // thisArg -> 当前函数绑定的this

  // 通过一个对象来实现隐式绑定（隐式绑定遇到null、undefined，this指向window）
  thisArg = (thisArg == null || thisArg === undefined) ? window : Object(thisArg);
  Object.defineProperty(thisArg, "fn", {
    configurable: false,
    writable: true,
    enumerable: false,
    value: this,
  });

  args = args || []

  // 通过隐式调用的方法来绑定当前函数指定的this
  var result = thisArg.fn(...args);

  delete thisArg.fn;

  return result
}

// apply绑定指定的this，接收一个数组（参数），并调用
function hApply(thisArg, args) {
  return this.hExec(thisArg, args);
}

// call绑定指定的this，接收多个参数，并调用
function hCall(thisArg, ...args) {
  return this.hExec(thisArg, args);
}

// bind是绑定this、参数，并返回一个绑定新的this和参数的新的函数
function hBind(thisArg, ...args) {
  // this -> 当前函数（隐式调用)
  // function 中的this是在调用时决定，所以使用箭头函数获取到外层的this也就是当前使用bind调用的函数
  return (...otherArgs) => {

    thisArg = (thisArg == null || thisArg === undefined) ? window : Object(thisArg);
    Object.defineProperty(thisArg, "fn", {
      configurable: false,
      writable: true,
      enumerable: false,
      value: this,
    });
    
    var argArrary = [...args, ...otherArgs]
    
    thisArg.fn(...argArrary)
  };
}
