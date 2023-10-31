<template>
  <!-- MAKE SURE TO SET ID OF MODAL FOR BUTTON TO HIT -->
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
            <!-- TITLE -->
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
            <!-- COVER IMAGE -->
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
            <!-- CATEGORy -->
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select
                v-model="editable.category"
                class="form-select"
                name=""
                id=""
              >
                <!-- V-FOR OVER THE CATEGORY VARIABLE WE MADE IN SETUP -->
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
    // ASSIGN A VARIABLE TO HOLD ALL THE CATEGORIES WE MADE FROM SERVER SO WE CAN V-FOR OVER THEM
    const categories = ["misc", "dogs", "games", "gachamon", "animals", "cats"];

    return {
      // MAKE SURE YOU RETURN ANY VARIABLES YOU WILL WANT TO USE IN YOUR HTML
      categories,
      editable,

      async createAlbum() {
        try {
          const albumData = editable.value;
          await albumsService.createAlbum(albumData);
          // CLEAR OUT OUR EDITABLE, AND CLOSE OUR MODAL ON CREATE
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
