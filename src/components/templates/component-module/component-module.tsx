import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'
import { FC } from 'react'
import { WrapperComponent } from '../types'

// design ui https://dribbble.com/shots/5947832-File-Manager-App-UI

interface ComponentModuleLayoutProps extends WrapperComponent {
  title: string
}

export const ComponentModuleLayout: FC<ComponentModuleLayoutProps> = ({
  children,
  title,
}) => (
  <div className="w-full h-full flex flex-col p-8 pb-0">
    <div className="flex justify-between mb-8">
      <h1 className="txt-h2 border-none pb-0">{title}</h1>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    {children}
  </div>
)
