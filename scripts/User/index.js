import ExperienceManager from '../Experiences/ExperienceManager'

export default class User {
  constructor () {
    this.currentExperiencePosition = 0
    this.setCUrrentExperienceName()
  }

  upgradePosition () {
    this.currentExperiencePosition++
    this.setCUrrentExperienceName()
  }

  setCUrrentExperienceName () {
    this.currentExperienceName = ExperienceManager.getExperienceNameByPosition(this.position)
  }

  setName () {

  }

  setSurname () {

  }

  setSex () {

  }

  setOrientation () {

  }
}
