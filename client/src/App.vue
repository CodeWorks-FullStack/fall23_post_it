<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main class="pt-5">
    <router-view />
  </main>
  <AlbumModal />
  <PictureModal />
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
import AlbumModal from "./components/AlbumModal.vue";
import PictureModal from "./components/PictureModal.vue";

export default {
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
  components: { Navbar, AlbumModal, PictureModal },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-image: url(./assets/img/home-page-bg.png);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
