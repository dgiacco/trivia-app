"use client";

import { useRef, useState, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";

import { TriviaCategory } from "../../interfaces/categories-response";
import { difficulties } from "./constants";
import { useGlobalContext } from "@/app/context/TriviaContext";
import { TriviaParams } from "@/app/interfaces/context-params";
import { formFieldClass, formLabelClass, maxQuestionsClass, errorFormFieldClass } from "@/app/styles/form-styles";
import Loader from "../common/Loader";
import Button from "@/app/components/common/Button";

const getCategories = async (): Promise<TriviaCategory[]> => {
  const resp = await fetch("https://opentdb.com/api_category.php");
  const data = await resp.json();
  return data.trivia_categories;
};

const TriviaForm = () => {
  const questionsNumber = useRef<HTMLInputElement>(null);
  const selectedCategory = useRef<HTMLSelectElement>(null);
  const selectedDifficulty = useRef<HTMLSelectElement>(null);
  const [showMaxMessage, setShowMaxMessage] = useState(false);
  const {
    data: formData,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  const { setTriviaParams } = useGlobalContext();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = Number(questionsNumber.current?.value) || 10;
    const category = Number(selectedCategory.current?.value) || 9;
    const difficulty = selectedDifficulty.current?.value || "easy";
    const questionsParams: TriviaParams = [amount, category, difficulty];
    setTriviaParams(questionsParams);
    router.push("/questions");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value > 50) {
      setShowMaxMessage(true);
    } else {
      setShowMaxMessage(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount" className={formLabelClass}>
            Number of questions
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            ref={questionsNumber}
            defaultValue={10}
            max={50}
            className={!showMaxMessage ? formFieldClass : errorFormFieldClass}
            onChange={handleInputChange}
          ></input>
          {showMaxMessage && (
            <div className={maxQuestionsClass}><IoWarning className="mr-2"/>Max 50 questions</div>
          )}
        </div>
        <div>
          <label htmlFor="category" className={formLabelClass}>
            Choose a category
          </label>
          <select
            id="category"
            name="category"
            ref={selectedCategory}
            className={formFieldClass}
          >
            {formData?.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty" className={formLabelClass}>
            Select difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            ref={selectedDifficulty}
            className={formFieldClass}
          >
            {difficulties.map((dif) => (
              <option key={dif.value} value={dif.value}>
                {dif.name}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-4 text-right">
          <Button type="submit" disabled={showMaxMessage}>Start!</Button>
        </div>
      </form>
    </div>
  );
};

export default TriviaForm;
