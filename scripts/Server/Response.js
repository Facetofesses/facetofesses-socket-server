export default class Response {
  constructor (res) {
    this.response = res
    this.responseObject = {}
  }

  addStatusCode (statusCode) {
    this.responseObject.statusCode = statusCode
    return this
  }

  addStatus (status) {
    this.responseObject.status = status
    return this
  }

  addMessage (message) {
    this.responseObject.message = message
    return this
  }

  addDatas (datas) {
    this.responseObject.datas = datas
    return this
  }

  send (datas = null) {
    if (datas) {
      this.responseObject = datas
    }
    this.response.json(this.responseObject)
  }
}
