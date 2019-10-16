<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogOut" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-eject</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card>
      <v-toolbar dense dark class="deep-purple accent-3">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" class="pointer">Project</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text v-for="link of links" :key="link.title" :to="link.url">
            <v-icon left>{{link.icon}}</v-icon>
            {{link.title}}
          </v-btn>
          <v-btn text @click="onLogOut" v-if="isUserLoggedIn">
            <v-icon left>mdi-eject</v-icon>Log Out
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-content v-if="error">
      <v-snackbar
        @input="closeError"
        :value="true"
        color="error"
        :multi-line="true"
        :timeout="5000"
      >
        {{error}}
        <v-btn dark text @click="closeError">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "mdi-bookmark", url: "/orders" },
          { title: "New Post", icon: "mdi-post", url: "/new" },
          { title: "My Posts", icon: "mdi-view-list", url: "/list" }
        ];
      } else {
        return [
          { title: "Login", icon: "mdi-lock", url: "/login" },
          { title: "Sign-Up", icon: "mdi-face", url: "/registration" }
        ];
      }
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogOut() {
      this.$store.dispatch("userLogOut");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
