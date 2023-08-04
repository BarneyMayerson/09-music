import { shallowMount } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";

describe("SongItem.vue", () => {
  it("renders song.display_name", () => {
    const song = {
      display_name: "Tester",
    };

    const wrapper = shallowMount(SongItem, {
      props: {
        song,
      },
    });

    expect(wrapper.text()).toContain("Tester");
  });
});
