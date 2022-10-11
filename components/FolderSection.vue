<template>
  <v-card flat height="calc(100vh - 490px)" class="mt-6">
    <v-card-title class="text-uppercase subtitle-2">
      <v-row align="center">
        <v-col cols="10">
          <filter-field v-model="folderFilter" placeholder="Search Folders.." />
        </v-col>
        <v-col cols="2">
          <v-btn fab icon x-small @click="newFolder">
            <v-icon>
              mdi-folder-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <folder-tree v-model="allFolders" @rename="renameItem" @delete="removeItem" @move="moveItem" />
    </v-card-text>

    <v-dialog v-model="dialog.namingDialog" width="400">
      <v-card>
        <v-card-title primary-title>
          {{ dialog.title }}
        </v-card-title>
        <v-card-text class="pt-4 pb-2">
          <v-text-field v-model="dialog.folderName" placeholder="Enter folder name" outlined flat dense class="light-input" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" elevation="0" @click="crud">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.moveDialog" width="500">
      <v-card v-if="dialog.edit">
        <v-card-title primary-title>
          Move Folder - {{ dialog.edit.title }}
        </v-card-title>

        <v-card-text>
          <folder-tree v-model="allFolders" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary" elevation="0" @click="move">
            Move
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.deleteDialog" width="400">
      <v-card v-if="dialog.edit">
        <v-card-title primary-title>
          Are you sure you want to delete {{ dialog.edit.title }}?
        </v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="error" elevation="0" @click="remove()">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FilterField from '@/components/input/FilterField'
import FolderTree from '@/components/FolderTree'

function itemMatches (items, keywords) {
  return items.filter((item) => {
    const data = `${item.title.toLowerCase()}`
    const result = keywords.every(keyword => data.includes(keyword))
    if (result) {
      return result
    } else if (item.children && item.children.length > 0) {
      const subResults = itemMatches(item.children, keywords)
      return subResults.length > 0 ? subResults : undefined
    } else {
      return undefined
    }
  })
}

export default {
  name: 'FolderSection',

  components: {
    FilterField,
    FolderTree
  },

  data: () => ({
    folderFilter: null,
    dialog: {
      edit: null,
      title: 'New folder',
      moveDialog: false,
      namingDialog: false,
      deleteDialog: false,
      handler: () => ({}),
      folderName: null
    }
  }),

  computed: {
    filteredDirectory () {
      if (!this.folderFilter) {
        return this.formQuestions
      }

      const keywords = this.folderFilter.toLowerCase().split(' ').filter(keyword => keyword)
      return itemMatches(this.formQuestions, keywords)
    },

    allFolders: {
      get () {
        return this.filteredDirectory
      },

      set (value) {
        this.updateFormQuestions(value)
      }
    },

    ...mapGetters({
      selectedFolderPath: 'survey/selectedFolderPath',
      formQuestions: 'survey/formQuestions'
    })
  },

  methods: {
    removeItem (folder) {
      this.dialog.edit = folder
      this.dialog.deleteDialog = true
    },

    moveItem (folder) {
      this.dialog.title = 'Move folder'
      this.dialog.edit = folder
      this.dialog.moveDialog = true
    },

    renameItem (folder) {
      this.dialog.title = 'Rename folder'
      this.dialog.edit = folder
      this.dialog.folderName = folder.title
      this.dialog.namingDialog = true
    },

    newFolder () {
      this.dialog.edit = null
      const path = this.selectedFolderPath ? `${this.selectedFolderPath} / ` : ''
      this.dialog.title = `${path}New folder`
      this.dialog.namingDialog = true
      this.dialog.folderName = 'Untitled folder'
    },

    crud () {
      if (this.dialog.edit) {
        const updateFolder = { title: this.dialog.folderName, id: this.dialog.edit.id }
        this.updateFolder(updateFolder)
      } else {
        this.addNewFolder(this.dialog.folderName)
      }
      this.closeDialog()
    },

    move () {
      this.moveFolder(this.dialog.edit.id)
      this.closeDialog()
    },

    remove () {
      this.deleteFolder(this.dialog.edit.id)
      this.closeDialog()
    },

    closeDialog () {
      this.dialog.edit = null
      this.dialog.folderName = null
      this.dialog.namingDialog = false
      this.dialog.deleteDialog = false
      this.dialog.moveDialog = false
    },

    ...mapActions({
      deleteFolder: 'survey/deleteFolder',
      moveFolder: 'survey/moveFolder',
      addNewFolder: 'survey/addNewFolder',
      updateFolder: 'survey/updateFolder',
      updateFormQuestions: 'survey/updateFormQuestions'
    })
  }
}
</script>
