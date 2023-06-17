'use client'

import { schemaContext } from '@/context'
import { useContext } from 'react'
import AsyncSelect from 'react-select/async'

export const SearchBox = () => {
  const service = useContext(schemaContext)

  const promiseOptions = (inputValue: string) =>
    new Promise<any>((resolve) => {
      setTimeout(() => {
        service.searchListing('entities', inputValue)
        resolve([])
      }, 1000)
    })

  return (
    <AsyncSelect
      className="max-w-md w-full"
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
    />
  )
}
