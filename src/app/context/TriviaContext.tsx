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
  selectedAnswers: string[];
  correctAnswers: string[];
  allQuestions: string[];
  setTriviaParams: Dispatch<SetStateAction<TriviaParams>>;
  setSelectedAnswers: Dispatch<SetStateAction<string[]>>;
  setCorrectAnswers: Dispatch<SetStateAction<string[]>>;
  setAllQuestions: Dispatch<SetStateAction<string[]>>;
}

const initialTriviaParams: TriviaParams = [10, 9, "easy"];
const initialSelectedAnswers: string[] = [];
const initialCorrectAnswers: string[] = [];
const initialAllQuestions: string[] = [];

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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    initialSelectedAnswers
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    initialCorrectAnswers
  );
  const [allQuestions, setAllQuestions] = useState<string[]>(
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
