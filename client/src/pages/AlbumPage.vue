<template>
  <div class="container-fluid">
    <div class="row mt-5" v-if="album">
      <!-- SECTION LEFT SIDE -->
      <div class="col-12 col-lg-3">
        <div class="row">
          <!-- SECTION LEFT SIDE -->
          <div class="col-6">
            <img
              class="img-fluid rounded"
              :src="album.coverImg"
              alt="The Album's Cover Image"
              :title="album.title"
            />
          </div>
          <!-- SECTION RIGHT SIDE -->
          <div class="col-6">
            <div class="p-1 bg-warning text-black rounded">
              <p>{{ album.title }}</p>
              <p>by {{ album.creator.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- SECTION RIGHT SIDE -->
      <div class="col-12 col-lg-9"></div>
    </div>
    <div class="row" v-else>
      <div class="col-12 text-center fs-1">
        <p>Feremy Jowler throttled your computer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { albumsService } from "../services/AlbumsService.js";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getAlbumById();
    });

    async function getAlbumById() {
      try {
        const albumId = route.params.albumId;
        await albumsService.getAlbumById(albumId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    return {
      route,
      album: computed(() => AppState.activeAlbum),
    };
  },
};
</script>

<style>
p {
  margin: 0;
}
</style>
