<template>
  <div>
    <div v-show="books.length !== 0">
      <transition-group name="book">
        <div class="books" v-for="book in books" :key="`book-${book.id}`">
          <div>
            <div class="s-item">
              <div style="display: flex; flex-direction: row;">
                <div class="s-item--actions">
                  <s-button class="warning" @click="$emit('remove', book)">Удалить</s-button>
                </div>
                <div class="s-item--actions">
                  <s-button class="notify" @click="$emit('update', book)">Изменить</s-button>
                </div>
              </div>
              <table class="s-tr">
                <tr>
                  <td class="s-td"><p><strong>id:</strong></p></td>
                  <td class="s-td"><p><strong>Название:</strong></p></td>
                  <td class="s-td"><p><strong>Аннотация:</strong></p></td>
                  <td class="s-td"><p><strong>Автор:</strong></p></td>
                  <td class="s-td"><p><strong>Жанры:</strong></p></td>
                </tr>
                <tr>
                  <td class="s-td"><p>{{ book.id }}</p></td>
                  <td class="s-td"><p>{{ book.name }}</p></td>
                  <td class="s-td"><p>{{ book.annotation }}</p></td>
                  <td class="s-td"><p>{{ book.author }}</p></td>
                  <td class="s-td"><p>{{ String(book.genres) }}</p></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <transition name="book">
      <div v-show="books.length === 0" class="warning" style="text-align: center">
        <h1>Книг нет</h1>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    books: {
      type: Array,
      required: true,
    }
  },
  name: "BooksList",
  removeBook(book) {
    this.$ajax.delete(`api/book/${book.id}`).then((response) => {
      $emit('remove', book)
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

.book-enter-active, .book-leave-active {
  transition: all 1s;
}

.book-move {
  transition: transform 1s;
}

.book-enter, .book-leave-to {
  opacity: 0.5;
  transform: translateY(20px);

}
</style>