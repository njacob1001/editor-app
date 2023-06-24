export interface SchemaController {
  deleteSchema: (id: string) => Promise<void>
  moveToFolder: (id: string, target: string) => Promise<void>
  createSchema: () => Promise<void>
  searchListing: (schemaType: string, keyword: string) => Promise<any>
}

export interface NavigationController {
  openFolder: (slug: any) => void
  closeFolder: () => void
}
