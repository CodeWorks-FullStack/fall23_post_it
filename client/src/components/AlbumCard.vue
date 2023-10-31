<template>
  <div>
    <router-link :to="{ name: 'Album', params: { albumId: albumProp.id } }">
      <img class="img-fluid img-shadow" :src="albumProp.coverImg" alt="" />
    </router-link>
    <p class="fs-5 text-white text-shadow">{{ albumProp.title }}</p>
  </div>
</template>

<script>
import { Album } from "../models/Album.js";

export default {
  props: { albumProp: { type: Album, required: true } },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.img-shadow {
  border: 1px solid rgba(255, 255, 255, 0.627);
  transition: ease-in-out 0.275s;
}

.img-shadow:hover {
  box-shadow: 0px 0px 15px white;
}

.text-shadow {
  text-shadow: 2px 2px 3px black, 2px 2px 3px black, 2px 2px 3px black;
}
</style>
