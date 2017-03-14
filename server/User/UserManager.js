import User from './index'

class UserManager {
  constructor () {
    this.users = []
  }

  createUser () {
    this.users.push(new User())
  }
}

export default new UserManager()
