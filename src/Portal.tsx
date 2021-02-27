import * as React from 'react';
import * as ReactDOM from 'react-dom';

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

class Portal extends React.Component {
    defaultNode: any;

    componentWillUnmount() {
        if (this.defaultNode) {
            document.body.removeChild(this.defaultNode);
        }
        this.defaultNode = null;
    }

    render() {
        if (!canUseDOM) {
            return null;
        }
        if (!this.defaultNode) {
            this.defaultNode = document.createElement('div');
            this.defaultNode.setAttribute("style", "position: fixed; top:0; bottom:0; left:0; right:0; pointer-events: none;");
            document.body.appendChild(this.defaultNode);
        }
        return ReactDOM.createPortal(
            this.props.children,
            this.defaultNode
        );
    }
}

export default Portal;