import { FC } from 'react'
import { WrapperComponent } from '../types'
import { SearchBox } from './search'

export const FolderLayout: FC<WrapperComponent> = ({ children }) => (
  <div className="w-full h-full flex flex-col px-4 py-4">
    <SearchBox />
    <h2 className="txt-h3 pt-6 pb-2">Entidades</h2>
    {children}
  </div>
)
