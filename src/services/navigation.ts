import { NavigationController } from './input-ports'
import { Router } from './output-port'

export class NavigationService implements NavigationController {
  private navigationController: Router

  constructor(navigationController: Router) {
    this.navigationController = navigationController
  }

  private getCurrentPath(): string {
    return this.navigationController.getPath()
  }

  openFolder(slug: string) {
    this.navigationController.push(slug)
  }

  closeFolder() {
    this.navigationController.back()
  }
}
