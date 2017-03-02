import express from 'express'
import bodyParser from 'body-parser'
import ExperienceManager from '../Experiences/ExperienceManager'
import {headerMiddleware, createResponseMiddleware} from './Middleware'

const dbg = debug('app:Server')
const PORT = process.env.PORT || 3000

export default class Server {
  constructor () {
    this.mainRouter = express()
    this.apiRouter = express.Router()
    this.port = PORT

    ExperienceManager.defineExperiences()

    this.mainRouter.use('/api', this.apiRouter)

    this.addBodyParserMiddleware()
    this.addResponseHeaderMiddleware()
    this.addResponseCreationMiddleware()

    this.setMainRoutes()
    this.setApiRoutes()
  }

  setMainRoutes () {
    this.mainRouter.get('/', () => {
      this.response
        .addStatus('success')
        .addStatusCode(200)
        .addMessage('Welcome, API is accessible at /api')
        .send()
    })
  }

  setApiRoutes () {
    this.apiRouter.get('/', () => {
      this.response
        .addStatus('success')
        .addStatusCode(200)
        .addMessage('Welcome !')
        .send()
    })

    this.apiRouter.get('/start', () => {
      ExperienceManager.start()
      this.response
        .addStatus('success')
        .addStatusCode(200)
        .addDatas(ExperienceManager
          .getActiveExperience()
          .getDatas())
        .send()
    })

    this.apiRouter.get('/end', () => {
      ExperienceManager.end()
      this.response
        .addStatus('success')
        .addStatusCode(200)
        .send()
    })
  }

  addBodyParserMiddleware () {
    this.apiRouter.use(bodyParser.urlencoded({ extended: false }))
    this.apiRouter.use(bodyParser.json())
  }

  addResponseHeaderMiddleware () {
    this.mainRouter.use(headerMiddleware)
    this.apiRouter.use(headerMiddleware)
  }

  addResponseCreationMiddleware () {
    this.mainRouter.use(createResponseMiddleware(this))
    this.apiRouter.use(createResponseMiddleware(this))
  }

  start () {
    this.mainRouter.listen(this.port, () => {
      dbg(`Server start at ${this.port}`)
    })
  }
}
