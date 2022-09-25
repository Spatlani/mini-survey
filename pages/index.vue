<template>
  <v-row>
    <v-col cols="3">
      <questions-sidebar />
    </v-col>
    <v-col cols="9">
      <form-builder />
    </v-col>
  </v-row>
</template>

<script>
import QuestionsSidebar from '@/components/QuestionsSidebar'
import FormBuilder from '@/components/FormBuilder'

export default {
  name: 'SurveyBuilder',

  components: {
    QuestionsSidebar,
    FormBuilder
  }
}
</script>
