export default class Folder {
  constructor (data) {
    if (!data) {
      data = {}
    }
    this.id = data.id
    this.type = 'folder'
    this.title = data.title
    this.children = data.children || []
  }

  get path () {
    return 'path'
  }
}
