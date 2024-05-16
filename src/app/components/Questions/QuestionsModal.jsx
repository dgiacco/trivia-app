'use client'

import { useRouter } from "next/navigation";
import Button from "../common/Button";

const QuestionsModal = () => {

  const router = useRouter();

  const goToMenu = () => router.push("/menu")

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto flex items-center justify-center px-4">
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-4/5 md:max-w-2xl">
          <div className="bg-white p-6 sm:p-8">
            <h1 className="font-serif text-xl font-bold text-slate-800 mb-4">No Questions Available 😞</h1>
            <p className="font-serif text-slate-800">There are no questions available for this combination.</p>
            <p className="font-serif text-slate-800 mb-4">Please try another one.</p>
          </div>
          <div className="p-4 sm:p-6 flex justify-end">
            <Button onClick={goToMenu}>Go Back!</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsModal;











