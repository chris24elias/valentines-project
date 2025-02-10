import { atom } from "nanostores";
import type { FormData } from "../types/forms";

export const formState = atom<FormData>({
  valentine: false,
  selectedFoods: [],
  selectedDesserts: [],
  selectedActivities: [],
});
