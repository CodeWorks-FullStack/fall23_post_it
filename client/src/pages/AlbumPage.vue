<template>
  <div class="container-fluid">
    <div class="row mt-5" v-if="album">
      <!-- SECTION ALBUM DETAILS -- LEFT SIDE -->
      <div class="col-12 col-lg-3">
        <div class="row">
          <!-- SECTION ALBUM DETAILS LEFT SIDE -->
          <div class="col-6">
            <img
              class="img-fluid rounded"
              :src="album.coverImg"
              alt="The Album's Cover Image"
              :title="album.title"
            />
          </div>
          <!-- SECTION ALBUM DETAILS RIGHT SIDE -->
          <div class="col-6">
            <div class="p-1 bg-warning text-black rounded">
              <p>{{ album.title }}</p>
              <p>by {{ album.creator.name }}</p>
            </div>
            <div v-if="account.id">
              <button
                class="btn btn-success mt-2 w-100"
                data-bs-toggle="modal"
                data-bs-target="#createPictureModal"
              >
                Create Picture
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- SECTION PICTURES -- RIGHT SIDE -->
      <div class="col-12 col-lg-9">
        <div class="row">
          <div v-for="picture in pictures" :key="picture.id" class="col-3 mb-2">
            <PictureCard :pictureProp="picture" />
          </div>
        </div>
      </div>
    </div>
    <div class="row height-100 align-item-center" v-else>
      <div class="col-12 text-center fs-1">
        <p>Feremy Jowler throttled your computer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import PictureCard from "../components/PictureCard.vue";

export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getAlbumById();
      getPicturesByAlbumId();
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
    async function getPicturesByAlbumId() {
      try {
        const albumId = route.params.albumId;
        await picturesService.getPicturesByAlbumId(albumId);
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }
    return {
      route,
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures),
      account: computed(() => AppState.account),
    };
  },
  components: { PictureCard },
};
</script>

<style>
p {
  margin: 0;
}

.height-100 {
  max-height: 100dvh;
}
</style>
