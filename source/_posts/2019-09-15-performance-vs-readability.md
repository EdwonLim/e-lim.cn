title: 【译】JavaScript 中的性能和可读性
date: 2019-09-15 18:00:00
category: 潮流技术
tags: [性能]
thumbnailImage: https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqbxvbbuj30sg0lcte2.jpg
thumbnailImagePosition: right

JavaScript  已经发展成为一种更易读的语言。毫无疑问，这对这门语言的发展是毫无害处的。

而软件开发始终是在一个团队不断变化的动态环境中的，这意味着现有代码对于团队新手来说是需要可读的。但是，可读性必须是以性能为代价的吗？在哪里划分性能和可读性之间的界限？什么时候牺牲一个来追求另一个？是否需要在某些时候牺牲其中一个？

在下面，笔者准备回答上述的一些问题？或者帮大家试图一起去理解。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqbxvbbuj30sg0lcte2.jpg)

还有一个问题是，大家尝试在代码中实现高性能的原因是显而易见的，但是，为什么也如此沉迷于可读性呢？

##  同样的问题，不同的解决方案

下面，我们来看一个很常见的问题：

> 给定一组无序数字，返回一个新数组，为每个值加 1 并对其进行排序，同时不改变原始数组的数据。

var numbers = [2, 4, 12, 6, 8, 29, 5, 10, 87, 11, 7];

function process(arr) {
    let newArr = arr.slice();
    newArr[0]++;
    for (let i = 1; i < newArr.length; i++) {
        const current = newArr[i] + 1;
        let leftIndex = i - 1;

        while (leftIndex >= 0 && newArr[leftIndex] > current) {
            newArr[leftIndex + 1] = newArr[leftIndex];
            leftIndex = leftIndex - 1;
        }
        newArr[leftIndex + 1] = current;
    }
    return newArr;
}

const newArray = process(numbers);

（笔者使用插入排序，只是因为它比较容易实现）

这个代码示例并不是真正可读的，但是，性能更高，比可读的 ES6 代码更高效。例如这个：

const process = (arr) => arr
    .map(num => num + 1)
    .sort((a, b) => a - b);

const newArray = process(numbers);

事实上，第一个代码示例比第二个代码示例快约 75％，即使第二个代码示例更具可读性，甚至可以简化为单行代码：

const newArray = numbers.map(num => num + 1).sort((a, b) => a - b);

或者使用辅助函数拆分以获得更好的可读性：

const addOne = (n) => n + 1;
const asc = (a, b) => a - b;
const newArray = numbers.map(addOne).sort(asc);

很明显，ES6 示例（无论采用何种方法）都更具可读性，使代码更容易理解。 采用可读代码，团队可以更快地向项目中引入新的开发人员，也可以更轻松地共享代码，并使其更易于维护。

考虑到全部因素，在大多数情况下，性能变得并非那么重要。这就是 ES6 以这种方式发展的原因。

两种方法之间的最终比较：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqcckjgaj30jb0csgm1.jpg)

在这一点上，你可能会问：“*还有什么不那么高效，但更具可读性的代码？*”

好吧，下面让我们一起看看一些主要的用例。

### Spread 语法 vs Object.assign()

来看下面这个简单问题：

> 复制对象并向副本添加新属性

解决方案：

const params = {...}; // filled Object

// ES6 - Spread syntax
var copy1 = { a: 2, ...params };

// Object.assign()
var copy2 = Object.assign({}, { a: 2 }, params);

这两种方法都可以完成这项工作，但** Spread 语法更易读，即使速度慢约 54％**。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqclypmdj30nf0cs74w.jpg)

### 关于循环和 Reduce

问题：

> 求和数组的所有值

解决方案，从经典的 **for ... loop** 开始：

const numbers = [2, 4, 12, 6, 8, 29, 5, 10, 87, 11, 7];

function arraySum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}

const sumOfNumbers = arraySum(numbers);

现在使用 Reduce：

const numbers = [2, 4, 12, 6, 8, 29, 5, 10, 87, 11, 7];

const add = (a, b) => a + b;
const arraySum = (arr) => arr.reduce(add);

const sumOfNumbers = arraySum(numbers);

在这种情况下，从性能的角度来看，**降低是非常明显的，速度要慢约 96％！**

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqcuxn64j30jx0cxdg9.jpg)


### For vs While vs Do while

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g7gqd44cfej30mx0cxaaw.jpg)

差异非常不明显，但是，如果非要有结论的话，请继续使用经典的 for 循环。

## 什么时候用什么

哇！ 现在很多可读性的编码方式很受欢迎。笔者正在使用 spread 语法，reduce 等等来完成所有逻辑！

这里的情绪有点令人沮丧，他们承诺可读性而没有性能成本的！但事实并非如此。

这里不要惊慌失措，来分析下当前的情况。 那么，“*我什么时候用？*”

上述问题的答案比实际预期的要容易：**取决于项目情况**。

回到第一个例子，如果必须：复制，添加和排序中小数据量的数组或对象，那么为了可读性，我们将使用 ES6 武器库中的所有可用玩具。

事实上，几乎所有代码都可以在编写时將重点放在可读性而不是性能上，但具体执行要取决于项目情况。

我们试着把这些情况放在列表中来展示。

### 何时优先考虑可读性

* 当我们处理的数据量不是很大时
* 当应用程序在速度，负载等方面正确运行时
* 在具有许多项目新手的动态环境中工作时
* 在编写人们可能必须阅读和理解的库或插件时

### 何时优先考虑性能

* 在处理大数据时
* 当应用程序运行缓慢或存在其他性能问题时
* 当项目意图可扩展时
* 在个人项目中工作时，可以使用自己想要的高性能代码

因此，如果我们处理大数据，请避免在专门处理该对象或数组的代码部分中使用 reduce，filter，map，spread 语法等。

## 结论

我们应该退后一步来看，分析选选择的方式是否让项目和用例变得更方便，而不是伏先选择最新和最酷的东西。

毫无疑问，新的 ES6 功能是让人幸福的，在日常JavaScript 编码中产生很多乐趣，但如果正在努力提高性能，或者处理大量数据，这对应该重新考虑正在使用的那些工具。

对于繁重的工作，笔者会寻求一个不太可读的代码，但性能更高。💪

对于大量数据，笔者会去研究和实现最适合该任务的高性能算法。 💪👓

对于所有其他情况，笔者选择了 ES6 这个可读的小可爱 ！！❤

## 声明

在不同的浏览器、操作系统和服务器工作负载的情形下，此帖子中显示的测试结果可能略有不同。
