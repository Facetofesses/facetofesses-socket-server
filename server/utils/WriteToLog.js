import SocketListener from './SocketListener'

class WriteToLog extends SocketListener {
  write (msg) {
    if (this.socket) {
      this.emit('msg', {
        text: msg
      })
    }
  }

  setSocket (socket) {
    super.setSocket(socket)
    console.log('available log')
  }
}

export default new WriteToLog()
