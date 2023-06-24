import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { WrapperComponent } from '../types'

export interface DropableProps extends WrapperComponent {
  id?: string
  className?: string
  data: Object
}

export const Dropable: FC<DropableProps> = ({
  children,
  id = '',
  className,
  data,
}) => {
  const { setNodeRef } = useDroppable({
    id,
    data,
  })

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  )
}
