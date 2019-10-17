<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="warning mr-1" v-on="on">Edit</v-btn>
      </template>

      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-card-title>
                <h1 class="text--primary">Edit ad</h1>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <v-flex xs12>
              <v-card-text>
                <v-text-field name="title" label="Title" type="text" v-model="editedTitle"></v-text-field>
                <v-text-field
                  name="description"
                  label="Description"
                  type="text"
                  v-model="editedDescription"
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onCancel">Cancel</v-btn>
                <v-btn class="success" text @click="onSave">Save</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      dialog: false,
      editedDescription: this.post.description,
      editedTitle: this.post.title
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.post.description;
      this.editedTitle = this.post.title;
      this.dialog = false;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        this.$store.dispatch("updatePost", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.post.id
        });

        this.dialog = false;
      }
    }
  }
};
</script>
