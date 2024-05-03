'use client'

import { useQuery } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CategoriesResponse, TriviaCategory } from '../interfaces/categories-response';

const TriviaForm = () => {

  const getCategories = async():Promise<TriviaCategory[]> => {
    const data:CategoriesResponse = await fetch('https://opentdb.com/api_category.php').then(response => response.json())
    return data.trivia_categories
  }

  const {data, error} = useQuery({
    queryKey: ["category"],
    queryFn: getCategories
  })
  if(error) {
    <h1>Error fetching categories</h1>
  }


  return (
      <div>
        <Formik
          initialValues={{
            numberOfQuestions: 10,
            selectedCategory: '',
            difficulty: '',
            type: '',
          }}
          validationSchema={Yup.object({
            numberOfQuestions: Yup.number().required('Required').min(1, 'Minimum 1 question').max(50, 'Maximum 50 questions'),
            selectedCategory: Yup.string().required('Required'),
            difficulty: Yup.string().required('Required'),
            type: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(JSON.stringify(values))
              setSubmitting(false)
            }, 1000)
          }}
        >
          <Form>
            <div>
              <label htmlFor="numberOfQuestions" className="pr-4">Number of questions</label>
              <Field type="number" id="numberOfQuestions" name="numberOfQuestions" className='text-black'></Field>
            </div>
            <div>
              <label htmlFor="selectedCategory" className="pr-4">Choose a category</label>
              <Field as="select" id="selectedCategory" name="selectedCategory" className='text-black'>
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
            <button type='submit'>Start!</button>
          </Form>
        </Formik>
      </div>
  );
}

export default TriviaForm;
