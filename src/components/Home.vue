<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="post in promoPosts"
              :key="post.id"
              :src="post.imgSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/post/' + post.id">{{ post.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="post in posts" :key="post.id">
          <v-card>
            <v-img :src="post.imgSrc" height="250px"></v-img>
            <v-card-title>{{post.title}}</v-card-title>
            <v-card-text>{{post.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/post/' + post.id">Open</v-btn>
              <app-buy-modal :post="post"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-card class="mx-auto mt-12" width="0px">
      <v-card-text>
        <v-progress-circular indeterminate :size="150" :width="5" color="purple"></v-progress-circular>
      </v-card-text>
    </v-card>
  </div>
  <!-- // xs12 class="text" justify="center" -->
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    promoPosts() {
      return this.$store.getters.promoPosts;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>