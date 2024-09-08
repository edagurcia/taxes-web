import { useEffect } from "react";
import { useTaxes } from "../hooks";
import { Businesses } from "../components";
import { RTNS } from "../components/maitenance/RTNS";

export const MaintenancePage = () => {
  const { businesses, startGetBusiness, startGetRTNS } = useTaxes();

  useEffect(() => {
    if (businesses) return;

    startGetBusiness();
    startGetRTNS();
  }, []);

  return (
    <>
      <h1 className="text-3xl mb-5 text-primary/50">Mantenimientos</h1>

      <Businesses />
      <RTNS />
    </>
  );
};
