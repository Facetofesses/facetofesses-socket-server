import Step from './Step'
import LightManager from '../utils/LightManager'

class PreliminaireStep extends Step {
  constructor () {
    super('preliminaire', 2)
    this.lightManager = new LightManager()
    this.bind('start', this.onStart.bind(this))
    this.bind('update', this.onUpdate.bind(this))
  }

  onStart (datas) {
    this.updateUser()
  }

  onUpdate (datas) {
    if (!this.lightManager.started && datas.excitation > 1) {
      this.lightManager.start()
    }

    if (this.lightManager.started) this.lightManager.update(datas.excitation)
  }
}

export default new PreliminaireStep()
