import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPeriod } from "../features/taxesInfoSlice";
import { MONTHS } from "../constants/months";

export const useTaxesPeriod = () => {
  const dispatch = useDispatch();

  const handleSetPeriod = (formData) => {
    if (!formData) {
      const actualYear = new Date().getFullYear();
      const getMonth = new Date().getMonth();
      const getMonthPlusOne = getMonth + 1;
      const actualMonth = MONTHS.find((m) => m.id === getMonthPlusOne);

      const strMonth = `${actualMonth.month}`;

      const period = {
        month: actualMonth?.id,
        year: String(actualYear),
        strMonth,
      };

      dispatch(setPeriod(period));
      return;
    }

    const year = Number(formData?.year);
    const month = Number(formData?.monthId);

    if (month <= 0) {
      toast.warning("Mes seleccionado no es valido.");
      return;
    }

    if (year < 2024) {
      toast.warning("Año seleccionado no es valido.");
      return;
    }

    const selectedMonth = MONTHS.find((m) => m.id === month);

    const strMonth = `${selectedMonth.month}`;

    const period = {
      month: month,
      year: String(year),
      strMonth,
    };

    dispatch(setPeriod(period));
  };

  return {
    handleSetPeriod,
  };
};
