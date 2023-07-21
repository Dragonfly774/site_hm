<template>
  <div class="s-content-countrys">
    <s-dialog v-model="createFormVisible">
      <create-form-countrys @create="addCountry"></create-form-countrys>
    </s-dialog>
    <s-dialog v-model="updateFormVisible">
      <update-form-countrys :countrysUpData="countryUpData" @update="updateCountrysForm"></update-form-countrys>
    </s-dialog>
    <s-input style="margin-top: 15px; width: 90%;" type="text" placeholder="Поиск"
             v-model.trim="search"/>
    <div class="s-actions">
      <s-select v-model="selectedSort" :options="sortOptions"></s-select>
      <s-select v-model="switchSort" :options="switchSortOptions" style="margin-right: auto; margin-left: auto"></s-select>
      <s-button @click="createFormVisible=true" style="margin-left: auto">Добавить</s-button>
    </div>
    <countrys-list :countrys="searchCountryName" @remove="removeCountrys" @update="updateCountrys"></countrys-list>
  </div>
</template>

<script>
import CreateFormCountrys from "@/components/countryComponents/CreateFormCountrys.vue";
import CountrysList from "@/components/countryComponents/CountrysList.vue";
import UpdateFormCountrys from "@/components/countryComponents/UpdateFromCountrys.vue";

export default {
  name: "AppContentCountrys",
  components: {UpdateFormCountrys, CreateFormCountrys, CountrysList},
  data() {
    return {
      countryUpData: [],
      countrys: [],
      name_of_the_country: '',
      selectedSort: '',
      createFormVisible: false,
      updateFormVisible: false,
      search: '',
      counter: '',
      sortOptions: [
        {value: '', name: "Без сортировки"},
        {value: 'id', name: "По id"},
        {value: 'name', name: "По названию"},
      ],
      switchSort: '', // направление сортировки
      switchSortOptions: [
        {value: '0', name: "По умолчанию"},
        {value: '1', name: "По возрастанию"},
        {value: '2', name: "По убыванию"},
      ],
    }
  },
  computed: {
    sortedCountrys() {
      this.counter += 1
      if (this.switchSort === "2") {
        return (
            [...this.countrys].sort((country1, country2) =>
                String(country1[this.selectedSort])?.localeCompare(String(country2[this.selectedSort]))).reverse()
        )
      } else {
        return (
            [...this.countrys].sort((country1, country2) =>
                String(country1[this.selectedSort])?.localeCompare(String(country2[this.selectedSort])))
        )
      }
    },
     searchCountryName() {
      // this.counter += 1
      return this.sortedCountrys.filter(country => country.name_of_the_country.includes(this.search))
    }
  },
  methods: {
    addCountry(country) {
      this.countrys.push(country)
      this.createFormVisible = false

    },

    removeCountrys(country) {
      this.$ajax.delete(`api/country/${country.id}`).then((response) => {
        this.countrys = this.countrys.filter(elem => elem.id !== country.id)
      })
    },
    updateCountrys(country) {
      //   это вызовется когда кнопка нажата будет из BookList
      this.countryUpData = country
      this.updateFormVisible = true
    },
    updateCountrysForm(country) {
      // тут что придет от формы
      this.updateFormVisible = false
      for (let i in this.countrys) {
        if (this.countrys[i].id === country.id) {
          this.countrys[i] = country
          this.counter += 1
          break
        }
      }
    }
  },
  mounted() {
    this.$ajax.get('api/country').then((response) => {
      this.countrys = response.data
    })
  }
}
</script>


<style scoped>
.s-actions {
  display: flex;
  margin-top: 15px;
}
</style>