"use client";

import { useState, useEffect } from 'react';
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
  difficulty: "easy"
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

  useEffect(() => {
    console.log(questions)
  }, [questions])
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="amount" className="pr-4">
              Number of questions
            </label>
            <Field
              type="number"
              id="amount"
              name="amount"
              className="text-black"
            ></Field>
          </div>
          <div>
            <label htmlFor="category" className="pr-4">
              Choose a category
            </label>
            <Field
              as="select"
              id="category"
              name="category"
              className="text-black"
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
            <label htmlFor="difficulty" className="pr-4">
              Select difficulty
            </label>
            <Field
              as="select"
              id="difficulty"
              name="difficulty"
              className="text-black"
            >
              {difficulties.map((dif) => (
                <option key={dif.value} value={dif.value}>{dif.name}</option>
              ))}
            </Field>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
          >
            Start!
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TriviaForm;