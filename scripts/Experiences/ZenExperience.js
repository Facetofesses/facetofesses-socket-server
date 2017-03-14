import Experience from './Experience'
import UserManager from '../User/UserManager'

class ZenExperience extends Experience {
  constructor () {
    super('zen')
  }

  getDatas () {
    return UserManager.getCurrentUser()
  }
}

export default new ZenExperience()
