export default class Folder {
  constructor (data) {
    if (!data) {
      data = {}
    }
    this._id = data.id
    this.type = 'folder'
    this.title = data.title
    this.children = data.children || []
  }

  get id () {
    return this._id
  }

  get path () {
    return 'path'
  }
}
