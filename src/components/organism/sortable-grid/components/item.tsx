'use client'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'
import classNames from 'classnames'
import { Box } from 'lucide-react'
import React, { useEffect } from 'react'
import { RenderItemValue } from '../sortable-grid'
import styles from './item.module.css'

export interface RenderItemArg {
  dragOverlay: boolean
  dragging: boolean
  sorting: boolean
  index: number | undefined
  fadeIn: boolean
  listeners: DraggableSyntheticListeners
  ref: React.Ref<HTMLElement>
  style: React.CSSProperties | undefined
  transform: Props['transform']
  transition: Props['transition']
  value: Props['value']
  color?: string
}

export interface Props {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  value: RenderItemValue
  onRemove?(): void
  renderItem?(args: RenderItemArg): React.ReactElement
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      const buildInClasses = classNames(
        styles.Wrapper,
        fadeIn && styles.fadeIn,
        sorting && styles.sorting,
        dragOverlay && styles.dragOverlay
      )

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
          color,
        })
      ) : (
        <li
          className={`${buildInClasses} border`}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {/* <Folder
              className="w-16 h-16 text-gray-400 fill-gray-400"
              strokeWidth={1}
            /> */}
            <Box className="w-14 h-14 text-gray-400" strokeWidth={1} />

            <span className="text-gray-900">{value.name}</span>

            <span className="flex absolute top-2 right-2">
              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size={'s'}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onRemove}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              {/* {onRemove ? (
                  <Remove className={styles.Remove} onClick={onRemove} />
                ) : null}
                {handle ? <Handle {...handleProps} {...listeners} /> : null} */}
            </span>
          </div>
        </li>
      )
    }
  )
)
