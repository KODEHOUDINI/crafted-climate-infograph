import { proxy, subscribe } from "valtio";

const VERSION = "1.0"; // Increment this version number whenever significant changes are made

const storedStateString = window.localStorage.getItem("infoStore");
let initialState;

if (storedStateString) {
  const parsedState = JSON.parse(storedStateString);

  // Check if the stored version matches the current version
  if (parsedState.version === VERSION) {
    initialState = parsedState;
  } else {
    // Version mismatch, clear localStorage and use default state
    localStorage.removeItem("infoStore");
    initialState = {
      version: VERSION,
      climateColor: "#ffff00",
    };
  }
} else {
  // No existing state in localStorage, use default state
  initialState = {
    version: VERSION,
    climateColor: "#ffff00",
  };
}

const craftedClimateState = proxy(initialState);

subscribe(craftedClimateState, () => {
  // Save the state to localStorage with the version number
  window.localStorage.setItem("infoStore", JSON.stringify(craftedClimateState));
});

export { craftedClimateState };
