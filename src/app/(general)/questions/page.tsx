"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useGlobalContext } from "@/app/context/TriviaContext";
import { getQuestions } from "@/app/fetchers/questions";
import Loader from "../../components/common/Loader";
import { questionClass } from "@/app/styles/questions-styles";
import Modal from "../../components/common/Modal";
import Button from "@/app/components/common/Button";
import AnswerContainer from "@/app/components/Questions/AnswerContainer";
import { removeCharacters } from "../../../../util/FormatText";
import "@/styles/animations.css";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuestionsPage = () => {
  const { triviaParams } = useGlobalContext();
  const { setSelectedAnswers, setCorrectAnswers, setAllQuestions } =
    useGlobalContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [visibleAnswers, setVisibleAnswers] = useState<string[]>([]);
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const amount = triviaParams[0];
  const category = triviaParams[1];
  const difficulty = triviaParams[2];

  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions", amount, category, difficulty],
    queryFn: () => getQuestions({ amount, category, difficulty }),
  });

  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffledAnswers = shuffleArray([
        ...questions[currentQuestionIndex].incorrect_answers,
        questions[currentQuestionIndex].correct_answer,
      ]);
  
      setCurrentAnswers(shuffledAnswers);
      setSelectedAnswer(null);
      setVisibleAnswers([]); // Reset visible answers
  
      shuffledAnswers.forEach((answer, index) => {
        setTimeout(() => {
          setVisibleAnswers((prev) => [...prev, answer]);
        }, index * 500); // Adjust the delay as needed
      });
    }
  }, [questions, currentQuestionIndex]);

  if (isLoading) {
    return <Loader />;
  }

  if (questions === undefined || questions.length === 0) {
    return (
      <div>
        <Modal isFinalResult={false} />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setSelectedAnswers((prevAnswers) => {
      return [...(prevAnswers || []), removeCharacters(answer)];
    });
  };

  const moveToNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setCounter(counter + 1);
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  };

  const finishGame = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setCounter(counter + 1);
    }
    const allCorrectAnswers = questions?.map((question) =>
      removeCharacters(question.correct_answer)
    );
    const everyQuestion = questions?.map((question) =>
      removeCharacters(question.question)
    );
    setCorrectAnswers(allCorrectAnswers);
    setAllQuestions(everyQuestion);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-white"></h1>
      <div className={questionClass}>
        <div key={currentQuestion.question}>
          {removeCharacters(currentQuestion.question)}
        </div>
      </div>
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleAnswers.map((answer) => (
            <div key={answer} className="answer-enter">
              <AnswerContainer
              answer={answer}
              onClick={handleAnswer}
              selected={selectedAnswer === answer}
            />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        {questions.length > currentQuestionIndex + 1 ? (
          <Button
            onClick={moveToNextQuestion}
            disabled={selectedAnswer === null}
          >
            Next Question
          </Button>
        ) : (
          <Button onClick={finishGame} disabled={selectedAnswer === null}>
            Finish!
          </Button>
        )}
      </div>
      {showModal && (
        <Modal
          isFinalResult={true}
          count={counter}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
};

export default QuestionsPage;
