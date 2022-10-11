<template>
  <v-card flat class="mb-3">
    <v-card-title>
      {{ index + 1 }}. {{ question.title }}
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
</template>

<script>
export default {
  name: 'QuestionPreview',

  props: {
    question: {
      type: Object,
      default: () => ({}),
      required: true
    },

    index: {
      type: Number,
      default: 0,
      required: true
    }
  },

  data: () => ({
    optionValue: null
  })
}
</script>
