import { atom } from "nanostores";
import type { FormData } from "../types/forms";

const defaultState: FormData = {
  valentine: false,
  selectedFoods: [],
  selectedDesserts: [],
  selectedActivities: [],
};

export const formState = atom<FormData>(defaultState);

// Initialize store with localStorage data on the client side
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("formState");
  if (saved) {
    formState.set(JSON.parse(saved));
  }

  // Subscribe to changes and update localStorage
  formState.subscribe((state) => {
    localStorage.setItem("formState", JSON.stringify(state));
  });
}
