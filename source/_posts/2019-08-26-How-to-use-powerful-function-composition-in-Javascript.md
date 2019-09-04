title: 【译】如何在 JavaScript 中使用强大的复合函数
date: 2019-08-26 18:00:00
category: 潮流技术
tags: [函数式编程]
thumbnailImage: https://tva1.sinaimg.cn/large/006y8mN6ly1g6ntb8sbmaj308c0anq3f.jpg
thumbnailImagePosition: right

---

原文：[How to use powerful function composition in Javascript](https://medium.com/front-end-weekly/how-to-use-powerful-function-composition-in-javascript-3c0447642044)

**复合函数（Function composition）** 是 JavaScript 编程中在面向对象和函数式编程二者之间相当大的一个差异。

本文会解释类层级（Class Hierarchy）与复合函数之间的区别，以及在代码中利用复合函数和函数式编程优点的示例。

<!-- more -->

### 类层级与「机器狗」

在面对对象编程中，定义 Class。

例如，你定义了父类 `Animal` 并拥有一个 `move` 方法，并继续创建 `Cat` 和 `Dog` 类从 `Animal` 继承 `move`  方法，并添加自己的方法 `bark` （狗叫）和 `meow`（猫叫）。

然后，你又定义了一个 `Robot` 类拥有方法 `chargeBattery`。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6nt8k8x3tj30fl042dg0.jpg)

现在，如果你想创建一个需要 `move` 和 `chargeBattery` 方法的 `RoboDog` 类，以及一个为 `Dog`  增强 `bark` 的 `roboBark`，那么要怎么办呢？ 这个类需要从 `Dog` 和 `Robot` 同时继承，但 JavaScript 却不允许这样做。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6nt8zm7e8j30fl06kjrp.jpg)

为了解决这个问题以及其他一些问题，在面向对象编程中不再推荐使用继承。 相反，我们需要为类定义一个接口（*当前不存在于 JavaScript 中*），并实例化继承的类并将它们用作依赖项。

此外，依赖项应该通过依赖注入来处理，以提高可测试性和灵活性，详情可参阅： [JavaScript Pure Functions for OOP developers](https://medium.com/front-end-weekly/javascript-pure-functions-for-oop-developers-5fc9020541a8)。

`RoboDog` 类看起来像下面这样：
```js
import {Animal, Dog} from './animals';
import {Robot} from './robots';
​
class RoboDog {
  constructor(animal, dog, robot) {
    this.animal = new animal();
    this.dog = new dog();
    this.robot = new robot();
  }
  move() {
    return this.animal.move();
  }
  bark() {
    return this.dog.bark();
  }
  chargeBattery() {
    return this.robot.chargeBattery();
  }
  roboBark() {
    return 2 * this.dog.bark();
  }
}
​
const roboDog = new RoboDog(Animal, Dog, Robot);
roboDog.roboBark();
```
![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6nt9osvxkj308c08qaae.jpg)

### 复合函数

**复合函数**基于**一元柯西化**（*Monadic Curried*）的使用和优选**纯函数**（*Pure Function*）。

```js
// 一元函数只接受一个参数
const monadic = one => one + 1;
​
// 这不是一元函数
const notMonadic = (one, two) => one + two;
​
// 这是柯西、一元、高阶函数
const curry = one => two => one + two;
```

复合函数非常简单，它使用多个函数，并且每个函数接收输入，并将其输出移交给下一个函数：
```js
const plusOne = a => a + 1;
const plusTwo = a => a + 2;
​
const composedPlusThree = a => plusTwo(plusOne(a));
​
composedPlusThree(3); // 6
```

在函数式编程中，你定义的是表达式而不是语句，函数也只是一个表达式。因此，JavaScript 支持将函数作为参数，或把返回的函数作为其输出的高阶函数。

为了让其变得容易，你可以定义**高阶函数** `compose` 和 `composePipe`：
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const composePipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

compose 和 composePipe 在组合函数的顺序上有所不同：
```js
const plusA = s => s + 'A';
const plusB = s => s + 'B';
​
const composed1 = s => compose(plusA, plusB)(s);
const composed2 = s => composePipe(plusA, plusB)(s);
​
composed1(''); // BA
composed2(''); // AB

```

请注意，在这里可以使用无参数风格代码（*tacit programming 隐式编程* ）：
```js
const composedPointFree = compose(plusA, plusB);
​
console.log(composedPointFree('') === composed1('')); // true
```

显然，这是可以的。因为 `compose(plusA，plusB)` 是一个高阶函数，而 `compose` 返回一个用于定义新表达式的函数。

如果你使用过Unix，你还可以将函数组合与 Unix 管道相关联，该管道的工作原理相同：`$ ls -l | grep key | less`。

### 一点点数学

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6nt9zt2frj31910o8jua.jpg)

查看上图，你可以看到三个不同颜色的编号组，它们通过函数 `g` 和 `f` 连接。 函数 `g` 接受参数 `Horse` 并返回 `Horn` 。 然后函数 `f` 接受参数 `Horn` 并返回 `Unicorn`。这两个函数的组成是一个函数，而这个函数需要一个 `Horse` 作为参数，并直接返回一个 `Unicorn` 作为输出。

因为我们使用的是纯函数，并且其始终为相同输入返回相同值，所以我们可以通过一个简单的函数替换组合函数，该函数只需要 `Horse` 并返回 `Unicorn`。 这是 **Memoization**（*记忆化*） 中使用的原则。

函数式编程并不能很好地优化并行处理。正如你所看到的那样，它还拥有允许我们完全跳过处理的魔力，并通过跳过它们之间的所有内容来返回问题的答案。

### 复合函数与「机器狗」

复合函数的使用，实际上与前文中的 `RoboDog` 面向对象编程实例中所做的，看起来相似。但是，使用复合函数，其函数的构成要优雅得多。

你没有使用类来模拟整个逻辑，而只是定义了代表所需功能的方法。 最终JavaScript 模块的表达如下：
```js
import {bark} from './dog';
import {compose} from './functional';
​
const doubleIt = a => 2 * a;
​
export const roboBark = composePipe(bark, doubleIt);
```

请注意，上面的代码没有引用它不需要的任何内容，这意味着没有提到 `Animal` 或 `Robot` 的功能。 这些并不是 `RoboDog` 独有的，而我们只想关注一个全新的独特代码。

要使用代码中的所有功能， 你可以自由使用 `Animal`、`Dog`、`Cat`、`Robot` 和 `RoboDog` 中的功能。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6ntajp721j308c07kt8z.jpg)

复合函数和对象之间还有另一个显着差异。 对象保存内部数据和状态，它们是有状态的。 然而，函数式编程中的函数应该是纯粹的和无状态的。

纯函数仅由其输入驱动以提供其输出，它不会改变（*变异*）任何其他数据，也不会触发任何副作用。 这使得它非常简单、可预测、易于测试，并且易于遵循通用编程的最佳实践。这些都是优秀的程序员应该关心的事情。

在函数式编程中，你应该遵循关注点分离，通过使用控制反转（*IOC*）的原理和函数式单子（*Monads*）的方式将任务的执行与其实现分离（*IOC 是 AOP 中常用概念，Monads 是函数式编程中的概念*）。

甚至，如果不使用单子（因为它们的定义会吓到你：`A monad is just a monoid in the category ofendofunctors，自函子范畴上的幺半群`），你仍然可以解耦代码。只需将功能的定义移动到一个可以集成和提供数据的位置并执行，然后移动到另一个位置。理想情况下，可以在完全不同的模块级别上执行此操作。

做完这些工作，你可以通过单元测试和集成测试来覆盖代码功能。自此，你就可以过上快乐的程序员生活。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g6ntb8sbmaj308c0anq3f.jpg)

### 拆分你的函数并使用复合函数

你有可能正在使用函数作为可重复的语句序列的盒子，如下所示：
```js
function simonSays(arg) {
  let result = arg.trim();
  result = `Simon Says: ${result}`;
  return result;
}
​
simonSays(' Jump! '); // Simon Says: Jump!
```

上面的函数修剪（*trim*）字符串参数，修饰它然后返回。 示例上的函数虽然只有五行，但实际上，我们经常看到由几十行代码表示的函数。

**单一职责原则**（*Single Responsibility Principle*）规定：每个函数都应对功能的一部分负责。 这是开放的解释，但我们可以很容易地发现，上述功能中「修剪」和「装饰」做的是两件事而不是一件事。

让我们尝试使用 JavaScript 中的**复合函数**：
```js
const trim = a => a.trim();
const add = a => b => a + b;
​
const simonSays = composePipe(trim, add('Simon Says: '));
​
simonSays(' Jump! '); // Simon Says: Jump!
```

使用复合函数，意味着对于程序逻辑的每一步都会有一个可测试且可重用的函数。

测试驱动开发（*TDD*）要求你，首先为要实现功能的任何部分编写测试用例，然后实现逻辑，并全部通过测试用例的测试。这部分是为了确保程序不会有任何隐藏的、未经测试的逻辑。

通过使用复合函数，你总是可以用一种暴露逻辑并允许轻松测试的方式去编写代码。 更多内容可以查看：[Making testable JavaScript code](https://medium.com/front-end-weekly/making-testable-javascript-code-2a71afba5120)。

### 使用局部应用（Partial Application）创建可重用代码

通过局部应用的柯西化函数来完善上述的 `simonSays` 函数。局部应用程序意味着你将提供暴露高阶函数中作为基础函数的参数：
```js
const add = a => b => a + b;
const partialSimonSays = add('Simon Says:'); // partial application
const simonSays = composePipe(trim, partialSimonSays);
​
partialSimonSays('Jump!'); // Simon Says: Jump!
simonSays(' Jump! '); // Simon Says: Jump!
```

这允许你创建更多可重用的代码。更多内容可以查看：[JavaScript ES6 curry functions with practical examples](https://medium.com/front-end-weekly/javascript-es6-curry-functions-with-practical-examples-6ba2ced003b1)。

### 探讨你的代码

因为我们一直在使用纯函数，所以在组合中插入其他函数会非常容易。请参阅下面的示例：
```js
// console.log is impure and does not provide any return value
// so we have to improve it
const investigate = a => console.log(a) || a;
​
const simonSays = composePipe(
  investigate,
  trim,
  investigate,
  partialSimonSays,
  investigate
);
​
simonSays(' Jump! ');
//  Jump! 
// Jump!
// Simon Says: Jump!

```

如果你正在创建纯函数，你将始终能够非常轻松地编写代码，而无需重构以前的代码来支持新的用例。

### 结论

**复合函数**要求你对编写代码的方式进行不同层次的思考，这样将会为你带来很多好处。

**由复合函数替换类层级**允许你专注于，基于功能的思考去开发唯一代码，而不是基于类的思考。

**隐式编程**允许你通过利用柯西化和高阶函数来简化代码。

你需要构建分解后的原子函数，以便为单一责任原则和测试驱动开发创建更多**可重用、可组合的代码**。

**纯函数和局部应用函数**允许通过创建功能强大、简单、可预测、可轻松测试的代码，来提升你的架构，并轻松应用到编程的最佳实践中。