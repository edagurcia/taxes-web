import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loader = ({ showText = true, text = "Cargando..." }) => {
  return (
    <div className="flex items-center justify-center text-white">
      <AiOutlineLoading3Quarters
        className={`animate-spin h-5 w-5 ${showText ? "mr-3" : ""}`}
      />
      {showText && text}
    </div>
  );
};
