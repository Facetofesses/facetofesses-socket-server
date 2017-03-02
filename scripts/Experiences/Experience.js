export default class Experience {
  constructor (name) {
    this.name = name
    this.active = false
    this.datas = []
  }

  isActive (state = null) {
    if (state) {
      this.active = state
    } else {
      return this.active
    }
  }

  start () {
    this.isActive(true)
  }

  end () {
    this.isActive(false)
  }
}
