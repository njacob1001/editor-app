'use client'
import { FC } from 'react'
import { WrapperComponent } from '../types'
import { Dropable, DropableProps } from './dropable'

interface ConditionalDropableProps extends WrapperComponent, DropableProps {
  shouldRenderDropable: boolean
}
export const ConditionalDropable: FC<ConditionalDropableProps> = ({
  children,
  shouldRenderDropable,
  ...dropableProps
}) => {
  return shouldRenderDropable ? (
    <Dropable {...dropableProps}>{children}</Dropable>
  ) : (
    <div className={dropableProps.className}>{children}</div>
  )
}
