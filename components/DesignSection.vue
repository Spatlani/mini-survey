<template>
  <draggable :value="questions" v-bind="dragOptions" tag="v-col" handle=".handle" group="question" class="drag-area my-n3" :class="{ 'dropzone': isDragging }" @input="updateForm">
    <transition-group type="transition" name="flip-list" tag="div">
      <v-card v-for="(question, questionIndex) in filteredQuestions" :key="questionIndex + 0" class="q-item my-3" flat>
        <v-card-text class="pa-2">
          <v-row class="mx-0">
            <v-col cols="auto" class="handle cursor-move text-center pl-0 ml-n2">
              <v-icon class="action">
                mdi-drag-vertical
              </v-icon>
              <span class="font-weight-bold">
                Q{{ questionIndex + 1 }}
              </span>
            </v-col>

            <v-col>
              <question-input :value="question" :index="questionIndex" @input="e => updateQuestion(e, questionIndex)" />
            </v-col>

            <v-col cols="auto" class="action mt-5 pr-0">
              <v-btn small icon text title="Delete question" @click="remove(question.id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </transition-group>
  </draggable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import QuestionInput from '@/components/QuestionInput'

export default {
  name: 'DesignSection',

  components: {
    QuestionInput
  },

  props: {
    questions: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data: () => ({
    dragOptions: {
      animation: 200,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      ghostClass: 'ghost'
    }
  }),

  computed: {
    filteredQuestions () {
      return this.questions.filter(q => q.type !== 'folder')
    },

    ...mapGetters({
      isDragging: 'survey/isDragging'
    })
  },

  methods: {
    updateForm (data) {
      this.updateSelectedQuestions(data)
    },

    updateQuestion (question, index) {
      this.updateSingleQuestion({ question, index })
    },

    remove (questionId) {
      this.deleteQuestion(questionId)
    },

    ...mapActions({
      updateSingleQuestion: 'survey/updateSingleQuestion',
      deleteQuestion: 'survey/deleteQuestion',
      updateSelectedQuestions: 'survey/updateSelectedQuestions'
    })
  }
}
</script>

<style>
.dropzone {
  border: 1px solid var(--v-primary-base);
  border-radius: 4px;
  border-style: dashed;
}

.q-item .action {
  opacity: 0;
}

.q-item:hover .action {
  opacity: 1;
}
</style>
