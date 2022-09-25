<template>
  <v-container grid-list-xs class="drag-area accent lighten-1">
    <v-card v-for="(question, questionIndex) in questions" :key="questionIndex" flat class="mb-3">
      <v-card-title>
        {{ questionIndex + 1 }}. {{ question.title }}
        <sup v-if="question.required" class="caption error--text">
          *
        </sup>
      </v-card-title>

      <v-card-text v-if="question.type === 'text' || question.type === 'number'">
        <v-text-field :type="question.type" placeholder="Enter your answer..." dense outlined hide-details class="light-input" />
      </v-card-text>

      <v-card-text v-else>
        <v-radio-group v-model="optionValue" dense class="mt-0">
          <v-radio v-for="(option, optionIndex) in question.options" :key="optionIndex" :value="option" :label="option" class="mb-2" color="primary" />
        </v-radio-group>
      </v-card-text>
    </v-card>

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
export default {
  name: 'PreviewSection',

  props: {
    questions: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data: () => ({
    optionValue: null
  })
}
</script>
