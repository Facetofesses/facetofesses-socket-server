import WriteToLog from './WriteToLog'
import StepManager from '../Steps/StepManager'

/**
 * SocketDispatcher listen to connection and then data events
 * to dispatch socket instance to its Step instance
 */
class SocketDispatcher {
  setSocketServer (io) {
    this.io = io

    // binded event methods
    this.bindedOnData = this.onData.bind(this)
    this.bindedOnConnection = this.onConnection.bind(this)
  }

  startDispatch () {
    this.addConnectionEventListener()
  }

  addConnectionEventListener () {
    this.io.on('connection', this.bindedOnConnection)
  }

  onConnection (socket) {
    socket.on('data', this.bindedOnData)
  }

  /**
   * Pass socket its Step class by switching on 'device' key
   * @param datas Parsed datas received by data event
   */
  onAuth (datas) {
    const device = datas['device']

    switch (device) {
      case 'client':
        WriteToLog.setSocket(socket)
        break
      default:
        const step = StepManager.getStepByName(device)
        if (step) {
          WriteToLog.write(`Set socket on ${step.name} step`)

          step.setSocket(socket)
        }
    }
  }

  /**
   * @param datas JSON string received
   */
  onData (datas) {
    const data = JSON.parse(datas)
    if (data['type'] === 'auth') {
      this.onAuth(data)
    }
  }
}

export default new SocketDispatcher()
