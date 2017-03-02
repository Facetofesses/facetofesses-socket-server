import Experience from './Experience'
import UserManager from '../User/UserManager'

export default class ZenExperience extends Experience {
  constructor () {
    super('zen')
  }

  getDatas () {
    return UserManager.getCurrentUser()
  }
}
