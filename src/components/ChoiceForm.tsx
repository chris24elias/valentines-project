import React from "react";
import { useStore } from "@nanostores/react";
import { formState } from "../stores/formStore";
import type { FoodChoice } from "../types/forms";
import { validateChoices } from "../utils/validation";
import { addPageTransition } from "../utils/transitions";

interface ChoiceFormProps {
  title: string;
  choices: FoodChoice[];
  stateKey: "selectedFoods" | "selectedDesserts" | "selectedActivities";
  inputName: string;
  nextPage: string;
  submitText: string;
}

const ChoiceForm: React.FC<ChoiceFormProps> = ({
  title,
  choices,
  stateKey,
  inputName,
  nextPage,
  submitText,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const state = useStore(formState);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  React.useEffect(() => {
    setMounted(true);
    // Initialize selected items from store
    setSelectedItems(state[stateKey] || []);
  }, [state, stateKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateChoices(selectedItems);

    if (errors.length > 0) {
      setError(errors[0].message);
      return;
    }

    setIsLoading(true);
    try {
      formState.set({
        ...state,
        [stateKey]: selectedItems,
      });

      addPageTransition();
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = nextPage;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
    setError("");
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="choice-grid">
          {choices.map((choice) => (
            <div key={choice.id} className="choice-item">
              <img src={choice.image_url} alt={choice.text} />
              <label>
                <input
                  type="checkbox"
                  name={inputName}
                  value={choice.id}
                  checked={selectedItems.includes(choice.id)}
                  onChange={() => handleCheckboxChange(choice.id)}
                />
                <span>{choice.text}</span>
              </label>
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className={`submit-button ${isLoading ? "loading" : ""}`}
        >
          {submitText}
        </button>
      </form>

      <style jsx>{`
        .form-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          animation: slideUp 0.5s ease-out;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
          animation: fadeIn 0.5s ease-in;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .choice-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          width: 100%;
          padding: 2rem;
        }

        .choice-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          transition: transform 0.2s ease;
        }

        .choice-item:hover {
          transform: translateY(-5px);
        }

        .choice-item img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .choice-item label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .error-message {
          color: #ff4444;
          margin: 1rem 0;
          min-height: 1.5em;
        }

        .submit-button {
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          background-color: #ff6b6b;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button.loading {
          opacity: 0.7;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChoiceForm;
