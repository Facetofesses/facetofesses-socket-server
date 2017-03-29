import ActeStep from './ActeStep'
import ZenStep from './ZenStep'
import PreliminaireStep from './PreliminaireStep'

class StepManager {
  defineExperiences () {
    this.steps = [ZenStep, ActeStep, PreliminaireStep]
  }

  getStepByName (name) {
    return this.steps.find((experience) => {
      return experience.name === name
    })
  }

  getStepNameByPosition (position) {
    return this.steps.find((step) => {
      return step.position === position
    }).name
  }

  getStepsNames () {
    return this.steps.map((step) => {
      return step.name
    })
  }
}

export default new StepManager()
