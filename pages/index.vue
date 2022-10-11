<template>
  <v-row class="pa-4">
    <v-col cols="3">
      <questions-sidebar class="mb-2" />
      <folder-section />
    </v-col>
    <v-col cols="9">
      <form-builder />
    </v-col>
  </v-row>
</template>

<script>
import QuestionsSidebar from '@/components/QuestionsSidebar'
import FormBuilder from '@/components/FormBuilder'
import FolderSection from '@/components/FolderSection'

export default {
  name: 'SurveyBuilder',

  components: {
    QuestionsSidebar,
    FormBuilder,
    FolderSection
  }
}
</script>
