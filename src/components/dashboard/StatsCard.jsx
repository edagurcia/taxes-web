import { MdAccountBalance } from "react-icons/md";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { getNumberWithDecimals } from "@/helpers/formatNumbers";

export const StatsCard = ({ data }) => {
  let icon;
  let classType;

  if (data?.id === "year") {
    icon = <MdAccountBalance size={25} />;
  }

  if (data?.id === "lastmonth") {
    icon = <FaRegCalendarAlt size={25} />;
  }

  if (data?.id === "thismonth") {
    icon = <FaRegCalendarCheck size={25} />;
  }

  if (data?.id === "year" && !data?.isGoodSales) {
    classType = "text-sm font-semibold";
  }

  if (data?.id === "lastmonth" && !data?.isGoodSales) {
    classType = "text-sm font-semibold";
  }

  if (data?.id === "thismonth" && data?.isGoodSales) {
    classType = "text-sm font-semibold text-green-500";
  } else if (data?.id === "thismonth" && !data?.isGoodSales) {
    classType = "text-sm font-semibold text-rose-500";
  }

  return (
    <div className="w-full h-[140px] md:w-[300px] p-2 bg-gray-100 shadow-md rounded-md">
      <div className="flex gap-2 items-center mb-2">
        {icon}
        <h3 className="font-bold">{data?.title}</h3>
      </div>

      <p className="flex justify-between text-sm">
        Ventas:{" "}
        <span className={classType}>{getNumberWithDecimals(data?.sales)}</span>
      </p>
      <p className="flex justify-between text-sm">
        Compras:{" "}
        <span className="text-sm font-semibold">
          {getNumberWithDecimals(data?.purchases)}
        </span>
      </p>
      <p className="flex justify-between text-sm">
        Impuestos:{" "}
        <span className="text-sm font-semibold">
          {getNumberWithDecimals(data?.taxes)}
        </span>
      </p>
      <p className="flex justify-between text-sm">
        Crédito a favor:{" "}
        <span className="text-sm font-semibold">
          {getNumberWithDecimals(data?.creditTaxes)}
        </span>
      </p>
    </div>
  );
};
