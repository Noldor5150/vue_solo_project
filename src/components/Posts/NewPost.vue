<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new Post</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="Title"
            label="Ad title"
            type="text"
            required
            :rules="titleRules"
            v-model="title"
          ></v-text-field>
          <v-text-field
            name="Description"
            label="Ad description"
            type="text"
            required
            :rules="descriptionRules"
            v-model="description"
          ></v-text-field>
          <v-layout class="mb-3">
            <v-flex xs12>
              <v-btn class="warning">
                Upload
                <v-icon right dark>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-img
                src="https://www.billboard.com/files/styles/landscape_768/public/media/dimebag-darrell-pantera-billboard-650.jpg"
                height="180"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-switch v-model="promo" label="Add to post" color="primary"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-spacer></v-spacer>
              <v-btn
                class="success"
                :loading="loading"
                :disabled="!valid ||loading"
                @click="addPost"
              >Add post</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
      titleRules: [v => !!v || "Title is required"],
      descriptionRules: [v => !!v || "Description is required"]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    addPost() {
      if (this.$refs.form.validate()) {
        const post = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imgSrc:
            "https://www.deanguitars.com/images/productimages/dfhcfhnc/dfhcfhnc.png"
        };
        this.$store
          .dispatch("createPost", post)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style>
</style>