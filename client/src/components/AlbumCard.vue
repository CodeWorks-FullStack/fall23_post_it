<template>
  <router-link :to="{ name: 'Album', params: { albumId: albumProp.id } }">
    <img class="img-fluid" :src="albumProp.coverImg" alt="" />
  </router-link>
  <p class="fs-5">{{ albumProp.title }}</p>
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

<style></style>
