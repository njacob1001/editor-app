import { FolderLayout } from '@/components/templates/folder-layout/folder-layout'
import { SearchBox } from './search'

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <SearchBox />

      <FolderLayout />
      {/* <Database
        className="mr-2 h-24 w-24 text-muted-foreground"
        strokeWidth={1}
      />
      <h1 className="txt-muted max-w-sm text-center">
        Empieza a crear entidades que seran almacenadas en una base de datos
      </h1>
      <SchemaDialog /> */}
    </div>
  )
}
