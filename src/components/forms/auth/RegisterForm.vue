<template>
  <!-- Registration Form -->
  <div
    v-if="reg_show_alert"
    class="text-white text-center font-bold rounded p-4 mb-4"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage name="name" class="text-red-600 text-xs" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-600 text-xs" />
    </div>
    <!-- Attitude -->
    <div class="mb-3">
      <label class="inline-block mb-2">Attitude</label>
      <VeeField
        as="select"
        name="attitude"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="listener">Listener</option>
        <option value="artist">Artist</option>
      </VeeField>
      <ErrorMessage name="attitude" class="text-red-600 text-xs" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="mt-1">
          <span class="text-red-600 text-xs block" v-for="error in errors" :key="error">
            {{ error }}
          </span>
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirm_password" class="text-red-600 text-xs" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Russia">Russia</option>
      </VeeField>
      <ErrorMessage name="country" class="text-red-600 text-xs" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t keypath="register.accept" tag="label" class="inline-block">
        <a href="#">{{ $t("register.tos") }}</a>
      </i18n-t>
      <ErrorMessage name="tos" class="text-red-600 text-xs block" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_progress"
      :class="{ 'cursor-wait': reg_in_progress }"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script setup>
import { ref } from "vue";
import useUserStore from "@/stores/user";

const schema = {
  name: "required|min:4|max:100|alpha_spaces",
  email: "required|min:4|max:100|email",
  age: "required|min_value:16|max_value:107",
  attitude: "required",
  password: "required|min:8|max:48|excluded:password,111111,123456",
  confirm_password: "password_mismatch:@password",
  country: "required|country_excluded:Russia,Belarus",
  tos: "tos",
};

const userData = ref({
  country: "USA",
  age: 23,
  attitude: "listener",
});

const reg_in_progress = ref(false);
const reg_show_alert = ref(false);
const reg_alert_variant = ref("bg-blue-500");
const reg_alert_msg = ref("Please wait! Your account is being created.");

const userStore = useUserStore();

const register = async (values) => {
  reg_show_alert.value = true;
  reg_in_progress.value = true;
  reg_alert_variant.value = "bg-blue-500";
  reg_alert_msg.value = "Please wait! Your account is being created.";

  try {
    await userStore.register(values);
  } catch (error) {
    reg_in_progress.value = false;
    reg_alert_variant.value = "bg-red-500";
    reg_alert_msg.value = "An unexpected error occured. Please try again later.";

    return;
  }

  reg_alert_variant.value = "bg-green-500";
  reg_alert_msg.value = "Success! Your account has been created.";
  reg_in_progress.value = true;

  window.location.reload();
};
</script>
