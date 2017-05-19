import Express from 'express'
import http from 'http'
import SockJs from 'sockjs'
import StepManager from '../Steps/StepManager'
import SocketDispatcher from '../utils/SocketDispatcher'

const PORT = 8080

export default class Server {
  constructor () {
    this.app = Express()
    this.app.use(Express.static('build/public'))

    this.setMainRoutes()
    this.createServer()

    StepManager.defineExperiences()
    SocketDispatcher.setSocketServer(this.io)
    SocketDispatcher.startDispatch()
  }

  /**
   * Create Express & Socket server
   */
  createServer () {
    this.server = http.createServer(this.app)
    this.io = SockJs.createServer({
      sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
    })
    this.io.installHandlers(this.server, {
      prefix: '/ws'
    })
  }

  /**
   * Set all Express routes
   */
  setMainRoutes () {
    this.app.get('/', (req, res) => {
      res.sendFile('index.html')
    })
  }

  listenAuthentification () {
    this.io.on('connection', (socket) => {
      socket.on('data', (datas) => {
        const data = JSON.parse(datas)

        if (data['type'] === 'auth') {
          const device = data['device']
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
      })
    })
  }

  start () {
    this.server.listen(PORT, '0.0.0.0')
  }
}
