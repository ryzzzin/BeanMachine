<template>
  <div class="game">
    <div class="game__scene">
      <div class="game__header">
        <div>
          <img class="game__logo" src="@/assets/sprites/logo.png"  alt="">
        </div>
        <div class="game__balance">
          ${{ game.balance }}
        </div>
      </div>
      <div class="game__orders orders">
        <Transition name="slide">
          <div class="orders__item order" v-if="(gameState instanceof InProgressGameState) && !game.isOrderAnimating">
            <div class="order__cup">
              <CupComponent :cup="orderCupData" />
            </div>
            <div class="order__description">
              <p class="order__name">
                {{ game.currentOrder.name }}
              </p>
              <p class="order__message">
                {{ game.currentOrder.message }}
              </p>
            </div>
            <div class="order__counter">
              # {{ game.ordersCount }}
            </div>
            <div class="order__avatar">
              <img :src="game.currentOrder.getCustomerAvatarUrl()" alt="Customer">
            </div>
          </div>
        </Transition>
      </div>
      <Transition name="resize">
        <div :class="['game__cup', { shake: game.isCupShaking }]" v-if="(gameState instanceof InProgressGameState) && !game.isCupAnimating">
          <CupComponent :cup="currentCupData" />
        </div>
      </Transition>
      <div class="game__buttons">
        <div class="game__buttons-group">
          <ActionButton class="game__button" @click="game.setDrink(Drink.Coffee)">
            <img src="@/assets/sprites/buttons/coffee.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setDrink(Drink.Matcha)">
            <img src="@/assets/sprites/buttons/matcha.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setDrink(Drink.Milkshake)">
            <img src="@/assets/sprites/buttons/milkshake.svg" alt="">
          </ActionButton>
        </div>
        <div class="game__buttons-group">
          <ActionButton class="game__button" @click="game.setTopping(Topping.Ice)">
            <img src="@/assets/sprites/buttons/ice.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setTopping(Topping.Cream)">
            <img src="@/assets/sprites/buttons/cream.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setTopping(Topping.Marshmallow)">
            <img src="@/assets/sprites/buttons/marshmallow.svg" alt="">
          </ActionButton>
        </div>
        <div class="game__buttons-group">
          <ActionButton class="game__button" @click="game.setServing(Serving.Straw)">
            <img src="@/assets/sprites/buttons/straw.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setServing(Serving.CookieCap)">
            <img src="@/assets/sprites/buttons/cookie.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.setServing(Serving.TransparentCap)">
            <img src="@/assets/sprites/buttons/cap.svg" alt="">
          </ActionButton>
        </div>
        <div class="game__buttons-group">
          <ActionButton class="game__button" @click="game.startGame()" v-if="(game.state instanceof NotStartedGameState)">
            <img src="@/assets/sprites/buttons/done.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="game.nextOrder()" v-else>
            <img src="@/assets/sprites/buttons/done.svg" alt="">
          </ActionButton>

          <ActionButton class="game__button" @click="game.remakeCup()">
            <img src="@/assets/sprites/buttons/cancel.svg" alt="">
          </ActionButton>
          <ActionButton class="game__button" @click="openOptions()">
            <img src="@/assets/sprites/buttons/options.svg" alt="">
          </ActionButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CupComponent from '@/components/CupComponent.vue';
import ActionButton from '@/components/ActionButton.vue';
import Cup from '@/classes/Cup';
import Order from '@/classes/Order';
import Drink from '@/types/Drink';
import Topping from '@/types/Topping';
import Serving from '@/types/Serving';
import Game from '@/classes/Game';
import GameState from '@/classes/GameState';
import InProgressGameState from '@/classes/InProgressGameState';
import NotStartedGameState from '@/classes/NotStartedGameState';

export default defineComponent({
  name: 'Game',
  components: {
    CupComponent,
    ActionButton,
  },
  data () {
    return {
      Drink,
      Topping,
      Serving,
      InProgressGameState,
      NotStartedGameState,

      game: new Game(),
    };
  },
  methods: {
    openOptions (): void {
      location.reload();
    },
  },
  computed: {
    currentCupData (): Cup {
      return this.game.currentCup as Cup;
    },
    orderCupData (): Cup {
      return this.game.currentOrder.cup as Cup;
    },
    gameState (): GameState {
      return this.game.state as GameState;
    },
  }
});
</script>

<style lang="scss" scoped>
.resize-enter-active, .resize-leave-active {
  transition: all 0.25s;
}

.resize-enter-from, .resize-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.resize-enter-to, .resize-leave-from {
  transform: scale(1);
  opacity: 1;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.25s;
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(-300px) scale(0.8);
  opacity: 0;
}

.slide-enter-to, .slide-leave-from {
  transform: translateX(0) scale(1);
  opacity: 1;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

.game {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('~@/assets/sprites/background.png');
  background-size: cover;
  background-position: bottom;
  backdrop-filter: blur(10px);

  &__scene {
    padding: 24px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  &__logo {
    height: 48px;
  }

  &__balance {
    font-size: 32px;
    font-weight: 700;
    color: #7A6361;
  }

  &__orders {
  }

  &__button {
  }

  &__buttons {
    margin-top: auto;
    display: flex;
    gap: 48px;
  }

  &__buttons-group {
    display: flex;
    gap: 24px;
  }

  &__cup {
    position: absolute;
    bottom: 20%;
    right: 40%;
    width: 160px;
    filter: drop-shadow(0 7px 5px rgba(0, 0, 0, 0.25))
  }
}
.orders {
  display: flex;
  flex-direction: column;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
.order {
  position: relative;
  display: flex;
  background: rgba($color: #ECE7DC, $alpha: 0.9);
  border: 4px solid #786661;
  padding: 16px 48px 16px 16px;
  border-radius: 24px;
  width: max-content;
  gap: 16px;

  &__cup {
    padding: 16px;
    background: #DAD5CC;
    border-radius: 8px;
    max-width: 100px;
  }

  &__description {
    padding-top: 14px;
    color: #7A6361;
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
  }

  &__message {
    font-size: 16px;
    font-weight: 500;
    max-width: 210px;
  }

  &__counter {
    position: absolute;
    top: 16px;
    right: 20px;
    font-size: 18px;
    font-weight: 700;
    color: #7A6361;
  }

  &__avatar {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 20px;
    bottom: 0;
  }
}

</style>
