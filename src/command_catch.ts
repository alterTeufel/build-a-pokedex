import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName?: string,
): Promise<void> {
  if (!pokemonName) {
    console.log("Usage: catch <pokemon_name>");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  try {
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    // Higher base experience means a lower chance of success.
    const catchChance = 1 / (pokemon.base_experience || 1);

    if (Math.random() > catchChance) {
      console.log(`${pokemon.name} escaped!`);
      return;
    }

    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
  } catch (error) {
    console.log(
      `Failed to catch ${pokemonName}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}
