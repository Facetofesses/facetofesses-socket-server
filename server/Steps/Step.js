import SocketListener from '../utils/SocketListener'
import StepManager from '../Steps/StepManager'

export default class Experience extends SocketListener {
  constructor (name, position) {
    super()
    this.name = name
    this.position = position
    this.user = null
    this.socketTypeListener = {}
    this.onEndCallbacks = []
    this.setCommonActions()
  }

  setCommonActions () {
    this.bind('REQUIRE_NEXT', this.onRequestNext.bind(this))
    this.bind('START', this.onStart.bind(this))
    this.bind('DATA', this.onData.bind(this))
  }

  onRequestNext () {
    // get next step
    const nextStep = StepManager.getStepByPosition(this.position + 1)

    if (!nextStep || !nextStep.active) {
      this.onEnd()
      this.emit('REQUIRE_NEXT', {
        response: true
      })
    } else {
      // indicate that step should wait
      this.emit('REQUIRE_NEXT', {
        response: false
      })

      // add a method that will be called on next step end
      nextStep.onEndCallbacks.push(() => {
        this.onEnd()
        this.emit('REQUIRE_NEXT', {
          response: true
        })
      })
    }
  }

  onStart (datas) {

  }

  onData (datas) {

  }

  onEnd () {
    this.onEndCallbacks.forEach(cb => cb())
  }

  onSocketDatasReceived (datas) {
    super.onSocketDatasReceived(datas)

    const type = datas['type']
    if (this.socketTypeListener[type]) {
      this.socketTypeListener[type](datas)
    } else {
      console.log('Can not find action for type :' + type)
    }
  }

  bind (type, cb) {
    this.socketTypeListener[type] = cb
  }
}
