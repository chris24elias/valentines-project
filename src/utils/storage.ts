import type { FormData } from "../types/forms";
import { formState } from "../stores/formStore";

const STORAGE_KEY = "valentine_form_data";

export function saveFormState(data: FormData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFormState(): FormData | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const data = JSON.parse(saved);
    formState.set(data);
    return data;
  }
  return null;
}

export function clearFormState() {
  localStorage.removeItem(STORAGE_KEY);
}
