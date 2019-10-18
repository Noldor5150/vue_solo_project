<template>
  <v-container>
    <div v-if="!loading && myPosts.length!==0">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="text--secondary mb-3">My Posts</h1>
          <v-card v-for="post in myPosts" :key="post.id" class="elevation-10 mb-5">
            <v-layout>
              <v-flex xs4>
                <v-img :src="post.imgSrc" height="160"></v-img>
              </v-flex>
              <v-flex xs8>
                <v-card-text>
                  <h2 class="text--primary">{{post.title}}</h2>
                  <p>{{post.description}}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="info" :to="'/post/' + post.id">Open</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div v-else-if="!loading && myPosts.length===0">You have no posts</div>
    <div v-else>Loading</div>
  </v-container>
</template>

<script>
export default {
  computed: {
    myPosts() {
      return this.$store.getters.myPosts;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
</style>