import { ComponentModuleLayout } from '@/components/templates/component-module'
import { WrapperComponent } from '@/components/templates/types'

export default function Layout({ children }: WrapperComponent) {
  return (
    <ComponentModuleLayout title={'Entidades'}>
      {children}
    </ComponentModuleLayout>
  )
}
