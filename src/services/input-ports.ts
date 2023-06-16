export interface SchemaController {
  createSchema: () => Promise<void>
}

export interface NavigationController {
  openFolder: () => void
  closeFolder: () => void
}
