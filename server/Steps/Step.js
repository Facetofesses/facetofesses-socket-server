import SocketListener from '../utils/SocketListener'
import UserManager from '../User/UserManager'

export default class Experience extends SocketListener {
  constructor (name, position) {
    super()
    this.name = name
    this.position = position
    this.actionsBinding = {}
    this.updateUser()
  }

  // return current user
  updateUser () {
    return UserManager.getUserByPosition(this.position)
  }

  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived(datas)

    const type = datas['type']
    if (this.actionsBinding[type]) {
      this.actionsBinding[type](datas)
    } else {
      console.log('Can not find action for type :' + type)
    }
  }

  bind (type, cb) {
    this.actionsBinding[type] = cb
  }
}
