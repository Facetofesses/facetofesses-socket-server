import Data from './Server/Data'

export default class SocketListener {
  setSocket (socket) {
    this.socket = socket
    this.listen()
  }

  listen () {
    this.socket.on('data', (datas) => {
      this.onSocketDatasReceived(new Data(datas))
    })
  }

  onSocketDatasReceived (datas) {}

  emit (type, datas) {
    const obj = Object.assign({}, {type}, datas)
    this.socket.write(JSON.stringify(obj))
  }
}
