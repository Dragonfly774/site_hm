<template>
  <div class="s-dialog" v-if="value === true" @click="$emit('input', false)">
    <div class="s-dialog--content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>
.s-dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;

}

.s-dialog--content {
  margin: auto;
  background: #a5eaa5;
  border-radius: 10px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;

}
</style>