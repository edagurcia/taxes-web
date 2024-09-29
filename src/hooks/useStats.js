import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MONTHS } from "@/constants/months";

export const useStats = () => {
  const { taxes, selectedPeriod } = useSelector((state) => state.taxesInfo);

  //* actual year
  const yearSales = useMemo(() => {
    return taxes?.documents.reduce((acc, val) => acc + val.sale_amount, 0);
  }, [taxes?.documents]);

  const yearPurchases = useMemo(() => {
    return taxes?.documents.reduce((acc, val) => acc + val.purchase_amount, 0);
  }, [taxes?.documents]);

  const yearTaxes = useMemo(() => {
    return taxes?.documents.reduce((acc, val) => acc + val.tax, 0);
  }, [taxes?.documents]);

  const yearCreditTaxes = useMemo(() => {
    return taxes?.documents.reduce((acc, val) => acc + val.credit_tax, 0);
  }, [taxes?.documents]);

  // * last month data
  const actualMonth = MONTHS.find((m) => m.id === selectedPeriod?.month - 1);

  const strMonth = `${actualMonth.month}`;

  const lastMonthData = taxes?.documents.filter(
    (data) => data.month === strMonth
  );

  const lastMonthSales = lastMonthData?.reduce(
    (acc, val) => acc + val.sale_amount,
    0
  );

  const lastMonthPurchases = lastMonthData?.reduce(
    (acc, val) => acc + val.purchase_amount,
    0
  );

  const lastMonthTaxes = lastMonthData?.reduce((acc, val) => acc + val.tax, 0);

  const lastMonthCreditTaxes = lastMonthData?.reduce(
    (acc, val) => acc + val.credit_tax,
    0
  );

  //* this month
  const thisMonthData = taxes?.documents.filter(
    (data) => data.month === selectedPeriod?.strMonth
  );

  const thisMonthSales = thisMonthData?.reduce(
    (acc, val) => acc + val.sale_amount,
    0
  );
  const thisMonthPurchase = thisMonthData?.reduce(
    (acc, val) => acc + val.purchase_amount,
    0
  );
  const thisMonthTaxes = thisMonthData?.reduce((acc, val) => acc + val.tax, 0);
  const thisMonthCreditTaxes = thisMonthData?.reduce(
    (acc, val) => acc + val.credit_tax,
    0
  );

  //* Stats Data

  const isGoodSales = thisMonthSales > lastMonthSales;
  const isMorePurchase = thisMonthPurchase > lastMonthPurchases;
  const isMoreTaxes = thisMonthTaxes > lastMonthTaxes;

  const actualYear = {
    id: "year",
    title: ` ${selectedPeriod?.year}`,
    sales: yearSales,
    purchases: yearPurchases,
    taxes: yearTaxes,
    creditTaxes: yearCreditTaxes,
  };

  const lastMonth = {
    id: "lastmonth",
    title: `${strMonth}`,
    sales: lastMonthSales,
    purchases: lastMonthPurchases,
    taxes: lastMonthTaxes,
    creditTaxes: lastMonthCreditTaxes,
  };

  const thisMonth = {
    id: "thismonth",
    title: `${selectedPeriod?.strMonth}`,
    sales: thisMonthSales,
    purchases: thisMonthPurchase,
    taxes: thisMonthTaxes,
    creditTaxes: thisMonthCreditTaxes,
    isGoodSales,
  };

  return {
    actualYear,
    lastMonth,
    thisMonth,
  };
};
