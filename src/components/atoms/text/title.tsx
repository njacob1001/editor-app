import { Children, FC, ReactNode, cloneElement } from 'react'

type ExlucedChildren =
  | undefined
  | null
  | string
  | number
  | boolean
  | Iterable<ReactNode>

interface TitleProps {
  children: Exclude<ReactNode, ExlucedChildren>
}

export const Title: FC<TitleProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} font-bold text-xl`,
  })
