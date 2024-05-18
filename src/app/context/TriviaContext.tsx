"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { TriviaParams } from "../interfaces/context-params";

export interface TriviaContextType {
  triviaParams: TriviaParams;
  selectedAnswers: string[] | null;
  correctAnswers: string[] | null;
  allQuestions: string[] | null;
  setTriviaParams: Dispatch<SetStateAction<TriviaParams>>;
  setSelectedAnswers: Dispatch<SetStateAction<string[] | null>>;
  setCorrectAnswers: Dispatch<SetStateAction<string[] | null>>;
  setAllQuestions: Dispatch<SetStateAction<string[] | null>>;
}

const initialTriviaParams: TriviaParams = [10, 9, "easy"];
const initialSelectedAnswers: string[] | null = null;
const initialCorrectAnswers: string[] | null = null;
const initialAllQuestions: string[] | null = null;

const GlobalContext = createContext<TriviaContextType>({
  triviaParams: initialTriviaParams,
  selectedAnswers: initialSelectedAnswers,
  correctAnswers: initialCorrectAnswers,
  allQuestions: initialAllQuestions,
  setTriviaParams: () => [],
  setSelectedAnswers: () => {},
  setCorrectAnswers: () => {},
  setAllQuestions: () => {},
});

export interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [triviaParams, setTriviaParams] = useState(initialTriviaParams);
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | null>(
    initialSelectedAnswers
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[] | null>(
    initialCorrectAnswers
  );
  const [allQuestions, setAllQuestions] = useState<string[] | null>(
    initialAllQuestions
  );

  return (
    <GlobalContext.Provider
      value={{
        triviaParams,
        selectedAnswers,
        correctAnswers,
        allQuestions,
        setTriviaParams,
        setSelectedAnswers,
        setCorrectAnswers,
        setAllQuestions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
