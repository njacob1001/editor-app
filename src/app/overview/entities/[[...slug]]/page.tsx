import { SortableGrid } from '@/components/templates/folder-layout/sortable-grid'

export default async function Page() {
  const { content } = await getFiles()
  return (
    <div>
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
      slug: ['inventory'],
      root: [
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Sales Orders',
          slug: generateSlug('Sales Orders'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Inventory',
          slug: generateSlug('Inventory'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Purchase Orders',
          slug: generateSlug('Purchase Orders'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Customers',
          slug: generateSlug('Customers'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Invoices',
          slug: generateSlug('Invoices'),
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
          name: 'Accounting',
          slug: generateSlug('Accounting'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Production',
          slug: generateSlug('Production'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Payroll',
          slug: generateSlug('Payroll'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Reports',
          slug: generateSlug('Reports'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Expenses',
          slug: generateSlug('Expenses'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Assets',
          slug: generateSlug('Assets'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'HR Management',
          slug: generateSlug('HR Management'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Projects',
          slug: generateSlug('Projects'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'CRM',
          slug: generateSlug('CRM'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Procurement',
          slug: generateSlug('Procurement'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Quality Control',
          slug: generateSlug('Quality Control'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Documents',
          slug: generateSlug('Documents'),
        },
        {
          typeName: 'file',
          id: generateUniqueId(),
          name: 'Support Tickets',
          slug: generateSlug('Support Tickets'),
        },
        {
          typeName: 'folder',
          id: generateUniqueId(),
          name: 'Settings',
          slug: generateSlug('Settings'),
        },
      ],
    },
  }
}
