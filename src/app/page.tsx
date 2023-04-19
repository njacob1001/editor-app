'use client'

import { Dialog } from '@/components/organism/dialog'
import startTransition from '@/utils/transition-api'
import { useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)
  return (
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
      <Dialog
        onClose={() => {
          startTransition(() => {
            setOpen(false)
          })
        }}
        open={open}
      />
    </main>
  )
}
