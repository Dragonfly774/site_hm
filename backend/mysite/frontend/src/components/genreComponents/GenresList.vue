<template>
  <div>
    <div v-show="genres.length !== 0">
      <transition-group name="genre">
        <div class="genre" v-for="genre in genres" :key="`genre-${genre.id}`">
          <div>
            <div class="s-item">
              <div style="display: flex; flex-direction: row;">
                <div class="s-item--actions">
                  <s-button class="warning" @click="$emit('remove', genre)">Удалить</s-button>
                </div>
                <div class="s-item--actions">
                  <s-button class="notify" @click="$emit('update', genre)">Изменить</s-button>
                </div>
              </div>
              <table class="s-tr">
                <tr>
                  <td class="s-td"><p><strong>id:</strong></p></td>
                  <td class="s-td"><p><strong>Название:</strong></p></td>
                  <td class="s-td"><p><strong>Описание:</strong></p></td>
                </tr>
                <tr>
                  <td class="s-td"><p>{{ genre.id }}</p></td>
                  <td class="s-td"><p>{{ genre.name }}</p></td>
                  <td class="s-td"><p>{{ genre.description }}</p></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <transition name="genre">
      <div v-show="genres.length === 0" class="warning" style="text-align: center">
        <h1>Жанров нет</h1>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "GenresList",
  props: {
    genres: {
      type: Array,
      required: true,
    }
  },
  removeGenre(genre) {
    this.$ajax.delete(`api/genre/${genre.id}`).then((response) => {
      $emit('remove', genre)
    })
  },
}
</script>
<style scoped>
.s-tr {
  font-size: 14px;
  max-width: 100%;
  width: 100%;
  border-collapse: collapse;
  text-align: center;

}

.s-td {
  color: #000000;
  padding: 10px 18px;
  transition: .3s linear;
}


.s-item {
  padding-left: 5px;
  margin-top: 15px;
  border-radius: 10px;
  background: #a5eaa5;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

.s-item--actions {
  display: flex;
  align-self: end;
  margin-left: 10px;
  margin-top: 10px;
}
.genre-enter-active, .genre-leave-active {
  transition: all .5s;
}

.genre-move {
  transition: transform .5s;
}

.genre-enter, .genre-leave-to {
  opacity: 0.5;
  transform: translateY(20px);

}
</style>