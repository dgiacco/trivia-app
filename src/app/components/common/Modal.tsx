"use client";

import { useRouter } from "next/navigation";

import { modalTitle, modalText, modalCounter } from "@/app/styles/modal-styles";
import Button from "./Button";

interface ModalProps {
  isFinalResult: boolean;
  count?: number;
  totalQuestions?: number;
}

const Modal = ({ isFinalResult, count, totalQuestions }: ModalProps) => {
  const router = useRouter();

  const goToMenu = () => router.push("/menu");
  const goToReview = () => router.push("/questions/review")

  const finalResultContainer = "p-4 md:p-6 flex justify-around"
  const noQuestionsContainer = "p-4 md:p-6 flex justify-end"

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
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <div className="bg-white p-7 lg:p-10">
            {isFinalResult ? (
              <>
                <h1 className={modalTitle}>
                  {performanceRate === 100 ? "PERFECT!!!" : "Well played!"}
                </h1>
                <p className={modalText}>
                  {finalMessage}
                </p>
                <p className={modalText}>
                  Your score is:
                </p>
                <h2 className={modalCounter}>{count} / {totalQuestions}</h2>
              </>
            ) : (
              <>
                <h1 className={modalTitle}>
                  No Questions Available 😞
                </h1>
                <p className={modalText}>
                  There are no questions available for this combination.
                </p>
                <p className={modalText}>
                  Please try another one.
                </p>
              </>
            )}
          </div>
          <div className={isFinalResult? finalResultContainer : noQuestionsContainer}>
            { isFinalResult && <Button onClick={goToReview} isReview={true}>Review</Button>}
            
            <Button onClick={goToMenu}>{isFinalResult ? "Play again!" : "Go back!"}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
