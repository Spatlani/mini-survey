<template>
  <v-app>
    <app-header />

    <v-main class="accent">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
export default {
  name: 'DefaultLayout',

  components: {
    AppHeader
  }
}
</script>
