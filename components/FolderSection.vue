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
      <folder-tree v-model="allFolders" @rename="renameFolder" @delete="removeFolder" />
    </v-card-text>

    <v-dialog v-model="dialog.namingDialog" width="300">
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

    <v-dialog v-model="dialog.deleteDialog" width="300">
      <v-card v-if="this.dialog.edit">
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

export default {
  name: 'FolderSection',

  components: {
    FilterField,
    FolderTree
  },

  data: () => ({
    dialog: {
      edit: null,
      title: 'New folder',
      namingDialog: false,
      deleteDialog: false,
      handler: () => ({}),
      folderName: null
    }
  }),

  computed: {
    allFolders: {
      get () {
        return this.folders
      },

      set (value) {
        this.updateFormQuestions(value)
      }
    },

    folderFilter: {
      get () {
        return this.folderFilterValue
      },

      set (value) {
        this.updateFolderFilter(value)
      }
    },

    ...mapGetters({
      folderFilterValue: 'survey/folderFilter',
      folders: 'survey/formQuestions'
    })
  },

  methods: {
    removeFolder (folder) {
      this.dialog.edit = folder
      this.dialog.deleteDialog = true
    },

    renameFolder (folder) {
      this.dialog.title = 'Rename folder'
      this.dialog.edit = folder
      this.dialog.folderName = folder.title
      this.dialog.namingDialog = true
    },

    newFolder () {
      this.dialog.edit = null
      this.dialog.title = 'New folder'
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

    remove () {
      this.deleteFolder(this.dialog.edit.id)
      this.closeDialog()
    },

    closeDialog () {
      this.dialog.edit = null
      this.dialog.folderName = null
      this.dialog.namingDialog = false
      this.dialog.deleteDialog = false
    },

    ...mapActions({
      deleteFolder: 'survey/deleteFolder',
      addNewFolder: 'survey/addNewFolder',
      updateFolder: 'survey/updateFolder',
      updateFolderFilter: 'survey/updateFolderFilter',
      updateFormQuestions: 'survey/updateFormQuestions'
    })
  }
}
</script>
