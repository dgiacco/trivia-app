"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';

import { useGlobalContext } from "@/app/context/TriviaContext";
import { getQuestions } from "@/app/fetchers/questions";
import Loader from "../../components/common/Loader";
import { questionClass } from "@/app/styles/questions-styles";
import QuestionsModal from "../../components/Questions/QuestionsModal"

const QuestionsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { triviaParams } = useGlobalContext();

  const amount = triviaParams[0];
  const category = triviaParams[1];
  const difficulty = triviaParams[2];

  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions({ amount, category, difficulty }),
  });

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

  if(questions?.length === 0) {
    return (
      <div>
      {/* Render your questions here */}
      
      <QuestionsModal>
        {/* Modal content */}
        <h1 className="text-lg font-bold mb-4">No Questions Available</h1>
        <p className="text-gray-700">There are no questions available.</p>
      </QuestionsModal>
    </div>
    )
  }
  return (
    <>
      <div className={questionClass}>
        {questions?.map((question) => (
          <h3 key={question.question}>{removeCharacters(question.question)}</h3>
        ))}
      </div>
    </>
  );
};

export default QuestionsPage;
