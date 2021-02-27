import * as React from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Context, Provider } from '.';
import { ZeditHandles, ZeditProps } from './types';

const Zedit: ForwardRefRenderFunction<ZeditHandles, ZeditProps> = ({ initialData = {}, children }, formRef) => {
    return (
        <Provider ref={formRef} initialData={initialData} >
            <Context.Consumer>
                {() => children}
            </Context.Consumer>
        </Provider>
    )
}

export default forwardRef(Zedit);