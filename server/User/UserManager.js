import User from './index'

class UserManager {
  constructor () {
    this.users = []
  }

  createUser () {
    this.users.push(new User())
  }

  getUserByPosition (position) {
    return this.users.find((user) => {
      return user.position === position
    })
  }
}

export default new UserManager()
