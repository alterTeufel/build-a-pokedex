import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  if (state.nextLocationsURL === null && state.prevLocationsURL !== null) {
    console.log("you're on the last page");
    return;
  }

  const locations = await state.pokeapi.fetchLocations(
    state.nextLocationsURL ?? undefined,
  );

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const location of locations.results) {
    console.log(location.name);
  }
}
