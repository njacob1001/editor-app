'use client'
import { RenderItemValue, Sortable } from '@/components/organism/sortable-grid'
import { schemaContext } from '@/context'
import { rectSortingStrategy } from '@dnd-kit/sortable'
import { FC, useContext } from 'react'
import { SortableItem } from './sortable-item'

export const SortableGrid: FC<{ files: RenderItemValue[] }> = ({ files }) => {
  const service = useContext(schemaContext)

  const handleRemove = async (id: string) => {
    await service.deleteSchema(id)
  }

  const handleFolding = async (id: string, target: string) => {
    await service.moveToFolder(id, target)
  }

  return (
    <Sortable
      handleRemove={handleRemove}
      handleFolding={handleFolding}
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
      removable
    />
  )
}
