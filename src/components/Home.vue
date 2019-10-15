<template>
  <div>
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
              <v-btn raised color="purple" text>Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    promoPosts() {
      return this.$store.getters.promoPosts;
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