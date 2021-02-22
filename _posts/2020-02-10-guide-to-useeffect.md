---
layout: post
title: 总结 <code>UseEffect</code> 使用指南
subtitle: "A Guide to useeffect"
author: "Toma"
header-style: text
tags:
  - 笔记
  - React
  - JavaScript
---

> 原文 [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)


## 摘要

如何用 `useEffect` 模拟 `componentDidMount` 生命周期？

虽然可以使用`useEffect(fn, [])`，但它们并不完全相等。
和`componentDidMount`不一样，`useEffect`会捕获 props和state。
所以即便在回调函数里，你拿到的还是初始的props和state。

如何正确地在`useEffect`里请求数据？[]又是什么？

[] 表示effect没有使用任何React数据流里的值，因此该effect仅被调用一次是安全的。[] 同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。你需要学习一些策略（主要是useReducer 和 useCallback）来移除这些effect依赖，而不是错误地忽略它们。

应该把函数当做effect的依赖吗？

一般建议把不依赖props和state的函数提到你的组件外面，并且把那些仅被effect使用的函数放到effect里面。如果这样做了以后，你的effect还是需要用到组件内的函数（包括通过props传进来的函数），可以在定义它们的地方用useCallback包一层。

为什么有时候在effect里拿到的是旧的state或prop呢？

Effect拿到的总是定义它的那次渲染中的props和state。


## Effect 更新

**每一次渲染都有它自己的事件处理函数**  
**每次渲染都有它自己的Effects**

所以下面的两个例子是相等的：

```javascript
function Example(props) {
  useEffect(() => {
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
}

function Example(props) {
  const counter = props.counter;
  useEffect(() => {
    setTimeout(() => {
      console.log(counter);
    }, 1000);
  });
}
```

在组件内什么时候去读取props或者state是无关紧要的。因为它们不会改变。在单次渲染的范围内，props和state始终保持不变。（解构赋值的props使得这一点更明显。）

当然，有时候你可能想在effect的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用refs。

需要注意的是当你想要从过去渲染中的函数里读取未来的props和state，你是在逆潮而动。虽然它并没有错（有时候可能也需要这样做），但它因为打破了默认范式会使代码显得不够“干净”。

```javascript
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
```

在React中去直接修改值看上去有点怪异。然而，在class组件中React正是这样去修改this.state的。不像捕获的props和state，你没法保证在任意一个回调函数中读取的latestCount.current是不变的。根据定义，你可以随时修改它。这就是为什么它不是默认行为，而是需要你主动选择这样做。


## Effect 中的清理

React只会在浏览器绘制后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。上一次的effect会在重新渲染后被清除：

effect的清除并不会读取“最新”的props。它只能读取到定义它的那次渲染中的props值


## 同步，非生命周期

> 我最喜欢React的一点是它统一描述了初始渲染和之后的更新。这降低了你程序的熵。

useEffect使你能够根据props和state同步React tree之外的东西。

```javascript
function Greeting({ name }) {
  useEffect(() => {
    document.title = 'Hello, ' + name;
  });
  return (
    <h1 className="Greeting">
      Hello, {name}
    </h1>
  );
}
```


## 告诉React去比对你的Effects

如果想要避免effects不必要的重复调用，你可以提供给useEffect一个依赖数组参数(deps)：

```javascript
useEffect(() => {
    document.title = 'Hello, ' + name;
}, [name]); // Our deps
```

**关于依赖项不要对React撒谎**

```javascript
function SearchResults() {
  async function fetchData() {
    // ...
  }

  useEffect(() => {
    fetchData();
  }, []); // Is this okay? Not always 

  // ...
}
```

有时候你是这样做了，但可能会引起一个问题。比如，你可能会遇到无限请求的问题，或者socket被频繁创建的问题。解决问题的方法不是移除依赖项。我们会很快了解具体的解决方案。

设置[]为依赖会引入一个bug。React会对比依赖，并且跳过后面的effect


## 两种诚实告知依赖的方法

第一种策略是在依赖中包含所有effect中用到的组件内的值。让我们在依赖中包含

```javascript
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```

第二种策略是修改effect内部的代码以确保它包含的值只会在需要的时候发生变更。我们不想告知错误的依赖 - 我们只是修改effect使得依赖更少。

**让Effects自给自足**

我们想去掉effect的count依赖。  
在这个场景中，我们其实并不需要在effect中使用count。当我们想要根据前一个状态更新状态的时候，我们可以使用setState的函数形式：

```javascript
 useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
}, []);
```

`setCount(count + 1)` 传递了更少的信息，因为它不再被当前的count值“污染”。它只是表达了一种行为（“递增”）。


## 把函数移到Effects里

如果某些函数仅在effect中调用，你可以把它们的定义移到effect中：

```javascript
function SearchResults() {
  // ...
  useEffect(() => {
    // We moved these functions inside!
    function getFetchUrl() {
      return 'https://hn.algolia.com/api/v1/search?query=react';
    }
    async function fetchData() {
      const result = await axios(getFetchUrl());
      setData(result.data);
    }

    fetchData();
  }, []); // ✅ Deps are OK
  // ...
}
```

这么做有什么好处呢？我们不再需要去考虑这些“间接依赖”。我们的依赖数组也不再撒谎：在我们的effect中确实没有再使用组件范围内的任何东西。

你可能不想把getFetchUrl 移到effects中，因为你想复用逻辑。

第一个， 如果一个函数没有使用组件内的任何值，你应该把它提到组件外面去定义，然后就可以自由地在effects中使用

或者， 你也可以把它包装成 `useCallback Hook` :

```javascript
function SearchResults() {
  // ✅ Preserves identity when its own deps are the same
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []);  // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

`useCallback` 本质上是添加了一层依赖检查。它以另一种方式解决了问题 - 我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。

如果我把query添加到useCallback 的依赖中，任何调用了getFetchUrl的effect在query改变后都会重新运行：

```javascript
function SearchResults() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl();
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

因为fetchData只有在Parent的query状态变更时才会改变，所以我们的Child只会在需要的时候才去重新请求数据。

使用 `useCallback`，函数完全可以参与到数据流中。我们可以说如果一个函数的输入改变了，这个函数就改变了。如果没有，函数也不会改变。感谢周到的 `useCallback`，属性比如props.fetchData的改变也会自动传递下去。

类似的，useMemo可以让我们对复杂对象做类似的事情。

```javascript
function ColorPicker() {
  // Doesn't break Child's shallow equality prop check
  // unless the color actually changes.
  const [color, setColor] = useState('pink');
  const style = useMemo(() => ({ color }), [color]);
  return <Child style={style} />;
}
```

到处使用useCallback是件挺笨拙的事。当我们需要将函数传递下去并且函数会在子组件的effect中被调用的时候，useCallback 是很好的技巧且非常有用。

我更倾向于把fetchData放在我的effect里（它可以抽离成一个自定义Hook）或者是从顶层引入。我想让effects保持简单，而在里面调用回调会让事情变得复杂。


## 竞态

经典例子是下面这样的：

```javascript
class Article extends Component {
  state = {
    article: null
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const article = await API.fetchArticle(id);
    this.setState({ article });
  }
  // ...
}
```

有问题的原因是请求结果返回的顺序不能保证一致。比如我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。请求更早但返回更晚的情况会错误地覆盖状态值。

这被叫做 **竞态**，这在混合了async / await（假设在等待结果返回）和自顶向下数据流的代码中非常典型（props和state可能会在async函数调用过程中发生改变）。

Effects并没有神奇地解决这个问题，尽管它会警告你如果你直接传了一个async 函数给effect  
你可以直接在清除函数中取消异步请求。  
或者，最简单的权宜之计是用一个布尔值来跟踪它：

```javascript
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```


## 实践

如何实现一个 useTimeout

```javascript
// 自定义 hook
const useTimeout = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

// 使用样例
const OneSecondTimer = props => {
  const [seconds, setSeconds] = React.useState(0);
  useTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  return <p>{seconds}</p>;
};

ReactDOM.render(<OneSecondTimer />, document.getElementById('root'));
```


## 相关文档

各种指南

- [如何更好的处理错误和加载状态](https://www.robinwieruch.de/react-hooks-fetch-data)
- [如何避免回调函数](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down)
- [usecallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
- [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
