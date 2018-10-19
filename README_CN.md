# react-img-lazyload

[![npm version](https://img.shields.io/npm/v/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)
[![npm downloads](https://img.shields.io/npm/dm/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)
[![npm license](https://img.shields.io/npm/l/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)


用于React的图片懒加载库:

* 基于 [vue-lazyLoad](https://github.com/hilongjw/vue-lazyload) 改写
* 轻巧、功能强大且很方便使用
* 适用于任何图片类型
* 适用于任何布局

# 安装依赖

## npm

```bash

$ npm install r-img-lazyload

```
# 使用
直接引用就可以使用

```js
import React, { Component } from 'react';
import Lazyload from 'r-img-lazyload';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const config = {
            options: {
                error: 'errorPic',
                loading: 'loadingPic'
            },
            src: ''
        };
        return <Lazyload {...config} />;
    }
}
```
添加 `tag` 可改变编译后的DOM，图像会成为DOM背景图

```js
    <Lazyload src="http://xxxx.com/pic.png" tag="div" />
```
推荐封装后使用，适用于全局的loading图片和error图片统一处理

```js
// Lazy.jsx
import React, { Component } from 'react';
import Lazyload from 'r-img-lazyload';

const pic = require('xxxx/assets/img/defalut_pic.png');

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const config = {
            options: {
                error: pic,
                loading: pic
            },
            ...this.props
        };
        return <Lazyload {...config} />;
    }
}
// HomePage.jsx
import React, { Component } from 'react';
import Lazy form 'xxx/Lazy.jsx';

function HomePage() {
    return <lazy className="pic" src="xxxx.png" onClick="// todo..."/>
}

```
## 主要配置
| key | description | default | options |
| :-: | :-: | :-: | :-: |
| src | 图片地址 | ‘’ | String |
| tag | 指定生成为某个DOM为其添加背景 | ‘’ | String |
| options |  其他配置项 | {} | [Other configuration](#othercon-figuration) |

### 其他配置
| key | description | default | options |
| :-: | :-: | :-: | :-: |
| error | 加载失败后展示的图像 | ‘’ | String |
| loading | 加载中展示的图像 | ‘’ | String |
| listenEvents |  事件监听 | `['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'`] | Object |
| throttleWait |  节流等待时间 | 200 |Number|

### 事件监听

您可以通过传入数组来配置您想要v-img-lazyload的事件监听的名字。

```js
import React, { Component } from 'react';
import Lazyload from 'r-img-lazyload';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const config = {
            options: {
                error: 'errorPic',
                loading: 'loadingPic',
                // 默认为 ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
                listenEvents: [ 'scroll' ]
            },
            src: ''
        };
        return <Lazyload {...config} />;
    }
}
```
### CSS 状态
图片加载时有三种状态`loading`、`loaded` 、`error`

```html
<img src="imgUrl" lazy="loading">
<img src="imgUrl" lazy="loaded">
<img src="imgUrl" lazy="error">
```

```css
<style>
  img[lazy=loading] {
    /*your style here*/
  }
  img[lazy=error] {
    /*your style here*/
  }
  img[lazy=loaded] {
    /*your style here*/
  }
  /*
  or background-image
  */
  .yourclass[lazy=loading] {
    /*your style here*/
  }
  .yourclass[lazy=error] {
    /*your style here*/
  }
  .yourclass[lazy=loaded] {
    /*your style here*/
  }
</style>
```
# Todo
* [ ] observer
* [ ] life cycle

# License

[The MIT License](http://opensource.org/licenses/MIT)



