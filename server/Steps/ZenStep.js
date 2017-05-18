import Step from './Step'
import UserManager from '../User/UserManager'

class ZenStep extends Step {
  constructor () {
    super('zen', 1)
  }

  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived(datas)

    if (datas['type'] === 'action') {
      if (datas['action'] === 'start') {
        this.start()
      }
    }

    this.updateUser()
  }

  start () {
    UserManager.createUser()
  }
}

export default new ZenStep()
