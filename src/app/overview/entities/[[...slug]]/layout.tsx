import { FolderLayout } from '@/components/templates/folder-layout'
import { WrapperComponent } from '@/components/templates/types'

export default function Layout({ children }: WrapperComponent) {
  return (
    <FolderLayout
      slug={[
        {
          name: 'Home',
          slug: '/overview/entities',
        },
        {
          name: 'Folder 1',
          slug: '/overview/entities/folder1',
        },
        {
          name: 'Folder 2',
          slug: '/overview/entities/folder2',
        },
      ]}
    >
      {children}
    </FolderLayout>
  )
}
