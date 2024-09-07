import { Link } from "react-router-dom";

export const Navigation = ({ message = "", label = "", url = "" }) => {
  return (
    <div className="w-full flex p-4 gap-2 mt-5">
      <p className="text-gray-500">{message}</p>
      <Link
        to={url}
        className="text-primary/70 hover:text-primary duration-200"
      >
        {label}
      </Link>
    </div>
  );
};
