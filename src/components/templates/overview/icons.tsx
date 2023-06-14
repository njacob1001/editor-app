import {
  Database,
  GitCompare,
  Languages,
  LayoutTemplate,
  PlayCircle,
  Rocket,
  ShieldCheck,
  TextCursorInput,
  Unplug,
  Users,
} from 'lucide-react'
import { FC } from 'react'

export const LinkIcons = new Map()
  .set('Database', Database)
  .set('GitCompare', GitCompare)
  .set('Languages', Languages)
  .set('LayoutTemplate', LayoutTemplate)
  .set('PlayCircle', PlayCircle)
  .set('Rocket', Rocket)
  .set('ShieldCheck', ShieldCheck)
  .set('TextCursorInput', TextCursorInput)
  .set('Unplug', Unplug)
  .set('Users', Users)

export const IconsFactory: FC<{ token: string; className?: string }> = ({
  token,
  ...props
}) => {
  const Icon = LinkIcons.get(token)
  return <Icon {...props} />
}
