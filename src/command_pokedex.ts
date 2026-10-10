import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  console.log("Your Pokedex:");

  // The Pokédex is keyed by Pokémon name, so its keys are the caught names.
  for (const pokemonName of Object.keys(state.pokedex)) {
    console.log(` - ${pokemonName}`);
  }
}
