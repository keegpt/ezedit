# Zedit
A visual content editor for react.js.

## Roadmap
- Build components for all HTML tags (for now you have to build your own)
- Generic modal to edit content
- useComponent need to return if we are in editing mode

## How to use
```javascript
import { Scope, Zedit } from '@keegpt/zedit';
import { useRef } from 'react';
import Span from './Span';

function App() {
  const formRef = useRef();
  return (
    <Zedit
      ref={formRef}
      initialData={
        {
          section1: {
            text1: 'Hello, world!'
          }
        }}
      onSubmit={(data) => console.log(data)}
    >
      <Scope path="section1">
        <Span name="text1">Default text</Span>
      </Scope>
      <button onClick={() => { console.log(formRef.current.getData()) }}>SAVE</button>
    </Zedit>
  );
}

export default App;

```

## Component Example
```javascript
import React, { useEffect, useRef, useState } from 'react';
import { useComponent } from '@keegpt/zedit';
import Modal from './Modal';

export default function Span({ name, children }) {
    const { componentName, defaultValue = "", registerComponent } = useComponent(name);

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
            clearValue: (value = "") => {
                setValue(value);
            },
        })
    }, [componentName, registerComponent]);

    return (
        <>
            <span onClick={() => setIsModalOpen(true)}>{value || children}</span><br />
            <Modal isOpen={isModalOpen}>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </>
    );
}
```