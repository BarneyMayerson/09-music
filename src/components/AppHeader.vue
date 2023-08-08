<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </RouterLink>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'about' }">About</RouterLink>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              Login / Register
            </a>
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">Manage</RouterLink>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" class="text-white px-2" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";

const modalStore = useModalStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const i18n = useI18n();

const currentLocale = computed(() => (i18n.locale.value === "en" ? "Eng" : "Rus"));

const toggleAuthModal = () => (modalStore.isOpen = !modalStore.isOpen);

const signOut = () => {
  userStore.signOut();

  if (route.meta.requiresAuth) {
    router.push({ name: "home" });
  }
};

const changeLocale = () => {
  i18n.locale.value = i18n.locale.value === "en" ? "ru" : "en";
};
</script>
