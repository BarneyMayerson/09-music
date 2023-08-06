import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";
import { beforeEach, describe, expect, vi } from "vitest";

vi.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  },
}));

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("authenticates user", async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).not.toBeTruthy();

    await store.authenticate({});

    expect(store.userLoggedIn).toBeTruthy();
  });
});
