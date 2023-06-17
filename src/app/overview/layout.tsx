import { OverviewTemplate } from '@/components/templates/overview/overview'
import { NavigationContextProvider, SchemaContextProvider } from '@/context'
import * as data from './data.json'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const { content } = await getData()

  return (
    <NavigationContextProvider>
      <SchemaContextProvider>
        <OverviewTemplate
          navigationList={content.navigationLinks}
          brandImage={content.brandImage}
        >
          {children}
        </OverviewTemplate>
      </SchemaContextProvider>
    </NavigationContextProvider>
  )
}

async function getData() {
  return data
}
