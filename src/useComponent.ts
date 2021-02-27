import * as dot from 'dot-object';
import { useContext, useEffect, useMemo } from 'react';
import { Context } from '.';
import { ZeditContext } from './types';

export function useComponent(name: string) {
    const {
        initialData,
        scopePath,
        unregisterComponent,
        registerComponent,
    } = useContext<ZeditContext>(Context);

    if (!name) {
        throw new Error('You need to provide the "name" prop.')
    }

    const componentName = useMemo(() => {
        return scopePath ? `${scopePath}.${name}` : name
    }, [name, scopePath]);

    const defaultValue = useMemo(() => {
        return dot.pick(componentName, initialData)
    }, [componentName, initialData]);

    useEffect(() => () => unregisterComponent(componentName), [
        componentName,
        unregisterComponent,
    ]);

    return {
        componentName,
        registerComponent,
        defaultValue
    }
}