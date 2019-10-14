<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="post in posts"
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
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/post/' + post.id">Open</v-btn>
              <v-btn raised color="purple" text>Buy</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>{{post.description}}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
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