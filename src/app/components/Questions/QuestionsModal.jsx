const QuestionsModal = ({ children }) => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
          <div className="bg-gray-50 px-4 py-3 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsModal;





