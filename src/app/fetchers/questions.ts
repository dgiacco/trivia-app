import { QuestionsResponse } from "../interfaces/questions-response";

export const getQuestions = async ({ amount, category, difficulty }: { amount: number; category: number; difficulty: string }) => {
  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  try {
    const resp = await fetch(apiUrl);
    const questions: QuestionsResponse = await resp.json();
    return questions.results
  } catch (err) {
    console.error(err);
  }
};