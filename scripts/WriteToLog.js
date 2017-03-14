import SocketListener from './SocketListener'

class WriteToLog extends SocketListener {
  write (msg) {
    if (this.socket) {
      this.socket.write(msg)
    }
  }
}

export default new WriteToLog()
