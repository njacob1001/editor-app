'use client'
import { Sortable } from '@/components/organism/sortable-grid/sortable-grid'
import { rectSortingStrategy } from '@dnd-kit/sortable'

export const FolderLayout = () => (
  <Sortable
    adjustScale
    strategy={rectSortingStrategy}
    wrapperStyle={() => ({
      width: 140,
      height: 110,
    })}
  />
)
