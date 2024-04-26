<template>
  <div class="cup">
    <img :src="spriteUrl" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cup from '@/classes/Cup';

interface CupComponentProps {
  cup: Cup;
}

export default defineComponent({
  name: 'CupComponent',
  props: {
    cup: {
      type: Object as PropType<Cup>,
      required: true,
    }
  },
  computed: {
    spriteUrl (): string {
      const name = this.cup.getImageName();
      return require(`@/assets/sprites/cups/${name}.svg`);
    },
  }
});
</script>

<style lang="scss" scoped>
</style>
