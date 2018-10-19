import { loadImageAsync } from './tuil';

let imgCache = {}
export default class Listener {
    constructor({
        el, src, $parent, elRenderer, options
    }) {
        this.el = el;
        this.src = src;
        this.error = options.error;
        this.loading = options.loading;
        this.$parent = $parent;
        this.options = options;
        this.elRenderer = elRenderer;

        this.initStatus();
        this.render('loading');
    }
    initStatus() {
        this.status = {
            error: false,
            loaded: false
        };
    }
    load() {
        if (this.status.error) {
            return;
        }
        if (this.status.loaded || imgCache[this.src]) {
            this.render('loaded');
        }
        loadImageAsync({
            src: this.src
        }, () => {
            this.status.loaded = true;
            this.status.error = false;
            this.render('loaded');
            imgCache[this.src] = true;
        }, e => {
            this.status.loaded = false;
            this.status.error = true;
            this.render('error');
        });
    }
    updata({
        src, options
    }) {
        const oldSrc = this.src;
        this.src = src;
        this.loading = options.loading;
        this.error = options.error;
        this.options = options;
        if (oldSrc !== this.src) {
            this.initStatus();
        }
    }
    render(status) {
        this.elRenderer(this, status);
    }
    getRect() {
        this.rect = this.el.getBoundingClientRect();
    }
    checkInView() {
        this.getRect();
        return (this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > 0) &&
            (this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0);
    }
}
