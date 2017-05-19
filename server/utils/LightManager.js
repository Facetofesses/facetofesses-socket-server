import SerialPort from 'serialport'

const boardPort = '/dev/cu.usbmodem1411'
let instance = null

export default class LightManager {
  constructor () {
    if (!instance) {
      instance = this
      this.started = false

      this.setup()
    }

    return instance
  }

  setup () {
    this.port = new SerialPort(boardPort, {baudRate: 115200, lock: false})
    this.port.on('open', (err) => {
      if (err) {
        return console.log('Error: ', err.message)
      }

      console.log('Port opened ' + boardPort)
    })
  }

  start () {
    this.port.write('[', (err) => {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      this.started = true
      console.log('Color chasing started')
    })
  }

  update (value) {
    if (!this.started) {
      console.log('You should start color chasing before updating its progress')
      return false
    }

    this.port.write(value.toString(), (err) => {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('Sent ' + value + ' to board')
    })
  }

  stop () {
    this.port.write(']', (err) => {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      this.started = false
      console.log('Color chasing stopped')
    })
  }
}
