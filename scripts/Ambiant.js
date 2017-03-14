import SocketListener from './SocketListener'
import WriteToLog from './WriteToLog'

class Ambiant extends SocketListener {
  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived(datas)
    WriteToLog.write('test')
  }
}

export default new Ambiant()
