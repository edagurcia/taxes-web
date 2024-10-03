import { useEffect } from "react";
import { useBusiness, useRtn, useTaxes } from "../hooks";
import { PeriodSelector, StatsContainer, TaxesDetail } from "../components";

export const DashboardPage = () => {
  const { taxes, startGetTaxes } = useTaxes();
  const { startGetBusiness } = useBusiness();
  const { startGetRTNS } = useRtn();

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
      <StatsContainer />
      <TaxesDetail />
    </>
  );
};
