"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

import { TriviaCategory } from "../../interfaces/categories-response";
import { FormValues } from "../../interfaces/form-values";
import { difficulties } from "./constants";

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

const TriviaForm = () => {
  const [questions, setQuestions] = useState([]);
  const { data: formData, error: fetchError } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { amount, category, difficulty } = values;
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    try {
      const resp = await fetch(apiUrl);
      const data = await resp.json();
      setQuestions(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const fieldClass =
    "text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-1";

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>

            <label htmlFor="amount">Number of questions</label>
            <Field
              type="number"
              id="amount"
              name="amount"
              className={fieldClass}
            ></Field>
          </div>
          <div>
            <label htmlFor="category">Choose a category</label>
            <Field
              as="select"
              id="category"
              name="category"
              className={fieldClass}
            >
              {formData?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Field>
          </div>
          <div>
            <label htmlFor="difficulty">Select difficulty</label>
            <Field
              as="select"
              id="difficulty"
              name="difficulty"
              className={fieldClass}
            >
              {difficulties.map((dif) => (
                <option key={dif.value} value={dif.value}>
                  {dif.name}
                </option>
              ))}
            </Field>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
            >
              Start!
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TriviaForm;
