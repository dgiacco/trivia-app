"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useGlobalContext } from "@/app/context/TriviaContext";
import { getQuestions } from "@/app/fetchers/questions";
import Loader from "../../components/common/Loader";
import { questionClass } from "@/app/styles/questions-styles";
import QuestionsModal from "../../components/Questions/QuestionsModal";
import Button from "@/app/components/common/Button";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionsPage = () => {
  const { triviaParams } = useGlobalContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const amount = triviaParams[0];
  const category = triviaParams[1];
  const difficulty = triviaParams[2];

  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions({ amount, category, difficulty }),
  });

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  };

  if (isLoading) {
    return <Loader />;
  }

  function removeCharacters(question: string) {
    return question
      .replace(/&quot;/g, '"')
      .replace(/&rsquo;/g, "’")
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&shy;/g, "-\n")
      .replace(/&ldquo;/g, "“")
      .replace(/&hellip;/g, "…")
      .replace(/&rdquo;/g, "”");
  }

  if (questions === undefined || questions.length === 0) {
    return (
      <div>
        <QuestionsModal />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = shuffleArray([...questions[currentQuestionIndex].incorrect_answers,  questions[currentQuestionIndex].correct_answer]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={questionClass}>
        <div key={currentQuestion.question}>
          {removeCharacters(currentQuestion.question)}
        </div>
      </div>
      <div className={questionClass}>
        <div key={currentQuestion.question}>
          {
            currentAnswers.map(answer => <div key={answer}>{answer}</div>)
          }
        </div>
      </div>
      <div className="text-center">
        <Button onClick={moveToNextQuestion}>Next question</Button>
      </div>
    </div>
  );
};

export default QuestionsPage;
