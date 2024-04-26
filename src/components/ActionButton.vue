<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionButton',
});
</script>

<style lang="scss" scoped>
.button {
  background: #ECE8DA;
  border: 6px solid #5F4646;
  border-radius: 24px;
  width: 88px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: .15s;

  &:hover {
    transform: scale(1.05);
    transition: .15s;
  }

  &:active {
    transform: scale(0.95);
    transition: .15s;
  }
}
</style>
