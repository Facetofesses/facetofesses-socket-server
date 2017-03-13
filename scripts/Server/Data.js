export default class Data {
  constructor (datas) {
    if (typeof datas === 'string') {
      this.stringDatas = datas
      this.objectDatas = JSON.parse(datas)
    } else {
      this.objectDatas = datas
      this.stringDatas = JSON.stringify(datas)
    }
  }

  getParsed () {
    return this.objectDatas
  }

  getString () {
    return this.stringDatas
  }

  getType () {
    return this.getParsed().type
  }

  get (key) {
    return this.getParsed()[key]
  }
}
