<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Изменить страну</h3>
      <s-input type="text" placeholder="Название" v-model.trim="country.name_of_the_country"/>
      <s-button @click="updateCountrys">Изменить</s-button>
    </form>
  </div>
</template>

<script>


export default {
  name: "UpdateFormCountrys",
  props: {
    countrysUpData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      country: {
        id: this.countrysUpData.id,
        name_of_the_country: this.countrysUpData.name_of_the_country,

      },
    }
  },
  methods: {

    updateCountrys() {
     this.$ajax.put(`api/country/${this.countrysUpData.id}/`, {...this.country}).then(() => {
        this.$emit('update', {...this.country})
      })
    }
  },

}
</script>

<style scoped>
.s-form {
  background: #a5eaa5;
  border-radius: 8px;
  padding: 1px 10px 10px 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
</style>