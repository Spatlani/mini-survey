<template>
  <v-app-bar color="primary" flat fixed app>
    <v-row justify="space-between">
      <v-col cols="2">
        <v-img :src="logo" max-height="40" max-width="40" contain />
      </v-col>

      <v-col cols="auto" align-self="center">
        <v-row>
          <v-col v-for="menu in headerMenu" :key="menu.title">
            <v-menu offset-y>
              <template #activator="{ on, attrs }">
                <v-btn color="white" text class="text-capitalize title" v-bind="attrs" v-on="on">
                  {{ menu.title }}
                </v-btn>
              </template>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="auto">
        <v-menu left bottom>
          <template #activator="{ on, attrs }">
            <v-btn large text dark v-bind="attrs" v-on="on">
              <v-row no-gutters align="center" class="text-left mr-5">
                <v-col cols="4">
                  <v-avatar size="40" color="white">
                    <v-img src="https://www.enveritas.org/jobs/software-eng/images/jeff_headshot.jpg" alt="Jeff" />
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <p class="font-weight-regular text-capitalize mb-0">
                    Jeff Porter
                  </p>
                  <span class="caption font-weight-thin text-lowercase">
                    jebena.enveritas.org
                  </span>
                </v-col>
              </v-row>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="item in logoutMenu" :key="item.title" @click="item.action">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      headerMenu: [{
        title: 'Standards'
      }, {
        title: 'Surveys'
      }, {
        title: 'Data'
      }],

      logoutMenu: [{
        title: 'Logout',
        action: () => ({})
      }]
    }
  },

  computed: {
    logo () {
      return require('@/assets/logo/enveritas-logo.png')
    }
  }
}
</script>
