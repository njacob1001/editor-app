import { FC } from 'react'
import { WrapperComponent } from '../types'
import { BrandThumbnail } from './brand'
import { NavigationList, NavigationListProps } from './navigation-list'

interface OverviewTemplate extends WrapperComponent {
  navigationList: NavigationListProps
  brandImage: any
}

export const OverviewTemplate: FC<OverviewTemplate> = ({
  children,
  brandImage,
  navigationList,
}) => (
  <section className="bg-background h-screen flex">
    <nav className="p-4 flex flex-col gap-4">
      <BrandThumbnail {...brandImage} />
      <NavigationList sections={navigationList.sections} />
    </nav>
    <main id="main" className="border-l grow">
      {children}
    </main>
  </section>
)
