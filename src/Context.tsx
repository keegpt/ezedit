import { createContext } from 'react';
import { ZeditContext } from './types';

export const Context = createContext<ZeditContext>({} as ZeditContext);