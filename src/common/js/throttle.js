let timer = null

// 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
const debounce = function (fn, ctx, arg) {
  clearTimeout(timer)
  timer = setTimeout(() => fn.call(ctx, arg), 100)
}

/**
 * 连续调用时 每间隔 delay 毫秒 调用一次
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn 被调用的函数
 * @param delay 间隔时间
 * @param ctx 上下文
 * @param arg 参数
 */
const throttle = function (fn, delay = 100, ctx, ...args) {
  if (timer) {
    return
  }
  fn.apply(ctx, args)
  timer = setTimeout(() => {
    timer = null
  }, delay)
}


export default throttle;