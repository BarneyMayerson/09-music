import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user";
import { beforeEach, describe, expect } from "vitest";

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
