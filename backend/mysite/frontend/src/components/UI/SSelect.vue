<template>

  <select style="border-radius: 5px;" :value="value" @change="$emit('input', $event.target.value)">
    <option disabled value="">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SSelect",
  props: {
    value: [],
    options: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped>

</style>