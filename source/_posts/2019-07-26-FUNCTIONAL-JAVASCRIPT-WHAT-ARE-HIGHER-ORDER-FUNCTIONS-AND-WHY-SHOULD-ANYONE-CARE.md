title: 【译】函数式 JavaScript：大家所关心的高阶函数
date: 2019-07-26 18:00:00
category: 潮流技术
tags: [函数式编程]
thumbnailImage: https://tva1.sinaimg.cn/large/006y8mN6ly1g6nt4rt1prj30je0b43yo.jpg

---

原文：[FUNCTIONAL JAVASCRIPT: WHAT ARE HIGHER-ORDER FUNCTIONS, AND WHY SHOULD ANYONE CARE?](https://jrsinclair.com/articles/2019/what-is-a-higher-order-function-and-why-should-anyone-care/)

## 译者序：

当前，面向对象语言盛行，很多人觉得函数式编程只存在于一些偏门语言中，并在特定的需求下使用。现在很多语言都引入了函数式编程的特性，并吸纳其优点，如我们最熟悉的 JDK，JSDK8 已经引入了函数式编程的一些特性。而对于前端开发者而言，函数式编程看似遥远，其实很近。

JavaScript 天然支持高阶函数和闭包，其实已经让函数式编程融入到平时的工作中。哪怕没听过函数式编程的人，也都使用过函数式编程的方式。

<!-- more -->

广义地说，所有 Callback 类的调用，例如 DOM 件的监听、数组方法（forEach、Map）等的使用，都属于函数式编程的范畴。

这篇文章，立足于 JavaScript 中的函数，为大家剖析函数式编程里最重要的高阶函数，让读者可以对 JavaScript 中的函数式编程有一定的了解。

## 正文

“高阶函数”是人们抛出的一个概念，但是大家很难解释清楚它意味着什么？也许你已经知道什么是高阶函数，但是你并不清楚如何在现实中使用？什么情况下使用？使用后产生什么效果？甚至说，使用了高阶函数以后，得到了什么好处？是否值得炫耀？反过来，是否会因为烂用它们造成代码复杂度上升？

我个人恰好认为高阶函数是非常有用的，而事实上，我认为它们是 JavaScript 作为一种语言最重要的特性之一，而上面的问题，将在文中一一解答。 

但在开始之前，让我们先来深入分析一下高阶函数。 为此，文章将从“把函数赋值给变量”开始。

### 函数作为“一等公民”

在 Javascript 中，我们至少有三种方式编写一个函数。首先，可以编写一个函数声明，示例如下。
```js
// 拿到一个 Dom 对象，并放在 li 节点里。
function itemise(el) {
    const li = document.createElement('li');
    li.appendChild(el);
    return li;
}
```

这种方式大家应该很熟悉。 当然，也可以将其改写为函数表达式。 结果如下：
```js
const itemise = function(el) {
    const li = document.createElement('li');
    li.appendChild(el);
    return li;
}
```

还有另一种方法来编写相同的函数，这种方式被称为箭头函数：
```js
const itemise = (el) => {
    const li = document.createElement('li');
    li.appendChild(el);
    return li;
}
```

就目的而言，上面的三个方式实现的功能基本相同。 但请注意，最后两个示例将函数赋值给变量。看起来并没有什么不同，但是不一定所有编程语言都可以把函数赋值给变量，这是一个伟大的特性。JavaScript 中的函数是“一等公民”。 也就是说，我们可以：
- 将函数赋值给变量;
- 将函数作为参数传递给其他函数; 
- 从其他函数返回函数。

以上看起来不错，但与高阶函数有什么关系呢？我们先来看上面所列的后两点。先给出“将函数作为参数传递给其他函数”的例子，我们编写一个可以与DOM 元素一起使用的函数。 如果运行 `document.querySelectorAll()`，我们会得到一个 NodeList 而不是一个数组。NodeList 没有像数组那样的 `.map()` 方法，所以写一个：
```js
// 将给定函数应用于 NodeList 中的每个项目并返回一个数组。
function elListMap(transform, list) {
    // list 可能是 NodeList，它没有 .map()，所以我们转换它变为一个数组。
    return [...list].map(transform);
}
​
// 使用 “for-listing” 类抓取页面上的所有 span。
const mySpans = document.querySelectorAll('span.for-listing');
​
// 将每个包裹在 <li> 元素中。这里，我们重新使用了之前的 itemise() 函数。
const wrappedList = elListMap(itemise, mySpans);
```

在这个例子中，我们将 `itemise` 函数作为参数传递给 `elListMap` 函数。 但是可以使用 `elListMap` 函数来创建列表。 例如，可以使用它将类添加到一组元素中。

```js
function addSpinnerClass(el) {
    el.classList.add('spinner');
    return el;
}
​
// 找到 'loader' 类的所有 button。
const loadButtons = document.querySelectorAll('button.loader');
​
// 将 spinner 类添加到我们找到的所有 button 上。
elListMap(addSpinnerClass, loadButtons);
```

`elLlistMap` 函数将一个函数作为参数进行转换。 这意味着可以重用 `elListMap` 函数来完成一堆不同的任务。

现在已经看到了将函数作为参数传递的示例。 但是从函数返回函数是怎么样的呢？ 那可能是什么样的？

从编写常规旧函数开始。 想要列出 `<li>` 元素并将它们包装在 `<ul>` 中。 并不是那么困难：
```js
function wrapWithUl(children) {
    const ul = document.createElement('ul');
    return [...children].reduce((listEl, child) => {
        listEl.appendChild(child);
        return listEl;
    }, ul);
}
```

但是，如果以后有一堆段落元素要包含在 `<div>` 中，要怎么办呢？ 没问题。 可以为此编写了一个函数：
```js
function wrapWithDiv(children) {
    const div = document.createElement('div');
    return [...children].reduce((divEl, child) => {
        divEl.appendChild(child);
        return divEl;
    }, div);
}
```

这样就可以正常工作了。 但是这两个功能看起来很强大。 两者之间唯一有意义的变化是创建的父元素。

现在，可以编写一个带有两个参数的函数：父元素的类型和子元素列表。 但是，还有另一种方法可以做到这一点。 可以创建一个返回函数的函数。 它可能看起来像这样：
```js
function createListWrapperFunction(elementType) {
    // 直接返回一个函数。
    return function wrap(children) {
      // 在 wrap 函数中，可以看到 elementType 参数。
      const parent = document.createElement(elementType);
      return [...children].reduce((parentEl, child) => {
          parentEl.appendChild(child);
          return parentEl;
      }, parent);
    }
}
```

这可能看起来有点复杂，所以分解它。 创建了一个除了返回另一个函数之外什么都不做的函数。 但是，返回的函数会记住 `elementType` 参数。 然后，当调用返回的函数时，它知道要创建什么类型的元素。 所以，可以像这样创建 `wrapWithUl` 和 `wrapWithDiv` ：
```js
const wrapWithUl  = createListWrapperFunction('ul');
// wrapWithUl() 函数现在“记住”它创建了一个 ul 元素。
​
const wrapWithDiv = createListWreapperFunction('div');
// wrapWithDiv() 函数现在“记住”它创建了一个 div 元素。
```

返回的函数“记住”某些内容具有技术名称的业务，这称之为封闭。 封闭过于方便，但现在不会过多担心它们。

所以，我们已经看到：
- 为变量分配函数;
- 将函数作为参数传递; 
- 从另一个函数返回一个函数。

总而言之，拥有这些高级的功能是相当不错的。但这与高阶函数有什么关系呢？ 下面让我们看看高阶函数的定义。

### 高阶函数是什么？

高阶函数是：
> A function that takes a function as an argument, or returns a function as a result（将函数作为参数的函数，或作为结果返回函数的函数）

听起来有点耳熟？ 在 JavaScript 中，函数是一等公民，而“高阶函数”则是利用此功能创造的更复杂的函数。 

#### 高阶函数的例子

一旦你开始寻找，你会看到所有高阶函数中最常见的是接受函数作为参数的函数。因此，先来看看这些常见的，随后再去介绍一些返回函数的函数的实际示例。

#### 接受函数作为参数的函数

通过“回调”功能的任何地方，你都在使用高阶函数。 这些在前端开发中无处不在，其中最常见的是 `.addEventListener()` 方法。 当想要响应事件而采取行动时，我们会使用此功能。 例如，如果我想开发一个按钮弹出警报：
```js
function showAlert() {
  alert('Fallacies do not cease to be fallacies because they become fashions');
}
​
document.body.innerHTML += `<button type="button" class="js-alertbtn">
  Show alert
</button>`;
​
const btn = document.querySelector('.js-alertbtn');
​
btn.addEventListener('click', showAlert);
```

在此示例中，我们创建一个显示警报的函数。 然后在页面上添加一个按钮。 最后，将 `showAlert()` 函数作为参数传递给 `btn.addEventListener()`。

当使用数组迭代方法时，也会看到高阶函数。 也就是说，像 `.map()`，`.filter()` 和 `.reduce()` 这样的方法。 这里已经通过 `elListMap()` 函数看到了这种方式：
```js
function elListMap(transform, list) {
    return [...list].map(transform);
}
```

高阶函数也有助于处理延迟和时序。 `setTimeout()` 和 `setInterval()` 函数都可以帮助管理函数执行的时间。 例如，如果想在 30 秒后删除高亮类，可能会这样做：
```js
function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlighted');
    elListMap(el => el.classList.remove('highlighted'), highlightedElements);
}
​
setTimeout(removeHighlights, 30000);
```

同样，创建一个函数并将其作为参数传递给另一个函数。

如你所见，在 JavaScript 中经常使用接受函数的函数。 事实上，你可能已经使用过它们了。

#### 返回函数的函数

返回函数的函数不像接受函数的函数那样常见。 但它们仍然有用。 其中一个最有用的例子是 maybe() 函数。 我从 Reginald Braithewaite 的 JavaScript Allongé 改编了这个。 它看起来像这样：
```js
function maybe(fn)
    return function _maybe(...args) {
        // 注意，== 是故意的。
        if ((args.length === 0) || args.some(a => (a == null)) {
            return undefined;
        }
        return fn.apply(this, args);
    }
}
```

现在先看看如何使用它，而不是解释它如何工作。 再次查看函数 `elListMap()`：
```js
// 将给定函数应用于 NodeList 中的每个项目并返回一个数组。
function elListMap(transform, list) {
    // list 可能是 NodeList，它没有 .map()，所以我们转换它变为一个数组。.
    return [...list].map(transform);
}

```

如果将 `null` 或未定义的值传递给 `elListMap()` 会发生什么？ 会得到一个 `TypeError`，无论做什么都会崩溃。 `maybe()` 函数可以解决这个问题。 这样使用它：
```js
const safeElListMap = maybe(elListMap);
safeElListMap(x => x, null);
// ￩ undefined
```

该函数返回 `undefined`，而不是一切都崩溃。 如果将它传递给另一个受 `maybe()` 保护的函数，它将再次返回 `undefined`。 可以继续使用 `maybe()` 来保护我们喜欢的任何数量的函数。 比编写一个无数的 `if` 语句简单得多。

返回函数的函数在 React 社区中也很常见。 例如，来自 react-redux 的 `connect()` 是一个返回函数的函数。

## 接下来是什么

前文，我们已经看到了一些高阶函数的例子。 但又怎么样呢？ 它们赋予我们什么能力？没有它们，我们会失去什么？ 有比一般更大的示例吗？

要回答这个问题，让我们再看一个例子，内置数组方法 `.sort()`。（虽然和一般的高阶函数不一样，它会改变数组而不是返回一个新数组， 但是让我们暂时忽略这点。） `.sort()` 方法是一个高阶函数，它需要一个函数作为其参数之一。

它是如何工作的？ 如果想对一组数字进行排序，首先要创建一个比较功能的函数，它可能看起来像这样：
```js
function compareNumbers(a, b) {
    if (a === b) return 0;
    if (a > b)   return 1;
    /* else */   return -1;
}
```

然后，为了对数组进行排序，可以这样使用它：
```js
let nums = [7, 3, 1, 5, 8, 9, 6, 4, 2];
nums.sort(compareNumbers);
console.log(nums);
// => [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

这里可以对数字列表进行排序。 但有多大用处呢？ 多久有一个需要排序的数字列表？ 其实不常见。 但是我经常需要对一组对象进行排序，例如这样的数组：
```js
let typeaheadMatches = [
    {
        keyword: 'bogey',
        weight: 0.25,
        matchedChars: ['bog'],
    },
    {
        keyword: 'bog',
        weight: 0.5,
        matchedChars: ['bog'],
    },
    {
        keyword: 'boggle',
        weight: 0.3,
        matchedChars: ['bog'],
    },
    {
        keyword: 'bogey',
        weight: 0.25,
        matchedChars: ['bog'],
    },
    {
        keyword: 'toboggan',
        weight: 0.15,
        matchedChars: ['bog'],
    },
    {
        keyword: 'bag',
        weight: 0.1,
        matchedChars: ['b', 'g'],
    }
];
```

想象一下，想要按每个条目的权重对此数组进行排序。 我们可以从头开始编写新的排序功能，但并不需要。 相反，我们可以跟据之前的函数创建一个新的比较函数。
```js
function compareTypeaheadResult(word1, word2) {
    return -1 * compareNumbers(word1.weight, word2.weight);
}
​
typeaheadMatches.sort(compareTypeaheadResult);
console.log(typeaheadMatches);
// => [{keyword: "bog", weight: 0.5, matchedChars: ["bog"]}, … ]
```

我们可以为想要的任何类型的数组编写比较函数。 `.sort()` 方法似乎与我们达成了协议 —— “如果你能给我一个比较函数，我会对任何数组进行排序。不要担心数组中的内容。如果你给我一个比较函数，我会对它进行排序。“因此，不必担心自己编写排序算法，只需要专注于比较两个元素的更简单任务。

现在，想象一下，如果没有高阶函数，无法将函数传递给 `.sort()` 方法。每当需要对不同类型的数组进行排序时，我们就必须编写一个新的排序函数。或者，最终会用函数指针或对象重新发明相同的东西。无论哪种方式都会更加笨拙。

不过，确实有更高阶的功能，这将排序功能与比较功能分开。想象一下，如果一位聪明的浏览器工程师出现并更新 `.sort()` 以使用更快的算法。无论他们排序的数组内部是什么，每个人的代码都会受益。而且，现在已经有一整套高阶数组函数遵循这种模式。

这带来了更广泛的想法。 `.sort()` 方法抽象了对数组中的内容进行排序的任务，这就是所谓的“关注点分离”。高阶函数让我们创建笨拙或不可能的抽象。创建抽象是软件工程的 80％。

每当重构代码以消除重复时，我们就会创建抽象。看到一个模式，并用该模式的抽象表示来替换它。因此，代码变得更简洁，更容易理解。至少，这就是其中一个方式。

高阶函数是创建抽象的强大工具，并且有一个与抽象相关的整个数学领域，它被称为 类属理论（范畴论）。其更准确的表述是，类属理论是用于发现抽象的抽象。换句话说，它是用于寻找模式的模式。在过去的70年左右，聪明的程序员一直在借鉴它们的想法，这些想法主要表现为编程语言功能和库。如果学习这些模式的模式，有时候可以删除整个代码，或者将复杂问题简化为多个简单构建块的优雅组合。这些构建块就是高阶函数。上面所说就是高阶函数很重要的原因，因为有了它们，就有用了一个能对抗代码中复杂性的强大工具。

### 结语

如果你想了解有关高阶函数的更多信息，请参考以下内容：
- [高阶函数](https://eloquentjavascript.net/05_higher_order.html)：Marijn Haverbeke 的 Eloquent JavaScript 第5章。
- [高阶函数](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99)：Eric Elliott 编写的软件系列的一部分。
- [JavaScript 中的高阶函数](https://www.sitepoint.com/higher-order-functions-javascript/)：M. David Green for Sitepoint。

因为 JavaScript 已经支持了高阶函数，避免了考虑使用方式的问题，让我们可以很容易使用高阶函数的方式去实现、优化一些功能。而大家在了解这些之后，会发现高阶函数并不复杂，它很方便地帮我们去完成一些事情。

但是，在这个看似简单的高阶函数背后，包含着函数式编程的思想、理论和范式。当你步入这个领域，你会发现它如此强大。