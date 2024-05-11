"use client";

import { useRef, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

import { TriviaCategory } from "../../interfaces/categories-response";
import { difficulties } from "./constants";
import { useGlobalContext } from "@/app/context/TriviaContext";
import { TriviaParams } from "@/app/interfaces/context-params";
import { formButtonClass, formFieldClass, formLabelClass } from "@/app/styles/form-styles";

const getCategories = async (): Promise<TriviaCategory[]> => {
  const resp = await fetch("https://opentdb.com/api_category.php");
  const data = await resp.json();
  return data.trivia_categories;
};

const TriviaForm = () => {
  const questionsNumber = useRef<HTMLInputElement>(null);
  const selectedCategory = useRef<HTMLSelectElement>(null);
  const selectedDifficulty = useRef<HTMLSelectElement>(null);
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

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen">
        <MoonLoader color="#36D7B7" size={50} />
      </div>
    );
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
            defaultValue={10}
            className={formFieldClass}
          ></input>
        </div>
        <div>
          <label htmlFor="category" className={formLabelClass}>
            Choose a category
          </label>
          <select id="category" name="category" className={formFieldClass}>
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
          <select id="difficulty" name="difficulty" className={formFieldClass}>
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
            className={formButtonClass}
          >
            Start!
          </button>
        </div>
      </form>
    </div>
  );
};

export default TriviaForm;
