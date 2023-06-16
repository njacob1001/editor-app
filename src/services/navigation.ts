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

  openFolder() {
    const currentPath = this.getCurrentPath()

    this.navigationController.push(`${currentPath}/new`)
  }

  closeFolder() {
    this.navigationController.back()
  }
}
