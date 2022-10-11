<template>
  <draggable v-bind="dragOptions" tag="div" :list="list" :value="value" @input="update" @change="onChange">
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
                <v-list-item-icon class="mr-3">
                  <v-icon v-text="item.icon" size="18" />
                </v-list-item-icon>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <folder-section class="item-sub" :child="true" @change="onChange" @rename="onRename" @delete="onDelete" @move="onMove" :list="el.children" />
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
    },

    child: {
      type: Boolean,
      default: false
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
        icon: 'mdi-pencil',
        action: v => this.$emit('rename', v)
      }, {
        title: 'Move',
        icon: 'mdi-cursor-move',
        action: v => this.$emit('move', v)
      }, {
        title: 'Delete',
        icon: 'mdi-trash-can',
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
    onRename (value) {
      this.$emit('rename', value)
    },

    onMove (value) {
      this.$emit('move', value)
    },

    onDelete (value) {
      this.$emit('delete', value)
    },

    onChange () {
      if (this.child === true) {
        this.$emit('change')
      } else {
        this.update(this.value)
      }
    },

    update (value) {
      this.$emit('input', value)
    },

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

    ...mapActions({
      updateSelectedFolder: 'survey/updateSelectedFolder'
    })
  }
}
</script>

<style>
.item {
  padding: 1rem;
  border: solid black 1px;
  background-color: #fefefe;
}

.item-sub {
  margin: 0 0 0 1rem;
}
</style>
