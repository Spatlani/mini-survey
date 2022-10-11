export default class Question {
  constructor (data) {
    if (!data) {
      data = {}
    }
    this.id = data.id
    this.title = data.title
    this.type = data.type
    this.label = data.label
    this.icon = data.icon
    this.required = data.required || false
    this.options = data.options
  }
}

const types = [{
  label: 'Single Line Text',
  type: 'text',
  icon: 'text-field'
}, {
  label: 'True/False',
  type: 'boolean',
  icon: 'vote',
  options: ['True', 'False']
}, {
  label: 'Number Input',
  type: 'number',
  icon: 'number'
}, {
  label: 'Multiple Choice',
  type: 'radio',
  icon: 'radio-button',
  options: ['Option 1']
}]

const QuestionTypes = Object.freeze(types.map(t => new Question(t)))

export { QuestionTypes, Question }
