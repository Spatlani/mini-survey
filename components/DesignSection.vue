<template>
  <draggable :value="questions" v-bind="dragOptions" tag="v-col" handle=".handle" group="question" class="drag-area my-n3" :class="{ 'dropzone': isDragging }" @input="updateForm">
    <transition-group type="transition" name="flip-list" tag="div">
      <v-card v-for="(question, questionIndex) in questions" :key="questionIndex + 0" class="q-item my-3" flat>
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
              <v-btn small icon text title="Delete question" @click="remove(questionIndex)">
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
    ...mapGetters({
      isDragging: 'survey/isDragging'
    })
  },

  methods: {
    updateForm (data) {
      this.updateFormQuestions(data)
    },

    updateQuestion (question, index) {
      this.updateSingleQuestion({ question, index })
    },

    remove (index) {
      this.deleteQuestion(index)
    },

    ...mapActions({
      updateSingleQuestion: 'survey/updateSingleQuestion',
      deleteQuestion: 'survey/deleteQuestion',
      updateFormQuestions: 'survey/updateFormQuestions'
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
