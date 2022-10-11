<template>
  <v-text-field :value="value" dense solo flat hide-details :clearable="!!value" :placeholder="placeholder" :background-color="backgroundColor" @input="update">
    <template #prepend-inner>
      <v-icon class="mr-1" color="grey lighten-1">
        mdi-magnify
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    backgroundColor: {
      type: String,
      default: 'transparent'
    }
  },

  methods: {
    update (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
</style>
