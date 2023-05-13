'use client'
import { useEffect, useState } from 'react'
import styles from './grid.module.css'

export interface Props {
  children: React.ReactNode
}

export function GridContainer({ children }: Props) {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('main')
      if (container) {
        const width = container.offsetWidth

        const numCols = Math.floor((width + 10) / 150)
        setColumns(numCols)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setColumns])

  return (
    <ul
      className={styles.GridContainer}
      style={
        {
          '--col-count': columns,
        } as React.CSSProperties
      }
    >
      {children}
    </ul>
  )
}
