import { Children, FC, ReactNode, cloneElement } from 'react'
import styles from './editor-layout.module.css'

type ExlucedChildren =
  | undefined
  | null
  | string
  | number
  | boolean
  | Iterable<ReactNode>

interface EditorLayoutProps {
  children: Exclude<ReactNode, ExlucedChildren>
}

export const EditorLayout: FC<EditorLayoutProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Grid}`,
  })

export const HeaderArea: FC<EditorLayoutProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Header}`,
  })

export const SidebarArea: FC<EditorLayoutProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Sidebar}`,
  })

export const MainArea: FC<EditorLayoutProps> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Main}`,
  })
