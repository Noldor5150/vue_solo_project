<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My Posts</h1>
        <v-card v-for="post in posts" :key="post.id" class="elevation-10 mb-5">
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {
          title: "First post",
          description: "Hi Guys",
          promo: false,
          imgSrc:
            "https://cdn.onebauer.media/one/radio-legacy/47/52bac/862c0/d9b9e/ef85b/e3dcd/ca87a/dimebagvinnie-getty.jpg?quality=80&width=960&ratio=16-9&resizeStyle=aspectfill&format=jpg",
          id: "123"
        },
        {
          title: "Second post",
          description: "Hi Guys2",
          promo: true,
          imgSrc:
            "http://www.mixdownmag.com.au/sites/default/files/styles/flexslider_h400/public/images/dimebag.jpg?itok=_osaAvue",
          id: "1234"
        },
        {
          title: "Third post",
          description: "Hi Guys3",
          promo: true,
          imgSrc:
            "https://www.billboard.com/files/styles/landscape_768/public/media/dimebag-darrell-pantera-billboard-650.jpg",
          id: "1235"
        }
      ]
    };
  }
};
</script>

<style>
</style>