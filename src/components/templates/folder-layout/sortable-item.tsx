'use client'
import { RenderItemArg } from '@/components/organism/sortable-grid/components/item'
import styles from '@/components/organism/sortable-grid/components/item.module.css'
import { navigationContext } from '@/context'
import classNames from 'classnames'
import { Box, Folder } from 'lucide-react'
import { FC, useContext } from 'react'
import { ConditionalDropable } from './conditional-dropable'

// TODO: validate if memo is required
export const SortableItem: FC<RenderItemArg> = ({
  dragOverlay,
  dragging,
  sorting,
  index,
  fadeIn,
  listeners,
  ref,
  style,
  transform,
  transition,
  color,
  value,
}) => {
  const navController = useContext(navigationContext)

  const buildInClasses = classNames(
    styles.Wrapper,
    fadeIn && styles.fadeIn,
    sorting && styles.sorting,
    dragOverlay && styles.dragOverlay
  )

  const handleOen = () => {
    navController.openFolder(value.slug)
  }

  return (
    <li
      className={`${buildInClasses} border`}
      style={
        {
          width: 140,
          height: 140,
          transition: [transition].filter(Boolean).join(', '),
          '--translate-x': transform
            ? `${Math.round(transform.x)}px`
            : undefined,
          '--translate-y': transform
            ? `${Math.round(transform.y)}px`
            : undefined,
          '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
          '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
          '--index': index,
          '--color': color,
        } as React.CSSProperties
      }
      ref={ref as any}
    >
      <div
        onDoubleClick={handleOen}
        className={classNames(
          styles.Item,
          dragging && styles.dragging,
          dragOverlay && styles.dragOverlay,
          color && styles.color
        )}
        style={style}
        data-cypress="draggable-item"
        {...listeners}
        // {...props}
        tabIndex={0}
      >
        <ConditionalDropable
          shouldRenderDropable={value.typeName === 'folder'}
          id={`folder-${value.id}`}
        >
          {value.typeName === 'file' ? (
            <Box className="w-11 h-11 text-gray-400" strokeWidth={1} />
          ) : (
            <Folder
              className="w-12 h-12 text-gray-400 fill-gray-400"
              strokeWidth={1}
            />
          )}
        </ConditionalDropable>

        <span className="flex h-10 text-gray-900 break-words flex-wrap whitespace-break-spaces text-ellipsis text-center leading-tight">
          {value.name}
        </span>

        <span className="flex absolute top-2 right-2"></span>
      </div>
    </li>
  )
}
