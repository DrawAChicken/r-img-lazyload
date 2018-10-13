# react-img-lazyload

[![npm version](https://img.shields.io/npm/v/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)
[![npm downloads](https://img.shields.io/npm/dm/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)
[![npm license](https://img.shields.io/npm/l/vue-lazyload.svg?style=flat-square)](https://www.npmjs.com/package/r-img-lazyload)


React module for lazy-loading images in your react.js applications. Some of goals of this project worth noting include:

* Based on [vue-lazyLoad](https://github.com/hilongjw/vue-lazyload) rewriting
* Be lightweight, powerful and easy to use
* Work on any image type
* Add loading class while image is loading
* Applicable to any style of layout
* Supports both of React

# Installation

## npm

```bash

$ npm install r-img-lazyload

```
# Usage
use `component` work

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
use `raw HTML` work

```js
    <Lazyload src="http://xxxx.com/pic.png" tag="div" />
```
recommend `Package component` to use

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
## Constructor Options
| key | description | default | options |
| :-: | :-: | :-: | :-: |
| src | Picture address | ‘’ | String |
| tag |  Background image using the label | ‘’ | String |
| options |  Other configuration | {} | [Other configuration](#othercon-figuration) |

### Other configuration
| key | description | default | options |
| :-: | :-: | :-: | :-: |
| error | src of the image upon load fail | ‘’ | String |
| loading | src of the image while loading | ‘’ | String |
| listenEvents |  events that you want React listen for | `['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'`] | String |
| throttleWait |  throttle wait | 200 |Number|

### Desired Listen Events

You can configure which events you want v-img-lazyload by passing in an array
of listener names.

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
                // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
                listenEvents: [ 'scroll' ]
            },
            src: ''
        };
        return <Lazyload {...config} />;
    }
}
```
This is useful if you are having trouble with this plugin resetting itself to loading when you have certain animations and transitions taking place

# Todo
* [ ] observer
* [ ] life cycle

# License

[The MIT License](http://opensource.org/licenses/MIT)



