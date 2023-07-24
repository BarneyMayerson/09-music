<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        v-if="show_alert"
        class="text-white text-center font-bold p-4 mb-4"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <VeeForm :validation-schema="schema" :initial-values="song" @submit="update">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <VeeField
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage name="modified_name" class="text-red-600 text-xs" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <VeeField
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage name="genre" class="text-red-600 text-xs" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_progress"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600 ml-1"
          @click.prevent="showForm = false"
          :disabled="in_progress"
        >
          Go Back
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",

  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      in_progress: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: "Please wait! Updating song info.",
    };
  },

  methods: {
    async update(values) {
      this.in_progress = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song info.";

      try {
        await songsCollection.doc(this.song.docId).update(values);
      } catch (error) {
        this.in_progress = false;
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong! Try again later.";

        return;
      }

      this.updateSong(this.index, values);

      this.in_progress = false;
      this.alert_variant = "bg-green-500";
      this.alert_message = "Success!";
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docId).delete();

      this.removeSong(this.index);
    },
  },
};
</script>
