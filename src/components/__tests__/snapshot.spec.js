import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";
import { describe, expect } from "vitest";

describe("Snapshot SongItem.vue", () => {
  it("renders correctly", () => {
    const song = {
      docId: "abcd",
      modified_name: "test",
      display_name: "test",
      comment_count: 4,
    };

    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
