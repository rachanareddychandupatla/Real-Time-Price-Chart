<template>
  <div>
    <HomePage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomePage from "../components/add-items/HomePage.vue"; // @ is an alias to /src
@Component({
  components: {
    HomePage,
  },
})
export default class HomeView extends Vue {}
</script>
