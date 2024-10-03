import { MdBusiness, MdCreditCard, MdMoney } from "react-icons/md";

export const Header = ({ id, title, description }) => {
  return (
    <div className="flex flex-col mb-10">
      <h2 className="flex items-center gap-2 text-gray-600 font-medium text-2xl">
        {id === "rtns" && <MdCreditCard size={25} />}{" "}
        {id === "business" && <MdBusiness size={25} />}
        {id === "taxes" && <MdMoney size={25} />}
        {title}{" "}
      </h2>
      <span className="text-gray-400 mt-[-5px] px-9">{description}</span>
    </div>
  );
};
