'use client'

import { Title } from '@/components/atoms/text/title'
import { SchemaDialog } from '@/components/organism/dialog'
import {
  EditorLayout,
  HeaderArea,
  MainArea,
  SidebarArea,
} from '@/components/templates/editor-layout/editor-layout'
import startTransition from '@/utils/transition-api'
import { useState } from 'react'

const CloseIcon = ({
  className,
  style,
}: {
  className?: string
  style: any
}) => (
  <svg viewBox="0 0 24 24" className={className} style={style}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

const SquareButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      className="relative bg-white rounded shadow p-2"
      style={{ width: '3rem', height: '3rem' }}
    >
      <CloseIcon
        className="w-full h-full stroke-current"
        style={{
          filter: 'drop-shadow(0 0 3px rgba(0, 0, 255, 0.7))',
          strokeWidth: '1.5px',
        }}
      />
      <span
        className="absolute inset-0 rounded-md"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
    </button>
  )
}

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
    <EditorLayout>
      <div>
        <HeaderArea>
          <header className="flex flex-col h-32">
            <Title>
              <h1>Save</h1>
            </Title>
          </header>
        </HeaderArea>
        <SidebarArea>
          <aside className="border-solid border-r-gray-600 border-r">
            <Title>
              <h1 className="p-4">Employee vacation requestment application</h1>
            </Title>
            <nav>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      console.log('clock opne modal')
                      startTransition(() => {
                        setOpen(true)
                      })
                    }}
                  >
                    Entities
                  </button>
                </li>
                <li>
                  <SquareButton />
                </li>
              </ul>
            </nav>
          </aside>
        </SidebarArea>
        <MainArea>
          <main>
            <button
              onClick={() => {
                console.log('clock opne modal')
                startTransition(() => {
                  setOpen(true)
                })
              }}
            >
              Hello
            </button>
            <SchemaDialog />
          </main>
        </MainArea>
      </div>
    </EditorLayout>
  )
}
