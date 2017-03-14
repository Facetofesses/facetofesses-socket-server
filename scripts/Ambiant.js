import SocketListener from './SocketListener'

class Ambiant extends SocketListener {
  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived()
  }
}

export default new Ambiant()
