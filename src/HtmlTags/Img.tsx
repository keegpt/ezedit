import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import Modal from "../Modal";
import { useComponent } from "../useComponent";

export default function Span({ name, src = "#", ...props }: { name: string, src: string }) {
    const { componentName, defaultValue = src, registerComponent } = useComponent(name);

    const valueRef = useRef(defaultValue);
    const [value, setValue] = useState(defaultValue);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    useEffect(() => {
        registerComponent({
            name: componentName,
            getValue: () => {
                return valueRef.current;
            },
            setValue: (value) => {
                setValue(value);
            },
            clearValue: (value = "#") => {
                setValue(value);
            },
        })
    }, [componentName, registerComponent]);

    return (
        <>
            <img src={value} onClick={() => setIsModalOpen(true)} {...props} />
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
            </Modal>
        </>
    );
}