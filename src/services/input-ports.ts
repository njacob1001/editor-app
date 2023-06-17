export interface SchemaController {
  createSchema: () => Promise<void>
  searchListing: (schemaType: string, keyword: string) => Promise<any>
}

export interface NavigationController {
  openFolder: (slug: any) => void
  closeFolder: () => void
}
