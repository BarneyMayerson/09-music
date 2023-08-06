import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import SongItem from "@/components/SongItem.vue";
import { expect } from "vitest";

describe("Home.vue", () => {
  it("render list of songs", () => {
    const songs = [{}, {}, {}];

    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);
  });
});
