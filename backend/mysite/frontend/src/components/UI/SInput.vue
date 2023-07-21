<template>
  <input class="s-input" :value="value" @input="updateInput">
</template>

<script>
export default {
  name: "SInput",
  props: {
    value: [String, Number, []]
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.s-input {
  height: 25px;
  padding: 5px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  border-radius: 5px;
  outline: 0;
  margin-bottom: 5px;
}

.s-input:focus {
  border-color: #bdbdbd;
  box-shadow: 0 0 0 0.1rem rgba(158, 158, 158, 0.25);
}
</style>