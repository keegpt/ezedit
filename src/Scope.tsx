import * as React from 'react';
import { ReactNode, useContext } from 'react';
import { Context } from './Context';

export function Scope({ path, children }: { path: string, children: ReactNode }) {
    const { scopePath, ...rest } = useContext(Context)

    return (
        <Context.Provider
            value={{
                ...rest,
                scopePath: scopePath.concat(scopePath ? `.${path}` : path),
            }}
        >
            {children}
        </Context.Provider>
    )
}