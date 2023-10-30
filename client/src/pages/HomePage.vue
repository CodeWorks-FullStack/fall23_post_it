<template>
  <div class="container">
    <div class="row">
      <div v-for="album in albums" :key="album.id" class="col-3">
        <AlbumCard :albumProp="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    onMounted(() => {
      getAlbums();
    });

    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }
    return {
      albums: computed(() => AppState.albums),
    };
  },
};
</script>

<style scoped lang="scss"></style>
