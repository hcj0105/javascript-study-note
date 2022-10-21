 // 原型式函数
 function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}

// 寄生组合函数
function inherit(Subtype, Supertype) {
  var obj = createObj(Supertype.prototype)
  Subtype.prototype = obj
  Object.defineProperty(obj, 'constructor', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: Subtype
  })
}