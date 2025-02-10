export interface Choice {
  id: number;
  text: string;
  image_url: string;
}

export interface FoodChoice extends Choice {
  category: "food" | "dessert" | "activity";
}

export interface FormData {
  valentine: boolean;
  selectedFoods: number[];
  selectedDesserts: number[];
  selectedActivities: number[];
}
