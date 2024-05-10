"use client";

import { useRef, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { TriviaCategory } from "../../interfaces/categories-response";
import { FormValues } from "../../interfaces/form-values";
import { difficulties } from "./constants";
import { useGlobalContext } from "@/app/context/TriviaContext";
import { TriviaParams } from "@/app/interfaces/context-params";

const getCategories = async (): Promise<TriviaCategory[]> => {
  const resp = await fetch("https://opentdb.com/api_category.php");
  const data = await resp.json();
  return data.trivia_categories;
};

const initialValues: FormValues = {
  amount: 10,
  category: 9,
  difficulty: "easy",
};

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Required")
    .min(1, "Minimum 1 question")
    .max(50, "Maximum 50 questions"),
});

const fieldClass =
  "text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-1";

const TriviaForm = () => {
  const questionsNumber = useRef<HTMLInputElement>(null);
  const selectedCategory = useRef<HTMLSelectElement>(null);
  const selectedDifficulty = useRef<HTMLSelectElement>(null);
  const { data: formData, error: fetchError } = useQuery({
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

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Number of questions</label>
          <input
            type="number"
            id="amount"
            name="amount"
            ref={questionsNumber}
            className={fieldClass}
          ></input>
        </div>
        <div>
          <label htmlFor="category">Choose a category</label>
          <select
            id="category"
            name="category"
            ref={selectedCategory}
            className={fieldClass}
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
          <label htmlFor="difficulty">Select difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            ref={selectedDifficulty}
            className={fieldClass}
          >
            {difficulties.map((dif) => (
              <option key={dif.value} value={dif.value}>
                {dif.name}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
          >
            Start!
          </button>
        </div>
      </form>
    </div>
  );
};

export default TriviaForm;
