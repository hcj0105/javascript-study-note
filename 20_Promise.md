# Promise解决了什么问题
Promise解决了异步代码处理的问题，在以前处理异步代码的时候我们可能需要设计一个函数用来处理异步代码，除了需要传入的参数，还需要传入两个回调方法，一个是执行成功后的回调方法，用于执行成功后执行将的到的结果返回，一个是失败的回调方法，如果执行失败后回调这个失败的回调方法将失败的信息返回。

+ 问题一：需要自己设计一个处理异步函数的方法
+ 问题二：不知道别人设计的异步函数需要怎么样传入参数，没有一个统一的方式，需要去查看别人编写的代码，才可以去使用它。 


# Promise的使用
Promise是一个类，需要通过new的方式创建。创建promise实例对象时，需要传入一个函数，这个函数会被立即执行，被称之为`executor`。

+ 这个函数会被立即执行，并且会传回两个参数，`resolve、reject`两个函数。
+ resolve函数，在Promise执行then方法时传入的回调方法。
+ reject函数，在Promise执行catch方法时传入的回调方法。


# Promise的状态

+ `待定状态（pending）`：意味着，当前既没有被兑现，也没有被拒绝的状态
在执行executor函数中的代码时，处于这个状态
+ `已兑现（fulfilled）`：意味着操作成功
当执行了reslove函数后，Promise处于这个状态
+ `已拒绝（rejected）`：意味着操作失败
当执行reject函数后，Promisse处于这个状态

注: Promise的状态一被确定，就不会被改变，不管你在执行reslove还是reject函数都不会被改变。


# Promise的resolve的值
+ 1. 返回一个普通值，那么Promise的状态由当前Promise决定
+ 2. 返回一个Promise，那么Promise的状态由传入的Promise决定
+ 3. 返回一个对象这个对象里面有then属性并且是一个函数，那么Promise的状态由这个then函数决定


# Promise的then的返回值
Promise的then方法会返回一个新的Promise，会将then方法传入的回调方法的返回值作为结果传给下一个链式调用的then传入的回调函数的参数。

在Promise中由三个状态，那么then方法在执行的时候会返回一个新的Promise，那这个新的Promise处于什么状态呢。
+ 情况一：当执行then中的回调函数时，当前Promise处于pending状态
+ 情况二：当执行then中的回调函数时，返回结果，当前Promise处于fulfilled状态
  * 返回普通值: 将结果传给下一个then传入的回调函数
  * 返回Promise：那么当前返回的这个Promise的状态由返回的这个Promise决定
  * 返回thenable对象：那么当前返回的这个Promise状态由返回的这个对象中的then方法决定
+ 情况三：当执行then中的回调函数时，抛出了一个异常，当前Promise处于reject


# Promise的catch的返回值
Promise的catch方法也会返回一个Promise。Promise的catch的中的回调函数执行后，当前返回的Promise的状态默认为fulfilled，所以可以直接在后面继续调用then方法。Promise的catch方法会捕获最近一个Promise错误，而不是当前Promise的错误。如果想继续执行catch的话，可以抛出一个错误。


# Promise的类方法

## resolve
当你想让某个结果变成Promise的方式，可以直接调用Promise.resolve方法将结果传入。
```JavaScript
Promise.resolve('Hello Word')
// 相当于
new Promise((resolve) => {
  resolve('Hello World')
})
```

## reject
```JavaScript
Promise.reject('error')
// 相当于
new Promise((_, reject) => {
  reject('error')
})
```

## all
Promise.all方法是将多个Promise变成一个Promise，这个新的Promise的状态是根据传入所有的Promise的状态来决定的，当一个Promise状态为rejected时，那么这个新的Promise状态就会变为rejected状态。当所有的Promise状态为fulfailled状态，那么他会将所有的Promise返回的结果变成一个数组返回给新的Promise.then的回调函数中作为参数.
```JavaScript 
const p1 = new Promise((resolve) => {
  resolve('p1 resolve')
})

const p2 = new Promise((resolve) => {
  resolve('p2 resolve')
})

const p3 = new Promise((resolve) => {
  resolve('p3 resolve')
})

Promise
  .all([p1, p2, p3])
  .then(res => {
    console.log('res:', res) // ['p1 resolve', 'p2 resolve', 'p3 resolve']
  })
```

## allSettled
Promise.allSettled方法的Promise状态一定是fulfilled状态，并且将所有的Promise的结果返回，不管是reject的结果还是resolve的结果
```JavaScript
const p1 = new Promise((_, reject) => {
  reject('p1 error')
})

const p2 = new Promise((resolve) => {
  resolve('p2 resolve')
})

const p3 = new Promise((resolve) => {
  resolve('p3 resolve')
})

Promise
  .allSettled([p1, p2, p3])
  .then(res => {
    // [{ status: 'rejected': reson:''p1 error'' }, { status: 'fulfilled, value: 'p2 resolve' }, { status: 'fulfilled, value: 'p3 resolve' }]
    console.log('res:', res) 
  })
```

## race
让多个Promise进行竞争,只要有一个Promise有结果就先用那个Promise的结果,不论这个Promise是什么状态都使用当前状态
```JavaScript
const p1 = new Promise((resolve) => {
  resolve('p1 resolve')
})

const p2 = new Promise((resolve) => {
  resolve('p2 resolve')
})

const p3 = new Promise((resolve) => {
  resolve('p3 resolve')
})

Promise
  .race([p1, p2, p3])
  .then(res => {
    console.log('res:', res) // p1 resolve
  })
```

## any
会等到第一个Promise的状态为fulfilled状态时,才使用当前的Promise的状态结果.
```JavaScript
const p1 = new Promise((_, reject) => {
  reject('p1 error')
})

const p2 = new Promise((_, reject) => {
  reject('p2 error')
})

const p3 = new Promise((resolve, reject) => {
  resolve('p3 resolve')
})

Promise
  .any([p1, p2, p3])
  .then(res => {
    console.log('res:', res) // p3 resolve
  })
```