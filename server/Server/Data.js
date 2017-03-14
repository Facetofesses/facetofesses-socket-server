export default class Data {
  constructor (datas) {
    this.data = JSON.parse(datas)
  }

  getType () {
    return this.get('type')
  }

  get (key) {
    return this.data[key]
  }
}
