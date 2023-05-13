'use client'

import { Button } from '@/components/atoms/button'
import { Collapsible, CollapsibleContent } from '@/components/atoms/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import startTransition from '@/utils/transition-api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { FC, KeyboardEvent, useRef, useState } from 'react'
import { DynamicInputList } from './input-list'

export const SchemaDialog: FC = () => {
  const mutation = useMutation<any, any, any, any>({
    mutationFn: (schema) => {
      return axios.post('/api/v1/schema/table', schema)
    },
  })

  const [collapsed, setCollapsed] = useState(false)
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
      setCollapsed(true)
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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Crear entidad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear tabla</DialogTitle>
          <DialogDescription>
            Complete el siguiente formulario para crear una nueva tabla en la
            base de datos
          </DialogDescription>
        </DialogHeader>

        <Collapsible open={collapsed}>
          <fieldset>
            <legend className="hidden">Campos básicos</legend>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                onKeyDown={handleKeyDown}
                type="text"
                id="name"
                aria-required={true}
                className="mt-2"
                name="name"
              />
            </div>
          </fieldset>

          <CollapsibleContent>
            <fieldset className="mt-4 flex flex-col gap-3">
              <Label>Columnas</Label>
              <DynamicInputList
                onDeleteField={(_, v) => setNumOfFields(v)}
                onChange={(_, _2, v) => {
                  setNumOfFields(v)
                }}
                value={numOfFields}
              />
            </fieldset>
          </CollapsibleContent>
        </Collapsible>

        <DialogFooter>
          {collapsed ? (
            <Button>Crear tabla</Button>
          ) : (
            <Button ref={nextRef} onClick={handleNext} variant="default">
              Siguiente
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
