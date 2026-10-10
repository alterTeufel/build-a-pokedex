import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  areaName?: string,
): Promise<void> {
  if (!areaName) {
    console.log("Usage: explore <area_name>");
    return;
  }

  console.log(`Exploring ${areaName}...`);

  try {
    const location = await state.pokeapi.fetchLocation(areaName);

    console.log("Found Pokemon:");
    for (const encounter of location.pokemon_encounters) {
      console.log(` - ${encounter.pokemon.name}`);
    }
  } catch (error) {
    console.log(
      `Failed to explore ${areaName}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

