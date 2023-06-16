import { FolderLayout } from '@/components/templates/folder-layout'
import { WrapperComponent } from '@/components/templates/types'

export default function Layout({ children }: WrapperComponent) {
  return <FolderLayout>{children}</FolderLayout>
}
