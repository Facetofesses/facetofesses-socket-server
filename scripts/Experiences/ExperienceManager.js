import ActeExperience from './ActeExperience'
import ZenExperience from './ZenExperience'
import UserManager from '../User/UserManager'

class ExperienceManager {
  defineExperiences () {
    this.experiences = []
    this.experiences.push(new ZenExperience())
    this.experiences.push(new ActeExperience())
  }

  getActiveExperience () {
    return this.experiences.find((experience) => {
      return experience.isActive()
    })
  }

  getExperienceByName (name) {
    return this.experiences.find((experience) => {
      return experience.name === name
    })
  }

  start () {
    UserManager.createUser()
    this.getExperienceByName('zen')
      .start()
  }

  end () {
    UserManager.deleteUser()
    this.experiences.forEach((exp) => {
      exp.reset()
    })
  }
}

export default new ExperienceManager()
