import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),

  actions: {
    async register(values) {
      await auth.createUserWithEmailAndPassword(values.email, values.password);

      await usersCollection.add({
        name: values.name,
        email: values.email,
        country: values.country,
        age: values.age,
        attitude: values.attitude,
      });

      this.userLoggedIn = true;
    },
  },
});
