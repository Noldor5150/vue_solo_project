<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="primary" v-on="on" text>Buy</v-btn>
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
                <v-text-field name="name" label="Your name" type="text" v-model="name"></v-text-field>
                <v-text-field name="phone" label="Tour phone" type="text" v-model="phone"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row>
            <v-flex xs12>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onCancel" :disabled="localLoading">Close</v-btn>
                <v-btn
                  class="success"
                  text
                  @click="onSave"
                  :disabled="localLoading"
                  :loading="localLoading"
                >Buy It NOW</v-btn>
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
      name: "",
      phone: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      (this.name = ""), (this.phone = ""), (this.dialog = false);
    },
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        (this.localLoading = true),
          this.$store
            .dispatch("createOrder", {
              name: this.name,
              phone: this.phone,
              postId: this.post.id,
              ownersId: this.post.ownersId
            })
            .finally(() => {
              (this.name = ""),
                (this.phone = ""),
                (this.localLoading = false),
                (this.dialog = false);
            });
      }
    }
  }
};
</script>
