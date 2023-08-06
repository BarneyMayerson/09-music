import { shallowMount, RouterLinkStub } from "@vue/test-utils";
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
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const itemAuthor = wrapper.find(".text-gray-500");

    expect(itemAuthor.text()).toBe("Tester");
  });

  it("renders song.docId in id attribute", () => {
    const song = {
      docId: "abcd",
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

    // expect(wrapper.attributes().id).toBe("song-id-abcd");
    expect(wrapper.classes()).toContain("song-id-abcd");
  });
});
