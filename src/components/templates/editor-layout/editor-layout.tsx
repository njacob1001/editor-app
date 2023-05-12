import { Children, FC, ReactElement, ReactNode, cloneElement } from 'react'
import styles from './editor-layout.module.css'

interface EditorLayoutProps {
  children: Extract<ReactNode, ReactElement>
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
