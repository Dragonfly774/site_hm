<template>
  <div>
    <div v-show="countrys.length !== 0">
      <transition-group name="country">
        <div class="country" v-for="country in countrys" :key="`country-${country.id}`">
          <div>
            <div class="s-item">
              <div style="display: flex; flex-direction: row;">
                <div class="s-item--actions">
                  <s-button class="warning" @click="$emit('remove', country)">Удалить</s-button>
                </div>
                <div class="s-item--actions">
                  <s-button class="notify" @click="$emit('update', country)">Изменить</s-button>
                </div>
              </div>
              <table class="s-tr">
                <tr>
                  <td class="s-td"><p><strong>id:</strong></p></td>
                  <td class="s-td"><p><strong>Название:</strong></p></td>
                </tr>
                <tr>
                  <td class="s-td"><p>{{ country.id }}</p></td>
                  <td class="s-td"><p>{{ country.name_of_the_country }}</p></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <transition name="country">
      <div v-show="countrys.length === 0" class="warning" style="text-align: center">
        <h1>Стран нет</h1>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "CountrysList",
  props: {
    countrys: {
      type: Array,
      required: true,
    }
  },
  removeCountry(country) {
    this.$ajax.delete(`api/country/${country.id}`).then((response) => {
      $emit('remove', country)
    })
  }
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

.country-enter-active, .country-leave-active {
  transition: all 1s;
}

.country-move {
  transition: transform 1s;
}

.country-enter, .country-leave-to {
  opacity: 0.5;
  transform: translateY(20px);

}
</style>