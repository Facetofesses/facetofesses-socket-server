/**
 * All steps class extends this utils class to receive socket events
 */
export default class SocketListener {
  setSocket (socket) {
    this.socket = socket
    this.listen()
  }

  listen () {
    this.socket.on('data', (datas) => {
      this.onSocketDatasReceived(JSON.parse(datas))
    })
    this.socket.on('close', this.onClose.bind(this))
  }

  onSocketDatasReceived (datas) {}

  emit (type, datas) {
    const obj = Object.assign({}, datas, {type})
    this.socket.write(JSON.stringify(obj))
  }

  onClose () {}
}
