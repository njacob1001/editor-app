'use-client'
import { Inter } from 'next/font/google'
import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  value: string
  valueType: string
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange: (value: string) => void
  onTypeChange: (value: string) => void
}

export const InputDropdown = forwardRef<HTMLInputElement, Props>(
  function InputDropdown(
    { value, onChange, valueType, onTypeChange, onKeyDown },
    ref
  ) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    }
    const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onTypeChange(event.target.value)
    }
    return (
      <div className="grow">
        <label
          htmlFor="price"
          className={`${inter.className} hidden block text-sm font-medium leading-6 text-gray-900`}
        >
          Column
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">#</span>
          </div>
          <input
            onChange={handleChange}
            onKeyDown={onKeyDown}
            value={value}
            ref={ref}
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nombre de la columna"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              value={valueType}
              onChange={handleTypeChange}
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>Texto</option>
              <option>Numero</option>
              <option>Binario</option>
              <option>Fecha</option>
              <option>Hora</option>
              <option>Fecha y hora</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
)
