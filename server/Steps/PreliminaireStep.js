import Step from './Step'

class PreliminaireStep extends Step {
  constructor () {
    super('preliminaire', 2)
    this.bind('start', this.onStart.bind(this))
  }

  onStart (datas) {
    this.updateUser()
  }
}

export default new PreliminaireStep()
