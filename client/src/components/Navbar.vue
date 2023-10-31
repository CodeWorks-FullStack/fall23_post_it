<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/cw-logo.png" height="45" />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            About
          </router-link>
        </li>
        <li v-if="album && !album.archived">
          <!-- TODO NOTE -->
          <button
            class="btn btn-outline-light"
            @click="destroyAlbum()"
            v-if="route.name == 'Album' && album.creatorId == account.id"
          >
            Archive Album
          </button>
        </li>
        <li v-else-if="album">
          <!-- TODO NOTE -->
          <button
            class="btn btn-outline-light"
            @click="destroyAlbum()"
            v-if="route.name == 'Album' && album.creatorId == account.id"
          >
            Unarchive Album
          </button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import Login from "./Login.vue";
import { logger } from "../utils/Logger.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
export default {
  setup() {
    const route = useRoute();
    return {
      route,
      account: computed(() => AppState.account),
      album: computed(() => AppState.activeAlbum),

      async destroyAlbum() {
        try {
          const yes = await Pop.confirm(
            "Are you sure you want to delete this album?"
          );
          if (!yes) {
            return;
          }
          const albumId = route.params.albumId;
          await albumsService.destroyAlbum(albumId);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
  components: { Login },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
