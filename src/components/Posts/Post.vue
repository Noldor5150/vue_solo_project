<template>
  <v-container>
    <v-layout v-if="!loading">
      <v-flex xs12>
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
    </v-layout>
    <div v-else>
      <v-card class="mx-auto mt-12" width="0px">
        <v-card-text>
          <v-progress-circular indeterminate :size="150" :width="5" color="purple"></v-progress-circular>
        </v-card-text>
      </v-card>
    </div>
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