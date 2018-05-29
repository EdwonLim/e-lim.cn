title: 区块链技术与其在旅游行业的应用
date: 2018-01-11 23:00:00
category: 潮流技术
tags: [区块链]
thumbnailImage: https://ws2.sinaimg.cn/large/006tKfTcly1frsd3cqxtcj315g0e6b29.jpg
---

前几日，天使投资人徐小平的内部讲话 **“鼓励创业者拥抱区块链革命”** 刷爆了微博和朋友圈，而同时笔者刚好读完一本有关区块链技术的书 **《人工智能时代，一本书读懂区块链金融》** ，在读的同时也思考了下自己所处的行业，找到了一些相似的场景。因此，借此机会，与大家谈谈自己在学习区块链技术过程中的一些感受，并畅想一下在旅游行业区块链技术的应用。<!-- more -->



![](https://ws1.sinaimg.cn/large/006tKfTcly1fnbyj1ruzhj30ku0beh1z.jpg)

先说说这本书，在亚马逊 Kindle Unlimited 榜上排名挺高的，在“IT产业与文化”分类中是最畅销的。个人觉得写得还是很不错的，对区块链技术讲得比较深入，只不过中后部分的内容，大多是把前面所讲过的理论翻来覆去地阐述，感觉越读到后面，营养价值越低。它排名高，可能跟它的书名有关，又是“人工智能”，又是“金融”。总体来讲，值得一读，不过中后半部分不用太详细去读。

## 区块链技术是什么

谈到区块链，就必须说数字货币、比特币。就像人工智能是机器学习、深度学习的表象一样，数字货币其实也是区块链技术的一种表象，一种技术的运用方式。极大可能是由于和“钱”有关，所以让大家的视线更多关注在数字货币或比特币上。这样也好，我们可以先谈谈数字货币中的王者—— **比特币（BitCoin）**。

![](https://ws4.sinaimg.cn/large/006tKfTcly1fnbztkt5crj30xc0irak7.jpg)

任何事物，都要辩证地来看。一方面，比特币改变了金融的形态，让交易不通过银行等交易中心就能交易，更方便、更快捷；而另一方面，比特币绝大部分交易是用于洗钱、网络勒索、非法交易、逃避外汇管制等非法行为，很少真正用于我们大家的生活中。从上面这些内容，可以总结出，比特币最重要的几个特点： **去中心化** （不用通过银行）、**安全**（不可靠谁用？）、**可信** （不可信谁用？）、**匿名**（逃避监管）、**交易记录不可修改**（洗完钱，撤销了？）。

而区块链正是用来实现这几种特征的技术：

* 去中心化 —— **分布式数据库**，当然和平常接触的关系型、非关系型数据库不一样，它是 **基于数据区块的数据库**，而且每一个节点，都有查询所有数据的权限。
* 安全 —— **加密算法**，将交易信息进行 **RSA 非对称加密** 后，再进行传输，所有第三方都能知道交易发生的时间和数量，但谁也不知道，交易双方是谁。
* 可信 —— **智能合约**，一种共识机制，可以比喻成 **用代码实现的合同**，交易时会严格按照这套代码实现的逻辑来执行，**理论上不会有任何违约行为**。
* 匿名 —— **完全数字化**，代表一个用户的只是一串秘钥，持有这串秘钥，就认为是这个用户。连转账双方，都不能准确知道对方具体是谁，只知道账户地址。
* 记录不可修改 —— **已有区块不可修改**。理论上，所有基于区块链的应用都能做到这点，但是现在知名的项目中，好像只有比特币这样做了（这也是比特币价值高的原因之一）。当然，不可修改也不是100%绝对的，在后面讲弊端那一节里，会提到 **51% 算力问题**。

总结来说，区块链就是 **完全数字化的包含共识机制的加密且不可修改的分布式数据区块数据库技术**。这是笔者凭借自己的理解，给出的定义。对于新技术，每个人会由于理解的不同，导致给出的定义也不尽相同，这其实是很正常的，大家都可以有自己心中的定义，各抒己见，多多交流。

区块链技术是什么，大家了解了，那么，区块链技术到底能解决什么问题呢？绝不只是洗钱这么简单。

## 区块链技术能解决什么问题

讨论技术解决的问题，肯定要看技术所具有的特征。区块链技术最重要的三个特征就是 **去中心化**、**智能合约**、**安全**（匿名和不可修改，都可以算作安全的一部分）。很多人看到这三个特点，就会直接想到“金融”。当然，也可能是因为当前区块链技术主要用于金融，所以总结出的特点肯定和金融相关。不过，这些确实是区别于其他技术的特征。

![](https://ws1.sinaimg.cn/large/006tKfTcly1fncqxxz0hij30rs0fxq5b.jpg)

### 去中心化 —— 信任问题

对于信任问题，基于金融场景讲，可能更容易被理解。虽然说，最近几年，互联网金融的崛起，让传统金融备受打击，但是，互联网金融并没有解决传统金融中的信任问题。传统金融是建立在客户对银行、基金公司等实体金融机构信任的基础上；而互联网金融则是建立在客户对支付宝、P2P 信贷公司等网络交易所（虚拟金融机构）信任的基础上。当然，信任来源于很多方面，例如人际关系、权威性、口碑等等，但这些信任都是针对金融产品发行方、运营方等中心的，而不是对金融产品本身。这就容易让客户产生 **大的金融机构的金融产品一定比小的金融机构的要好、要靠谱** 的主观想法，而不去真正关心金融产品本身的风险程度。

区块链技术带来了去中心化的思路，让每个客户手里都有 **一份完整的账本**，让所有客户都可以随意查看金融产品所有的交易、运作信息，并且，**这份账本的真实性不是由金融机构保障，而是通过区块链技术让所有客户一起保障**。这样就让用户的信任从金融机构转向了金融产品本身。与此同时，金融机构也可以减少为了维护金融产品的正常运作所产生的审计、监管等诸多方面的人力、物力、资源成本。

![](https://ws3.sinaimg.cn/large/006tKfTcly1fncqwpsdk4j30p00dwgoc.jpg)

那么，“让所有客户一起保障”的逻辑是如何实现的呢？通过区块链技术，在产品设计的时候，**编写程序代码来制定这个产品的所有交易（数据交互）规则**，然后任意节点（运营发行方和客户）进行交易（数据交互）时，会通过网络，将这个操作发送给其他节点，**待其他节点确认这个操作符合规则** 时，交易（数据交互）即完成，并将记录写入数据区块中，同步给所有节点（运营发行方和客户），让所有节点（运营发行方和客户）可随时查看。

在整个过程中，**规则制定** 和 **规则确认** 是非常重要的两个关键点。其中 “规则确认”，是去中心化带来的机制，就是让所有节点（主要是客户）参与到规则的确认中（一般都是超过半数确认就认为是符合规则的），避免产品运营发行方进行违规操作。而 “规则制定” 就是下一节要讲的 **智能合约**。

### 智能合约 —— 违约问题

在人类社会人与人的交互中，会出现各种 **合约**，有口头的，有书面的，有电子的，不过这些合约都有一个共同的特点 —— **用文字描述**。这样很容易出现下面几类问题：

* 合约双方，对文字描述的理解不一致，造成违约。
* 违约后，违约一方容易在文字上做文章，让监管、仲裁甚至法院都难以决断。
* 签订合约时，在文字上做手脚，故意挖坑。

而且，在合约的执行上，需要第三方进行监管，才能让合约双方完全按照合约执行，因此，会出现一些成本。

![](https://ws3.sinaimg.cn/large/006tKfTcly1fncrbed0gyj30p00dvn0f.jpg)

但是 **智能合约** 不一样，它是 **通过程序代码来描述规则**，可以准确执行，避免造成不同的人有不同理解的问题，从而有效规避违约问题。同时，即使有人利用规则漏洞做出了违约的行为，它的行为也将会永久被记录下来，不可修改，这个记录会为违约处理提供准确依据。

智能合约看上去，就是一段可执行代码，可以准确执行即可。但是为什么，传统技术就很难实现呢？为什么要基于区块链技术才行呢？

* 去中心化，让智能合约不能轻易被一个节点或某几个节点修改。
* 产生的数据无法删除、修改，只能新增数据，保证了历史的可追溯性。
* 基于数据无法删除、修改，让违约成本变高，因为违约记录永远被记录，永远不会被删除。

不论是去中心化，还是智能合约，都是通过技术的形式解决现实中的问题，但是不论方案怎么优秀，只要安全上有漏洞，被人攻破，造成信息的错误，那么这个方案就会立刻变得一分不值。所以，下一节我们要谈谈安全。

### 安全 —— 隐私泄露问题

其实安全问题，一直是区块链技术面临的最大问题，这点会在区块链存在的弊端那一节中讲到。而在这一小节，笔者要讲的安全，是区块链技术对隐私方面做的保护。

![](https://ws1.sinaimg.cn/large/006tKfTcly1fnctitnokrj30k00c0wmg.jpg)

完全匿名化，是当前区块链技术的特征和核心优势，虽然匿名直接导致黑产的不断蔓延，但是它也同时有效保证了交易的私密性。拿比特币为例，第三方只能看到交易的时间、数量等一些信息，但是并不能看到交易的双方的信息，甚至同样交易方的两次交易，都很难被第三方归并为同样交易方的交易。因此，交易双方可以很放心地进行安全的交易，而不暴露自己的任何隐私信息。

### 小结

这里提到的三个特征其实是相辅相成的：没有智能合约，去中心化只能靠人为自觉执行，监管成本反而会增大；没有去中心化，智能合约由中心独占，随意修改，也就不能称作“合约”了；如果不安全，再去中心化，再智能合约化，一旦被黑客攻破，所有都会直接归零；而也正是因为去中心化加上智能合约，才让违反规则的成本大大升高，从而让产品变得更安全了。在这个技术高速发展的时代，很少有一项技术单独靠一项特性就可以“称霸潮流”的，区块链这种融合多种特性，从很多层面解决问题的技术方案，应该是以后技术的发展方向。

这一节讲了很多区块链在实际中解决的问题，但大多数都是基于金融场景的。其实金融本质上更像一个信息行业，据统计 90% 金融利润的来源，来自于信息的收集、分析、处理的过程中，因此信息对金融的重要程度非同一般。而，区块链技术其实就是对信息的 **创建**、**加密**、**验证**、**处理**、**存储**、**分发** 等过程实现了一个 **基于网络**、**安全可靠**、**可编程** 的机制，从而解决了金融场景的问题。因此，也可以看出，任何对信息有高度要求的行业都是适用区块链技术的，例如 **新零售行业**、**通信领域**、**审计行业**、**医疗产业**、**共享经济** 等等。（下面是网络上的一张区块链应用的图）

![](https://ws1.sinaimg.cn/large/006tKfTcly1fncqyowxsvj30rs0jsmzw.jpg)

当然，旅游行业也是一个基于信息的产业，因此区块链技术应该在旅游产业中也有用武之地。

## 区块链在旅游行业的应用

虽然有很多旅游行业的公司，都声称要搞区块链，但是实际落地并有成效的并不多，更多属于实验阶段：

* Webjet 正在开发一种解决方案，利用以太坊的私有版本追踪世界各地酒店房间的库存情况。希望确保消费者和他们的酒店之间的所有中介都能获得报酬，以帮助预订。这与区块链技术最初的初衷完全相反，即移除中间的人。。。。。
* TUI Group 正考虑将所有数据转移到一个私有版本的以太坊上，以去除 Expedia 和预订等中间商。
* S7 公司已经与俄罗斯的 Alfa-Bank 合作，减少了航空公司和代理商之间的结算时间。解决方案建立在以太坊的私有版本上。
* Innfinity 软件系统将使用区块链技术，让他们的在线预订工具能够提供 NDC 的内容，并以“目前不可能通过其他标准实现的方式”组合内容和服务。他们的解决方案基于以太坊的一个私有项目来实现。
* 国际贸易协会在2016年的世界金融研讨会上展示了一种基于区块链技术的数字货币—— IATA（国际航协）硬币的概念。虽然还没有给出具体的细节，但看看IATA通常是如何创新的，如果他们决定在公共关系链上推出这个项目，我将会大吃一惊。
* 等等。。。。。。

（*上面的示例从 36kr 上 [《区块链技术能颠覆旅游行业吗？》](http://36kr.com/p/5090300.html) 文章中摘抄*）

因此，笔者在学习区块链技术的时候，一直在考虑旅游行业的一些突出问题，是否能使用区块链技术去解决，应该用什么方式去解决。在调研了一些方案后，结合自己的想法，给大家介绍一些解决常见问题的例子。

### 机票超售问题

去年，**美联航机票超售** 问题无数次出现在新闻中，让大家对航空公司的好感跌到低谷。造成机票超额预定的原因是航空公司不愿意虚耗座位，所以航空公司会在容易出现空置的座位上进行适当的超售，这是 **航空界的通行做法**。但是这种做法，从乘客的角度来说，肯定算是“**霸王条款**”。但是，在乘客登机出现问题之前，是无法确定是否超售的。只有航空公司销售部门的部分人知道，但他们肯定不会说；航空监管部门获取真实售票数据或许也比较困难。这类问题如何解决呢？

![](https://ws2.sinaimg.cn/large/006tKfTcly1fnd2jc83ezj30rs0lbtcx.jpg)

其实，这个问题和网络支付中的“双花”问题很类似，从理论上区块链技术可以消除航空业和其他交通运输业的双重预定问题。

一旦航空售票记录被验证并加入到区块链中，就会永久的存储起来，除非同时控制超过半数的节点，否则售票记录无法篡改。同时，由于数据是高度透明的，所有乘客都可以看到销售记录，肯定不会发生超售现象。而且，由于区块链的特性，乘客也不会知道其他销售记录是卖给谁的。

区块链技术采用了一种公开透明的去中心化的算法，使消费者对“航空公司”的信任，转变为对“智能合约”的信任，能够塑造更好的形象。当然，这些只是理想状况，除非超售由法律裁定是违法行为，否则很难实施。

不过，区块链可以运用到航空业其他地方，例如机场和飞机的通信、乘客身份验证等。


### 网约车高额抽成问题

网约车虽然不完全属于旅游行业，但是它是旅游行业里主要的一环。当网约车过了多家平台的竞争期之后，车费抽成越来越高，大概在 5%~25% 之间，有的甚至更高。排除运营商的盈利策略，本身维护庞大的运营平台就有很高的人力、物力成本。

从理论上，区块链技术可以帮助平台解决这类问题，降低维护平台的成本。网约车业务，其实就是乘客与司机的 P2P 业务，很适用区块链技术，这样可以大幅度降低平台数据存储的成本。同时基于区块链技术，实现价格算法透明化，让所有司机、乘客都可以无障碍地看到每个行程的详情及具体收费情况。

### 酒店预定管理

当前酒店行业存在已久的问题之一就是其供应链各个环节间容易出现信息遗漏、丢失等情况，这不仅会影响酒店的工作效率，还有可能会造成巨大的经济损失。而与网约车相似，酒店预订也可以近似的看为酒店与房客的 P2P 业务，而现在为了保证信息的充分传播（让更多潜在房客知道酒店信息），会加入很多供应商、中间商，最终造成中间环节容易出问题而且由于佣金的存在房价不是很便宜。

![](https://ws4.sinaimg.cn/large/006tKfTcly1fnd5dfjg79j30p00dwtad.jpg)

而使用区块链技术，将“链”升级，创建一个比当前所有参与者使用的 **更高效**、**更安全** 以及 **更低成本** 的供应链，让客户预定酒店 **更准确**（不会出错）、**更实时**（不用供应商二次确认）、**更便宜**（避免佣金），让客户从信任供应商、信任酒店，变为信任这个以技术搭建的平台。

### 小结

其实，有一个概念在前文中被弱化了，那就是 **“算力”**。按照去中心化的智能合约，每个节点都有验证行为的能力，验证的速度就是算力。让用户提供算力，在现在来看是很困难的，让用户设备上天天跑个程序提供算力（在一部分数字货币中，被称作矿工），其实是不现实的。但是如果用户不提供算力，那么事实上，都是规则制定方自己提供算力，那么去中心化其实并没有实现，智能合约不如一张废纸。介于这种情况，其实可以将更多方放入链路中来。例如，如果要解决机票超售问题，可以以监管部门、航空公司、机票经销商为节点建立区块链，这样多方制约，来维持去中心化的智能合约。

任何基于信息的，有交易过程的行业，都有金融业相似的问题，而区块链技术可能正是解决这些问题的良药。或许区块链技术的去中心化会触动很多人的利益，但是只有变革才能更好的发展，发展才会有更好的利益。

## 当前区块链技术存在的弊端

在这个区块链技术（主要是数字货币）百花齐放、大红大紫的时代，其实很多技术弊端都被光芒所掩盖，而一些技术弊端可能是致命的。

![](https://ws4.sinaimg.cn/large/006tKfTcly1fnd55zpp9bj30rs0gltbq.jpg)

### 安全性

首当其冲是安全性，因为安全性是一切应用的根本，尤其是现在信息时代，一点漏洞，都可能造成大麻烦。

从算法来讲，目前区块链的算法 **相对安全**。为什么说相对？因为随着数学、密码学和计算科学的发展，它的安全性越来越弱。实现上，由于区块链大量应用了各种密码学技术，属于算法高度密集工程，在实现上比较容易出现问题。例如，它使用了 NSA 的 RSA 算法，RSA 算法如果有缺陷（历史上有先例），可被轻易破解，一旦爆发，结局将会是毁灭。再者，即使没被破解，纯暴力破解也是有可能的。据估计，以目前“天河二号”的算力来说，产生比特币 SHA256 哈希算法的一个哈希碰撞大约需要 248 年，而用正在研制中的“天河三号”的话，才需要 10 年。而且随着量子计算机的不断发展，算法层面面临的潜在安全威胁会越来越大。

从协议来讲，基于 PoW 共识过程的区块链主要面临的是 **51% 攻击问题**，即节点通过 **掌握全网超过 51% 的算力就有能力成功篡改和伪造区块链数据**。简单来说，如果你掌握了 51% 的算力，你自己就把你的非法操作反过来确认为符合规则的。虽然，犯罪成本很高，但是不排除有人出于某种目的，进行这种攻击。

从使用来讲，区块链技术一大特点就是不可逆、不可伪造，但 **前提是私钥是安全的**。私钥是用户身份的唯一证明，没有第三方可以知道你的私钥。一旦私钥被盗取，你无法证明，资产是自身的；一旦丢失，你的资产也会凭空消失，无法找回。

从匿名来讲，规避了监管的同时，可能向节点中加入现实中不可信用户，跟这些用户进行交易后，对方直接“跑路”，是无法追踪到的。

### 监管性

区块链的初衷是没有监管，但是在设计区块链产品时，在制定智能合约时，难免有疏漏。这时，不法分子 **利用漏洞** ，不管使用正规手段还是非正规手段，都可以获利。这种情况下，如果没有监管的存在，是非常危险的，而且危险是不可控的。所以，区块链技术最新的发展趋势中，加入监管是一大话题。当然，这里的监管，不是人为的监管，而是用技术，用程序逻辑去监管。

笔者认为，不论是什么技术，都会有其疏漏的地方。使用程序监管，只能尽量规避漏洞，提高犯罪成本。可成本多高，才能算安全呢？

### 易用性

对于一个技术人员，区块链产品，例如数字货币，使用起来还是没有什么障碍的，但是对于普通人来说还是有一定的学习成本的。例如，当决定加入一个基于区块链技术的金融产品时，你要知道合约到底是什么。这样，理论上你需要在通读并理解智能合约的代码后，才能完全清楚合约内容（听销售人员说，其实会出现信任问题）。不仅仅是读代码，怎么安全地保存自己的私钥，也是存在不小技术成本的地方。甚至，现在比特币所有区块的数据量 **将近 150G**，你如何存储？虽然提供精简模式，才 2~3 G，不过在精简模式下重新扫描、导入钱包、导入地址、导入私钥这些功能都不能用，而且一旦数据出错，必须同步所有数据。同步这么大量的数据，是非常麻烦的。（这里，笔者其实自己有个疑问，如果每个节点都采用精简模式，之前的历史数据会不会都丢了？）

### 网络性

区块链项目的运行依赖于网咯，不管是人为还是非人为造成 **世界级网络的瘫痪**，例如战争、自然灾害，区块链项目将会如何运行？

### 承载性

区块链因为其独特去中心化的验证机制，才保证信息的安全性。不过，也正因为这样，每次交易，所消耗的时间成本也会比一般网络交易要高。仍旧用比特币做例子，以现在的算力和平均的网络传输速度，比特币 **一天** 最多只能支持 **65 万笔** 左右的交易。相比 2017 年支付宝双十一 **25.6 万笔/秒** 的速度，简直是天差地别。

![支付宝2017年双十一支付数据](https://ws1.sinaimg.cn/large/006tKfTcly1fnd595pz5lj30nm0d7dlv.jpg)

### 春哥性

**信春哥，无 Bug**。但是谁能真的保证用区块链技术实现的产品里，没有 Bug。即使是比特币，也出过 Bug。在 2013 年，比特币客户端被升级到 v0.8 版本，允许单个区块能容纳更多的交易频次。不久以后，某个区块的交易次数过多，直接导致该区块一分为二。开发者社区只能对软件进行降级，同时撤销了数小时之内的交易（有些人的币回来了，钱却不退回去）。而且，中本聪在程序中是否留有后门，也是不可知的。

### 小结

区块链作为一个新兴技术，所存在的弊端还是很多的。但是，其中很多缺陷，可以通过技术升级的形式修复或者规避。最主要的，区块链技术不仅仅解决了当前遇到的问题，而且，它更多的初衷是 **面向自由、面向理想进行编程**，这也是区块链技术受大家追捧的原因之一。

有弊端不怕，用技术的方式来解决。这是一个技术从业者应该做的，也愿意做的。

## 总结

任何一个区块链技术文章的作者，几乎都会被问一个问题：“你是否看好比特币？”。笔者的答案是“看戏”，原因是 **当前比特币的优点被放大了，缺点并不被大家所认知，有泡沫**；而同时 **几乎所有缺点都可以通过技术升级的方式修复，在缺点所带来的问题变大之前，通过技术手段修复，也是可以的**。

这里会有人说：“ *世界知名传统银行都在区块链技术上大力布局，投入要超过绝大部分互联网公司，就连传统行业都认可数字货币，数字货币肯定会成为潮流* ”。其实看事情要辩证来看，笔者觉得传统银行更多是因为被互联网金融伤了，这次不想重蹈覆辙，抢先布局而已。而且，笔者想说的是，区块链技术不等于数字货币，更不等于比特币。而且基于信息产业的经济学，更多是一门社会科学，既然是社会科学，就不能排除人、团队、组织、政府的影响。传统银行重视区块链，不一定要做数字货币，很大可能用区块链技术去解决其他的金融问题。

与对数字货币、比特币持保留态度相反，笔者对区块链技术是非常看好的，它不仅仅能解决金融问题，它更能在各个行业发挥作用，解决棘手问题。

![](https://ws4.sinaimg.cn/large/006tKfTcly1fnd5cf8olrj30rs0gojvn.jpg)

对于新技术，每个人都会有自己不同的理解和认知，如果有理解错误的地方，欢迎指正，非常感谢。

在最后，发自肺腑说一句 —— **欢迎拥抱区块链技术！**