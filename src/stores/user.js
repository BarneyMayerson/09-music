import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),

  actions: {
    async register(values) {
      const userCredenlials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await usersCollection.doc(userCredenlials.user.uid).set({
        name: values.name,
        email: values.email,
        country: values.country,
        age: values.age,
        attitude: values.attitude,
      });

      await userCredenlials.user.updateProfile({
        displayName: values.name,
      });

      this.userLoggedIn = true;
    },
  },
});
