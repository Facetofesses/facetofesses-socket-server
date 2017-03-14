import SocketListener from '../SocketListener'

export default class Experience extends SocketListener {
  constructor (name) {
    super()
    this.name = name
    this.datas = []
  }
}
