export interface WebClient {
  get: (path: string) => Promise<any>
  mutate: (path: string, data: Object) => Promise<any>
  update: (path: string, data: Object) => Promise<any>
  remove: (path: string) => Promise<any>
}

export interface Router {
  push: (path: string) => void
  back: (steps?: number) => void
  getPath: () => string
}
