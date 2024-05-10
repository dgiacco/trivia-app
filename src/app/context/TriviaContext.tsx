'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { TriviaParams } from "../interfaces/context-params";

export interface TriviaContextType {
  triviaParams: TriviaParams;
  setTriviaParams: Dispatch<SetStateAction<TriviaParams>>
}

const initialTriviaParams: TriviaParams = [10, 9, 'easy']

const GlobalContext = createContext<TriviaContextType>({
  triviaParams: initialTriviaParams,
  setTriviaParams: () => []
});

export const GlobalContextProvider = ({ children }) => {
  const [triviaParams, setTriviaParams] = useState(initialTriviaParams)

  return (
    <GlobalContext.Provider value={{ triviaParams, setTriviaParams }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

