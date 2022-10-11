import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Question } from '@/models/Question'
import Folder from '@/models/Folder'

export const state = () => ({
  isDragging: false,

  setFolderFilter: null,

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

function removeFromTree (array, childNameToRemove) {
  return array.filter(child => child.id !== childNameToRemove).map(child => removeFromTree(child, childNameToRemove))
}

export const getters = {
  isDragging: state => state.isDragging,

  folderFilter: state => state.folderFilter,

  allQuestions: state => flatQuestions(state.formQuestions),

  formQuestions: state => state.formQuestions,

  selectedFolder: state => state.selectedFolder
}

export const mutations = {
  setDraggingStatus (state, isDragging) {
    state.isDragging = isDragging
  },

  setFolderFilter (state, folderFilter) {
    state.folderFilter = folderFilter
  },

  addNewQuestion (state, question) {
    const newQuestion = new Question({ ...question, id: uuidv4() })
    state.formQuestions.push(newQuestion)
  },

  setSingleQuestion (state, { question, index }) {
    // const updatedQuestion = new Question(question)
    Vue.set(state.formQuestions, index, question)
  },

  setFormQuestions (state, formQuestions) {
    state.formQuestions = formQuestions
  },

  removeQuestion (state, index) {
    state.formQuestions.splice(index, 1)
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
  updateFolderFilter: ({ commit }, search) => {
    commit('setFolderFilter', search)
  },

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

  deleteQuestion: ({ commit }, index) => {
    commit('removeQuestion', index)
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
