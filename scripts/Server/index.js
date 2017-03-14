import Express from 'express'
import http from 'http'
import SockJs from 'sockjs'
import ExperienceManager from '../Experiences/ExperienceManager'
import Data from './Data'
import WriteToLog from '../WriteToLog'
import Ambiant from '../Ambiant'

const PORT = 8080

export default class Server {
  constructor () {
    this.app = Express()
    this.app.use(Express.static('public'))

    this.setMainRoutes()
    this.createServer()
    this.listenAuthentification()

    ExperienceManager.defineExperiences()
  }

  createServer () {
    this.server = http.createServer(this.app)
    this.io = SockJs.createServer({
      sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
    })
    this.io.installHandlers(this.server, {
      prefix: '/ws'
    })
  }

  setMainRoutes () {
    this.app.get('/', (req, res) => {
      res.sendFile('index.html')
    })
  }

  listenAuthentification () {
    this.io.on('connection', (socket) => {
      socket.on('data', (datas) => {
        const data = new Data(datas)

        if (data.getType() === 'auth') {
          const device = data.get('device')
          switch (device) {
            case 'client':
              WriteToLog.setSocket(socket)
              break
            case 'ambiant':
              Ambiant.setSocket(socket)
              WriteToLog.write('Set ambiant Socket')
              break
            default:
              const experience = ExperienceManager.getExperiencesNames(device)
              if (experience) {
                WriteToLog.write(`Set socket on ${experience.name} experience`)
                experience.setSocket(socket)
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
