import { Children, FC, cloneElement } from 'react'
import { WrapperComponent } from '../types'
import styles from './editor-layout.module.css'

export const EditorLayout: FC<WrapperComponent> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Grid}`,
  })

export const HeaderArea: FC<WrapperComponent> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Header}`,
  })

export const SidebarArea: FC<WrapperComponent> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Sidebar}`,
  })

export const MainArea: FC<WrapperComponent> = ({ children }) =>
  cloneElement(children, {
    className: `${Children.only(children).props.className} ${styles.Main}`,
  })
