export default class SocketListener {
  setSocket (socket) {
    this.socket = socket
    this.listen()
  }

  listen () {
    this.socket.on('data', (datas) => {
      this.onSocketDatasReceived(JSON.parse(datas))
    })
  }

  onSocketDatasReceived (datas) {}

  emit (type, datas) {
    const obj = Object.assign({}, datas, {type})
    this.socket.write(JSON.stringify(obj))
  }
}
