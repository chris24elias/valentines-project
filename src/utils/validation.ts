export interface ValidationError {
  field: string;
  message: string;
}

export function validateChoices(
  choices: number[],
  minRequired: number = 1
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!choices || choices.length < minRequired) {
    errors.push({
      field: "choices",
      message: `Please select at least ${minRequired} option${
        minRequired > 1 ? "s" : ""
      }`,
    });
  }

  return errors;
}
