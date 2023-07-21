<template>
  <div>
    <div v-show="authors.length !== 0">
      <transition-group name="author">
        <div class="author" v-for="author in authors" :key="`author-${author.id}`">
          <div>
            <div class="s-item">
              <div style="display: flex; flex-direction: row;">
                <div class="s-item--actions">
                  <s-button class="warning" @click="$emit('remove', author)">Удалить</s-button>
                </div>
                <div class="s-item--actions">
                  <s-button class="notify" @click="$emit('update', author)">Изменить</s-button>
                </div>
              </div>
              <table class="s-tr">
                <tr>
                  <td class="s-td"><p><strong>id:</strong></p></td>
                  <td class="s-td"><p><strong>Имя:</strong></p></td>
                  <td class="s-td"><p><strong>Фамилия:</strong></p></td>
                  <td class="s-td"><p><strong>Возраст:</strong></p></td>
                  <td class="s-td"><p><strong>Страна:</strong></p></td>
                </tr>
                <tr>
                  <td class="s-td"><p>{{ author.id }}</p></td>
                  <td class="s-td"><p>{{ author.first_name }}</p></td>
                  <td class="s-td"><p>{{ author.second_name }}</p></td>
                  <td class="s-td"><p>{{ author.age }}</p></td>
                  <td class="s-td"><p>{{ author.country }}</p></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <transition name="author">
      <div v-show="authors.length === 0" class="warning" style="text-align: center">
        <h1>Авторов нет</h1>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  props: {
    authors: {
      type: Array,
      required: true,
    }
  },
  removeBook(author) {
    this.$ajax.delete(`api/author/${author.id}`).then((response) => {
      $emit('remove', author)
    })
  },
  name: "AuthorList"
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

.author-enter-active, .author-leave-active {
  transition: all 1s;
}

.author-move {
  transition: transform 1s;
}

.author-enter, .author-leave-to {
  opacity: 0.5;
  transform: translateY(20px);

}
</style>