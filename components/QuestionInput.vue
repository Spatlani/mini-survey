<template>
  <v-row class="mb-1">
    <v-col cols="8">
      <p class="mb-0 caption text-uppercase font-weight-medium black--text">
        Title
      </p>
      <v-text-field v-model="question.title" placeholder="Enter question title" dense outlined hide-details class="light-input body-1" autofocus />
      <v-checkbox v-model="question.required" :value="true" dense class="ma-0 caption" hide-details>
        <template #label>
          <span class="caption font-weight-medium">Required</span>
        </template>
      </v-checkbox>
    </v-col>

    <v-col cols="4">
      <p class="mb-0 caption text-uppercase font-weight-medium black--text">
        Answer Type
      </p>
      <v-select v-model="question.type" :items="defaultTypes" item-text="label" item-value="type" dense outlined hide-details class="light-input" @input="updateType" />
    </v-col>

    <v-col v-if="question.options" cols="12">
      <p class="mb-0 caption text-uppercase font-weight-medium black--text">
        Options
      </p>

      <v-radio-group v-model="optionValue" dense class="mt-0" hide-details>
        <v-radio v-for="(option, optionIndex) in question.options" :key="optionIndex" :value="optionIndex" class="mb-2" color="primary">
          <template #label>
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <v-text-field :value="question.options[optionIndex]" :placeholder="`Enter option ${optionIndex + 1}`" dense outlined hide-details class="light-input" @input="v => updateOption(v, optionIndex)" />
              </v-col>

              <v-col v-if="question.options.length > 1 && question.type === 'radio'" cols="1" class="ml-1">
                <v-btn icon fab x-small title="Remove option" @click="deleteOption(optionIndex)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-radio>
      </v-radio-group>

      <v-btn v-if="question.type === 'radio'" x-small title="Remove option" text :disabled="question.options.length > 3" @click="addOption()">
        <v-icon small class="mr-2">
          mdi-plus
        </v-icon>
        Add option
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Question, QuestionTypes } from '@/models/Question'

export default {
  name: 'QuestionInput',

  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data () {
    return {
      question: new Question(this.value),
      defaultTypes: QuestionTypes,
      optionValue: 0
    }
  },

  watch: {
    question: {
      handler (newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },

  methods: {
    updateType (type) {
      const newType = this.defaultTypes.find(t => t.type === type)
      this.question.options = newType.options
    },

    copyOptions (options) {
      return JSON.parse(JSON.stringify(options))
    },

    updateOption (value, index) {
      const optionsCopy = this.copyOptions(this.question.options)
      optionsCopy[index] = value
      this.question.options = optionsCopy
    },

    addOption () {
      const optionsCopy = this.copyOptions(this.question.options)
      optionsCopy.push(`Option ${optionsCopy.length + 1}`)
      this.question.options = optionsCopy
    },

    deleteOption (index) {
      const optionsCopy = this.copyOptions(this.question.options)
      optionsCopy.splice(index, 1)
      this.question.options = optionsCopy
    }
  }
}
</script>
