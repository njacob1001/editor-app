'use client'

import { ButtonCloseBorderless } from '@/components/atoms/buttons/button-close-borderless'
import { DynamicInputList } from '@/components/organism/input-list'
import startTransition from '@/utils/transition-api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FC, KeyboardEvent, useRef, useState } from 'react'

interface DialogProps {
  open: boolean
  onClose: () => void
}

export const Dialog: FC<DialogProps> = ({ open, onClose }) => {
  const mutation = useMutation<any, any, any, any>({
    mutationFn: (schema) => {
      return axios.post('/api/v1/schema/table', schema)
    },
  })

  const [step, setStep] = useState(1)
  const [numOfFields, setNumOfFields] = useState([
    { name: '', id: 'randomid', valueType: 'text' },
  ])

  const nextRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      nextRef.current?.focus()
    }
  }

  const handleNext = () => {
    startTransition(() => {
      setStep(2)
    })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      name: event.currentTarget.name,
      fields: numOfFields,
    })
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          role="button"
          aria-label="Close modal"
          onClick={onClose}
        />
      )}
      <dialog
        className="fixed inset-0 overflow-hidden z-10"
        role="dialog"
        open={open}
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex justify-between">
          <h2 className="Form-title">Crear tabla</h2>
          <ButtonCloseBorderless onClick={onClose} />
        </div>
        <div>
          <p id="modal-description" className="Form-description">
            Complete el siguiente formulario para crear una nueva tabla en la
            base de datos
          </p>
          <form className="mt-4 flex flex-col" onSubmit={onSubmit}>
            <fieldset>
              <legend className="hidden">Campos básicos</legend>
              <div>
                <label htmlFor="name" className="Form-label">
                  Nombre
                </label>
                <input
                  onKeyDown={handleKeyDown}
                  type="text"
                  id="name"
                  aria-required={true}
                  className="Form-input"
                  name="name"
                />
              </div>

              <button
                ref={nextRef}
                onClick={handleNext}
                className={`Button mt-4 ${step === 2 && 'hidden'}`}
                type="button"
                aria-label="Siguiente: mostrar campos adicionales"
              >
                Siguiente
              </button>
            </fieldset>

            {step === 2 && (
              <>
                <fieldset className="mt-4 flex flex-col">
                  <legend className="Form-label">Columnas</legend>

                  <DynamicInputList
                    onDeleteField={(_, v) => setNumOfFields(v)}
                    onChange={(_, _2, v) => {
                      console.log(v)
                      setNumOfFields(v)
                    }}
                    value={numOfFields}
                  />
                </fieldset>
                <button type="submit" className="Button mt-4">
                  Crear tabla
                </button>
              </>
            )}
          </form>
        </div>
      </dialog>
    </>
  )
}
