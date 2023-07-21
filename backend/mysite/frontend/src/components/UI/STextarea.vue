<template>
  <textarea class="s-textarea" :value="value" @input="updateInput"></textarea>
</template>

<script>
export default {
  name: "STextarea",
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
.s-textarea {
  height: 100px;
  padding: 5px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  border-radius: 5px;
  outline: 0;
  margin-bottom: 10px;
}

.s-textarea:focus {
  border-color: #bdbdbd;
  box-shadow: 0 0 0 0.1rem rgba(158, 158, 158, 0.25);
}
</style>