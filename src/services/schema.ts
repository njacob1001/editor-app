import { SchemaController } from './input-ports'
import { WebClient } from './output-port'

export class SchemaServie implements SchemaController {
  private webClient: WebClient

  constructor(webClient: WebClient) {
    this.webClient = webClient
  }

  public async deleteSchema(id: string) {
    this.webClient.remove(`schema/${id}`)
  }

  public async moveToFolder(id: string, target: string) {
    this.webClient.update('folding', { id, target })
  }

  public async searchListing(schemaType: string, keyword: string) {
    return [
      {
        name: 'test',
        slug: 'folder1/folder2/test',
      },
    ]
  }

  public async createSchema() {
    this.webClient.mutate('lol', 'asd')
  }
}
