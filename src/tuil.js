// /* eslint-disable*/
const inBrowser = typeof window !== 'undefined';

const style = (el, prop) => (typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop]);
const overflow = el => style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x');

const scrollParent = el => {
    if (!inBrowser) {
        return false;
    }
    if (!(el instanceof HTMLElement)) {
        return window;
    }
    let parent = el;
    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break;
        }
        if (!parent.parentNode) {
            break;
        }
        if (/(scroll|auto)/.test(overflow(parent))) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return window;
};
function throttle (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
        if (timeout) {
            return
        }
        let elapsed = Date.now() - lastRun
        let context = this
        let args = arguments
        let runCallback = function () {
                lastRun = Date.now()
                timeout = false
                action.apply(context, args)
            }
        if (elapsed >= delay) {
            runCallback()
        }
        else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}
function testSupportsPassive() {
    if (!inBrowser) {
        return false;
    }
    let support = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get() {
                support = true;
            }
        });

        window.addEventListener('test', null, opts);
    }
    catch (e) { }
    return support;
}
const eventRegister = {
    on(el, type, func, capture = false) {
        if (testSupportsPassive()) {
            el.addEventListener(type, func, {
                capture,
                passive: true
            });
        }
        else {
            el.addEventListener(type, func, capture);
        }
    },
    off(el, type, func, capture = false) {
        el.removeEventListener(type, func, capture);
    }
};

const loadImageAsync = (item, resolve, reject) => {
    if (!item.src) {
        reject('img path is require');
        return;
    }
    const image = new Image();
    image.src = item.src;
    image.onload = () => {
        resolve({
            naturalHeight: image.naturalHeight,
            naturalWidth: image.naturalWidth,
            src: image.src
        });
    };
    image.onerror = e => {
        reject(e);
    };
};
function remove(arr, item) {
    if (!arr.length) {
        return;
    }
    const index = arr.indexOf(item);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
export {
    throttle,
    remove,
    style,
    inBrowser,
    eventRegister,
    scrollParent,
    loadImageAsync
};

