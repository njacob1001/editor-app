'use client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  Active,
  Announcements,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MeasuringConfiguration,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  SortableContext,
  SortingStrategy,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { GridContainer } from './components/grid'
import { Item, RenderItemArg } from './components/item'
import { Wrapper } from './components/wrapper'

export interface RenderItemValue<T = string> {
  typeName: T
  id: string
  name: string
  slug: string
}

export interface SortableGridProps {
  handleRemove: (id: string) => Promise<void>
  handleFolding: (id: string, target: string) => Promise<void>
  activationConstraint?: PointerActivationConstraint
  animateLayoutChanges?: AnimateLayoutChanges
  adjustScale?: boolean
  collisionDetection?: CollisionDetection
  coordinateGetter?: KeyboardCoordinateGetter
  dropAnimation?: DropAnimation | null
  getNewIndex?: NewIndexGetter
  handle?: boolean
  items: RenderItemValue[]
  measuring?: MeasuringConfiguration
  modifiers?: Modifiers
  renderItem?: (args: RenderItemArg) => React.ReactElement
  removable?: boolean
  reorderItems?: typeof arrayMove
  strategy?: SortingStrategy
  style?: React.CSSProperties
  useDragOverlay?: boolean
  getItemStyles?(args: {
    id: UniqueIdentifier
    index: number
    isSorting: boolean
    isDragOverlay: boolean
    overIndex: number
    isDragging: boolean
  }): React.CSSProperties
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null
    index: number
    isDragging: boolean
    id: UniqueIdentifier
  }): React.CSSProperties
  isDisabled?(id: RenderItemValue): boolean
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
}

export const Sortable: FC<SortableGridProps> = ({
  handleFolding,
  handleRemove: handleRemoveAsync,
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  items: initialItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}) => {
  const [items, setItems] = useState(initialItems)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior:
        typeof window !== 'undefined' && 'Cypress' in window
          ? 'auto'
          : undefined,
      coordinateGetter,
      keyboardCodes: {
        start: ['Space'],
        cancel: ['Escape'],
        end: ['Space'],
      },
    })
  )

  const isFirstAnnouncement = useRef(true)

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id)

  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1

  const activeIndex = activeId ? getIndex(activeId) : -1

  const removeItemById = (id: string) =>
    setItems((items) => items.filter((item) => item.id !== id))

  const handleRemove = async (id: UniqueIdentifier) => {
    await handleRemoveAsync(id as string)
    removeItemById(id as string)
  }

  const onFolding = async (id: string, target: string) => {
    removeItemById(id)
    await handleFolding(id, target)
  }

  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        items.length
      }`
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false
        return
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${items.length}`
      }

      return
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${items.length}`
      }

      return
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${items.length}.`
    },
  }

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true
    }
  }, [activeId])

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return
        }

        setActiveId(active.id)
      }}
      onDragEnd={({ over }) => {
        setActiveId(null)
        const draggedId = items[activeIndex]?.id
        const targetId = over?.id
        if (targetId && `${targetId}`.startsWith('folder') && draggedId) {
          console.log(items[activeIndex])

          onFolding(draggedId, targetId as string)
          return
        }

        if (over) {
          console.log(over, items[activeIndex])
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            setItems((items) => reorderItems(items, activeIndex, overIndex))
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style}>
        <SortableContext items={items} strategy={strategy}>
          <GridContainer>
            {items.map((value, index) => (
              <SortableItem
                key={value.id}
                id={value.id}
                value={value}
                handle={handle}
                index={index}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                disabled={isDisabled(value)}
                renderItem={renderItem}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </GridContainer>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  value={items[activeIndex]}
                  handle={handle}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex]?.id,
                  })}
                  style={getItemStyles({
                    id: items[activeIndex]?.id,
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  )
}

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges
  disabled?: boolean
  getNewIndex?: NewIndexGetter
  id: UniqueIdentifier
  index: number
  handle: boolean
  useDragOverlay?: boolean
  onRemove?(id: UniqueIdentifier): void

  style(values: any): React.CSSProperties
  renderItem?(args: any): React.ReactElement
  wrapperStyle: SortableGridProps['wrapperStyle']
  value: RenderItemValue
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  index,
  onRemove,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
  value,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
    data: value,
  })

  return (
    <Item
      ref={setNodeRef}
      value={value}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  )
}
