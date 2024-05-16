import { answerClass } from "@/app/styles/questions-styles";
import { removeCharacters } from "../../../../util/FormatText";

interface AnswerProps {
  answer: string;
  onClick: (answer: string) => void;
  selected: boolean;
}

const AnswerContainer: React.FC<AnswerProps> = ({ answer, onClick, selected }) => {
  const commonParentStyle = "w-full rounded-md bg-gradient-to-r p-1 hover:cursor-pointer"
  const commonChildStyle = "flex p-3 h-full w-full items-center justify-center"
  const selectedParentStyle = selected ? `${commonParentStyle} from-teal-600 to-cyan-300` : `${commonParentStyle} from-cyan-300 to-teal-600 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-300`
  const selectedChildStyle = selected ? `${commonChildStyle} bg-slate-700` : `${commonChildStyle} bg-slate-800 hover:bg-slate-500`

  return (
    <div className="items-center justify-center">
      <div
        className={selectedParentStyle}
        onClick={() => onClick(answer)}
      >
        <div className={selectedChildStyle}>
          <h1 className={answerClass}>{removeCharacters(answer)}</h1>
        </div>
      </div>
    </div>
  );
};

export default AnswerContainer;
