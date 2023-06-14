import { Button } from '@/components/atoms/button'
import Link from 'next/link'
import { FC } from 'react'
import { IconsFactory } from './icons'

interface LinkProps {
  id: string
  name: string
  url: string
  icon: {
    token: string
  }
}

interface Section {
  id: string
  name: string
  links: LinkProps[]
}

export interface NavigationListProps {
  sections: Section[]
}

export const NavigationList: FC<NavigationListProps> = ({ sections }) => (
  <>
    {sections.map((section) => (
      <div className="flex flex-col gap-1" key={section.id}>
        <span className="txt-large">{section.name}</span>
        {section.links.map((link) => (
          <Link key={link.id} href={link.url}>
            <Button size="sm" variant="menuItem">
              <IconsFactory token={link.icon.token} className="mr-2 h-4 w-4" />

              {link.name}
            </Button>
          </Link>
        ))}
      </div>
    ))}
  </>
)
