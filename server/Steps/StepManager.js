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

  getStepByPosition (position) {
    return this.steps.find(step => step.position === position)
  }

  getStepsNames () {
    return this.steps.map(step => step.name)
  }
}

export default new StepManager()
