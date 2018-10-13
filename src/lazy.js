import { throttle, eventRegister, scrollParent, inBrowser, remove } from './tuil';
import Listener from './listener';

const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default class Lazy {
    constructor() {
        this.defaultOptions = {
            throttleWait: 200,
            preLoad: 1.3,
            listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
            error: DEFAULT_URL,
            loading: DEFAULT_URL
        };
        this.ListenerQueue = [];
        this.TargetQueue = [];
        this.lazyLoadHandler = throttle(this.$lazyLoadHandler.bind(this), this.defaultOptions.throttleWait);
    }
    inintOptions(options) {
        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        };
    }
    add({
        el, src, backgroundImage, options = {}
    }) {
        if (this.ListenerQueue.some(item => item.el === el)) {
            this.update({
                el,
                src,
                backgroundImage,
                options
            });
            return;
        }
        this.inintOptions(options);
        const $parent = scrollParent(el);
        const listener = new Listener({
            el,
            src,
            $parent,
            elRenderer: this.elRenderer,
            options: {
                ...this.defaultOptions,
                backgroundImage
            }
        });
        this.ListenerQueue.push(listener);

        if (inBrowser) {
            this.addListenerTarget(window);
            this.addListenerTarget($parent);
        }
        this.lazyLoadHandler();
    }
    update({
        el, src, backgroundImage, options = {}
    }) {
        const $listenerItem = this.ListenerQueue.find(item => item.el === el);
        this.inintOptions(options);
        $listenerItem && $listenerItem.updata({
            src,
            options: {
                ...this.defaultOptions,
                backgroundImage
            }
        });
        this.lazyLoadHandler();
    }
    remove(el) {
        if (!el) {
            return;
        }
        const $listenerItem = this.ListenerQueue.find(item => item.el === el);
        if ($listenerItem) {
            this.removeListenerTarget($listenerItem.$parent);
            this.removeListenerTarget(window);
            remove(this.ListenerQueue, $listenerItem);
        }
    }
    addListenerTarget(el) {
        let $targetItem = this.TargetQueue.find(target => target.el === el);
        if (!$targetItem) {
            $targetItem = {
                el,
                childrenCount: 1
            };
            this.initListener($targetItem.el, true);
            this.TargetQueue.push($targetItem);
        }
        else {
            ++$targetItem.childrenCount;
        }
    }
    removeListenerTarget(el) {
        this.TargetQueue.forEach((target, index) => {
            if (target.el === el) {
                --target.childrenCount;
                if (!target.childrenCount) {
                    this.initListener(target.el, false);
                    this.TargetQueue.splice(index, 1);
                    target = null;
                }
            }
        });
    }
    initListener(el, start) {
        this.defaultOptions.listenEvents.forEach(evt => {
            eventRegister[start ? 'on' : 'off'](el, evt, this.lazyLoadHandler);
        });
    }
    elRenderer(listener, status) {
        const { el } = listener;
        let src;
        switch (status) {
            case 'loading':
                src = listener.loading;
                break;
            case 'error':
                src = listener.error;
                break;
            default:
                src = listener.src;
                break;
        }
        if (listener.options.backgroundImage) {
            el.style.backgroundImage = `url(${src})`;
        }
        else if (el.getAttribute('src') !== src) {
            el.setAttribute('src', src);
        }
        el.setAttribute('lazy', status);
    }
    $lazyLoadHandler() {
        this.ListenerQueue.forEach(listener => {
            !listener.loaded && listener.checkInView() && listener.load();
        });
    }
}
