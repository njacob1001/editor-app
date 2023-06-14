import { SchemaController } from './input-ports'
import { WebClient } from './output-port'

export class SchemaServie implements SchemaController {
  private webClient: WebClient

  constructor(webClient: WebClient) {
    this.webClient = webClient
  }

  public async createSchema() {
    this.webClient.mutate('/lol', 'asd')
  }
}
