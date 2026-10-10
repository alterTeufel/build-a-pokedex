import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmedInput = input.trim();
  if (trimmedInput === "") {
    return [];
  }
  return trimmedInput.toLowerCase().split(/\s+/);
}

export function startREPL(state: State): void {
  state.rl.prompt(); // displays the prompt

  state.rl.on("line", async (line) => {
    const words = cleanInput(line);
    
    if (words.length === 0) {
      state.rl.prompt();
      return;
    } // If the input is empty, give the user back control to type another command and exit the callback

    const commandName = words[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (error) {
      console.error(error);
    }

    state.rl.prompt();
  });
}
