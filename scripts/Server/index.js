import Express from 'express'
import http from 'http'
import SockJs from 'sockjs'
import ExperienceManager from '../Experiences/ExperienceManager'
import Data from './Data'

const PORT = 8080

export default class Server {
  constructor () {
    this.app = Express()
    this.app.use(Express.static('public'))
    this.sockets = []

    this.setMainRoutes()
    this.createServer()
    this.setSocketRoutes()

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

  setSocketRoutes () {
    this.io.on('connection', (socket) => {
      socket.on('data', (datas) => {
        const data = new Data(datas)
        if (data.getType() === 'auth') {
          ExperienceManager.getExperienceByName(data.get('device')).setSocket(socket)
        }
      })
      this.sockets.push(socket)
    })
  }

  start () {
    this.server.listen(PORT, '0.0.0.0')
  }
}
