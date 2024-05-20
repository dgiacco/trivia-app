"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import { useGlobalContext } from "@/app/context/TriviaContext";
import {
  reviewAnswer,
  reviewQuestion,
  reviewTitle,
} from "@/app/styles/review-page-styles";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { removeCharacters } from "../../../../../util/FormatText";

const ReviewPage = () => {
  const { selectedAnswers, correctAnswers, allQuestions, setSelectedAnswers } = useGlobalContext();
  const [questionIndex, setQuestionIndex] = useState(0);

  const router = useRouter();

  const goToMenu = () => {
    setSelectedAnswers([])
    router.push("/menu")
  };

  const nextQuestion = () => setQuestionIndex(questionIndex + 1);
  const previousQuestion = () => setQuestionIndex(questionIndex - 1);

  const currentQuestion = allQuestions[questionIndex];
  const currentSelectedAnswer = selectedAnswers[questionIndex];
  const currentCorrectAnswer = correctAnswers[questionIndex];

  console.log(selectedAnswers, correctAnswers, allQuestions)

  const reviewTitleText = removeCharacters("Let's review your performance!");

  const correctAnswerStyle = `${reviewAnswer} text-green-400`;
  const incorrectAnswerStyle = `${reviewAnswer} text-red-400`;

  return (
    <div className="container mx-auto py-6 text-white">
      <div className={reviewTitle}>{reviewTitleText}</div>

      <div className="max-w-md px-4 lg:px-0 mx-auto">
        <div className={reviewQuestion}>{currentQuestion}</div>
        <div className={reviewAnswer}>Your answer:</div>
        <p
          className={
            currentSelectedAnswer === currentCorrectAnswer
              ? correctAnswerStyle
              : incorrectAnswerStyle
          }
        >
          {currentSelectedAnswer}
        </p>
        {currentSelectedAnswer !== currentCorrectAnswer ? (
          <div className="mt-3">
            <div className={reviewAnswer}>Correct answer:</div>
            <p className={reviewAnswer}>{currentCorrectAnswer}</p>
          </div>
        ) : (
          <div className="mt-3">
            <p className={reviewAnswer}>You answered that one correctly! 🎉</p>
          </div>
        )}

        <div className="flex justify-around mt-8">
          <Button
            isArrow={true}
            onClick={previousQuestion}
            disabled={questionIndex === 0}
          >
            <HiOutlineArrowNarrowLeft />
          </Button>
          <Button
            isArrow={true}
            onClick={nextQuestion}
            disabled={questionIndex === allQuestions.length - 1}
          >
            <HiOutlineArrowNarrowRight />
          </Button>
        </div>
        <div className="flex justify-around mt-8">
          <Button onClick={goToMenu}>Return to menu</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
