'use client'

import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CategoriesResponse, TriviaCategory } from '../interfaces/categories-response';
import { InitialValues } from '../interfaces/initial-values';

const TriviaForm = () => {

  const initialValues: InitialValues = {
    amount: 10,
    category: 9,
    difficulty: 'easy',
    type: 'multiple'
  }

  const validationSchema = Yup.object({
    amount: Yup.number().required('Required').min(1, 'Minimum 1 question').max(50, 'Maximum 50 questions'),
    category: Yup.number().required('Required').min(9).max(32),
    difficulty: Yup.string().required('Required'),
    type: Yup.string().required('Required')
  })

  const getCategories = async():Promise<TriviaCategory[]> => {
    const data:CategoriesResponse = await fetch('https://opentdb.com/api_category.php').then(response => response.json())
    return data.trivia_categories
  }

  const {data, error} = useQuery({
    queryKey: ["category"],
    queryFn: getCategories
  })

  return (
      <div>
        {error && <h1>Error fetching categories</h1>}
        <Formik
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={(values, actions) => {
            const { amount, category, difficulty, type } = values;
            const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
            fetch(apiUrl).then(response => {
              if(!response.ok) {
                throw new Error('Network response was not ok')
              } 
              return response.json()
            })
            .then(data => data.results)
            actions.setSubmitting(false);
          }}
        >
          <Form>
            <div>
              <label htmlFor="amount" className="pr-4">Number of questions</label>
              <Field type="number" id="amount" name="amount" className='text-black'></Field>
            </div>
            <div>
              <label htmlFor="category" className="pr-4">Choose a category</label>
              <Field as="select" id="category" name="category" className='text-black'>
                {data?.map(category => {
                  return <option key={category.id} value={category.name}>{category.name}</option>
                })}
              </Field>
            </div>
            <div>
              <label htmlFor="difficulty" className="pr-4">Select difficulty</label>
              <Field as="select" id="difficulty" name="difficulty" className='text-black'>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Field>
            </div>
            <div>
              <label htmlFor="type" className="pr-4">Select type</label>
              <Field as="select" id="type" name="type" className='text-black'>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </Field>
            </div>
            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">Start!</button>
          </Form>
        </Formik>
      </div>
  );
}

export default TriviaForm;
