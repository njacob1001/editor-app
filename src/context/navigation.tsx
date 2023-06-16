'use client'
import { NavigationController } from '@/services/input-ports'
import { NavigationService } from '@/services/navigation'
import { Router } from '@/services/output-port'
import { useRouter } from 'next/router'
import { FC, ReactNode, createContext, useMemo } from 'react'

const navigationContext = createContext<NavigationController>(null as any)

const { Provider } = navigationContext

export const NavigationContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const _router = useRouter()

  const config = useMemo(() => {
    const router: Router = {
      push: (url) => {
        _router.push(url)
      },
      back: () => {
        _router.back()
      },
      getPath: () => {
        return _router.pathname
      },
    }
    return new NavigationService(router)
  }, [_router])

  return <Provider value={config}>{children}</Provider>
}
