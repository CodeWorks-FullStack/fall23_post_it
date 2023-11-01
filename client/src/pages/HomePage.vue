<template>
  <div class="container">
    <!-- SECTION ALBUMS I'M COLLABORATING ON -->
    <div class="row">
      <div v-for="myCollab in myAlbums" :key="myCollab.id" class="col-2">
        <AlbumCard :albumProp="myCollab.album" />
      </div>
    </div>
    <!-- SECTION FILTER BAR -->
    <div class="row my-5">
      <div class="col-12">
        <div class="bg-primary p-4 d-flex justify-content-around rounded-pill">
          <button
            class="btn btn-outline-light w-100 mx-3"
            @click="changeCategory('')"
          >
            All
          </button>
          <button
            @click="changeCategory(category)"
            class="btn btn-outline-light w-100 mx-3"
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- MAGIC vvvvvv STRING -->
      <div v-for="album in albums" :key="album.id" class="col-6 col-md-3">
        <!-- NEEDS TO MATCH HERE vvv -->
        <AlbumCard :albumProp="album" />
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import AlbumCard from "../components/AlbumCard.vue";

export default {
  setup() {
    const categories = ["misc", "dogs", "games", "gachamon", "animals", "cats"];
    const filteredCategory = ref("");

    onMounted(() => {
      getAlbums();
      // NOTE THIS WILL NOT WORK BECAUSE THERE IS NO USER LOGGED IN FOR OUR AUTH TOKEN ON SERVER SIDE
      // getCollabAlbums();
    });
    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      } catch (error) {
        logger.error("[ERROR]", error);
        Pop.error("[ERROR]", error.message);
      }
    }

    // NOTE WON'T ACTUALLY NEED THIS FUNCTIONALITY, MOVE SERVICE CALLBACK TO AUTHSERVICE

    // async function getCollabAlbums() {
    //   try {
    //     await accountService.getCollabAlbums();
    //   } catch (error) {
    //     logger.error("[ERROR]", error);
    //     Pop.error("[ERROR]", error.message);
    //   }
    // }
    return {
      categories,
      filteredCategory,
      // NOTE USE COMPUTED FUNCTIONALITY TO USE YOUR FILTERED CATEGORY REF TO FILTER THROUGH OUR ARRAY AND RETURN THE ONES WE CLICK ON
      albums: computed(() => {
        if (filteredCategory.value) {
          return AppState.albums.filter(
            (album) => album.category == filteredCategory.value
          );
        } else {
          return AppState.albums;
        }
      }),
      myAlbums: computed(() => AppState.myCollaboratedAlbum),

      changeCategory(category) {
        logger.log(category);
        filteredCategory.value = category;
      },
    };
  },
  components: { AlbumCard },
};
</script>

<style scoped lang="scss"></style>
