import { useEffect } from "react";
import { useTaxes } from "../hooks/useTaxes";
import { PeriodSelector } from "../components/dashboard/PeriodSelector";

export const DashboardPage = () => {
  const { taxes, startGetRTNS, startGetBusiness, startGetTaxes } = useTaxes();

  useEffect(() => {
    if (taxes) return;
    startGetTaxes();
    startGetRTNS();
    startGetBusiness();
  }, []);

  return (
    <>
      <h1 className="text-3xl mb-5 text-primary/50">Dashboard</h1>

      <PeriodSelector />
      <div>STATS</div>
      <div>SEARCHINPUT</div>
      <div>DETAIL</div>
    </>
  );
};
