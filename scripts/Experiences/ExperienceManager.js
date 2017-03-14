import ActeExperience from './ActeExperience'
import ZenExperience from './ZenExperience'
import UserManager from '../User/UserManager'

class ExperienceManager {
  defineExperiences () {
    this.experiences = [ZenExperience, ActeExperience]
  }

  getExperienceByName (name) {
    return this.experiences.find((experience) => {
      return experience.name === name
    })
  }

  getExperiencesNames () {
    return this.experiences.map((experience) => {
      return experience.name
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
