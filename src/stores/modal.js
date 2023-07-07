import { defineStore } from "pinia";
import { ref } from "vue";

// export default defineStore("modal", {
//   state: () => ({
//     isOpen: false,
//   }),
// });

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);

  return { isOpen };
});
