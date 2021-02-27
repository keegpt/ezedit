import * as dot from 'dot-object';
import * as React from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Context } from '.';
import { ZeditComponent, ZeditHandles, ZeditProps } from './types';

const Zedit: React.ForwardRefRenderFunction<ZeditHandles, ZeditProps> = ({ initialData = {}, children }, formRef) => {
    const components = useRef<ZeditComponent[]>([]);

    const getComponentByName = useCallback(
        componentName =>
            components.current.find((component: any) => component.name === componentName),
        []
    )

    const getComponentValue = useCallback(({ getValue }) => {
        if (getValue) {
            return getValue();
        }
    }, [])

    const setComponentValue = useCallback(
        ({ setValue }, value) => {
            if (setValue) {
                return setValue(value)
            }
        },
        []
    )

    const clearComponentValue = useCallback(
        ({ clearValue }) => {
            if (clearValue) {
                return clearValue()
            }
        },
        []
    )

    const reset = useCallback((data = {}) => {
        components.current.forEach(({ name, clearValue }) => {
            if (clearValue) {
                return clearValue(data[name])
            }
        })
    }, [])

    const setData = useCallback(
        (data) => {
            const componentValue: any = {};

            components.current.forEach(component => {
                componentValue[component.name] = dot.pick(component.name, data)
            })

            Object.entries(componentValue).forEach(([componentName, value]) => {
                const component = getComponentByName(componentName)

                if (component) {
                    setComponentValue(component, value)
                }
            })
        },
        [getComponentByName, setComponentValue]
    )

    const parseData = useCallback(() => {
        const data: any = {}

        components.current.forEach(component => {
            data[component.name] = getComponentValue(component)
        })

        dot.object(data)

        return data
    }, [getComponentValue])

    const registerComponent = useCallback((component) => {
        components.current.push(component)
    }, [])

    const unregisterComponent = useCallback((componentName) => {
        const componentIndex = components.current.findIndex(
            component => component.name === componentName
        )

        if (componentIndex > -1) {
            components.current.splice(componentIndex, 1)
        }
    }, [])

    useImperativeHandle<{}, ZeditHandles>(formRef, () => ({
        getComponentValue(componentName: string) {
            const component = getComponentByName(componentName)

            if (!component) {
                return false
            }

            return getComponentValue(component)
        },
        setComponentValue(componentName: string, value: any) {
            const component = getComponentByName(componentName)

            if (!component) {
                return false
            }

            return setComponentValue(component, value)
        },
        clearComponent(componentName: string) {
            const component = getComponentByName(componentName)

            if (component) {
                clearComponentValue(component)
            }
        },
        getData() {
            return parseData()
        },
        setData(data: any) {
            return setData(data)
        },
        reset(data: any) {
            return reset(data)
        },
    }))

    return (
        <Context.Provider
            value={{
                initialData,
                scopePath: '',
                registerComponent,
                unregisterComponent,
            }
            }
        >
            { children}
        </Context.Provider>
    )
}

export const Provider = forwardRef(Zedit)