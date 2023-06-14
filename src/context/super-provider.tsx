import { FC, ReactNode } from 'react'
import { SchemaContextProvider } from './schema'

export const SuperContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => <SchemaContextProvider>{children}</SchemaContextProvider>
