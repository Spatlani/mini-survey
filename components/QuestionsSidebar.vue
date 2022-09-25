<template>
  <v-card flat>
    <v-card-title class="text-uppercase subtitle-2">
      Question templates
    </v-card-title>
    <v-card-text>
      <draggable
        v-model="defaultTypes"
        :list="defaultTypes"
        v-bind="dragOptions"
        tag="v-row"
        :group="{ name: 'question', pull: 'clone', put: false }"
        @start="drag(true)"
        @end="drag(false)"
      >
        <v-col v-for="q in defaultTypes" :key="q.title" cols="12" @click="addQuestion(q)">
          <v-card outlined class="cursor-move">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ q.label }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="30"
              >
                <v-img contain :src="iconSrc(q.icon)" />
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
      </draggable>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { QuestionTypes } from '@/models/Question'

export default {
  name: 'QuestionsSidebar',

  data: () => ({
    dragOptions: {
      sort: false
    },
    defaultTypes: QuestionTypes
  }),

  methods: {
    iconSrc (icon) {
      return require(`@/assets/icons/${icon}.png`)
    },

    drag (status) {
      this.updateDraggingStatus(status)
    },

    addQuestion (question) {
      this.addNewQuestion(question)
    },

    ...mapActions({
      addNewQuestion: 'survey/addNewQuestion',
      updateDraggingStatus: 'survey/updateDraggingStatus'
    })
  }
}
</script>
