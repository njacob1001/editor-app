import { Children, FC, ReactElement, ReactNode, cloneElement } from 'react'

interface TitleProps {
  children: Extract<ReactNode, ReactElement>
}

export const Title: FC<TitleProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} font-bold text-xl`,
  })
