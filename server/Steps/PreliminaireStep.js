import Step from './Step'
import LightManager from '../utils/LightManager'

class PreliminaireStep extends Step {
  constructor () {
    this.lightManager = new LightManager()
    super('preliminaire', 2)
    this.bind('start', this.onStart.bind(this))
    this.bind('update', this.onUpdate.bind(this))
  }

  onStart (datas) {
    this.updateUser()
  }

  onUpdate (datas) {
    this.lightManager.update(datas.excitation)
  }
}

export default new PreliminaireStep()
