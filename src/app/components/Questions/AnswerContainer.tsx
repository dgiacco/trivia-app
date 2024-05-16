import { answerClass } from "@/app/styles/questions-styles";
import { removeCharacters } from "../../../../util/FormatText";

interface AnswerProps {
  answer: string;
}

const AnswerContainer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <div className="items-center justify-center">
      <div className="w-full rounded-md bg-gradient-to-r from-cyan-300 to-teal-600 p-1 hover:cursor-pointer transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-300">
        <div className="flex p-3 h-full w-full items-center justify-center bg-slate-800 hover:bg-slate-700">
          <h1 className={answerClass}>
            {removeCharacters(answer)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AnswerContainer;
