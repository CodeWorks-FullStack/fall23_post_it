<template>
  <div
    class="modal fade"
    id="createPictureModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Create Picture
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createPicture()">
            <div class="mb-3">
              <label for="imgUrl" class="form-label">Image Url</label>
              <input
                v-model="editable.imgUrl"
                type="url"
                class="form-control"
                id="imgUrl"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { picturesService } from "../services/PicturesService.js";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    return {
      editable,

      async createPicture() {
        try {
          const pictureData = editable.value;
          pictureData.albumId = route.params.albumId;
          await picturesService.createPicture(pictureData);
          Pop.success("You have created a Picture.");
          editable.value = {};
          Modal.getInstance("#createPictureModal").hide();
        } catch (error) {
          logger.error("[ERROR]", error);
          Pop.error("[ERROR]", error.message);
        }
      },
    };
  },
};
</script>

<style></style>
