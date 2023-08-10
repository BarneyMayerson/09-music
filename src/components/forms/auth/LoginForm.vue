<template>
  <!-- Login Form -->
  <div
    v-if="login_show_alert"
    class="text-white text-center font-bold rounded p-4 mb-4"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600 text-xs" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600 text-xs" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_progress"
      :class="{ 'cursor-wait': login_in_progress }"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script setup>
import { ref } from "vue";
import useUserStore from "@/stores/user";

const loginSchema = {
  email: "required|email",
  password: "required|min:8|max:48",
};

const login_in_progress = ref(false);
const login_show_alert = ref(false);
const login_alert_variant = ref("bg-blue-500");
const login_alert_msg = ref("Please wait! We are logging you in.");

const userStore = useUserStore();

const login = async (values) => {
  login_show_alert.value = true;
  login_in_progress.value = true;
  login_alert_variant.value = "bg-blue-500";
  login_alert_msg.value = "Please wait! We are logging you in.";

  try {
    await userStore.authenticate(values);
  } catch (error) {
    login_in_progress.value = false;
    login_alert_variant.value = "bg-red-500";
    login_alert_msg.value = "Invalid login details.";

    return;
  }

  login_alert_variant.value = "bg-green-500";
  login_alert_msg.value = "Success! You are now logged in.";
  login_in_progress.value = false;

  window.location.reload();
};
</script>
