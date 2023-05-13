import type { CSSProperties, FC, ReactNode } from 'react'

interface Props {
  style?: CSSProperties
  children: ReactNode
}

export const Wrapper: FC<Props> = ({ style, children }) => (
  <div style={style} className="flex w-full box-border">
    {children}
  </div>
)
