<template>
  <v-form ref="surveyForm" @submit.prevent="create">
    <v-card flat width="100%">
      <v-toolbar flat dense>
        <v-tabs v-model="activeTab" height="48" slider-size="3">
          <v-tab>
            Design
          </v-tab>
          <v-tab :disabled="emptyForm">
            Preview
          </v-tab>
          <v-spacer />
          <v-text-field v-model="newForm.title" flat dense solo :outlined="!newForm.title" placeholder="Survey title" class="shrink pt-1 font-weight-bold" title="Survey title" :disabled="saving" />
          <v-spacer />
          <v-btn type="submit" color="primary" outlined class="ma-2" :disabled="emptyForm" :loading="saving">
            Save Form
          </v-btn>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-container grid-list-xs class="accent lighten-1">
            <v-row v-if="!isDragging && emptyForm" class="drag-area" align="center" justify="center">
              <v-col>
                <v-img :src="formIcon" height="40" contain />
                <p class="text-center mt-4 font-weight-bold">
                  Start dragging questions here to create your survey.
                </p>
              </v-col>
            </v-row>

            <v-row v-else>
              <design-section :questions="formQuestions" :class="{ 'not-clickable': saving}" />
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <preview-section :questions="formQuestions" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DesignSection from '@/components/DesignSection'
import PreviewSection from '@/components/PreviewSection'

export default {
  name: 'FormBuilder',

  components: {
    DesignSection,
    PreviewSection
  },

  data: () => ({
    activeTab: 0,
    saving: false,
    newForm: {
      title: 'Jebena mini survey',
      version: '1.0'
    }
  }),

  computed: {
    emptyForm () {
      return this.formQuestions.length === 0
    },

    formIcon () {
      return require('@/assets/icons/clipboard.png')
    },

    ...mapGetters({
      formQuestions: 'survey/formQuestions',
      isDragging: 'survey/isDragging'
    })
  },

  watch: {
    formQuestions () {
      if (this.activeTab) {
        this.activeTab = 0
      }
    }
  },

  methods: {
    create () {
      if (!this.$refs.surveyForm.validate()) {
        setTimeout(() => this.scrollToError(document), 50)
        return false
      }

      try {
        this.saving = true
        setTimeout(() => { this.saving = false }, 2000)
        // Call API
      } catch (error) {
        // Handle errors if any
      }
    },

    ...mapActions({
      scrollToError: 'survey/scrollToError'
    })
  }
}
</script>

<style>
.drag-area {
  min-height: calc(100vh - 150px);
  max-height: calc(100vh - 150px);
  width: 100%;
  overflow: auto;
}

.drag-area > div {
  height: 100%;
}
</style>
