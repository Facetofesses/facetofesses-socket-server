import SocketListener from '../SocketListener'

export default class Experience extends SocketListener {
  constructor (name, position) {
    super()
    this.name = name
    this.position = position
  }
}
