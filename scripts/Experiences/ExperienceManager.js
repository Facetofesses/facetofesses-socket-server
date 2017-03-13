import ActeExperience from './ActeExperience'
import ZenExperience from './ZenExperience'
import AmbiantExperience from './AmbiantExperience'
import UserManager from '../User/UserManager'

class ExperienceManager {
  defineExperiences () {
    this.experiences = []
    this.experiences.push(new ZenExperience())
    this.experiences.push(new ActeExperience())
    this.experiences.push(new AmbiantExperience())
  }

  getActiveExperience () {
    return this.experiences.find((experience) => {
      return experience.active === true
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
