import Step from './Step'
import UserManager from '../User/UserManager'

class ZenStep extends Step {
  constructor () {
    super('zen', 1)
  }

  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived(datas)
    UserManager.createUser()
    this.updateUser()
  }
}

export default new ZenStep()
