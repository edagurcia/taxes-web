import { MONTHS } from "../constants/months";

export const getActualPeriod = () => {
  const actualYear = new Date().getFullYear();
  const getMonth = new Date().getMonth();
  const getMonthPlusOne = getMonth + 1;
  const actualMonth = MONTHS.find((m) => m.id === getMonthPlusOne);

  const strPeriod = `${actualMonth.month}-${actualYear}`;

  return {
    strPeriod,
    actualMonth,
    actualYear,
    MONTHS,
  };
};
