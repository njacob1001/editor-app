import { Button } from '@/components/atoms/button'
import { SearchBox } from '@/components/organism/search-input/search'
import { Copy, FolderPlus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { WrapperComponent } from '../types'
import styles from './folder-layout.module.css'

// design ui https://dribbble.com/shots/5947832-File-Manager-App-UI

interface FolderLayoutProps extends WrapperComponent {
  slug: Array<{ slug: string; name: string }>
}

export const FolderLayout: FC<FolderLayoutProps> = ({ children, slug }) => (
  <>
    <div className="flex justify-between py-2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Button variant="default">
            <Plus className="mr-2 h-5 w-5" />
            Crear
          </Button>
          <Button variant="ghost">
            <FolderPlus className="w-5 h-5" />
          </Button>
          <Button variant="ghost">
            <Trash2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost">
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <SearchBox />
    </div>

    <div className="flex gap-2 mb-5 mt-1">
      {slug.map((item) => (
        <Link className={styles['Slug-item']} key={item.slug} href={item.slug}>
          {item.name}
        </Link>
      ))}
    </div>

    {children}
  </>
)
