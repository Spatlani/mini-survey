import Vue from 'vue'
import { Question } from '@/models/Question'

export const state = () => ({
  isDragging: false,

  formQuestions: []
})

export const getters = {
  isDragging: state => state.isDragging,

  formQuestions: state => state.formQuestions
}

export const mutations = {
  setDraggingStatus (state, isDragging) {
    state.isDragging = isDragging
  },

  addNewQuestion (state, question) {
    const newQuestion = new Question(question)
    state.formQuestions.push(newQuestion)
  },

  setSingleQuestion (state, { question, index }) {
    const updatedQuestion = new Question(question)
    Vue.set(state.formQuestions, index, updatedQuestion)
  },

  setFormQuestions (state, formQuestions) {
    state.formQuestions = formQuestions
  },

  removeQuestion (state, index) {
    state.formQuestions.splice(index, 1)
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

  deleteQuestion: ({ commit }, index) => {
    commit('removeQuestion', index)
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
