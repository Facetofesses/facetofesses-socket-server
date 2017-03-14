export default class SocketListener {
  setSocket (socket) {
    this.socket = socket
    this.listen()
  }

  listen () {
    this.socket.on('data', (datas) => this.onSocketDatasReceived.bind(this))
  }

  onSocketDatasReceived (datas) {
    console.log('receive datas', datas)
  }
}
