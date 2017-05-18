import SerialPort from 'serialport'

const boardPort = '/dev/cu.usbmodem1411'
const DEBUG = false
let instance = null

export default class LightManager {
  constructor () {
    if (!instance) {
      instance = this

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

      if (DEBUG === true) this.debug()
    })
  }

  update (value) {
    this.port.write(value.toString(), function (err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('Sent ' + value + ' to board')
    })
  }

  debug () {
    let i = 0
    setInterval(() => {
      this.port.write(i.toString(), function (err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('Sent ' + i + ' to board')
      })

      if (i < 100) {
        i++
      }
    }, 500)
  }
}
