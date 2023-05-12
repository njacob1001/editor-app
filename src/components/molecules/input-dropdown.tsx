'use-client'
import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import { Input } from '../atoms/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../atoms/select'

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
    const handleTypeChange = (newValueType: string) => {
      onTypeChange(newValueType)
    }
    return (
      <div className="grow">
        <label
          htmlFor="price"
          className="hidden text-sm font-medium leading-6 text-gray-900"
        >
          Column
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">#</span>
          </div>
          <Input
            onChange={handleChange}
            onKeyDown={onKeyDown}
            value={value}
            ref={ref}
            type="text"
            name="price"
            id="price"
            className="w-full pl-7 pr-20 text-gray-900 sm:leading-6"
            placeholder="Nombre de la columna"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Tipo de dato
            </label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger className="min-w-[80px] border-none focus:border-none focus:outline-none ">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="number">Numero</SelectItem>
                <SelectItem value="bool">Binario</SelectItem>
                <SelectItem value="date">Fecha</SelectItem>
                <SelectItem value="time">Hora</SelectItem>
                <SelectItem value="timestamp">Hora Y Fecha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    )
  }
)
