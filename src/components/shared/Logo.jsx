import { BsGraphDownArrow } from "react-icons/bs";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <BsGraphDownArrow fontSize={45} className="text-primary" />
      <h2 className="text-primary font-bold">
        Taxes<small className="font-light">App</small>
      </h2>
    </div>
  );
};
