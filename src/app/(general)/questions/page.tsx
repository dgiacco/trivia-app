"use client";

import { useQuery } from "@tanstack/react-query";

import { useGlobalContext } from "@/app/context/TriviaContext";
import { getQuestions } from "@/app/fetchers/questions";
import Loader from "../../components/common/Loader";
import { questionClass } from "@/app/styles/questions-styles";

const QuestionsPage = () => {
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
