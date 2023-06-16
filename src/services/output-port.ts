export interface WebClient {
  get: (path: string) => Promise<any>
  mutate: (path: string, data: string) => Promise<any>
  update: (path: string, data: string) => Promise<any>
  remove: (path: string, data: string) => Promise<any>
}

export interface Router {
  push: (path: string) => void
  back: (steps?: number) => void
  getPath: () => string
}
