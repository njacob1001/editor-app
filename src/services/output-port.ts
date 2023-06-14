export interface WebClient {
  get: (path: string) => Promise<any>
  mutate: (path: string, data: string) => Promise<any>
  update: (path: string, data: string) => Promise<any>
  remove: (path: string, data: string) => Promise<any>
}
