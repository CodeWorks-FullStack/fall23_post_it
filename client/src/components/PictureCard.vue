<template>
  <img class="img-fluid rounded img-shadow" :src="pictureProp.imgUrl" alt="" />
</template>

<script>
import { Picture } from "../models/Picture.js";

export default {
  props: { pictureProp: { type: Picture, required: true } },

  setup() {
    return {};
  },
};
</script>

<style scoped>
.img-shadow {
  border: 1px solid black;
  box-shadow: 2px 2px white;
  transition: ease-in-out 0.4s;
}

.img-shadow:hover {
  box-shadow: 2px 2px 5px white;
}
</style>
