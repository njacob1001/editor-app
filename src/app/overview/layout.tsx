import { OverviewTemplate } from '@/components/templates/overview/overview'
import { SchemaContextProvider } from '@/context'
import * as data from './data.json'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const { content } = await getData()

  return (
    <SchemaContextProvider>
      <OverviewTemplate
        navigationList={content.navigationLinks}
        brandImage={content.brandImage}
      >
        {children}
      </OverviewTemplate>
    </SchemaContextProvider>
  )
}

async function getData() {
  return data
}
