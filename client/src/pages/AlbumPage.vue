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
            <div class="p-2 bg-warning text-black rounded">
              <p>{{ album.title }}</p>
              <p>by {{ album.creator.name }}</p>
            </div>
            <div v-if="isCollaborator">
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
        <!-- SECTION COLLAB/COLLAB COUNT -->
        <div class="row mt-2">
          <div class="col-6">
            <div class="bg-primary text-light p-1">
              <p>Collab count nuber</p>
              <p>Collaborators</p>
            </div>
          </div>
          <div class="col-4">
            <!-- v-if="!isCollaborator" -->
            <button
              :disabled="isCollaborator"
              @click="collaborateOnAlbum()"
              class="text-light p-1 btn btn-secondary w-100 text-center"
            >
              <i class="mdi mdi-heart"></i>
              <p>Collab</p>
            </button>
          </div>
        </div>
        <!-- SECTION COLLAB PROFILE PICTURES/NAMES -->
        <div class="row mt-2">
          <div
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            class="col-4"
          >
            <!-- NOTE MAKE A ACTUAL COMPONENT FOR REUSABILITY -->
            <img
              class="img-fluid rounded-circle my-1"
              :src="collaborator.profile.picture"
              :title="collaborator.profile.name"
              alt="Profile Picture"
            />
          </div>
        </div>
        <div class="text-end">
          <p class="text-success" v-if="isCollaborator">
            You're a collaborator!!
          </p>
        </div>
      </div>
      <!-- SECTION PICTURES -- RIGHT SIDE -->
      <div class="col-12 col-lg-9">
        <div class="masonry">
          <div
            v-for="picture in pictures"
            :key="picture.id"
            class="w-100 mb-2 div-height"
          >
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
import { collaboratorsService } from "../services/CollaboratorsService.js";
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
      getCollaboratorsOnAlbum();
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
    async function getCollaboratorsOnAlbum() {
      try {
        const albumId = route.params.albumId;
        await collaboratorsService.getCollaboratorsOnAlbum(albumId);
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
      collaborators: computed(() => AppState.collaborators),
      // NOTE GO TO OUR APPSTATE AND TRY TO FIND IF I'M ACTUALLY A COLLABORATOR ON THIS ALBUM
      isCollaborator: computed(() =>
        AppState.collaborators.find(
          (collaborator) => collaborator.accountId == AppState.account.id
        )
      ),

      async collaborateOnAlbum() {
        try {
          const albumId = route.params.albumId;
          await collaboratorsService.collaborateOnAlbum(albumId);
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
  components: { PictureCard },
};
</script>

<style>
.masonry {
  columns: 200px;
}

p {
  margin: 0;
}

.height-100 {
  max-height: 100dvh;
}
</style>
