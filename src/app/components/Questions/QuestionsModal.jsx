'use client'

import { useRouter } from "next/navigation";

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
            <button
              type="button"
              onClick={goToMenu}
              className="inline-flex items-center justify-center font-mono bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-white font-bold py-2 px-6 rounded-lg shadow-xl transition duration-150 ease-in-out text-lg sm:text-xl lg:text-2xl"
            >
              Go back!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsModal;











