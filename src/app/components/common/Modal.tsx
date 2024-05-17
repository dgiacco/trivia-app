"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface ModalProps {
  isFinalResult: boolean;
  count?: number;
  totalQuestions?: number;
}

const Modal = ({ isFinalResult, count, totalQuestions }: ModalProps) => {
  const router = useRouter();

  const goToMenu = () => router.push("/menu");

  let performanceRate = null

  if(count != null && totalQuestions != null) {
    performanceRate = (count / totalQuestions) * 100
  }

  let finalMessage = null

  if(performanceRate != null) {
    if(performanceRate < 50) {
      finalMessage = "Nice try, but you need to study more... 🫢"
    } else if(performanceRate >= 50 && performanceRate < 99) {
      finalMessage = "Awesome!! You clearly know your sutff! 😎"
    } else {
      finalMessage = "You should go to a TV show and win some money! 🥳"
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center px-4">
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-4/5 md:max-w-2xl">
          <div className="bg-white p-6 sm:p-8">
            {isFinalResult ? (
              <>
                <h1 className="font-serif text-xl md:text-2xl font-bold text-slate-700 mb-4">
                  {performanceRate === 100 ? "PERFECT!!!" : "Well played!"}
                </h1>
                <p className="font-serif md:text-lg text-slate-700 mb-4">
                  {finalMessage}
                </p>
                <p className="font-serif md:text-lg text-slate-700">
                  Your score is:
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-center font-bold text-slate-700 my-8">{count} / {totalQuestions}</h2>
              </>
            ) : (
              <>
                <h1 className="font-serif text-xl font-bold text-slate-700 mb-4">
                  No Questions Available 😞
                </h1>
                <p className="font-serif text-slate-700">
                  There are no questions available for this combination.
                </p>
                <p className="font-serif text-slate-700 mb-4">
                  Please try another one.
                </p>
              </>
            )}
          </div>
          <div className="p-4 md:p-6 flex justify-end">
            <Button onClick={goToMenu}>Go Back!</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
