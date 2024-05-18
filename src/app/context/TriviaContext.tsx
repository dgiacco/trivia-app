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
  setTriviaParams: Dispatch<SetStateAction<TriviaParams>>;
  setSelectedAnswers: Dispatch<SetStateAction<string[] | null>>;
  setCorrectAnswers: Dispatch<SetStateAction<string[] | null>>;
}

const initialTriviaParams: TriviaParams = [10, 9, "easy"];
const initialSelectedAnswers: string[] | null = null;
const initialCorrectAnswers: string[] | null = null;

const GlobalContext = createContext<TriviaContextType>({
  triviaParams: initialTriviaParams,
  selectedAnswers: initialSelectedAnswers,
  correctAnswers: initialCorrectAnswers,
  setTriviaParams: () => [],
  setSelectedAnswers: () => {},
  setCorrectAnswers: () => {},
});

export interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [triviaParams, setTriviaParams] = useState(initialTriviaParams);
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | null>(initialSelectedAnswers);
  const [correctAnswers, setCorrectAnswers] = useState<string[] | null>(initialCorrectAnswers);

  return (
    <GlobalContext.Provider
      value={{
        triviaParams,
        selectedAnswers,
        correctAnswers,
        setTriviaParams,
        setSelectedAnswers,
        setCorrectAnswers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
