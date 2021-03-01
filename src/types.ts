import { ReactNode } from 'react';

interface BaseZeditComponent<T> {
  name: string;
  setValue?: (value: T) => void;
  clearValue?: (newValue: T) => void;
}

export interface PathZeditComponent<T> extends BaseZeditComponent<T> {
  path: string;
  getValue?: undefined;
}

export interface FunctionZeditComponent<T> extends BaseZeditComponent<T> {
  path?: undefined;
  getValue: (ref: any) => T;
}

export type ZeditComponent<T = any> = PathZeditComponent<T> | FunctionZeditComponent<T>;

export interface ZeditContext {
  initialData: Record<string, any>;
  scopePath: string;
  registerComponent<T>(component: ZeditComponent<T>): void;
  unregisterComponent: (name: string) => void;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ZeditHandles {
  getComponentValue(componentName: string): any;
  setComponentValue(componentName: string, value: any): void | boolean;
  clearComponent(componentName: string): void;
  getData(): Record<string, any>;
  setData(data: Record<string, any>): void;
}
export interface ZeditProps {
  initialData?: Record<string, any>;
  children: ReactNode;
}
