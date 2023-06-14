'use client'
import { SchemaController } from '@/services/input-ports'
import { SchemaServie } from '@/services/schema'
import { webClient } from '@/utils/http'
import { FC, ReactNode, createContext } from 'react'

const schemaService = new SchemaServie(webClient)

const schemaContext = createContext<SchemaController>(schemaService)

const { Provider } = schemaContext

export const SchemaContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => <Provider value={schemaService}>{children}</Provider>
