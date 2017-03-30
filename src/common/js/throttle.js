
/*
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn {function}  需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */
var throttle = function (fn, delay, immediate, debounce) {
  var curr = +new Date(),//当前事件
      last_call = 0,
      last_exec = 0,
      timer = null,
      diff, //时间差
      context,//上下文
      args,
      exec = function () {
        last_exec = curr;
        fn.apply(context, args);
      };
  return function () {
    curr= +new Date();
    context = this,
        args = arguments,
        diff = curr - (debounce ? last_call : last_exec) - delay;
    clearTimeout(timer);
    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay);
      } else if (diff >= 0) {
        exec();
      }
    } else {
      if (diff >= 0) {
        exec();
      } else if (immediate) {
        timer = setTimeout(exec, -diff);
      }
    }
    last_call = curr;
  }
};

/*
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
 * @param fn {function}  要调用的函数
 * @param delay   {number}    空闲时间
 * @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
 * @return {function}实际调用函数
 */
var debounce = function (fn, delay, immediate) {
  return throttle(fn, delay, immediate, true);
};



let timer = null

// 简单的截断
const v_throttle = function (fn, ctx, arg) {
  clearTimeout(timer)
  timer = setTimeout(() => fn.call(ctx, arg), 100)
}

/**
 * 连续调用时 每间隔 delay 毫秒 调用一次
 * @param fn 被调用的函数
 * @param delay 间隔时间
 * @param ctx 上下文
 * @param arg 参数
 */
const v_debounce = function (fn, delay, ctx, arg) {
  if (timer) {
    return
  }
  fn.call(ctx, arg)
  timer = setTimeout(() => {
    timer = null
  }, delay)
}


export default v_debounce;