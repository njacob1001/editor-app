import startTransition from '@/utils/transition-api'
import React, { KeyboardEvent, useEffect, useRef } from 'react'
import { InputDropdown } from '../molecules/input-dropdown'

interface InputField {
  name: string
  valueType: string
  id: string
}

interface DynamicInputListProps {
  value: InputField[]
  onChange: (index: number, value: InputField, values: InputField[]) => void
  onDeleteField: (index: number, values: InputField[]) => void
}

export const DynamicInputList: React.FC<DynamicInputListProps> = ({
  value,
  onChange,
  onDeleteField,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleInputChange = (index: number, newValue: string) => {
    const newValues = value.map((field, i) =>
      i === index ? { ...field, name: newValue } : field
    )
    onChange(index, newValues[index], newValues)
  }

  const handleTypeChange = (index: number, newValue: string) => {
    const newValues = value.map((field, i) =>
      i === index ? { ...field, valueType: newValue } : field
    )
    onChange(index, newValues[index], newValues)
  }

  const handleDelete = (index: number) => {
    const newValues = value.filter((_, i) => i !== index)
    onDeleteField(index, newValues)
    if (inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleAddField = (index: number) => {
    const newValues = [
      ...value.slice(0, index + 1),
      { name: '', id: Date.now().toString(), valueType: 'text' },
      ...value.slice(index + 1),
    ]
    onChange(index + 1, newValues[index + 1], newValues)
    setTimeout(() => {
      inputRefs.current[index + 1]?.focus()
    }, 10)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Enter') {
      startTransition(() => {
        handleAddField(index)
      })
    } else if (event.key === 'Backspace' && value[index].name === '') {
      buttonRefs.current[index]?.focus()
    }

    if (event.key === 'ArrowUp') {
      if (index > 0) {
        const ref = inputRefs.current[index - 1]
        ref?.focus()
        setTimeout(() => {
          ref?.setSelectionRange(ref.value.length, ref.value.length)
        }, 1)
      } else {
        const ref = inputRefs.current[0]
        ref?.focus()
        setTimeout(() => {
          ref?.setSelectionRange(ref.value.length, ref.value.length)
        }, 1)
      }
    }

    if (event.key === 'ArrowDown') {
      if (index < value.length - 1) {
        const ref = inputRefs.current[index + 1]
        ref?.focus()
        setTimeout(() => {
          ref?.setSelectionRange(ref.value.length, ref.value.length)
        }, 1)
      } else {
        const ref = inputRefs.current[value.length - 1]
        ref?.focus()
        setTimeout(() => {
          ref?.setSelectionRange(ref.value.length, ref.value.length)
        }, 1)
      }
    }
  }

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="flex flex-col gap-2 mb-2 Dynamic-list">
      {value.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <InputDropdown
            ref={(el) => (inputRefs.current[index] = el)}
            value={field.name}
            onChange={(v: string) => handleInputChange(index, v)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(event, index)
            }
            onTypeChange={(v) => handleTypeChange(index, v)}
            valueType={field.valueType}
          />
          <button
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() =>
              startTransition(() => {
                handleDelete(index)
              })
            }
            type="button"
            className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label={`Delete field number ${index + 1}`}
          >
            <svg
              className="h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 0 0-1.414-1.414L10 8.586 6.707 5.293a1 1 0 0 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 1 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="Button__border"
        onClick={() => handleAddField(value.length - 1)}
      >
        Agregar columna
      </button>
    </div>
  )
}
