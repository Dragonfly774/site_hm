<template>
  <button class="s-btn" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "SButton"
}
</script>

<style scoped>
.s-btn {
  height: 30px;
  background-color: #44c767;
  border-radius: 5px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 5px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}

.s-btn:hover {
  background-color: #5cbf2a;
}

.s-btn:active {
  position: relative;
  top: 1px;
}
</style>