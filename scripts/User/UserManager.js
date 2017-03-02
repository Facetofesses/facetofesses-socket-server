import User from './index'

class UserManager {
  createUser () {
    this.currentUser = new User()
  }

  deleteUser () {
    this.currentUser = null
  }

  getCurrentUser () {
    return this.currentUser
  }
}

export default new UserManager()
