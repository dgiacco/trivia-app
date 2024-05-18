'use client'

import { useRouter } from "next/navigation";

import Button from "@/app/components/common/Button";
import { useGlobalContext } from "@/app/context/TriviaContext";
import { reviewAnswer, reviewQuestion, reviewTitle } from "@/app/styles/review-page-styles";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const ReviewPage = () => {
  const { selectedAnswers, correctAnswers, allQuestions } = useGlobalContext();
  const router = useRouter();

  const goToMenu = () => router.push("/menu");

  return (
    <div className="container mx-auto py-6 text-white">
      <div className={reviewTitle}>
        Let's review your performance!
      </div>

      <div className="max-w-md px-4 lg:px-0 mx-auto">
        <div className={reviewQuestion}>{allQuestions}</div>
        <div className={reviewAnswer}>Your answer:</div>
        <p className={reviewAnswer}>{selectedAnswers}</p>
        <div className={reviewAnswer}>Correct answer:</div>
        <p className={reviewAnswer}>{correctAnswers}</p>
        <div className="flex justify-around mt-8">
          <Button isArrow={true} onClick={() => console.log('prev')}>
            <HiOutlineArrowNarrowLeft/>
          </Button>
          <Button isArrow={true} onClick={() => console.log('next')}>
            <HiOutlineArrowNarrowRight/>
          </Button>
        </div>
        <div className="flex justify-around mt-8">
          <Button onClick={goToMenu}>
            Return to menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
