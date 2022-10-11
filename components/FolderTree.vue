<template>
  <draggable v-bind="dragOptions" tag="div" :list="list" :value="value" @input="update">
    <div v-for="el in allItems" :key="el.id" class="item-group cursor-move">
      <v-row align="center" :class="{ 'grey lighten-3': el.id === selectedFolder }" @click="setSelected(el)">
        <v-col cols="1" class="cursor-pointer" :class="{ 'hide-div': el.children?.length === 0 || el.type !== 'folder' }" @click="expandFolder(el)">
          <v-icon>
            {{ el.id === expandedFolder ? 'mdi-menu-down' : 'mdi-menu-right' }}
          </v-icon>
        </v-col>

        <v-col cols="auto">
          <v-icon v-if="el.type === 'folder'">
            {{ el.id === expandedFolder ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-img v-else :src="logo" max-height="24" max-width="24" contain />
        </v-col>

        <v-col class="subtitle-1 font-weight-bold pl-0">
          {{ el.title }}
        </v-col>

        <v-col v-if="el.type === 'folder'" cols="auto">
          <v-menu left bottom>
            <template #activator="{ on, attrs }">
              <v-btn x-small fab icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="item in folderMenu" :key="item.title" @click="item.action(el)">
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <folder-section v-show="el.id === expandedFolder" class="item-sub" :list="el.children" />
    </div>
  </draggable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FolderSection',

  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },

    list: {
      required: false,
      type: Array,
      default: null
    }
  },

  data () {
    return {
      expandedFolder: null,
      dragOptions: {
        animation: 0,
        group: 'folder',
        disabled: false,
        ghostClass: 'ghost'
      },
      folderMenu: [{
        title: 'Rename',
        action: v => this.$emit('rename', v)
      }, {
        title: 'Move',
        action: v => this.$emit('move', v)
      }, {
        title: 'Delete',
        action: v => this.$emit('delete', v)
      }]
    }
  },

  computed: {
    logo () {
      return require('@/assets/icons/qna.png')
    },

    allItems () {
      return this.value ? this.value : this.list
    },

    ...mapGetters({
      selectedFolder: 'survey/selectedFolder'
    })
  },

  methods: {
    expandFolder (folder) {
      if (this.expandedFolder === folder.id) {
        this.expandedFolder = null
      } else {
        this.expandedFolder = folder.id
      }
    },

    setSelected (element) {
      if (element.type === 'folder') {
        this.updateSelectedFolder(element.id)
      }
    },

    update (value) {
      this.$emit('input', value)
    },

    ...mapActions({
      updateSelectedFolder: 'survey/updateSelectedFolder'
    })
  }
}
</script>

<style>
.item-container {
  max-width: 20rem;
  margin: 0;
}

.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}

.item-sub {
  margin: 0 0 0 1rem;
}
</style>
