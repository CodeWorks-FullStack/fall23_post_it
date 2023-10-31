<template>
  <div
    class="modal fade"
    id="createAlbumModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Create Album</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- MODAL BODY -->
        <div class="modal-body">
          <!-- FORM -->
          <form @submit.prevent="createAlbum()">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="editable.title"
                required
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="mb-3">
              <label for="coverImage" class="form-label">Cover Image</label>
              <input
                v-model="editable.coverImg"
                required
                type="url"
                class="form-control"
                id="coverImage"
              />
            </div>
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select
                v-model="editable.category"
                class="form-select"
                name=""
                id=""
              >
                <option
                  :value="category"
                  v-for="category in categories"
                  :key="category"
                >
                  {{ category }}
                </option>
              </select>
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
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { albumsService } from "../services/AlbumsService.js";
import { Modal } from "bootstrap";

export default {
  setup() {
    const editable = ref({});
    const categories = ["misc", "dogs", "games", "gachamon", "animals", "cats"];

    return {
      categories,
      editable,

      async createAlbum() {
        try {
          const albumData = editable.value;
          await albumsService.createAlbum(albumData);
          Pop.success("Created Album!");
          editable.value = {};
          Modal.getOrCreateInstance("#createAlbumModal").hide();
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
