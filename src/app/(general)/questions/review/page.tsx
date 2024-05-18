'use client'

import Button from "@/app/components/common/Button";
import { useGlobalContext } from "@/app/context/TriviaContext";
import { reviewAnswer, reviewQuestion, reviewTitle } from "@/app/styles/review-page-styles";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const ReviewPage = () => {
  const { selectedAnswers, correctAnswers } = useGlobalContext();
  return (
    <div className="container mx-auto py-6 text-white">
      <div className={reviewTitle}>
        Let's review your performance!
      </div>

      <div className="max-w-md px-4 lg:px-0 mx-auto">
        <div className={reviewQuestion}>Here goes the question</div>
        <div className={reviewAnswer}>Your answer:</div>
        <p className={reviewAnswer}>{selectedAnswers}</p>
        <div className={reviewAnswer}>Correct answer:</div>
        <p className={reviewAnswer}>{correctAnswers}</p>
        <div className="flex justify-around mt-8">
          <Button>
            <HiOutlineArrowNarrowLeft/>
          </Button>
          <Button>
            <HiOutlineArrowNarrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
