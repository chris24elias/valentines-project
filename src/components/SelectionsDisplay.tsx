import React from "react";
import { useStore } from "@nanostores/react";
import { formState } from "../stores/formStore";
import { foodChoices, dessertChoices, activityChoices } from "../data/choices";
import type { FoodChoice } from "../types/forms";

const SelectionsDisplay: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const state = useStore(formState);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const renderChoices = (
    choices: FoodChoice[],
    selectedIds: number[],
    title: string,
    emoji: string
  ) => {
    if (!mounted) return null;

    const selected = choices.filter((choice) =>
      selectedIds?.includes(choice.id)
    );

    return (
      <div className="selection-category">
        <h3>
          {title} {emoji}
        </h3>
        <ul className="choice-list">
          {selected.length > 0 ? (
            selected.map((item) => <li key={item.id}>• {item.text}</li>)
          ) : (
            <li>No choices selected</li>
          )}
        </ul>
      </div>
    );
  };

  if (!mounted) {
    return <div className="selections">Loading...</div>;
  }

  return (
    <div className="selections">
      <h2>Our Valentine's Day Plan 💝</h2>
      <div className="selection-grid">
        {renderChoices(foodChoices, state.selectedFoods, "Food", "🍽️")}
        {renderChoices(dessertChoices, state.selectedDesserts, "Dessert", "🍰")}
        {renderChoices(
          activityChoices,
          state.selectedActivities,
          "Activities",
          "🎮"
        )}
      </div>

      <style jsx>{`
        .selections {
          margin-top: 3rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .selection-category {
          padding: 1.5rem;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h2 {
          font-size: 2rem;
          color: #ff6b6b;
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.5rem;
          color: #ff6b6b;
          margin-bottom: 1rem;
        }

        .choice-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }

        .choice-list li {
          font-size: 1.1rem;
          color: #666;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }

        .choice-list li:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default SelectionsDisplay;
