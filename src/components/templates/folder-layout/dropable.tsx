import { useDroppable } from '@dnd-kit/core'
import { FC } from 'react'
import { WrapperComponent } from '../types'

export interface DropableProps extends WrapperComponent {
  id?: string
  className?: string
}

export const Dropable: FC<DropableProps> = ({
  children,
  id = '',
  className,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  )
}
