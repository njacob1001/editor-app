'use client'
import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { WrapperComponent } from '../types'

export interface DropableProps extends WrapperComponent {
  id?: string
  className?: string
  data: Object
  DragOverRender: FC
}

export const Dropable: FC<DropableProps> = ({
  children,
  id = '',
  className,
  data,
  DragOverRender,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data,
  })

  return (
    <div ref={setNodeRef} className={className}>
      {isOver ? <DragOverRender /> : children}
    </div>
  )
}
