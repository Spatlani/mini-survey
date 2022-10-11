<template>
  <v-container grid-list-xs class="drag-area accent lighten-1">
    <question-preview v-for="(question, questionIndex) in questions" :key="questionIndex" :question="question" :index="questionIndex" />

    <v-row justify="center">
      <v-col cols="auto">
        <v-btn color="primary" text class="ma-2">
          Submit responses
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestionPreview from '@/components/QuestionPreview'

export default {
  name: 'PreviewSection',

  components: {
    QuestionPreview
  },

  props: {
    questions: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
