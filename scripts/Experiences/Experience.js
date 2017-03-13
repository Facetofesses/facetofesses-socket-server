import Data from '../Server/Data'

export default class Experience {
  constructor (name) {
    this.name = name
    this.active = false
    this.datas = []
  }

  setSocket (socket) {
    this.socket = socket
    this.listenDatas()
  }

  start () {
    this.isActive = true
  }

  end () {
    this.isActive = false
  }

  listenDatas () {
    this.socket.on('data', (datas) => {
      const data = new Data(datas)

      console.log('-------')
      console.log(this)
      console.log('receive datas type: ' + data.getType())
      console.log('datas', data)
      console.log('-------')
    })
  }
}
