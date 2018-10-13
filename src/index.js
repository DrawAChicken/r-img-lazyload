import React, { Component } from 'react';
import LazyClass from './lazy';

const lazy = new LazyClass();

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.tag) {
            const Tag = React.createElement(
                this.props.tag,
                {
                    ref: 'lazyImg',
                    className: this.props.className,
                    onClick: this.props.onClick
                }
            );
            return Tag;
        }
        return <img className={this.props.className} onClick={this.props.onClick} ref="lazyImg" />;
    }
    componentDidMount = () => {
        lazy.add({
            el: this.refs.lazyImg,
            src: this.props.src,
            backgroundImage: !!this.props.tag,
            options: this.props.options
        });
    }
    shouldComponentUpdate(nextProps) {
        lazy.update({
            el: this.refs.lazyImg,
            src: nextProps.src,
            backgroundImage: !!nextProps.tag,
            options: nextProps.options
        });
        return true;
    }
    componentWillUnmount() {
        lazy.remove(this.refs.lazyImg);
    }
}
