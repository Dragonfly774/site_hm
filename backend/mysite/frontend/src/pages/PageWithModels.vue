<template>
    <div class="main-block">
      <app-header></app-header>
      <div style="text-align: center; margin: auto; padding: 10px">
        <label><input type="radio" v-model="activeComponent" value="AppContentBooks"/> Cписок книг </label>
        <label> <input type="radio" v-model="activeComponent" value="AppContentAuthors"/> Список авторов </label>
        <label> <input type="radio" v-model="activeComponent" value="AppContentGenres"/> Список жанров </label>
        <label> <input type="radio" v-model="activeComponent" value="AppContentCountrys"/> Список стран </label>
        <keep-alive transition name="translate" mode="out-in">
          <component :is="activeComponent"></component>
        </keep-alive>

        <br/>
      </div>
    </div>

</template>

<script>

import AppHeader from "@/AppHeader.vue";
import AppContentBooks from "@/components/bookComponents/AppContentBooks.vue";
import AppContentAuthors from "@/components/authorComponents/AppContentAuthors.vue";
import AppContentGenres from "@/components/genreComponents/AppContentGenres.vue";
import AppContentCountrys from "@/components/countryComponents/AppContentCountrys.vue";

export default {
  name: "BookPage",
  components: {
    AppHeader,  AppContentBooks, AppContentAuthors, AppContentGenres, AppContentCountrys
  },
  data() {
    return {
      activeComponent: "AppContentBooks"
    }
  }
}
</script>



<style scoped>
.main-block {
  width: 60%;
  margin: 0 auto;
}
</style>