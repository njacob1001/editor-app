import { SortableGrid } from '@/components/templates/folder-layout/sortable-grid'

export default async function Page() {
  const { content } = await getFiles()
  return (
    <div>
      <strong>home/folder1/folder2</strong>
      <SortableGrid files={content.root as any} />
    </div>
  )
}

function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9) // Genera un ID único de 9 caracteres alfanuméricos
}

function generateSlug(name: string): string {
  const sanitized = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `/overview/entities/${sanitized}`
}

async function getFiles() {
  return {
    content: {
      root: [
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Inventory Summary',
          slug: generateSlug('Inventory Summary'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Product Categories',
          slug: generateSlug('Product Categories'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Inventory Reports',
          slug: generateSlug('Inventory Reports'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Suppliers',
          slug: generateSlug('Suppliers'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Inventory Adjustments',
          slug: generateSlug('Inventory Adjustments'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Warehouse Locations',
          slug: generateSlug('Warehouse Locations'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Stock Transfer',
          slug: generateSlug('Stock Transfer'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Purchase Orders',
          slug: generateSlug('Purchase Orders'),
        },
      ],
    },
  }
}
