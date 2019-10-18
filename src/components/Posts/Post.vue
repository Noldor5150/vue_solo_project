<template>
  <v-container>
    <v-layout>
      <v-flex xs12 v-if="!loading">
        <v-card>
          <v-img :src="post.imgSrc" height="300"></v-img>
          <v-card-text>
            <h1 class="text--primary mb-3">{{post.title}}</h1>

            <p>{{post.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <appEditPostModal :post="post" v-if="isOwner"></appEditPostModal>
            <app-buy-modal :post="post"></app-buy-modal>
          </v-card-actions>
        </v-card>
      </v-flex>
      <div v-else>Loading</div>
    </v-layout>
  </v-container>
</template>

<script>
import EditPostModal from "./EditPostModal";
export default {
  props: ["id"],
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.postById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.post.ownersId === this.$store.getters.user.id;
    }
  },
  components: {
    appEditPostModal: EditPostModal
  }
};
</script>

<style>
</style>