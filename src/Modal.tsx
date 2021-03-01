import * as React from 'react';
import Draggable from 'react-draggable';
import Portal from './Portal';

function Modal({ children, isOpen, onRequestClose }: { children: React.ReactNode, isOpen: boolean, onRequestClose: () => void }) {
    const nodeRef = React.useRef(null);

    return (
        isOpen ?
            <Portal>
                <div style={{ pointerEvents: "all" }}>
                    <Draggable
                        nodeRef={nodeRef}
                        handle=".handle"
                        defaultPosition={{ x: 0, y: 0 }}
                    >
                        <div ref={nodeRef}>
                            <div className="handle">DRAG</div><br />
                            <div onClick={onRequestClose}>CLOSE</div><br />
                            {children}
                        </div>
                    </Draggable>
                </div>
            </Portal>
            :
            <></>
    );
}

export default Modal;
