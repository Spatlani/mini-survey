import { v4 as uuidv4 } from 'uuid'
import { Question } from '@/models/Question'
import Folder from '@/models/Folder'

export const state = () => ({
  isDragging: false,

  formQuestions: [],

  selectedFolder: null
})

function flatQuestions (array) {
  let results = []
  array.forEach((element) => {
    if (element.type !== 'folder') {
      results.push(element)
    }
    if (Array.isArray(element.children)) {
      results = results.concat(flatQuestions(element.children))
    }
  })
  return results
}

function findNestedPath (array, id) {
  for (const item of array) {
    if (item.id === id) {
      return ` / ${item.title}`
    }
    if (item.children instanceof Array) {
      const subpath = findNestedPath(item.children, id)
      if (subpath) {
        return ` / ${item.title}${subpath}`
      }
    }
  }
}

function findNested (array, id) {
  for (const item of array) {
    if (item.id === id) {
      return item
    }
    if (item.children instanceof Array) {
      return findNested(item.children, id)
    }
  }
  return null
}

function removeFromTree (list, id) {
  return list.map(item => item.type === 'folder' ? new Folder(item) : new Question(item)).filter((item) => {
    if ('children' in item) {
      item.children = removeFromTree(item.children, id)
    }
    return item.id !== id
  })
}

export const getters = {
  isDragging: state => state.isDragging,

  allQuestions: state => flatQuestions(state.formQuestions),

  formQuestions: state => state.formQuestions,

  selectedFolderPath: state => findNestedPath(state.formQuestions, state.selectedFolder),

  selectedFolder: state => state.selectedFolder
}

export const mutations = {
  setDraggingStatus (state, isDragging) {
    state.isDragging = isDragging
  },

  addNewQuestion (state, question) {
    const newQuestion = new Question({ ...question, id: uuidv4() })
    if (state.selectedFolder) {
      const folder = findNested(state.formQuestions, state.selectedFolder)
      folder.children.push(newQuestion)
    } else {
      state.formQuestions.push(newQuestion)
    }
  },

  setSingleQuestion (state, { question, index }) {
    const updatedQuestion = new Question(question)
    const oldQuestion = findNested(state.formQuestions, question.id)
    oldQuestion.options = updatedQuestion.options
    oldQuestion.type = updatedQuestion.type
    oldQuestion.title = updatedQuestion.title
    oldQuestion.required = updatedQuestion.required
  },

  setFormQuestions (state, formQuestions) {
    state.formQuestions = formQuestions
  },

  removeQuestion (state, id) {
    const updatedQuestion = removeFromTree(state.formQuestions, id)
    state.formQuestions = updatedQuestion
  },

  addNewFolder (state, title) {
    const newFolder = new Folder({ id: uuidv4(), title })
    if (state.selectedFolder) {
      const folder = findNested(state.formQuestions, state.selectedFolder)
      folder.children.push(newFolder)
    } else {
      state.formQuestions.push(newFolder)
    }
  },

  updateFolder (state, oldFolder) {
    const folder = findNested(state.formQuestions, oldFolder.id)
    folder.title = oldFolder.title
  },

  deleteFolder (state, folderId) {
    const updatedQuestion = removeFromTree(state.formQuestions, folderId)
    state.formQuestions = updatedQuestion
  },

  setSelectedFolder (state, folder) {
    if (state.selectedFolder === folder) {
      state.selectedFolder = null
    } else {
      state.selectedFolder = folder
    }
  }
}

export const actions = {
  updateDraggingStatus: ({ commit }, status) => {
    commit('setDraggingStatus', status)
  },

  addNewQuestion: ({ commit }, question) => {
    commit('addNewQuestion', question)
  },

  updateSingleQuestion: ({ commit }, questionData) => {
    commit('setSingleQuestion', questionData)
  },

  updateFormQuestions: ({ commit }, formQuestions) => {
    commit('setFormQuestions', formQuestions)
  },

  deleteQuestion: ({ commit }, id) => {
    commit('removeQuestion', id)
  },

  addNewFolder: ({ commit }, folderName) => {
    commit('addNewFolder', folderName)
  },

  updateFolder: ({ commit }, folder) => {
    commit('updateFolder', folder)
  },

  deleteFolder: ({ commit }, folderId) => {
    commit('deleteFolder', folderId)
  },

  updateSelectedFolder: ({ commit }, selectedFolder) => {
    commit('setSelectedFolder', selectedFolder)
  },

  scrollToError ({ _ }, document) {
    const element = document.querySelector('.v-messages.error--text:first-of-type')
    const headerOffset = parseInt(document.documentElement.style.getPropertyValue('--headerHeight')) + 5
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }
}
