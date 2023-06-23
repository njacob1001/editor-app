'use client'
import { RenderItemValue, Sortable } from '@/components/organism/sortable-grid'
import { rectSortingStrategy } from '@dnd-kit/sortable'
import { FC } from 'react'
import { SortableItem } from './sortable-item'

export const SortableGrid: FC<{ files: RenderItemValue[] }> = ({ files }) => (
  <Sortable
    activationConstraint={{
      distance: 5,
    }}
    items={files}
    adjustScale
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 140,
      height: 200,
    })}
    renderItem={SortableItem as any}
    // collisionDetection={closestCorners}
  />
)
