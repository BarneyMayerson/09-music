<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :is="Component"></Component>
    </Transition>
  </RouterView>
  <AppPlayer />
  <AppAuth />
</template>

<script setup>
import useUserStore from "@/stores/user";
import { auth } from "@/includes/firebase";
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import AppPlayer from "@/components/Player.vue";

const userStore = useUserStore();

if (auth.currentUser) {
  userStore.userLoggedIn = true;
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
