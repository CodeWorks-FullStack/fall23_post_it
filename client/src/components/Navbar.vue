<template>
  <nav class="navbar navbar-expand-lg px-3 nav-blur">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p class="fs-1 text-white fw-bold m-0">
          <i class="mdi mdi-film"></i> Post_It
        </p>
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
        <li v-if="album && !album.archived">
          <!-- TODO NOTE -->
          <!-- USE OUR ROUTE VARIABLE TO CHECK IF THE PAGE NAME EQUALS THE ALBUM PAGE
 -->
          <button
            class="btn btn-outline text-white"
            @click="destroyAlbum(album)"
            v-if="route.name == 'Album' && album.creatorId == account.id"
          >
            Archive Album
          </button>
        </li>
        <li v-else-if="album">
          <!-- TODO NOTE -->
          <!-- USE OUR ROUTE VARIABLE TO CHECK IF THE PAGE NAME EQUALS THE ALBUM PAGE
 -->

          <button
            class="btn btn-outline text-white"
            @click="destroyAlbum(album)"
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

      async destroyAlbum(album) {
        try {
          // QUICK WAY TO SET UP TWO POP CONFIRMS
          // SENT DOWN ALBUM OBJECT FROM ON CLICK THEN CHECKED IF IT'S ARCHIVED OR NOT
          // IF IT ISN'T POP CONFIRM FOR DELETE, IF IT IS POP CONFIRM FOR UNARCHIVE
          if (!album.archived) {
            const yes = await Pop.confirm(
              "Are you sure you want to delete this album?"
            );
            if (!yes) {
              return;
            }
          } else {
            const yes = await Pop.confirm(
              "Are you sure you want to Unarchive this album?"
            );
            if (!yes) {
              return;
            }
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

.nav-blur {
  backdrop-filter: blur(15px);
  border-bottom: 1px rgba(255, 255, 255, 0.352) solid;
}

.btn {
  transition: ease-in-out 1s !important;
}

.btn:hover {
  text-decoration: underline;
}
</style>
